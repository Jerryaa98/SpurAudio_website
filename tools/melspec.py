"""Log-mel spectrogram utilities matching the paper's preprocessing:
16 kHz, 1024-point STFT, hop 512, 128 mel bands, power -> dB."""
import numpy as np
from scipy.io import wavfile
from scipy.signal import resample_poly, stft

def load_16k(path):
    sr, x = wavfile.read(path)
    if x.ndim > 1: x = x.mean(axis=1)
    if np.issubdtype(x.dtype, np.integer): x = x.astype(np.float64) / np.iinfo(x.dtype).max
    else: x = x.astype(np.float64)
    if sr != 16000:
        from math import gcd
        g = gcd(16000, sr)
        x = resample_poly(x, 16000 // g, sr // g)
    return x

def hz_to_mel(f): return 2595.0 * np.log10(1.0 + f / 700.0)
def mel_to_hz(m): return 700.0 * (10.0 ** (m / 2595.0) - 1.0)

def mel_filterbank(sr=16000, n_fft=1024, n_mels=128, fmin=0.0, fmax=None):
    fmax = fmax or sr / 2
    mels = np.linspace(hz_to_mel(fmin), hz_to_mel(fmax), n_mels + 2)
    hz = mel_to_hz(mels)
    bins = np.fft.rfftfreq(n_fft, 1.0 / sr)
    fb = np.zeros((n_mels, len(bins)))
    for i in range(n_mels):
        l, c, r = hz[i], hz[i + 1], hz[i + 2]
        up = (bins - l) / max(c - l, 1e-9)
        dn = (r - bins) / max(r - c, 1e-9)
        fb[i] = np.clip(np.minimum(up, dn), 0, None)
    return fb

_FB = mel_filterbank()

def logmel(x, n_fft=1024, hop=512):
    _, _, Z = stft(x, fs=16000, window='hann', nperseg=n_fft, noverlap=n_fft - hop, boundary='zeros', padded=True)
    P = np.abs(Z) ** 2
    M = _FB @ P
    return 10.0 * np.log10(np.maximum(M, 1e-10))

# viridis anchors (matplotlib) for a compact LUT
_V = np.array([[68,1,84],[72,35,116],[64,67,135],[52,94,141],[41,120,142],[32,144,140],[34,167,132],[68,190,112],[121,209,81],[189,222,38],[253,231,36]], dtype=np.float64)
def viridis(t):
    t = np.clip(t, 0, 1) * (len(_V) - 1)
    i = np.minimum(t.astype(int), len(_V) - 2)
    f = (t - i)[..., None]
    return (_V[i] * (1 - f) + _V[i + 1] * f).astype(np.uint8)

def to_image(S, top_db=70.0):
    S = S - S.max()
    t = (np.clip(S, -top_db, 0) + top_db) / top_db
    return viridis(t[::-1])  # low freq at bottom
