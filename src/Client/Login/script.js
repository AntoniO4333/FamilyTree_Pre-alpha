document.addEventListener("DOMContentLoaded", () => {
    // Проверяем подключение Ant Design
    if (typeof antd === "undefined") {
        console.error("Ant Design library is not loaded!");
        alert("Ant Design library is not loaded! Please check your HTML file.");
        return;
    }

    // Логика для формы логина
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!username || !password) {
                antd.message.error("Please fill in all fields.");
                return;
            }

            try {
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Response received from server:", result);
                    antd.message.success(result.message);
                    // Редирект на главную страницу
                    window.location.href = "/dashboard";
                } else {
                    const error = await response.json();
                    console.error("Error response from server:", error);
                    antd.message.error(error.message);
                }
            } catch (error) {
                console.error("Error:", error);
                antd.message.error("Something went wrong. Please try again.");
            }
        });
    }

    // Логика для формы регистрации
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const login = document.getElementById("login").value.trim();
            const password = document.getElementById("password").value.trim();
            const email = document.getElementById("email").value.trim();
            const fullname = document.getElementById("fullname").value.trim();

            if (!login || !password || !email) {
                antd.message.error("Please fill in required fields.");
                return;
            }

            try {
                const response = await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ login, password, email, fullname }),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Registration successful:", result);
                    antd.message.success("Registration successful!");
                    // Перенаправление на страницу логина
                    window.location.href = "/";
                } else {
                    const error = await response.json();
                    console.error("Error during registration:", error);
                    antd.message.error(error.error || "An error occurred during registration.");
                }
            } catch (error) {
                console.error("Error:", error);
                antd.message.error("Something went wrong. Please try again.");
            }
        });
    }
});
