import os

UPLOAD_FOLDER = './static/images'


def add_profile_image(file):
    """
    Функция, которая добавляет фотографию пользователя в отдельную папку static,
    где хранятся все изображения.
    Parameters
    ----------
    file : file
        файл, который мы закидываем в папку static
    Returns
    -------
    str
        имя файла, которое будет хранится в базе данных в формате img{номер файла в папке}.png
    """
    num_files = len([f for f in os.listdir(UPLOAD_FOLDER)
                     if os.path.isfile(os.path.join(UPLOAD_FOLDER, f))])
    file_name = f"img{num_files}.png"
    file_path = os.path.join(UPLOAD_FOLDER, file_name)
    file.save(file_path)
    return file_name
