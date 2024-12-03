from flask import Flask, send_from_directory, request, jsonify

app = Flask(__name__)

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



# Имитация базы данных
users = {
    "johndoe": "password123",
    "janedoe": "securepass",
    "admin": "adminpass"
}

@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if username in users and users[username] == password:
        return jsonify({"message": "Login successful", "user": username}), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401



if __name__ == "__main__":
    app.run(debug=True)
