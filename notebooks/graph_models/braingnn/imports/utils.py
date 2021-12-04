from scipy import stats
import matplotlib.pyplot as plt
import numpy as np
import torch
from scipy.io import loadmat
from sklearn.model_selection import StratifiedKFold
from sklearn.model_selection import KFold
import random

random.seed(123)

def train_val_test_split(kfold = 5, fold = 0):
    n_sub = 1035
    id = list(range(n_sub))

    print("1")
    random.shuffle(id)

    print("2")
    kf = KFold(n_splits=kfold, random_state=123,shuffle = True)
    kf2 = KFold(n_splits=kfold-1, random_state = 123, shuffle=True)
    
    print("3")
    test_index = list()
    train_index = list()
    val_index = list()

    print("4")
    for tr,te in kf.split(np.array(id)):
        test_index.append(te)
        tr_id, val_id = list(kf2.split(tr))[0]
        train_index.append(tr[tr_id])
        val_index.append(tr[val_id])

    train_id = train_index[fold]
    test_id = test_index[fold]
    val_id = val_index[fold]

    return train_id,val_id,test_id