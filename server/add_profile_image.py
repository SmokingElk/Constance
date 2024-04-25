import os

UPLOAD_FOLDER = './static/images'


def add_profile_image(file):
    num_files = len([f for f in os.listdir(UPLOAD_FOLDER)
                     if os.path.isfile(os.path.join(UPLOAD_FOLDER, f))])
    file_name = f"img{num_files}.png"
    file_path = os.path.join(UPLOAD_FOLDER, file_name)
    file.save(file_path)
    return file_name
