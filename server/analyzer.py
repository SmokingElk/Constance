import json
PROPERTIES_FILE_PATH = './static/properties_data.json'


class Analyzer:
    def __init__(self):
        f = open(PROPERTIES_FILE_PATH, encoding='utf-8')
        f = f.read()
        self.a = json.loads(f)

    def get_datatype(self, i: int) -> str:
        b = self.a['propertiesData']
        c = b[int(i)]['type']
        return c

    def get_default(self, i: int):
        b = self.a['propertiesData']
        c = b[i]['type']
        if c == 'binary' or c == 'discrete':
            return b[i]['default']
        else:
            if c == 'continuous' and isinstance(b[i]['averageValue'], str):
                mn = b[i]['range']['min']
                mx = b[i]['range']['max']
                return (mn + mx) / 2
            else:
                return b[i]["averageValue"]

    def get_group(self, i: int) -> str:
        b = self.a['propertiesData']
        c = b[i]['group']
        return c

    def get_data(self, i: int, key: str) -> list:
        b = self.a['propertiesData']
        if key == 'columnsCoefs':
            lst = b[i]['variants']
            new = [1.0 for _ in range(len(lst))]
        else:
            new = [1.0 for _ in range(self.a['globalParams']['segmentsInPartion'])]
        return new
