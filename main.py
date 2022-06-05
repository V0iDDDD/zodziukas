import random

type = 'common'
word = random.choice(open(f'./word_gatherer/list_{type}.txt', mode='UTF-8').read().split())
print(word)
for _ in range(6):

    guess = input()