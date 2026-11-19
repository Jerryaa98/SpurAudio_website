/* Auto-generated from the LaTeX source of arXiv:2605.13672 (tools/parse_tables.py).
   Accuracy values are percentages; "delta" is the gap exactly as printed in the paper. */
window.SPUR_DATA = {
 "backbones": {
  "conv64": [
   {
    "method": "Baseline",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 60.1,
     "iidSd": 2.01,
     "ood": 53.43,
     "oodSd": 2.11,
     "delta": 6.67
    },
    "s5": {
     "iid": 75.79,
     "iidSd": 1.01,
     "ood": 63.14,
     "oodSd": 1.43,
     "delta": 12.65
    }
   },
   {
    "method": "Baseline++",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 55.3,
     "iidSd": 1.47,
     "ood": 52.33,
     "oodSd": 2.61,
     "delta": 2.97
    },
    "s5": {
     "iid": 65.2,
     "iidSd": 2.46,
     "ood": 59.23,
     "oodSd": 2.43,
     "delta": 5.97
    }
   },
   {
    "method": "Meta-Baseline",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 61.05,
     "iidSd": 1.22,
     "ood": 58.38,
     "oodSd": 0.37,
     "delta": 2.67
    },
    "s5": {
     "iid": 74.01,
     "iidSd": 0.51,
     "ood": 67.49,
     "oodSd": 2.21,
     "delta": 6.52
    }
   },
   {
    "method": "DiffKendall",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 58.55,
     "iidSd": 2.44,
     "ood": 54.63,
     "oodSd": 0.8,
     "delta": 3.93
    },
    "s5": {
     "iid": 74.17,
     "iidSd": 1.43,
     "ood": 64.42,
     "oodSd": 1.1,
     "delta": 9.75
    }
   },
   {
    "method": "MAML",
    "family": "meta",
    "attn": false,
    "s1": {
     "iid": 52.14,
     "iidSd": 2.42,
     "ood": 53.73,
     "oodSd": 1.46,
     "delta": -1.59
    },
    "s5": {
     "iid": 69.11,
     "iidSd": 0.87,
     "ood": 64.87,
     "oodSd": 1.28,
     "delta": 4.24
    }
   },
   {
    "method": "LEO",
    "family": "meta",
    "attn": false,
    "s1": {
     "iid": 43.18,
     "iidSd": 1.99,
     "ood": 41.75,
     "oodSd": 1.89,
     "delta": 1.43
    },
    "s5": {
     "iid": 57.28,
     "iidSd": 1.54,
     "ood": 52.93,
     "oodSd": 1.14,
     "delta": 4.35
    }
   },
   {
    "method": "R2D2",
    "family": "meta",
    "attn": false,
    "s1": {
     "iid": 53.09,
     "iidSd": 6.09,
     "ood": 51.87,
     "oodSd": 2.28,
     "delta": 1.21
    },
    "s5": {
     "iid": 72.64,
     "iidSd": 3.01,
     "ood": 67.19,
     "oodSd": 3.24,
     "delta": 5.45
    }
   },
   {
    "method": "ANIL",
    "family": "meta",
    "attn": false,
    "s1": {
     "iid": 51.09,
     "iidSd": 3.9,
     "ood": 49.23,
     "oodSd": 3.55,
     "delta": 1.86
    },
    "s5": {
     "iid": 65.15,
     "iidSd": 0.33,
     "ood": 59.75,
     "oodSd": 1.26,
     "delta": 5.4
    }
   },
   {
    "method": "BOIL",
    "family": "meta",
    "attn": false,
    "s1": {
     "iid": 53.79,
     "iidSd": 1.08,
     "ood": 51.99,
     "oodSd": 1.05,
     "delta": 1.8
    },
    "s5": {
     "iid": 65.59,
     "iidSd": 0.95,
     "ood": 60.36,
     "oodSd": 0.97,
     "delta": 5.23
    }
   },
   {
    "method": "MeTAL",
    "family": "meta",
    "attn": false,
    "s1": {
     "iid": 57.27,
     "iidSd": 1.94,
     "ood": 52.71,
     "oodSd": 1.56,
     "delta": 4.56
    },
    "s5": {
     "iid": 71.29,
     "iidSd": 0.84,
     "ood": 67.08,
     "oodSd": 2.7,
     "delta": 4.21
    }
   },
   {
    "method": "ProtoNet",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 52.13,
     "iidSd": 2.13,
     "ood": 49.83,
     "oodSd": 0.91,
     "delta": 2.3
    },
    "s5": {
     "iid": 71.94,
     "iidSd": 3.17,
     "ood": 61.17,
     "oodSd": 1.82,
     "delta": 10.77
    }
   },
   {
    "method": "RelationNet",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 59.22,
     "iidSd": 1.35,
     "ood": 56.17,
     "oodSd": 1.74,
     "delta": 3.05
    },
    "s5": {
     "iid": 74.76,
     "iidSd": 1.41,
     "ood": 70.15,
     "oodSd": 4.22,
     "delta": 4.61
    }
   },
   {
    "method": "DN4",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 63.08,
     "iidSd": 1.1,
     "ood": 55.48,
     "oodSd": 3.84,
     "delta": 7.6
    },
    "s5": {
     "iid": 80.58,
     "iidSd": 2.02,
     "ood": 72.64,
     "oodSd": 2.9,
     "delta": 7.94
    }
   },
   {
    "method": "ADM",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 63.23,
     "iidSd": 3.06,
     "ood": 56.31,
     "oodSd": 2.56,
     "delta": 6.92
    },
    "s5": {
     "iid": 81.8,
     "iidSd": 0.9,
     "ood": 69.36,
     "oodSd": 2.91,
     "delta": 12.65
    }
   },
   {
    "method": "ADM (KL)",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 60.09,
     "iidSd": 0.6,
     "ood": 56.65,
     "oodSd": 2.6,
     "delta": 3.44
    },
    "s5": {
     "iid": 80.99,
     "iidSd": 2.5,
     "ood": 71.99,
     "oodSd": 2.71,
     "delta": 9.0
    }
   },
   {
    "method": "ATL-Net",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 60.19,
     "iidSd": 1.52,
     "ood": 54.54,
     "oodSd": 2.39,
     "delta": 5.65
    },
    "s5": {
     "iid": 80.53,
     "iidSd": 1.05,
     "ood": 68.91,
     "oodSd": 0.56,
     "delta": 11.62
    }
   },
   {
    "method": "MCL",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 64.6,
     "iidSd": 1.87,
     "ood": 60.15,
     "oodSd": 1.36,
     "delta": 4.45
    },
    "s5": {
     "iid": 76.72,
     "iidSd": 2.64,
     "ood": 69.84,
     "oodSd": 1.52,
     "delta": 6.88
    }
   },
   {
    "method": "ProtoNet + SimCLR",
    "family": "contrastive",
    "attn": false,
    "s1": {
     "iid": 45.55,
     "iidSd": 1.43,
     "ood": 42.62,
     "oodSd": 1.67,
     "delta": 2.93
    },
    "s5": {
     "iid": 59.62,
     "iidSd": 1.31,
     "ood": 53.68,
     "oodSd": 1.85,
     "delta": 5.94
    }
   },
   {
    "method": "ProtoNet + contrastive",
    "family": "contrastive",
    "attn": false,
    "s1": {
     "iid": 58.55,
     "iidSd": 0.82,
     "ood": 55.14,
     "oodSd": 0.91,
     "delta": 3.41
    },
    "s5": {
     "iid": 76.26,
     "iidSd": 0.74,
     "ood": 67.59,
     "oodSd": 0.88,
     "delta": 8.67
    }
   },
   {
    "method": "ProtoNet + contrastive + attention",
    "family": "contrastive",
    "attn": false,
    "s1": {
     "iid": 55.98,
     "iidSd": 1.05,
     "ood": 54.23,
     "oodSd": 1.12,
     "delta": 1.75
    },
    "s5": {
     "iid": 74.03,
     "iidSd": 0.96,
     "ood": 65.21,
     "oodSd": 1.18,
     "delta": 8.82
    }
   },
   {
    "method": "LaplacianShot",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 41.33,
     "iidSd": 0.63,
     "ood": 41.71,
     "oodSd": 0.69,
     "delta": -0.38
    },
    "s5": {
     "iid": 57.97,
     "iidSd": 0.56,
     "ood": 54.38,
     "oodSd": 0.55,
     "delta": 3.59
    }
   },
   {
    "method": "BD-CSPN",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 39.18,
     "iidSd": 0.54,
     "ood": 38.91,
     "oodSd": 0.6,
     "delta": 0.27
    },
    "s5": {
     "iid": 48.41,
     "iidSd": 0.48,
     "ood": 47.43,
     "oodSd": 0.47,
     "delta": 0.98
    }
   },
   {
    "method": "PADDLE",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 43.26,
     "iidSd": 0.62,
     "ood": 43.35,
     "oodSd": 0.64,
     "delta": -0.09
    },
    "s5": {
     "iid": 56.61,
     "iidSd": 0.53,
     "ood": 54.39,
     "oodSd": 0.53,
     "delta": 2.22
    }
   },
   {
    "method": "Proto-LP",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 43.61,
     "iidSd": 0.86,
     "ood": 42.3,
     "oodSd": 0.8,
     "delta": 1.31
    },
    "s5": {
     "iid": 56.57,
     "iidSd": 0.67,
     "ood": 54.56,
     "oodSd": 0.65,
     "delta": 2.01
    }
   },
   {
    "method": "BPA",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 53.54,
     "iidSd": 0.87,
     "ood": 50.88,
     "oodSd": 1.34,
     "delta": 2.66
    },
    "s5": {
     "iid": 72.3,
     "iidSd": 0.66,
     "ood": 62.6,
     "oodSd": 0.65,
     "delta": 9.7
    }
   },
   {
    "method": "ECPE",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 45.27,
     "iidSd": 0.8,
     "ood": 44.59,
     "oodSd": 0.72,
     "delta": 0.68
    },
    "s5": {
     "iid": 58.15,
     "iidSd": 0.56,
     "ood": 56.67,
     "oodSd": 0.55,
     "delta": 1.48
    }
   }
  ],
  "resnet12": [
   {
    "method": "Baseline",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 59.45,
     "iidSd": 0.47,
     "ood": 56.58,
     "oodSd": 1.47,
     "delta": 2.87
    },
    "s5": {
     "iid": 79.42,
     "iidSd": 0.76,
     "ood": 68.58,
     "oodSd": 1.16,
     "delta": 10.84
    }
   },
   {
    "method": "Baseline++",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 57.31,
     "iidSd": 2.68,
     "ood": 55.57,
     "oodSd": 1.38,
     "delta": 1.74
    },
    "s5": {
     "iid": 76.18,
     "iidSd": 1.12,
     "ood": 64.97,
     "oodSd": 2.63,
     "delta": 11.21
    }
   },
   {
    "method": "Meta-Baseline",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 59.98,
     "iidSd": 4.7,
     "ood": 57.07,
     "oodSd": 2.69,
     "delta": 2.91
    },
    "s5": {
     "iid": 72.87,
     "iidSd": 1.38,
     "ood": 67.34,
     "oodSd": 0.9,
     "delta": 5.53
    }
   },
   {
    "method": "LEO",
    "family": "meta",
    "attn": false,
    "s1": {
     "iid": 42.97,
     "iidSd": 1.36,
     "ood": 41.66,
     "oodSd": 1.8,
     "delta": 1.31
    },
    "s5": {
     "iid": 53.61,
     "iidSd": 1.36,
     "ood": 49.96,
     "oodSd": 1.12,
     "delta": 3.65
    }
   },
   {
    "method": "R2D2",
    "family": "meta",
    "attn": false,
    "s1": {
     "iid": 59.36,
     "iidSd": 2.52,
     "ood": 55.63,
     "oodSd": 1.57,
     "delta": 3.74
    },
    "s5": {
     "iid": 79.59,
     "iidSd": 1.03,
     "ood": 66.21,
     "oodSd": 3.2,
     "delta": 13.38
    }
   },
   {
    "method": "ANIL",
    "family": "meta",
    "attn": false,
    "s1": {
     "iid": 56.84,
     "iidSd": 2.33,
     "ood": 52.44,
     "oodSd": 0.48,
     "delta": 4.4
    },
    "s5": {
     "iid": 76.29,
     "iidSd": 1.18,
     "ood": 66.9,
     "oodSd": 1.1,
     "delta": 9.4
    }
   },
   {
    "method": "ProtoNet",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 59.49,
     "iidSd": 2.14,
     "ood": 55.52,
     "oodSd": 3.88,
     "delta": 3.97
    },
    "s5": {
     "iid": 79.34,
     "iidSd": 1.15,
     "ood": 68.89,
     "oodSd": 0.79,
     "delta": 10.45
    }
   },
   {
    "method": "DN4",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 66.55,
     "iidSd": 0.95,
     "ood": 64.43,
     "oodSd": 2.93,
     "delta": 2.12
    },
    "s5": {
     "iid": 84.14,
     "iidSd": 1.05,
     "ood": 78.42,
     "oodSd": 2.9,
     "delta": 5.72
    }
   },
   {
    "method": "ADM",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 62.1,
     "iidSd": 6.8,
     "ood": 54.25,
     "oodSd": 8.45,
     "delta": 7.85
    },
    "s5": {
     "iid": 83.07,
     "iidSd": 0.72,
     "ood": 75.46,
     "oodSd": 1.81,
     "delta": 7.61
    }
   },
   {
    "method": "ATL-Net",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 66.93,
     "iidSd": 1.69,
     "ood": 64.25,
     "oodSd": 0.88,
     "delta": 2.68
    },
    "s5": {
     "iid": 82.54,
     "iidSd": 1.05,
     "ood": 72.5,
     "oodSd": 1.16,
     "delta": 10.03
    }
   },
   {
    "method": "FRN",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 64.67,
     "iidSd": 1.76,
     "ood": 61.82,
     "oodSd": 1.83,
     "delta": 2.86
    },
    "s5": {
     "iid": 71.68,
     "iidSd": 2.47,
     "ood": 63.37,
     "oodSd": 9.14,
     "delta": 8.3
    }
   },
   {
    "method": "DeepBDC",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 64.71,
     "iidSd": 1.47,
     "ood": 61.33,
     "oodSd": 1.78,
     "delta": 3.38
    },
    "s5": {
     "iid": 80.68,
     "iidSd": 2.22,
     "ood": 73.35,
     "oodSd": 1.08,
     "delta": 7.33
    }
   },
   {
    "method": "HELA-VFA",
    "family": "metric",
    "attn": true,
    "s1": {
     "iid": 48.35,
     "iidSd": 0.68,
     "ood": 46.49,
     "oodSd": 0.62,
     "delta": 1.86
    },
    "s5": {
     "iid": 64.26,
     "iidSd": 0.59,
     "ood": 55.57,
     "oodSd": 0.58,
     "delta": 8.7
    }
   },
   {
    "method": "LaplacianShot",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 46.74,
     "iidSd": 0.67,
     "ood": 46.13,
     "oodSd": 0.62,
     "delta": 0.61
    },
    "s5": {
     "iid": 59.23,
     "iidSd": 0.59,
     "ood": 55.06,
     "oodSd": 0.56,
     "delta": 4.17
    }
   },
   {
    "method": "BD-CSPN",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 46.92,
     "iidSd": 0.69,
     "ood": 45.39,
     "oodSd": 0.65,
     "delta": 1.53
    },
    "s5": {
     "iid": 56.53,
     "iidSd": 0.58,
     "ood": 53.29,
     "oodSd": 0.53,
     "delta": 3.24
    }
   },
   {
    "method": "PADDLE",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 49.33,
     "iidSd": 0.67,
     "ood": 48.05,
     "oodSd": 0.59,
     "delta": 1.28
    },
    "s5": {
     "iid": 59.66,
     "iidSd": 0.57,
     "ood": 56.49,
     "oodSd": 0.54,
     "delta": 3.17
    }
   },
   {
    "method": "Proto-LP",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 49.5,
     "iidSd": 0.83,
     "ood": 49.3,
     "oodSd": 0.65,
     "delta": 2.0
    },
    "s5": {
     "iid": 60.84,
     "iidSd": 0.69,
     "ood": 57.69,
     "oodSd": 0.66,
     "delta": 3.15
    }
   },
   {
    "method": "BPA",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 59.88,
     "iidSd": 0.72,
     "ood": 52.82,
     "oodSd": 0.65,
     "delta": 7.06
    },
    "s5": {
     "iid": 78.7,
     "iidSd": 0.62,
     "ood": 73.3,
     "oodSd": 0.6,
     "delta": 5.4
    }
   },
   {
    "method": "ECPE",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 51.39,
     "iidSd": 0.76,
     "ood": 50.91,
     "oodSd": 0.71,
     "delta": 0.48
    },
    "s5": {
     "iid": 62.56,
     "iidSd": 0.58,
     "ood": 58.83,
     "oodSd": 0.6,
     "delta": 3.73
    }
   }
  ],
  "resnet18": [
   {
    "method": "Baseline",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 58.62,
     "iidSd": 1.98,
     "ood": 54.41,
     "oodSd": 1.4,
     "delta": 4.21
    },
    "s5": {
     "iid": 76.51,
     "iidSd": 1.31,
     "ood": 66.53,
     "oodSd": 1.97,
     "delta": 9.98
    }
   },
   {
    "method": "Baseline++",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 56.65,
     "iidSd": 3.26,
     "ood": 53.48,
     "oodSd": 3.13,
     "delta": 3.17
    },
    "s5": {
     "iid": 73.29,
     "iidSd": 0.91,
     "ood": 63.92,
     "oodSd": 2.6,
     "delta": 9.36
    }
   },
   {
    "method": "Meta-Baseline",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 55.74,
     "iidSd": 0.68,
     "ood": 52.93,
     "oodSd": 4.57,
     "delta": 2.81
    },
    "s5": {
     "iid": 62.66,
     "iidSd": 2.34,
     "ood": 55.99,
     "oodSd": 8.51,
     "delta": 6.67
    }
   },
   {
    "method": "LEO",
    "family": "meta",
    "attn": false,
    "s1": {
     "iid": 44.25,
     "iidSd": 0.26,
     "ood": 40.62,
     "oodSd": 1.37,
     "delta": 3.63
    },
    "s5": {
     "iid": 57.89,
     "iidSd": 3.7,
     "ood": 50.08,
     "oodSd": 7.06,
     "delta": 7.81
    }
   },
   {
    "method": "R2D2",
    "family": "meta",
    "attn": false,
    "s1": {
     "iid": 61.11,
     "iidSd": 1.02,
     "ood": 53.77,
     "oodSd": 6.42,
     "delta": 7.33
    },
    "s5": {
     "iid": 77.27,
     "iidSd": 1.33,
     "ood": 66.24,
     "oodSd": 8.98,
     "delta": 11.02
    }
   },
   {
    "method": "ANIL",
    "family": "meta",
    "attn": false,
    "s1": {
     "iid": 56.23,
     "iidSd": 0.83,
     "ood": 50.2,
     "oodSd": 2.71,
     "delta": 6.03
    },
    "s5": {
     "iid": 71.36,
     "iidSd": 2.53,
     "ood": 64.2,
     "oodSd": 0.88,
     "delta": 7.16
    }
   },
   {
    "method": "ProtoNet",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 57.6,
     "iidSd": 1.7,
     "ood": 53.57,
     "oodSd": 5.22,
     "delta": 4.04
    },
    "s5": {
     "iid": 77.1,
     "iidSd": 3.04,
     "ood": 64.89,
     "oodSd": 3.32,
     "delta": 12.21
    }
   },
   {
    "method": "DN4",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 64.05,
     "iidSd": 1.18,
     "ood": 61.39,
     "oodSd": 4.87,
     "delta": 2.66
    },
    "s5": {
     "iid": 84.12,
     "iidSd": 1.53,
     "ood": 80.66,
     "oodSd": 0.36,
     "delta": 3.46
    }
   },
   {
    "method": "ADM",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 61.88,
     "iidSd": 3.86,
     "ood": 59.05,
     "oodSd": 1.37,
     "delta": 2.82
    },
    "s5": {
     "iid": 82.04,
     "iidSd": 0.81,
     "ood": 77.5,
     "oodSd": 2.71,
     "delta": 4.54
    }
   },
   {
    "method": "ATL-Net",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 65.57,
     "iidSd": 2.67,
     "ood": 62.11,
     "oodSd": 3.45,
     "delta": 3.46
    },
    "s5": {
     "iid": 81.25,
     "iidSd": 1.13,
     "ood": 74.07,
     "oodSd": 2.26,
     "delta": 7.17
    }
   },
   {
    "method": "LaplacianShot",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 49.61,
     "iidSd": 0.67,
     "ood": 46.6,
     "oodSd": 0.59,
     "delta": 3.01
    },
    "s5": {
     "iid": 62.39,
     "iidSd": 0.55,
     "ood": 56.5,
     "oodSd": 0.47,
     "delta": 5.89
    }
   },
   {
    "method": "BD-CSPN",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 47.6,
     "iidSd": 0.65,
     "ood": 45.47,
     "oodSd": 0.56,
     "delta": 2.13
    },
    "s5": {
     "iid": 57.09,
     "iidSd": 0.52,
     "ood": 53.17,
     "oodSd": 0.45,
     "delta": 3.92
    }
   },
   {
    "method": "PADDLE",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 50.75,
     "iidSd": 0.64,
     "ood": 48.85,
     "oodSd": 0.51,
     "delta": 1.9
    },
    "s5": {
     "iid": 61.49,
     "iidSd": 0.51,
     "ood": 57.16,
     "oodSd": 0.48,
     "delta": 4.33
    }
   },
   {
    "method": "Proto-LP",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 51.07,
     "iidSd": 0.9,
     "ood": 50.27,
     "oodSd": 0.81,
     "delta": 0.8
    },
    "s5": {
     "iid": 64.89,
     "iidSd": 0.61,
     "ood": 59.89,
     "oodSd": 0.59,
     "delta": 5.0
    }
   },
   {
    "method": "ECPE",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 53.33,
     "iidSd": 0.75,
     "ood": 52.04,
     "oodSd": 0.68,
     "delta": 1.29
    },
    "s5": {
     "iid": 65.18,
     "iidSd": 0.51,
     "ood": 60.92,
     "oodSd": 0.5,
     "delta": 4.26
    }
   }
  ],
  "clap": [
   {
    "method": "ProtoNet",
    "family": "metric",
    "attn": false,
    "s5": {
     "iid": 95.3,
     "iidSd": 0.26,
     "ood": 86.98,
     "oodSd": 0.54,
     "delta": 8.32
    },
    "s1": {
     "iid": 88.99,
     "iidSd": 0.48,
     "ood": 85.16,
     "oodSd": 0.62,
     "delta": 3.83
    }
   },
   {
    "method": "Baseline",
    "family": "finetune",
    "attn": false,
    "s5": {
     "iid": 95.5,
     "iidSd": 0.26,
     "ood": 87.03,
     "oodSd": 0.55,
     "delta": 8.47
    },
    "s1": {
     "iid": 88.93,
     "iidSd": 0.49,
     "ood": 85.42,
     "oodSd": 0.6,
     "delta": 3.51
    }
   },
   {
    "method": "Baseline++",
    "family": "finetune",
    "attn": false,
    "s5": {
     "iid": 95.32,
     "iidSd": 0.26,
     "ood": 86.61,
     "oodSd": 0.56,
     "delta": 8.71
    },
    "s1": {
     "iid": 89.15,
     "iidSd": 0.48,
     "ood": 85.06,
     "oodSd": 0.6,
     "delta": 4.09
    }
   },
   {
    "method": "DN4",
    "family": "metric",
    "attn": false,
    "s5": {
     "iid": 94.96,
     "iidSd": 0.28,
     "ood": 85.91,
     "oodSd": 0.57,
     "delta": 9.05
    },
    "s1": {
     "iid": 89.69,
     "iidSd": 0.47,
     "ood": 85.64,
     "oodSd": 0.59,
     "delta": 4.05
    }
   },
   {
    "method": "LaplacianShot",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 95.47,
     "iidSd": 0.28,
     "ood": 90.45,
     "oodSd": 0.58,
     "delta": 5.02
    },
    "s1": {
     "iid": 90.43,
     "iidSd": 0.49,
     "ood": 87.45,
     "oodSd": 0.68,
     "delta": 2.98
    }
   },
   {
    "method": "BD-CSPN",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 95.76,
     "iidSd": 0.29,
     "ood": 93.14,
     "oodSd": 0.5,
     "delta": 2.62
    },
    "s1": {
     "iid": 93.38,
     "iidSd": 0.43,
     "ood": 91.7,
     "oodSd": 0.61,
     "delta": 1.68
    }
   },
   {
    "method": "PADDLE",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 96.18,
     "iidSd": 0.26,
     "ood": 90.95,
     "oodSd": 0.53,
     "delta": 5.23
    },
    "s1": {
     "iid": 91.35,
     "iidSd": 0.46,
     "ood": 88.65,
     "oodSd": 0.56,
     "delta": 2.7
    }
   },
   {
    "method": "Proto-LP",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 97.43,
     "iidSd": 0.25,
     "ood": 95.68,
     "oodSd": 0.44,
     "delta": 1.75
    },
    "s1": {
     "iid": 95.41,
     "iidSd": 0.5,
     "ood": 94.28,
     "oodSd": 0.62,
     "delta": 1.13
    }
   },
   {
    "method": "BPA",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 96.38,
     "iidSd": 0.23,
     "ood": 86.89,
     "oodSd": 0.57,
     "delta": 9.49
    },
    "s1": {
     "iid": 90.05,
     "iidSd": 0.46,
     "ood": 84.55,
     "oodSd": 0.62,
     "delta": 5.5
    }
   },
   {
    "method": "HELA-VFA",
    "family": "metric",
    "attn": false,
    "s5": {
     "iid": 94.83,
     "iidSd": 0.24,
     "ood": 81.18,
     "oodSd": 0.5,
     "delta": 13.65
    },
    "s1": {
     "iid": 87.85,
     "iidSd": 0.52,
     "ood": 79.85,
     "oodSd": 0.65,
     "delta": 8.0
    }
   },
   {
    "method": "ECPE",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 96.65,
     "iidSd": 0.24,
     "ood": 92.96,
     "oodSd": 0.5,
     "delta": 3.69
    },
    "s1": {
     "iid": 93.45,
     "iidSd": 0.44,
     "ood": 91.4,
     "oodSd": 0.56,
     "delta": 2.05
    }
   }
  ],
  "audiomae": [
   {
    "method": "ProtoNet",
    "family": "metric",
    "attn": false,
    "s5": {
     "iid": 93.05,
     "iidSd": 0.32,
     "ood": 80.02,
     "oodSd": 0.55,
     "delta": 13.03
    },
    "s1": {
     "iid": 79.25,
     "iidSd": 0.49,
     "ood": 68.4,
     "oodSd": 0.61,
     "delta": 10.85
    }
   },
   {
    "method": "Baseline",
    "family": "finetune",
    "attn": false,
    "s5": {
     "iid": 93.15,
     "iidSd": 0.32,
     "ood": 81.0,
     "oodSd": 0.57,
     "delta": 12.15
    },
    "s1": {
     "iid": 79.43,
     "iidSd": 0.51,
     "ood": 70.89,
     "oodSd": 0.62,
     "delta": 8.54
    }
   },
   {
    "method": "Baseline++",
    "family": "finetune",
    "attn": false,
    "s5": {
     "iid": 94.36,
     "iidSd": 0.29,
     "ood": 82.12,
     "oodSd": 0.53,
     "delta": 12.24
    },
    "s1": {
     "iid": 79.25,
     "iidSd": 0.5,
     "ood": 69.21,
     "oodSd": 0.61,
     "delta": 10.04
    }
   },
   {
    "method": "DN4",
    "family": "metric",
    "attn": false,
    "s5": {
     "iid": 91.33,
     "iidSd": 0.36,
     "ood": 78.68,
     "oodSd": 0.56,
     "delta": 12.65
    },
    "s1": {
     "iid": 79.41,
     "iidSd": 0.52,
     "ood": 66.46,
     "oodSd": 0.63,
     "delta": 12.95
    }
   },
   {
    "method": "LaplacianShot",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 95.27,
     "iidSd": 0.29,
     "ood": 86.6,
     "oodSd": 0.54,
     "delta": 8.67
    },
    "s1": {
     "iid": 86.91,
     "iidSd": 0.53,
     "ood": 80.6,
     "oodSd": 0.68,
     "delta": 6.31
    }
   },
   {
    "method": "BD-CSPN",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 96.3,
     "iidSd": 0.27,
     "ood": 92.29,
     "oodSd": 0.54,
     "delta": 4.01
    },
    "s1": {
     "iid": 92.55,
     "iidSd": 0.44,
     "ood": 90.65,
     "oodSd": 0.56,
     "delta": 1.9
    }
   },
   {
    "method": "PADDLE",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 96.43,
     "iidSd": 0.24,
     "ood": 90.17,
     "oodSd": 0.52,
     "delta": 6.26
    },
    "s1": {
     "iid": 89.65,
     "iidSd": 0.46,
     "ood": 86.97,
     "oodSd": 0.54,
     "delta": 2.68
    }
   },
   {
    "method": "Proto-LP",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 97.54,
     "iidSd": 0.25,
     "ood": 95.14,
     "oodSd": 0.44,
     "delta": 2.4
    },
    "s1": {
     "iid": 95.79,
     "iidSd": 0.45,
     "ood": 93.7,
     "oodSd": 0.6,
     "delta": 2.09
    }
   },
   {
    "method": "BPA",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 96.14,
     "iidSd": 0.26,
     "ood": 86.05,
     "oodSd": 0.55,
     "delta": 10.09
    },
    "s1": {
     "iid": 86.4,
     "iidSd": 0.48,
     "ood": 80.7,
     "oodSd": 0.6,
     "delta": 5.7
    }
   },
   {
    "method": "HELA-VFA",
    "family": "metric",
    "attn": false,
    "s5": {
     "iid": 93.61,
     "iidSd": 0.29,
     "ood": 75.03,
     "oodSd": 0.54,
     "delta": 18.58
    },
    "s1": {
     "iid": 84.2,
     "iidSd": 0.53,
     "ood": 74.85,
     "oodSd": 0.63,
     "delta": 9.35
    }
   },
   {
    "method": "ECPE",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 96.65,
     "iidSd": 0.24,
     "ood": 92.58,
     "oodSd": 0.48,
     "delta": 4.07
    },
    "s1": {
     "iid": 92.11,
     "iidSd": 0.43,
     "ood": 89.53,
     "oodSd": 0.56,
     "delta": 2.58
    }
   }
  ],
  "ast": [
   {
    "method": "ProtoNet",
    "family": "metric",
    "attn": false,
    "s5": {
     "iid": 95.88,
     "iidSd": 0.25,
     "ood": 87.42,
     "oodSd": 0.56,
     "delta": 8.46
    },
    "s1": {
     "iid": 88.08,
     "iidSd": 0.46,
     "ood": 83.73,
     "oodSd": 0.59,
     "delta": 4.35
    }
   },
   {
    "method": "Baseline",
    "family": "finetune",
    "attn": false,
    "s5": {
     "iid": 95.84,
     "iidSd": 0.25,
     "ood": 88.2,
     "oodSd": 0.55,
     "delta": 7.64
    },
    "s1": {
     "iid": 87.85,
     "iidSd": 0.48,
     "ood": 84.56,
     "oodSd": 0.58,
     "delta": 3.29
    }
   },
   {
    "method": "Baseline++",
    "family": "finetune",
    "attn": false,
    "s5": {
     "iid": 96.43,
     "iidSd": 0.22,
     "ood": 87.29,
     "oodSd": 0.56,
     "delta": 9.14
    },
    "s1": {
     "iid": 87.95,
     "iidSd": 0.49,
     "ood": 84.35,
     "oodSd": 0.59,
     "delta": 3.6
    }
   },
   {
    "method": "DN4",
    "family": "metric",
    "attn": false,
    "s5": {
     "iid": 95.23,
     "iidSd": 0.26,
     "ood": 87.09,
     "oodSd": 0.57,
     "delta": 8.14
    },
    "s1": {
     "iid": 88.01,
     "iidSd": 0.47,
     "ood": 84.51,
     "oodSd": 0.58,
     "delta": 3.5
    }
   },
   {
    "method": "LaplacianShot",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 95.39,
     "iidSd": 0.28,
     "ood": 86.81,
     "oodSd": 0.63,
     "delta": 8.58
    },
    "s1": {
     "iid": 89.3,
     "iidSd": 0.49,
     "ood": 85.22,
     "oodSd": 0.66,
     "delta": 4.08
    }
   },
   {
    "method": "BD-CSPN",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 96.55,
     "iidSd": 0.25,
     "ood": 92.0,
     "oodSd": 0.52,
     "delta": 4.55
    },
    "s1": {
     "iid": 93.24,
     "iidSd": 0.43,
     "ood": 90.99,
     "oodSd": 0.6,
     "delta": 2.25
    }
   },
   {
    "method": "PADDLE",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 96.51,
     "iidSd": 0.22,
     "ood": 89.0,
     "oodSd": 0.54,
     "delta": 7.51
    },
    "s1": {
     "iid": 90.47,
     "iidSd": 0.46,
     "ood": 87.85,
     "oodSd": 0.55,
     "delta": 2.62
    }
   },
   {
    "method": "Proto-LP",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 97.64,
     "iidSd": 0.24,
     "ood": 95.08,
     "oodSd": 0.52,
     "delta": 2.56
    },
    "s1": {
     "iid": 95.93,
     "iidSd": 0.45,
     "ood": 93.53,
     "oodSd": 0.69,
     "delta": 2.4
    }
   },
   {
    "method": "BPA",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 96.22,
     "iidSd": 0.22,
     "ood": 84.45,
     "oodSd": 0.54,
     "delta": 11.77
    },
    "s1": {
     "iid": 88.85,
     "iidSd": 0.45,
     "ood": 83.1,
     "oodSd": 0.59,
     "delta": 5.75
    }
   },
   {
    "method": "HELA-VFA",
    "family": "metric",
    "attn": false,
    "s5": {
     "iid": 93.69,
     "iidSd": 0.27,
     "ood": 76.5,
     "oodSd": 0.55,
     "delta": 17.19
    },
    "s1": {
     "iid": 85.29,
     "iidSd": 0.53,
     "ood": 80.62,
     "oodSd": 0.59,
     "delta": 4.67
    }
   },
   {
    "method": "ECPE",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 96.3,
     "iidSd": 0.24,
     "ood": 90.63,
     "oodSd": 0.56,
     "delta": 5.67
    },
    "s1": {
     "iid": 92.07,
     "iidSd": 0.45,
     "ood": 89.05,
     "oodSd": 0.61,
     "delta": 3.02
    }
   }
  ],
  "qwen2": [
   {
    "method": "ProtoNet",
    "family": "metric",
    "attn": false,
    "s5": {
     "iid": 94.72,
     "iidSd": 0.25,
     "ood": 84.99,
     "oodSd": 0.6,
     "delta": 9.73
    },
    "s1": {
     "iid": 81.68,
     "iidSd": 0.57,
     "ood": 75.34,
     "oodSd": 0.65,
     "delta": 6.34
    }
   },
   {
    "method": "Baseline",
    "family": "finetune",
    "attn": false,
    "s5": {
     "iid": 93.83,
     "iidSd": 0.31,
     "ood": 84.48,
     "oodSd": 0.61,
     "delta": 9.35
    },
    "s1": {
     "iid": 83.06,
     "iidSd": 0.59,
     "ood": 76.94,
     "oodSd": 0.66,
     "delta": 6.12
    }
   },
   {
    "method": "Baseline++",
    "family": "finetune",
    "attn": false,
    "s5": {
     "iid": 94.91,
     "iidSd": 0.27,
     "ood": 84.52,
     "oodSd": 0.6,
     "delta": 10.39
    },
    "s1": {
     "iid": 82.77,
     "iidSd": 0.58,
     "ood": 77.16,
     "oodSd": 0.65,
     "delta": 5.61
    }
   },
   {
    "method": "DN4",
    "family": "metric",
    "attn": false,
    "s5": {
     "iid": 92.67,
     "iidSd": 0.33,
     "ood": 82.98,
     "oodSd": 0.62,
     "delta": 9.69
    },
    "s1": {
     "iid": 82.06,
     "iidSd": 0.6,
     "ood": 75.96,
     "oodSd": 0.67,
     "delta": 6.1
    }
   },
   {
    "method": "LaplacianShot",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 94.19,
     "iidSd": 0.27,
     "ood": 86.57,
     "oodSd": 0.58,
     "delta": 7.62
    },
    "s1": {
     "iid": 83.1,
     "iidSd": 0.59,
     "ood": 77.06,
     "oodSd": 0.68,
     "delta": 6.04
    }
   },
   {
    "method": "BD-CSPN",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 95.81,
     "iidSd": 0.25,
     "ood": 88.85,
     "oodSd": 0.61,
     "delta": 6.96
    },
    "s1": {
     "iid": 90.79,
     "iidSd": 0.45,
     "ood": 86.25,
     "oodSd": 0.67,
     "delta": 4.54
    }
   },
   {
    "method": "PADDLE",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 95.36,
     "iidSd": 0.24,
     "ood": 85.69,
     "oodSd": 0.59,
     "delta": 9.67
    },
    "s1": {
     "iid": 87.11,
     "iidSd": 0.47,
     "ood": 82.55,
     "oodSd": 0.59,
     "delta": 4.56
    }
   },
   {
    "method": "Proto-LP",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 98.22,
     "iidSd": 0.17,
     "ood": 96.73,
     "oodSd": 0.29,
     "delta": 1.49
    },
    "s1": {
     "iid": 96.96,
     "iidSd": 0.39,
     "ood": 96.73,
     "oodSd": 0.39,
     "delta": 0.23
    }
   },
   {
    "method": "BPA",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 95.8,
     "iidSd": 0.22,
     "ood": 83.5,
     "oodSd": 0.58,
     "delta": 12.3
    },
    "s1": {
     "iid": 82.75,
     "iidSd": 0.55,
     "ood": 75.85,
     "oodSd": 0.65,
     "delta": 6.9
    }
   },
   {
    "method": "HELA-VFA",
    "family": "metric",
    "attn": false,
    "s5": {
     "iid": 94.68,
     "iidSd": 0.24,
     "ood": 80.07,
     "oodSd": 0.51,
     "delta": 14.61
    },
    "s1": {
     "iid": 80.95,
     "iidSd": 0.6,
     "ood": 70.85,
     "oodSd": 0.66,
     "delta": 10.1
    }
   },
   {
    "method": "ECPE",
    "family": "transductive",
    "attn": false,
    "s5": {
     "iid": 96.04,
     "iidSd": 0.23,
     "ood": 88.16,
     "oodSd": 0.57,
     "delta": 7.88
    },
    "s1": {
     "iid": 89.79,
     "iidSd": 0.44,
     "ood": 85.46,
     "oodSd": 0.59,
     "delta": 4.33
    }
   }
  ],
  "passt": [
   {
    "method": "ProtoNet",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 48.05,
     "iidSd": 0.68,
     "ood": 46.34,
     "oodSd": 0.75,
     "delta": 1.71
    },
    "s5": {
     "iid": 61.07,
     "iidSd": 0.62,
     "ood": 55.76,
     "oodSd": 0.73,
     "delta": 5.31
    }
   },
   {
    "method": "Baseline",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 49.5,
     "iidSd": 0.7,
     "ood": 46.93,
     "oodSd": 0.75,
     "delta": 2.57
    },
    "s5": {
     "iid": 58.15,
     "iidSd": 0.61,
     "ood": 54.57,
     "oodSd": 0.68,
     "delta": 3.58
    }
   },
   {
    "method": "Baseline++",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 50.34,
     "iidSd": 0.72,
     "ood": 47.74,
     "oodSd": 0.77,
     "delta": 2.6
    },
    "s5": {
     "iid": 63.74,
     "iidSd": 0.59,
     "ood": 58.02,
     "oodSd": 0.68,
     "delta": 5.72
    }
   },
   {
    "method": "DN4",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 48.44,
     "iidSd": 0.66,
     "ood": 45.72,
     "oodSd": 0.76,
     "delta": 2.72
    },
    "s5": {
     "iid": 60.96,
     "iidSd": 0.61,
     "ood": 54.62,
     "oodSd": 0.72,
     "delta": 6.34
    }
   },
   {
    "method": "Proto-LP",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 49.62,
     "iidSd": 0.92,
     "ood": 47.47,
     "oodSd": 0.97,
     "delta": 2.15
    },
    "s5": {
     "iid": 61.37,
     "iidSd": 0.67,
     "ood": 55.65,
     "oodSd": 0.82,
     "delta": 5.72
    }
   },
   {
    "method": "BPA",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 47.5,
     "iidSd": 0.72,
     "ood": 44.5,
     "oodSd": 0.78,
     "delta": 3.0
    },
    "s5": {
     "iid": 59.83,
     "iidSd": 0.59,
     "ood": 46.07,
     "oodSd": 0.52,
     "delta": 13.76
    }
   },
   {
    "method": "HELA-VFA",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 48.5,
     "iidSd": 0.7,
     "ood": 43.8,
     "oodSd": 0.78,
     "delta": 4.7
    },
    "s5": {
     "iid": 61.99,
     "iidSd": 0.56,
     "ood": 46.65,
     "oodSd": 0.53,
     "delta": 15.34
    }
   },
   {
    "method": "LaplacianShot",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 48.3,
     "iidSd": 0.7,
     "ood": 46.07,
     "oodSd": 0.79,
     "delta": 2.23
    },
    "s5": {
     "iid": 60.3,
     "iidSd": 0.61,
     "ood": 55.06,
     "oodSd": 0.75,
     "delta": 5.24
    }
   },
   {
    "method": "BD-CSPN",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 48.05,
     "iidSd": 0.74,
     "ood": 46.25,
     "oodSd": 0.82,
     "delta": 1.8
    },
    "s5": {
     "iid": 57.58,
     "iidSd": 0.64,
     "ood": 52.13,
     "oodSd": 0.82,
     "delta": 5.45
    }
   },
   {
    "method": "PADDLE",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 51.15,
     "iidSd": 0.7,
     "ood": 48.18,
     "oodSd": 0.77,
     "delta": 2.97
    },
    "s5": {
     "iid": 59.92,
     "iidSd": 0.59,
     "ood": 55.2,
     "oodSd": 0.73,
     "delta": 4.72
    }
   },
   {
    "method": "ECPE",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 52.17,
     "iidSd": 0.8,
     "ood": 49.62,
     "oodSd": 0.82,
     "delta": 2.55
    },
    "s5": {
     "iid": 62.84,
     "iidSd": 0.62,
     "ood": 56.52,
     "oodSd": 0.76,
     "delta": 6.32
    }
   }
  ],
  "htsat": [
   {
    "method": "ProtoNet",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 83.35,
     "iidSd": 0.57,
     "ood": 77.79,
     "oodSd": 0.64,
     "delta": 5.56
    },
    "s5": {
     "iid": 93.36,
     "iidSd": 0.33,
     "ood": 84.67,
     "oodSd": 0.58,
     "delta": 8.69
    }
   },
   {
    "method": "Baseline",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 83.92,
     "iidSd": 0.54,
     "ood": 78.06,
     "oodSd": 0.64,
     "delta": 5.86
    },
    "s5": {
     "iid": 93.09,
     "iidSd": 0.35,
     "ood": 84.7,
     "oodSd": 0.57,
     "delta": 8.39
    }
   },
   {
    "method": "Baseline++",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 83.93,
     "iidSd": 0.58,
     "ood": 78.57,
     "oodSd": 0.67,
     "delta": 5.36
    },
    "s5": {
     "iid": 93.58,
     "iidSd": 0.32,
     "ood": 84.27,
     "oodSd": 0.56,
     "delta": 9.31
    }
   },
   {
    "method": "DN4",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 84.58,
     "iidSd": 0.54,
     "ood": 77.39,
     "oodSd": 0.65,
     "delta": 7.19
    },
    "s5": {
     "iid": 92.81,
     "iidSd": 0.33,
     "ood": 84.05,
     "oodSd": 0.6,
     "delta": 8.76
    }
   },
   {
    "method": "Proto-LP",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 93.19,
     "iidSd": 0.64,
     "ood": 91.31,
     "oodSd": 0.63,
     "delta": 1.88
    },
    "s5": {
     "iid": 95.66,
     "iidSd": 0.34,
     "ood": 92.21,
     "oodSd": 0.52,
     "delta": 3.45
    }
   },
   {
    "method": "BPA",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 84.5,
     "iidSd": 0.55,
     "ood": 76.0,
     "oodSd": 0.66,
     "delta": 8.5
    },
    "s5": {
     "iid": 94.0,
     "iidSd": 0.32,
     "ood": 83.6,
     "oodSd": 0.59,
     "delta": 10.4
    }
   },
   {
    "method": "HELA-VFA",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 82.0,
     "iidSd": 0.6,
     "ood": 72.5,
     "oodSd": 0.68,
     "delta": 9.5
    },
    "s5": {
     "iid": 92.9,
     "iidSd": 0.35,
     "ood": 78.9,
     "oodSd": 0.61,
     "delta": 14.0
    }
   },
   {
    "method": "LaplacianShot",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 86.1,
     "iidSd": 0.57,
     "ood": 80.41,
     "oodSd": 0.69,
     "delta": 5.69
    },
    "s5": {
     "iid": 93.65,
     "iidSd": 0.34,
     "ood": 85.65,
     "oodSd": 0.57,
     "delta": 8.0
    }
   },
   {
    "method": "BD-CSPN",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 89.96,
     "iidSd": 0.54,
     "ood": 85.81,
     "oodSd": 0.66,
     "delta": 4.15
    },
    "s5": {
     "iid": 94.1,
     "iidSd": 0.33,
     "ood": 88.05,
     "oodSd": 0.59,
     "delta": 6.05
    }
   },
   {
    "method": "PADDLE",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 86.4,
     "iidSd": 0.54,
     "ood": 81.52,
     "oodSd": 0.61,
     "delta": 4.88
    },
    "s5": {
     "iid": 94.05,
     "iidSd": 0.32,
     "ood": 86.94,
     "oodSd": 0.54,
     "delta": 7.11
    }
   },
   {
    "method": "ECPE",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 89.53,
     "iidSd": 0.49,
     "ood": 85.74,
     "oodSd": 0.62,
     "delta": 3.79
    },
    "s5": {
     "iid": 94.38,
     "iidSd": 0.33,
     "ood": 88.66,
     "oodSd": 0.54,
     "delta": 5.72
    }
   }
  ],
  "beats": [
   {
    "method": "ProtoNet",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 72.53,
     "iidSd": 0.67,
     "ood": 66.0,
     "oodSd": 0.68,
     "delta": 6.53
    },
    "s5": {
     "iid": 89.28,
     "iidSd": 0.39,
     "ood": 76.95,
     "oodSd": 0.62,
     "delta": 12.33
    }
   },
   {
    "method": "Baseline",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 74.47,
     "iidSd": 0.68,
     "ood": 68.27,
     "oodSd": 0.7,
     "delta": 6.2
    },
    "s5": {
     "iid": 88.93,
     "iidSd": 0.4,
     "ood": 77.39,
     "oodSd": 0.61,
     "delta": 11.54
    }
   },
   {
    "method": "Baseline++",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 74.46,
     "iidSd": 0.67,
     "ood": 68.31,
     "oodSd": 0.7,
     "delta": 6.15
    },
    "s5": {
     "iid": 90.19,
     "iidSd": 0.37,
     "ood": 77.52,
     "oodSd": 0.61,
     "delta": 12.67
    }
   },
   {
    "method": "DN4",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 73.59,
     "iidSd": 0.69,
     "ood": 66.17,
     "oodSd": 0.74,
     "delta": 7.42
    },
    "s5": {
     "iid": 88.65,
     "iidSd": 0.4,
     "ood": 67.17,
     "oodSd": 0.65,
     "delta": 21.48
    }
   },
   {
    "method": "Proto-LP",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 87.12,
     "iidSd": 0.83,
     "ood": 83.12,
     "oodSd": 0.96,
     "delta": 4.0
    },
    "s5": {
     "iid": 92.44,
     "iidSd": 0.45,
     "ood": 85.68,
     "oodSd": 0.81,
     "delta": 6.76
    }
   },
   {
    "method": "BPA",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 73.95,
     "iidSd": 0.65,
     "ood": 65.9,
     "oodSd": 0.68,
     "delta": 8.05
    },
    "s5": {
     "iid": 90.71,
     "iidSd": 0.35,
     "ood": 75.84,
     "oodSd": 0.56,
     "delta": 14.87
    }
   },
   {
    "method": "HELA-VFA",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 70.85,
     "iidSd": 0.7,
     "ood": 60.45,
     "oodSd": 0.73,
     "delta": 10.4
    },
    "s5": {
     "iid": 87.36,
     "iidSd": 0.4,
     "ood": 69.16,
     "oodSd": 0.53,
     "delta": 18.2
    }
   },
   {
    "method": "LaplacianShot",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 74.45,
     "iidSd": 0.72,
     "ood": 67.43,
     "oodSd": 0.73,
     "delta": 7.02
    },
    "s5": {
     "iid": 89.48,
     "iidSd": 0.39,
     "ood": 77.58,
     "oodSd": 0.62,
     "delta": 11.9
    }
   },
   {
    "method": "BD-CSPN",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 81.73,
     "iidSd": 0.67,
     "ood": 76.9,
     "oodSd": 0.7,
     "delta": 4.83
    },
    "s5": {
     "iid": 90.23,
     "iidSd": 0.38,
     "ood": 80.87,
     "oodSd": 0.61,
     "delta": 9.36
    }
   },
   {
    "method": "PADDLE",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 78.29,
     "iidSd": 0.61,
     "ood": 73.08,
     "oodSd": 0.68,
     "delta": 5.21
    },
    "s5": {
     "iid": 90.56,
     "iidSd": 0.36,
     "ood": 79.11,
     "oodSd": 0.6,
     "delta": 11.45
    }
   },
   {
    "method": "ECPE",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 80.9,
     "iidSd": 0.63,
     "ood": 75.69,
     "oodSd": 0.71,
     "delta": 5.21
    },
    "s5": {
     "iid": 91.6,
     "iidSd": 0.35,
     "ood": 81.85,
     "oodSd": 0.65,
     "delta": 9.75
    }
   }
  ],
  "wav2vec2": [
   {
    "method": "ProtoNet",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 37.55,
     "iidSd": 0.55,
     "ood": 33.09,
     "oodSd": 0.48,
     "delta": 4.46
    },
    "s5": {
     "iid": 50.79,
     "iidSd": 0.52,
     "ood": 39.15,
     "oodSd": 0.45,
     "delta": 11.64
    }
   },
   {
    "method": "Baseline",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 38.64,
     "iidSd": 0.55,
     "ood": 34.0,
     "oodSd": 0.48,
     "delta": 4.64
    },
    "s5": {
     "iid": 49.19,
     "iidSd": 0.51,
     "ood": 38.79,
     "oodSd": 0.45,
     "delta": 10.4
    }
   },
   {
    "method": "Baseline++",
    "family": "finetune",
    "attn": false,
    "s1": {
     "iid": 38.25,
     "iidSd": 0.53,
     "ood": 33.72,
     "oodSd": 0.49,
     "delta": 4.53
    },
    "s5": {
     "iid": 53.44,
     "iidSd": 0.51,
     "ood": 40.54,
     "oodSd": 0.45,
     "delta": 12.9
    }
   },
   {
    "method": "DN4",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 37.67,
     "iidSd": 0.54,
     "ood": 33.33,
     "oodSd": 0.47,
     "delta": 4.34
    },
    "s5": {
     "iid": 51.08,
     "iidSd": 0.5,
     "ood": 39.81,
     "oodSd": 0.44,
     "delta": 11.27
    }
   },
   {
    "method": "Proto-LP",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 37.05,
     "iidSd": 0.67,
     "ood": 32.6,
     "oodSd": 0.64,
     "delta": 4.45
    },
    "s5": {
     "iid": 47.74,
     "iidSd": 0.6,
     "ood": 36.6,
     "oodSd": 0.57,
     "delta": 11.14
    }
   },
   {
    "method": "BPA",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 38.5,
     "iidSd": 0.5,
     "ood": 33.95,
     "oodSd": 0.45,
     "delta": 4.55
    },
    "s5": {
     "iid": 53.73,
     "iidSd": 0.43,
     "ood": 43.39,
     "oodSd": 0.38,
     "delta": 10.34
    }
   },
   {
    "method": "HELA-VFA",
    "family": "metric",
    "attn": false,
    "s1": {
     "iid": 37.4,
     "iidSd": 0.55,
     "ood": 33.05,
     "oodSd": 0.48,
     "delta": 4.35
    },
    "s5": {
     "iid": 51.81,
     "iidSd": 0.44,
     "ood": 41.91,
     "oodSd": 0.36,
     "delta": 9.9
    }
   },
   {
    "method": "LaplacianShot",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 37.33,
     "iidSd": 0.57,
     "ood": 33.47,
     "oodSd": 0.48,
     "delta": 3.86
    },
    "s5": {
     "iid": 49.86,
     "iidSd": 0.52,
     "ood": 38.23,
     "oodSd": 0.47,
     "delta": 11.63
    }
   },
   {
    "method": "BD-CSPN",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 37.47,
     "iidSd": 0.58,
     "ood": 33.36,
     "oodSd": 0.5,
     "delta": 4.11
    },
    "s5": {
     "iid": 48.07,
     "iidSd": 0.54,
     "ood": 37.36,
     "oodSd": 0.46,
     "delta": 10.71
    }
   },
   {
    "method": "PADDLE",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 39.07,
     "iidSd": 0.56,
     "ood": 35.05,
     "oodSd": 0.49,
     "delta": 4.02
    },
    "s5": {
     "iid": 50.85,
     "iidSd": 0.51,
     "ood": 39.99,
     "oodSd": 0.48,
     "delta": 10.86
    }
   },
   {
    "method": "ECPE",
    "family": "transductive",
    "attn": false,
    "s1": {
     "iid": 39.84,
     "iidSd": 0.6,
     "ood": 33.97,
     "oodSd": 0.52,
     "delta": 5.87
    },
    "s5": {
     "iid": 54.49,
     "iidSd": 0.52,
     "ood": 41.35,
     "oodSd": 0.47,
     "delta": 13.14
    }
   }
  ]
 },
 "geometry": [
  {
   "method": "ProtoNet",
   "magClean": 83.26,
   "magCleanCI": 2.57,
   "magMixed": 58.69,
   "magMixedCI": 1.09,
   "cosClean": 0.938,
   "cosMixed": 0.928,
   "cosDiff": 0.009
  },
  {
   "method": "Meta-Baseline",
   "magClean": 89.61,
   "magCleanCI": 2.77,
   "magMixed": 63.34,
   "magMixedCI": 1.13,
   "cosClean": 0.92,
   "cosMixed": 0.9,
   "cosDiff": 0.02
  },
  {
   "method": "Baseline",
   "magClean": 81.06,
   "magCleanCI": 2.23,
   "magMixed": 60.46,
   "magMixedCI": 0.92,
   "cosClean": 0.927,
   "cosMixed": 0.914,
   "cosDiff": 0.013
  },
  {
   "method": "Baseline++",
   "magClean": 63.02,
   "magCleanCI": 1.58,
   "magMixed": 48.4,
   "magMixedCI": 0.68,
   "cosClean": 0.934,
   "cosMixed": 0.924,
   "cosDiff": 0.01
  },
  {
   "method": "ADM",
   "magClean": 65.19,
   "magCleanCI": 1.78,
   "magMixed": 48.25,
   "magMixedCI": 0.76,
   "cosClean": 0.937,
   "cosMixed": 0.93,
   "cosDiff": 0.007
  },
  {
   "method": "DN4",
   "magClean": 79.62,
   "magCleanCI": 2.89,
   "magMixed": 50.99,
   "magMixedCI": 1.28,
   "cosClean": 0.905,
   "cosMixed": 0.88,
   "cosDiff": 0.025
  },
  {
   "method": "ATL-Net",
   "magClean": 83.67,
   "magCleanCI": 2.72,
   "magMixed": 57.45,
   "magMixedCI": 1.14,
   "cosClean": 0.913,
   "cosMixed": 0.895,
   "cosDiff": 0.017
  },
  {
   "method": "ANIL",
   "magClean": 81.16,
   "magCleanCI": 2.67,
   "magMixed": 55.01,
   "magMixedCI": 1.17,
   "cosClean": 0.938,
   "cosMixed": 0.927,
   "cosDiff": 0.011
  },
  {
   "method": "LEO",
   "magClean": 89.94,
   "magCleanCI": 3.1,
   "magMixed": 59.68,
   "magMixedCI": 1.3,
   "cosClean": 0.937,
   "cosMixed": 0.925,
   "cosDiff": 0.012
  },
  {
   "method": "MeTAL",
   "magClean": 90.58,
   "magCleanCI": 2.01,
   "magMixed": 73.07,
   "magMixedCI": 0.8,
   "cosClean": 0.916,
   "cosMixed": 0.903,
   "cosDiff": 0.013
  },
  {
   "method": "BOIL",
   "magClean": 75.74,
   "magCleanCI": 2.24,
   "magMixed": 55.21,
   "magMixedCI": 0.9,
   "cosClean": 0.927,
   "cosMixed": 0.912,
   "cosDiff": 0.015
  },
  {
   "method": "R2D2",
   "magClean": 91.65,
   "magCleanCI": 2.95,
   "magMixed": 63.3,
   "magMixedCI": 1.26,
   "cosClean": 0.926,
   "cosMixed": 0.912,
   "cosDiff": 0.014
  },
  {
   "method": "MCL",
   "magClean": 78.69,
   "magCleanCI": 2.72,
   "magMixed": 52.17,
   "magMixedCI": 1.16,
   "cosClean": 0.91,
   "cosMixed": 0.885,
   "cosDiff": 0.024
  },
  {
   "method": "MAML",
   "magClean": 80.34,
   "magCleanCI": 2.44,
   "magMixed": 57.5,
   "magMixedCI": 1.02,
   "cosClean": 0.932,
   "cosMixed": 0.919,
   "cosDiff": 0.013
  },
  {
   "method": "ADM (KL)",
   "magClean": 89.48,
   "magCleanCI": 2.69,
   "magMixed": 63.23,
   "magMixedCI": 1.11,
   "cosClean": 0.923,
   "cosMixed": 0.91,
   "cosDiff": 0.013
  }
 ],
 "wiring": [
  {
   "fg": "dog bark",
   "bgs": [
    "church bells",
    "hen",
    "rain",
    "chirping birds"
   ],
   "split": "train",
   "hard": [
    "church bells",
    "hen",
    "rain",
    "chirping birds"
   ]
  },
  {
   "fg": "rooster",
   "bgs": [
    "hen",
    "church bells",
    "chirping birds",
    "engine idling"
   ],
   "split": "train",
   "hard": [
    "hen",
    "church bells",
    "chirping birds",
    "engine idling"
   ]
  },
  {
   "fg": "pig",
   "bgs": [
    "church bells",
    "engine idling",
    "rain",
    "siren"
   ],
   "split": "test",
   "hard": [
    "car horn",
    "crying baby",
    "rain",
    "siren"
   ]
  },
  {
   "fg": "cow",
   "bgs": [
    "crickets",
    "engine idling",
    "rain",
    "car horn"
   ],
   "split": "train",
   "hard": [
    "crickets",
    "engine idling",
    "rain",
    "car horn"
   ]
  },
  {
   "fg": "crow",
   "bgs": [
    "airplane",
    "footsteps",
    "thunderstorm",
    "rain"
   ],
   "split": "test",
   "hard": [
    "car horn",
    "siren",
    "street music",
    "rain"
   ]
  },
  {
   "fg": "brushing teeth",
   "bgs": [
    "toilet flush",
    "water drops",
    "drinking",
    "thunderstorm"
   ],
   "split": "train",
   "hard": [
    "toilet flush",
    "water drops",
    "drinking",
    "thunderstorm"
   ]
  },
  {
   "fg": "sneezing",
   "bgs": [
    "pouring water",
    "vacuum cleaner",
    "footsteps",
    "thunderstorm"
   ],
   "split": "test",
   "hard": [
    "crying baby",
    "car horn",
    "rain",
    "street music"
   ]
  },
  {
   "fg": "clapping",
   "bgs": [
    "fireworks",
    "church bells",
    "car horn",
    "airplane"
   ],
   "split": "train",
   "hard": [
    "fireworks",
    "church bells",
    "car horn",
    "airplane"
   ]
  },
  {
   "fg": "snoring",
   "bgs": [
    "clock alarm",
    "clock tick",
    "door knock",
    "vacuum cleaner"
   ],
   "split": "train",
   "hard": [
    "clock alarm",
    "clock tick",
    "door knock",
    "vacuum cleaner"
   ]
  },
  {
   "fg": "cough",
   "bgs": [
    "wind",
    "vacuum cleaner",
    "thunderstorm",
    "water drops"
   ],
   "split": "test",
   "hard": [
    "rain",
    "street music",
    "car horn",
    "crying baby"
   ]
  },
  {
   "fg": "frog",
   "bgs": [
    "crickets",
    "insects",
    "thunderstorm",
    "water drops"
   ],
   "split": "train",
   "hard": [
    "crickets",
    "insects",
    "thunderstorm",
    "water drops"
   ]
  },
  {
   "fg": "cat",
   "bgs": [
    "crying baby",
    "rain",
    "hen",
    "vacuum cleaner"
   ],
   "split": "train",
   "hard": [
    "crying baby",
    "rain",
    "hen",
    "vacuum cleaner"
   ]
  },
  {
   "fg": "sea waves",
   "bgs": [
    "siren",
    "car horn",
    "airplane",
    "thunderstorm"
   ],
   "split": "train",
   "hard": [
    "siren",
    "car horn",
    "airplane",
    "thunderstorm"
   ]
  },
  {
   "fg": "crackling fire",
   "bgs": [
    "wind",
    "door knock",
    "rain",
    "thunderstorm"
   ],
   "split": "test",
   "hard": [
    "crying baby",
    "car horn",
    "rain",
    "siren"
   ]
  },
  {
   "fg": "breathing",
   "bgs": [
    "hand saw",
    "rain",
    "thunderstorm",
    "chirping birds"
   ],
   "split": "train",
   "hard": [
    "hand saw",
    "rain",
    "thunderstorm",
    "chirping birds"
   ]
  },
  {
   "fg": "mouse click",
   "bgs": [
    "keyboard typing",
    "door knock",
    "drinking",
    "clock tick"
   ],
   "split": "train",
   "hard": [
    "keyboard typing",
    "door knock",
    "drinking",
    "clock tick"
   ]
  },
  {
   "fg": "door creaks",
   "bgs": [
    "footsteps",
    "door knock",
    "rain",
    "wind"
   ],
   "split": "train",
   "hard": [
    "footsteps",
    "door knock",
    "rain",
    "wind"
   ]
  },
  {
   "fg": "can opening",
   "bgs": [
    "drinking",
    "glass breaking",
    "pouring water",
    "keyboard typing"
   ],
   "split": "train",
   "hard": [
    "drinking",
    "glass breaking",
    "pouring water",
    "keyboard typing"
   ]
  },
  {
   "fg": "washing machine",
   "bgs": [
    "toilet flush",
    "car horn",
    "siren",
    "clock alarm"
   ],
   "split": "train",
   "hard": [
    "toilet flush",
    "car horn",
    "siren",
    "clock alarm"
   ]
  },
  {
   "fg": "helicopter",
   "bgs": [
    "rain",
    "thunderstorm",
    "airplane",
    "clock alarm"
   ],
   "split": "train",
   "hard": [
    "rain",
    "thunderstorm",
    "airplane",
    "siren"
   ]
  },
  {
   "fg": "chainsaw",
   "bgs": [
    "footsteps",
    "wind",
    "crying baby",
    "rain"
   ],
   "split": "test",
   "hard": [
    "siren",
    "car horn",
    "crying baby",
    "rain"
   ]
  },
  {
   "fg": "gun shot",
   "bgs": [
    "siren",
    "alarm bell ringing",
    "wind",
    "rain"
   ],
   "split": "train",
   "hard": [
    "siren",
    "alarm bell ringing",
    "wind",
    "rain"
   ]
  },
  {
   "fg": "drilling",
   "bgs": [
    "car horn",
    "street music",
    "siren",
    "rain"
   ],
   "split": "train",
   "hard": [
    "car horn",
    "street music",
    "siren",
    "rain"
   ]
  },
  {
   "fg": "jackhammer",
   "bgs": [
    "siren",
    "rain",
    "glass breaking",
    "clock alarm"
   ],
   "split": "train",
   "hard": [
    "siren",
    "rain",
    "glass breaking",
    "clock alarm"
   ]
  },
  {
   "fg": "children playing",
   "bgs": [
    "street music",
    "rain",
    "glass breaking",
    "water drops"
   ],
   "split": "train",
   "hard": [
    "street music",
    "rain",
    "glass breaking",
    "water drops"
   ]
  },
  {
   "fg": "air conditioner",
   "bgs": [
    "rain",
    "thunderstorm",
    "drinking",
    "water drops"
   ],
   "split": "train",
   "hard": [
    "rain",
    "thunderstorm",
    "drinking",
    "water drops"
   ]
  },
  {
   "fg": "throat clearing",
   "bgs": [
    "door knock",
    "toilet flush",
    "glass breaking",
    "water drops"
   ],
   "split": "val",
   "hard": [
    "door knock",
    "toilet flush",
    "glass breaking",
    "water drops"
   ]
  },
  {
   "fg": "door slam",
   "bgs": [
    "door knock",
    "footsteps",
    "alarm bell ringing",
    "rain"
   ],
   "split": "val",
   "hard": [
    "door knock",
    "footsteps",
    "alarm bell ringing",
    "rain"
   ]
  },
  {
   "fg": "keys drop",
   "bgs": [
    "drinking",
    "keyboard typing",
    "glass breaking",
    "door knock"
   ],
   "split": "val",
   "hard": [
    "drinking",
    "keyboard typing",
    "glass breaking",
    "door knock"
   ]
  },
  {
   "fg": "page turn",
   "bgs": [
    "thunderstorm",
    "rain",
    "pouring water",
    "street music"
   ],
   "split": "val",
   "hard": [
    "thunderstorm",
    "rain",
    "pouring water",
    "street music"
   ]
  },
  {
   "fg": "phone",
   "bgs": [
    "door knock",
    "crying baby",
    "insects",
    "hand saw"
   ],
   "split": "test",
   "hard": [
    "street music",
    "crying baby",
    "car horn",
    "rain"
   ]
  },
  {
   "fg": "drawer",
   "bgs": [
    "keyboard typing",
    "frying",
    "door knock",
    "footsteps"
   ],
   "split": "val",
   "hard": [
    "keyboard typing",
    "frying",
    "door knock",
    "footsteps"
   ]
  },
  {
   "fg": "running water",
   "bgs": [
    "toilet flush",
    "drinking",
    "frying",
    "crying baby"
   ],
   "split": "train",
   "hard": [
    "toilet flush",
    "drinking",
    "frying",
    "crying baby"
   ]
  },
  {
   "fg": "electric shaver",
   "bgs": [
    "toilet flush",
    "drinking",
    "pouring water",
    "footsteps"
   ],
   "split": "train",
   "hard": [
    "toilet flush",
    "drinking",
    "pouring water",
    "footsteps"
   ]
  },
  {
   "fg": "blender",
   "bgs": [
    "frying",
    "glass breaking",
    "pouring water",
    "alarm bell ringing"
   ],
   "split": "test",
   "hard": [
    "street music",
    "car horn",
    "crying baby",
    "rain"
   ]
  },
  {
   "fg": "laughter",
   "bgs": [
    "car horn",
    "drinking",
    "glass breaking",
    "keyboard typing"
   ],
   "split": "train",
   "hard": [
    "car horn",
    "drinking",
    "glass breaking",
    "keyboard typing"
   ]
  },
  {
   "fg": "sigh",
   "bgs": [
    "crying baby",
    "toilet flush",
    "clock alarm",
    "glass breaking"
   ],
   "split": "train",
   "hard": [
    "crying baby",
    "toilet flush",
    "clock alarm",
    "glass breaking"
   ]
  },
  {
   "fg": "sniff",
   "bgs": [
    "street music",
    "frying",
    "thunderstorm",
    "hand saw"
   ],
   "split": "train",
   "hard": [
    "street music",
    "frying",
    "thunderstorm",
    "hand saw"
   ]
  }
 ],
 "alpha": {
  "x": [
   0.0,
   0.2,
   0.5,
   0.8,
   1.0
  ],
  "s1": [
   0.3,
   0.3,
   1.4,
   1.0,
   2.8
  ],
  "s5": [
   0.2,
   1.3,
   3.15,
   5.0,
   6.0
  ]
 }
};
