import pyodbc

# Подключение к базе данных
def get_db_connection():
    connection = pyodbc.connect(
        "DRIVER={ODBC Driver 17 for SQL Server};"
        "SERVER=CHEREMUSHKINPC\\SQLEXPRESS;"  # Замените / на \\
        "DATABASE=WebDevelop7Semester;"
        "Trusted_Connection=yes;"
        "TrustServerSertificate=True"
    )
    return connection
