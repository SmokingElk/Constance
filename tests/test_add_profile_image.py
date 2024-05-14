import pytest
from PIL import Image
import os
from server.add_profile_image import add_profile_image
UPLOAD_FOLDER = './static/images'
#в папке tests находится файл test.png, тест создаёт файл с именем по нужному формату, после выполнения теста файл будет лежать в папке static/images
a = Image.open('test.png')
num_files = len([f for f in os.listdir(UPLOAD_FOLDER)
                if os.path.isfile(os.path.join(UPLOAD_FOLDER, f))])
file_name = f"img{num_files}.png"

class TestAddProfileImage:
    @pytest.mark.parametrize(
        "f, ans",
        [
         (a, file_name)
        ]
    )
    def test_add_profile_image(self, f, ans):
        assert add_profile_image(a) == ans