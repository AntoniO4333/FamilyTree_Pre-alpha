from flask import Flask, send_from_directory, request, jsonify
import pyodbc

app = Flask(__name__)

# Конфигурация подключения к базе данных
db_config = {
    "driver": "ODBC Driver 17 for SQL Server",  # Убедитесь, что этот драйвер установлен
    "server": "CHEREMUSHKINPC\\SQLEXPRESS",
    "database": "WebDevelop7Semester",
    "trusted_connection": True,  # Используем аутентификацию Windows
    "trust_certificate": True  # TrustServerCertificate=True
}

# Функция подключения к базе данных
def get_db_connection():
    conn_str = (
        f"DRIVER={{{db_config['driver']}}};"
        f"SERVER={db_config['server']};"
        f"DATABASE={db_config['database']};"
        f"Trusted_Connection={'yes' if db_config['trusted_connection'] else 'no'};"
        f"TrustServerCertificate={'yes' if db_config['trust_certificate'] else 'no'};"
    )
    return pyodbc.connect(conn_str)

# Маршрут для страницы логина
@app.route("/")
def login():
    return send_from_directory("../../src/Client/Login", "login.html")

# Маршрут для CSS-файлов
@app.route('/styles.css')
def serve_css():
    return send_from_directory("../../src/Client/Login", "styles.css")

# Маршрут для JS-файлов
@app.route('/script.js')
def serve_js():
    return send_from_directory("../../src/Client/Login", "script.js")

# Маршрут для изображений
@app.route('/Images/<filename>')
def serve_images(filename):
    return send_from_directory("../../src/Client/Images", filename)

# Эндпоинт для входа с подключением к базе данных
@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Проверяем пользователя в базе данных
        query = "SELECT UserID, Login FROM Users WHERE Login = ? AND Password = ?"
        cursor.execute(query, username, password)
        user = cursor.fetchone()

        if user:
            return jsonify({"message": "Login successful", "user": username}), 200
        else:
            return jsonify({"message": "Invalid username or password"}), 401
    except Exception as e:
        print("Database error:", e)
        return jsonify({"message": "Internal server error"}), 500
    finally:
        conn.close()

if __name__ == "__main__":
    app.run(debug=True)
