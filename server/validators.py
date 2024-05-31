def validate_password(password: str) -> bool:
    """
    функция для проверки корректности пароля
    Parameters
    ----------
    password:str
        пароль, который ввёл пользователь
    Returns
    -------
    bool
        True, если пароль прошёл проверку
        False, если нет
    Examples
    _______
    >>> validate_password('Test1234')
    True
    >>> validate_password('test123')
    False
    """
    if len(password) < 8 or password.lower() == password:
        return False
    if not any(char.isdigit() for char in password):
        return False
    return True


def validate_username(username: str) -> bool:
    """
    функция для проверки корректности имени пользователя
    Parameters
    ----------
    username:str
        имя, который ввёл пользователь
    Returns
    -------
    bool
        True, если пароль прошёл проверку
        False, если нет
    Examples
    _______
    >>> validate_username('user1')
    True
    >>> validate_username('username')
    True
    """
    return len(username) != 0 and all(i.isalpha() or i.isdigit() or i == '_' for i in username)
