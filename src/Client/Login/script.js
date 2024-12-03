document.addEventListener("DOMContentLoaded", () => {
    // Проверяем, подключена ли библиотека Ant Design
    if (typeof antd === "undefined") {
        console.error("Ant Design library is not loaded!");
        alert("Ant Design library is not loaded! Please check your HTML file.");
        return;
    }

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (event) => {
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
                console.log("User info:", result);
                // Редирект на главную страницу
                window.location.href = "https://youtu.be/dQw4w9WgXcQ?si=_Ku6-3CvUu6hxB9Q";
            } else {
                const error = await response.json();
                console.log("Error response from server:", error);
                antd.message.error(error.message);
            }

        } catch (error) {
            console.error("Error:", error);
            antd.message.error("Something went wrong. Please try again.");
        }
    });
});
