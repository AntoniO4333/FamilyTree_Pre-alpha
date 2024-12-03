document.addEventListener("DOMContentLoaded", () => {
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
                antd.message.success(result.message);
                console.log("User info:", result);
                // Например, редирект на другую страницу
                window.location.href = "/dashboard";
            } else {
                const error = await response.json();
                antd.message.error(error.message);
            }
        } catch (error) {
            console.error("Error:", error);
            antd.message.error("Something went wrong. Please try again.");
        }
    });
});
