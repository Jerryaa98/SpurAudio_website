"""Parse the result tables straight out of the paper's LaTeX source into JSON,
so the website's numbers are transcribed by machine rather than by hand."""
import sys, re, json, io, os

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
src = sys.argv[1]
out_path = sys.argv[2] if len(sys.argv) > 2 else None


def read(n):
    return open(os.path.join(src, n), encoding='utf-8').read()


EXP, APP, CON = read('Experiments.tex'), read('Appendix.tex'), read('Conclusion.tex')
PM = '\u00b1'


def strip_comments(t):
    t = re.sub(r'\\begin\{comment\}.*?\\end\{comment\}', '', t, flags=re.S)
    return '\n'.join(l for l in t.split('\n') if not l.lstrip().startswith('%'))


def table_by_label(tex, label):
    tex = strip_comments(tex)
    i = tex.find('\\label{%s}' % label)
    assert i >= 0, label
    env_b = max(tex.rfind('\\begin{table}', 0, i), tex.rfind('\\begin{table*}', 0, i))
    env_e = tex.find('\\end{table', i)
    env = tex[env_b:env_e]
    b = env.find('\\begin{tabular}')
    e = env.find('\\end{tabular}', b)
    body = env[b:e]
    return body[body.find('\n'):]


def clean(c):
    c = re.sub(r'~?\\cite\{[^}]*\}', '', c)
    c = re.sub(r'\\tablefootnote\{[^}]*\}|\\footnotemark', '', c)
    for _ in range(4):
        c = re.sub(r'\\(?:textbf|mathbf|emph|textit|uline)\{([^{}]*)\}', r'\1', c)
    c = c.replace('$', '').replace('\\%', '').replace('\\ast', '*').replace('\\pm', PM)
    c = re.sub(r'\\(?:hdashline|hline|toprule|midrule|bottomrule)', '', c)
    c = re.sub(r'\\cmidrule\([^)]*\)\{[^}]*\}', '', c)
    return re.sub(r'\s+', ' ', c).strip()


def rows(body):
    out = []
    for r in body.split('\\\\'):
        cells = [clean(x) for x in r.split('&')]
        if any(cells):
            out.append(cells)
    return out


def num(c):
    m = re.match(r'^(-?\d+(?:\.\d+)?)\s*' + PM + r'\s*(\d+(?:\.\d+)?)$', c)
    if m:
        return [float(m.group(1)), float(m.group(2))]
    m = re.match(r'^(-?\d+(?:\.\d+)?)$', c)
    if m:
        return float(m.group(1))
    raise ValueError('not numeric: %r' % c)


NAME = {
    'Baseline': 'Baseline', 'Baseline++': 'Baseline++', 'Meta-Baseline': 'Meta-Baseline', 'DiffKendal': 'DiffKendall',
    'MAML': 'MAML', 'LEO': 'LEO', 'R2D2': 'R2D2', 'ANIL': 'ANIL', 'BOIL': 'BOIL', 'METAL': 'MeTAL',
    'Proto': 'ProtoNet', 'ProtoNet': 'ProtoNet', 'RelationNet': 'RelationNet', 'DN4': 'DN4', 'ADM': 'ADM', 'ADM KL': 'ADM (KL)',
    'ATL-Net': 'ATL-Net', 'ATL-NET': 'ATL-Net',
    'MCL': 'MCL', 'FRN': 'FRN', 'DeepDBC': 'DeepBDC', 'HELA-VFA': 'HELA-VFA', 'Hela-VFA': 'HELA-VFA',
    'Proto + SimCLR + Conv64': 'ProtoNet + SimCLR', 'Proto + Contr': 'ProtoNet + contrastive',
    'Proto + Contr (*)': 'ProtoNet + contrastive + attention',
    'LaplacianShot': 'LaplacianShot', 'Laplacian': 'LaplacianShot', 'BDCSPN': 'BD-CSPN', 'BD-CSPN': 'BD-CSPN', 'PADDLE': 'PADDLE',
    'Proto-LP': 'Proto-LP', 'BPA': 'BPA', 'ECPE': 'ECPE',
}
FAMILY = {'Finetuning-based': 'finetune', 'Meta learning-based': 'meta', 'Metric-based': 'metric',
          'Contrastive': 'contrastive', 'Transductive': 'transductive'}
HEAD_FAMILY = {'ProtoNet': 'metric', 'DN4': 'metric', 'HELA-VFA': 'metric', 'Baseline': 'finetune', 'Baseline++': 'finetune',
               'LaplacianShot': 'transductive', 'BD-CSPN': 'transductive', 'PADDLE': 'transductive', 'Proto-LP': 'transductive',
               'BPA': 'transductive', 'ECPE': 'transductive'}


def method_name(c):
    c = re.sub(r'\(\d{4}\)', '', c).strip()
    star = c.endswith('*') and not c.endswith('(*)')
    if star:
        c = c[:-1].strip()
    assert c in NAME, 'unknown method %r' % c
    return NAME[c], star


def trip(cells):
    iid, ood, d = num(cells[0]), num(cells[1]), num(cells[2])
    return {'iid': iid[0], 'iidSd': iid[1], 'ood': ood[0], 'oodSd': ood[1], 'delta': d}


def cnn_table(tex, label):
    res, fam = [], None
    for cells in rows(table_by_label(tex, label)):
        if len(cells) != 8:
            continue
        m = re.match(r'\\multirow\{\d+\}\{\*\}\{(.+?)\}', cells[0])
        if m:
            fam = FAMILY[clean(m.group(1))]
        try:
            one, five = trip(cells[2:5]), trip(cells[5:8])
        except ValueError:
            continue
        name, star = method_name(cells[1])
        res.append({'method': name, 'family': fam, 'attn': star, 's1': one, 's5': five})
    return res


