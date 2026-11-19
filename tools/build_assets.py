"""Build the website's audio + spectrogram assets from real SpurAudio test clips.

usage: build_assets.py <hf_audio_dir> <site_assets_dir> [--preview <png>]
Audio is resampled to 16 kHz mono (the rate the benchmark's models consume) and
peak-normalised; spectrograms are 128-band log-mel images in the site's colour ramp.
"""
import sys, os, re, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np
from scipy.io import wavfile
from scipy.signal import stft
from PIL import Image
from melspec import load_16k, mel_filterbank

src, dst = sys.argv[1], sys.argv[2]
preview = sys.argv[sys.argv.index('--preview') + 1] if '--preview' in sys.argv else None

# (key, class folder, background token in filename, clip id, pretty fg, pretty bg)
CLIPS = [
    # listening demo: one clip per (foreground, background)
    ('cough-thunderstorm',   'coughing+cough', 'thunderstorm',         24, 'coughing', 'thunderstorm'),
    ('cough-vacuum',         'coughing+cough', 'vacuum_cleaner',       18, 'coughing', 'vacuum cleaner'),
    ('cough-waterdrops',     'coughing+cough', 'water_drops',          34, 'coughing', 'water drops'),
    ('cough-wind',           'coughing+cough', 'wind',                  5, 'coughing', 'wind'),
    ('pig-bells',            'pig',            'church_bells',          5, 'pig',      'church bells'),
    ('pig-engine',           'pig',            'engine+engine_idling', 22, 'pig',      'engine idling'),
    ('pig-rain',             'pig',            'rain',                 31, 'pig',      'rain'),
    ('pig-siren',            'pig',            'siren',                34, 'pig',      'siren'),
    ('crow-airplane',        'crow',           'airplane',              2, 'crow',     'airplane'),
    ('crow-footsteps',       'crow',           'footsteps',            20, 'crow',     'footsteps'),
    ('crow-rain',            'crow',           'rain',                 35, 'crow',     'rain'),
    ('crow-thunderstorm',    'crow',           'thunderstorm',         29, 'crow',     'thunderstorm'),
    # extra support clips for the episode demo
    ('cough-thunderstorm-b', 'coughing+cough', 'thunderstorm',         28, 'coughing', 'thunderstorm'),
    ('cough-thunderstorm-c', 'coughing+cough', 'thunderstorm',         30, 'coughing', 'thunderstorm'),
    ('pig-bells-b',          'pig',            'church_bells',          3, 'pig',      'church bells'),
    ('pig-bells-c',          'pig',            'church_bells',          4, 'pig',      'church bells'),
]

# site colour ramp: page-black -> indigo -> blue -> teal -> green -> amber -> cream
RAMP = [(0.00, '08080d'), (0.10, '110e2b'), (0.26, '1c1d66'), (0.41, '2148a3'), (0.54, '1c82ab'),
        (0.65, '22b09c'), (0.75, '77cb6c'), (0.85, 'dcd64b'), (0.93, 'ffcf55'), (1.00, 'fff4cf')]
_pos = np.array([p for p, _ in RAMP])
_rgb = np.array([[int(h[i:i + 2], 16) for i in (0, 2, 4)] for _, h in RAMP], dtype=np.float64)


def ramp(t):
    t = np.clip(t, 0, 1)
    out = np.empty(t.shape + (3,))
    for c in range(3):
        out[..., c] = np.interp(t, _pos, _rgb[:, c])
    return out.astype(np.uint8)


FB = mel_filterbank(16000, 1024, 128)


def logmel(x, hop):
    _, _, Z = stft(x, fs=16000, window='hann', nperseg=1024, noverlap=1024 - hop, boundary='zeros', padded=True)
    return 10.0 * np.log10(np.maximum(FB @ (np.abs(Z) ** 2), 1e-10))


def spec_image(x, hop=160, top_db=62.0, gamma=1.08):
    S = logmel(x, hop)
    S = S - np.percentile(S, 99.7)
    t = (np.clip(S, -top_db, 0) + top_db) / top_db
    return ramp(t[::-1] ** gamma)


def find(folder, bg, cid):
    for fn in os.listdir(os.path.join(src, folder)):
        m = re.match(r'(.+?)-(.+?)_alpha=(.+?)_loop=(\d+)_id=(\d+)\.wav', fn)
        if m and m.group(2) == bg and int(m.group(5)) == cid:
            return os.path.join(src, folder, fn), fn
    raise FileNotFoundError((folder, bg, cid))


os.makedirs(os.path.join(dst, 'audio'), exist_ok=True)
os.makedirs(os.path.join(dst, 'img', 'spec'), exist_ok=True)
manifest, tiles = [], []
for key, folder, bg, cid, fgp, bgp in CLIPS:
    path, fn = find(folder, bg, cid)
    x = load_16k(path)[:80000]
    x = x / max(np.abs(x).max(), 1e-9) * 0.89
    img = Image.fromarray(spec_image(x))                       # ~501 x 128
    big = img.resize((1002, 384), Image.BICUBIC)
    if preview:
        tiles.append((key, big))
    else:
        wavfile.write(os.path.join(dst, 'audio', key + '.wav'), 16000, np.round(x * 32767).astype(np.int16))
        big.save(os.path.join(dst, 'img', 'spec', key + '.webp'), 'WEBP', quality=84, method=6)
        # coarse amplitude envelope (64 points) for tiny waveform glyphs
        xe = np.pad(np.abs(x), (0, max(0, 80000 - len(x))))[:80000]
        env = xe.reshape(64, -1).max(axis=1)
        manifest.append({'key': key, 'fg': fgp, 'bg': bgp, 'source': fn, 'env': [round(float(v), 3) for v in env / env.max()]})
    print('ok', key, fn)

if preview:
    cols, w, h, pad = 4, 501, 192, 8
    rws = (len(tiles) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * (w + pad) + pad, rws * (h + pad + 14) + pad), (8, 8, 13))
    from PIL import ImageDraw
    d = ImageDraw.Draw(sheet)
    for i, (key, im) in enumerate(tiles):
        px, py = pad + (i % cols) * (w + pad), pad + (i // cols) * (h + pad + 14)
        sheet.paste(im.resize((w, h), Image.BICUBIC), (px, py + 14))
        d.text((px + 2, py), key, fill=(230, 230, 230))
    sheet.save(preview)
    print('preview', preview, sheet.size)
else:
    with open(os.path.join(dst, 'js', 'clips.js'), 'w', encoding='utf-8') as f:
        f.write('/* Real clips from the SpurAudio test split (16 kHz mono). Generated by tools/build_assets.py. */\n')
        f.write('window.SPUR_CLIPS = ' + json.dumps(manifest, indent=1) + ';\n')
    print('wrote manifest with', len(manifest), 'clips')
