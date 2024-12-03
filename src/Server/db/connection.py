import pyodbc

# Подключение к базе данных
def get_db_connection():
    connection = pyodbc.connect(
        "Driver={SQL Server};"
        "Server=CHEREMUSHKINPC/SQLEXPRESS;"
        "Database=WebDevelop7Semester;"
        "Trusted_Connection=yes;"
    )
    return connection