def head_table(tex, label, encoders, shots):
    """rows = heads; columns = len(encoders) * len(shots) triplets"""
    res = {e: [] for e in encoders}
    n = len(encoders) * len(shots)
    for cells in rows(table_by_label(tex, label)):
        if len(cells) != 1 + 3 * n:
            continue
        try:
            vals = [trip(cells[1 + 3 * k: 4 + 3 * k]) for k in range(n)]
        except ValueError:
            continue
        name, _ = method_name(cells[0])
        for ei, e in enumerate(encoders):
            row = {'method': name, 'family': HEAD_FAMILY[name], 'attn': False}
            for si, s in enumerate(shots):
                row[s] = vals[ei * len(shots) + si]
            res[e].append(row)
    return res


data = {'backbones': {}}
data['backbones']['conv64'] = cnn_table(EXP, 'tab:conv64')
data['backbones']['resnet12'] = cnn_table(EXP, 'tab:resnet12')
data['backbones']['resnet18'] = cnn_table(APP, 'tab:resnet18')

big = ['clap', 'audiomae', 'ast', 'qwen2']
five = head_table(CON, 'tab:results_large_models_5_shots_inverted', big, ['s5'])
one = head_table(APP, 'tab:large_1shot', big, ['s1'])
for e in big:
    merged = []
    for r5 in five[e]:
        r1 = next(r for r in one[e] if r['method'] == r5['method'])
        merged.append({**r5, 's1': r1['s1']})
    data['backbones'][e] = merged
extra = head_table(APP, 'tab:results_new_encoders_1_5_shot', ['passt', 'htsat', 'beats'], ['s1', 's5'])
data['backbones'].update(extra)
data['backbones']['wav2vec2'] = head_table(APP, 'tab:results_wav2vec2_1_5_shot', ['wav2vec2'], ['s1', 's5'])['wav2vec2']

# geometry tables (clean vs mixed feature magnitude / cosine to the clean prototype)
geo = {}
for cells in rows(table_by_label(APP, 'tab:magnitude')):
    if len(cells) == 4:
        try:
            c, m = num(cells[1]), num(cells[2])
        except ValueError:
            continue
        geo[method_name(cells[0])[0]] = {'magClean': c[0], 'magCleanCI': c[1], 'magMixed': m[0], 'magMixedCI': m[1]}
for cells in rows(table_by_label(APP, 'tab:cosine')):
    if len(cells) == 5:
        try:
            c, m, d = num(cells[1]), num(cells[2]), num(cells[3])
        except ValueError:
            continue
        geo[method_name(cells[0])[0]].update({'cosClean': c, 'cosMixed': m, 'cosDiff': d})
data['geometry'] = [{'method': k, **v} for k, v in geo.items()]


# foreground -> background wiring (standard + hard OOD)
def mapping(label):
    m = []
    for cells in rows(table_by_label(APP, label)):
        if len(cells) == 5 and 'Foreground' not in cells[0]:
            m.append({'fg': cells[0], 'bgs': cells[1:]})
    return m


std, hard = mapping('tab:full_fg_bg_mapping'), mapping('tab:fg-bg-mapping-config2')
TEST = ['crackling fire', 'crow', 'chainsaw', 'cough', 'sneezing', 'blender', 'phone', 'pig']
VAL = ['page turn', 'keys drop', 'door slam', 'throat clearing', 'drawer']
for a, b in zip(std, hard):
    assert a['fg'] == b['fg']
    a['split'] = 'test' if a['fg'] in TEST else 'val' if a['fg'] in VAL else 'train'
    a['hard'] = b['bgs']
assert sum(r['split'] == 'test' for r in std) == 8 and sum(r['split'] == 'val' for r in std) == 5
data['wiring'] = std

# alpha sweep: the values printed on the paper's figure (IID-OOD gap vs alpha)
data['alpha'] = {'x': [0.0, 0.2, 0.5, 0.8, 1.0], 's1': [0.3, 0.3, 1.4, 1.0, 2.8], 's5': [0.2, 1.3, 3.15, 5.0, 6.0]}

# ---- report
for k, v in data['backbones'].items():
    print(f'{k:9s} {len(v):2d} rows:', ', '.join(r['method'] for r in v))
print('geometry', len(data['geometry']))
print('wiring', len(data['wiring']), 'fgs;', len({b for r in data['wiring'] for b in r['bgs']}), 'unique bgs (std);',
      len({b for r in data['wiring'] for b in r['hard']}), 'unique bgs (hard)')
print('changed in hard:', [r['fg'] for r in data['wiring'] if r['bgs'] != r['hard']])
print('--- printed delta vs (IID-OOD) mismatches > 0.02:')
for k, v in data['backbones'].items():
    for r in v:
        for s in ('s1', 's5'):
            d = r[s]['iid'] - r[s]['ood']
            if abs(d - r[s]['delta']) > 0.021:
                print(f"   {k:9s} {r['method']:14s} {s}: IID {r[s]['iid']} OOD {r[s]['ood']} -> {d:.2f} but printed {r[s]['delta']}")
if out_path:
    js = ('/* Auto-generated from the LaTeX source of arXiv:2605.13672 (tools/parse_tables.py).\n'
          '   Accuracy values are percentages; "delta" is the gap exactly as printed in the paper. */\n'
          'window.SPUR_DATA = ' + json.dumps(data, indent=1, ensure_ascii=False) + ';\n')
    open(out_path, 'w', encoding='utf-8').write(js)
    print('wrote', out_path, len(js), 'bytes')
