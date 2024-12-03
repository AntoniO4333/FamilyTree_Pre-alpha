from flask import Flask, send_from_directory

app = Flask(__name__)

# Маршрут для страницы логина
@app.route("/")
def login():
    return send_from_directory("src/Client/Login", "login.html")

# Маршрут для статических файлов (CSS, JS, изображения)
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory("src/Client/Login", filename)

if __name__ == "__main__":
    app.run(debug=True)
