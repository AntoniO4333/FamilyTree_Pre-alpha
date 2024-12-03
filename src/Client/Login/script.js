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
                antd.message.success("Login successful!");
                console.log("User info:", result);
                // Перенаправление или другое действие
            } else {
                antd.message.error("Invalid username or password.");
            }
        } catch (error) {
            console.error("Error:", error);
            antd.message.error("Something went wrong. Please try again.");
        }
    });
});
