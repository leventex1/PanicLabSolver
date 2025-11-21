import numpy as np


class HopfieldNetwork:

    def __init__(self, size: int):
        self.size = size
        self.W = np.zeros((size, size))

    def train(self, patterns):
        for p in patterns:
            v = p.reshape(-1, 1)
            self.W += v @ v.T

        np.fill_diagonal(self.W, 0)
        self.W /= len(patterns)

    def recall(self, pattern, steps=5):
        state = pattern.copy()
        for _ in range(steps):
            state = np.sign(self.W @ state)
            state[state == 0] = 1
            
        return state
