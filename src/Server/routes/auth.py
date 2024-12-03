from flask import Blueprint, request, jsonify
from db.users import get_user_by_login

auth_blueprint = Blueprint("auth", __name__)

# Эндпоинт для логина
@auth_blueprint.route("/login", methods=["POST"])
def login():
    data = request.json
    login = data.get("login")
    password = data.get("password")

    if not login or not password:
        return jsonify({"error": "Missing login or password"}), 400

    user = get_user_by_login(login)
    if not user:
        return jsonify({"error": "Invalid login or password"}), 401

    # Простое сравнение пароля
    stored_password = user[2]
    if password == stored_password:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid login or password"}), 401
