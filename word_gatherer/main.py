# ===== all =====

with open('lithuanian-words-list.txt', mode='r', encoding='utf-8') as file:
    words = ''
    for word in file:
        fixed = word.strip('\n').lower()
        if len(fixed) == 5:
            words += fixed + '\n'
    with open('list_all.txt', mode='w', encoding='utf-8') as out:
        out.writelines(words[:-1])

# ===== common =====

with open('common.txt', mode='r', encoding='utf-8') as file:
    words = ''
    list = file.read().lower().replace('1', '').replace('2', '').replace('3', '').replace('4', '').replace('5', '').replace('6', '').replace('7', '').replace('8', '').replace('9', '').replace('0', '').replace('.', '').replace(',', '').split(' ')
    for word in list:
        if len(word) == 5:
            words += word + '\n'
    with open('list_common.txt', mode='w', encoding='utf-8') as out:
        out.writelines(words[:-1])
