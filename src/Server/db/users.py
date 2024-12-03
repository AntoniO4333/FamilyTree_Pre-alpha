from db.connection import get_db_connection

# Получение пользователя по логину
def get_user_by_login(login):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "SELECT UserID, Login, Password FROM Users WHERE Login = ?"
    cursor.execute(query, (login,))
    user = cursor.fetchone()
    conn.close()
    return user
