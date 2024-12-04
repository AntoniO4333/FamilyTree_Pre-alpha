from db.connection import get_db_connection
import pyodbc


# Получение пользователя по логину (оставляем изначальную функцию)
def get_user_by_login(login):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "SELECT UserID, Login, Password FROM Users WHERE Login = ?"
    cursor.execute(query, (login,))
    user = cursor.fetchone()
    conn.close()
    return user

# Регистрация нового пользователя
def register_user(login, password, email, full_name):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
            INSERT INTO Users (Login, Password, Email, FullName)
            VALUES (?, ?, ?, ?)
        """
        cursor.execute(query, (login, password, email, full_name))
        conn.commit()
        return {"message": "User registered successfully"}
    except pyodbc.IntegrityError as e:
        if "UNIQUE KEY" in str(e):
            return {"error": "Login or email already exists"}
        return {"error": "Database integrity error"}
    except Exception as e:
        return {"error": str(e)}
    finally:
        conn.close()

# Создание нового пользователя
def create_user(login, password, email, fullname):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "INSERT INTO Users (Login, Password, Email, FullName) VALUES (?, ?, ?, ?)"
    cursor.execute(query, (login, password, email, fullname))
    conn.commit()
    conn.close()