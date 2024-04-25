def validate_password(password: str) -> bool:
    if len(password) < 8 or password.lower() == password:
        return False
    if not any(char.isdigit() for char in password):
        return False
    return True


def validate_username(username: str) -> bool:
    return len(username) != 0 and all(i.isalpha() or i.isdigit() or i == '_' for i in username)
