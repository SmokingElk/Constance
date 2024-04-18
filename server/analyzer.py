import json

def get_datatype(i):
    a = open('properties_data.json', encoding='utf-8')
    a = a.read()
    a = json.loads(a)
    b = a['propertiesData']
    c = b[i]['type']
    return c

def get_default(i):
    a = open('properties_data.json', encoding='utf-8')
    a = a.read()
    a = json.loads(a)
    b = a['propertiesData']
    c = b[i]['type']
    if c == 'binary' or c == 'discrete':
        return b[i]['default']
    else:
        if c == 'countinious' and isinstance(b[i]['averageValue'], str):
            mn = b[i]['range']['min']
            mx = b[i]['range']['max']
            return (mn + mx) / 2
        else:
            return b[i]["averageValue"]

def get_group(i):
    a = open('properties_data.json', encoding='utf-8')
    a = a.read()
    a = json.loads(a)
    b = a['propertiesData']
    c = b[i]['group']
    return c


def get_data(i, key):
    a = open('properties_data.json', encoding='utf-8')
    a = a.read()
    a = json.loads(a)
    b = a['propertiesData']
    if key == 'columnsCoefs':
        lst = b[i]['variants']
        new = [1.0 for i in range(len(lst))]
    else:
        lst = b[i]['labels']
        new = [1.0 for i in range(len(lst))]
    return new

