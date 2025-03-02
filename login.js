const users = {
    user: { username: "user1", password: "user123" },
    admin: { username: "admin1", password: "admin123" },
};

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (
        users[role] &&
        users[role].username === username &&
        users[role].password === password
    ) {
        if (role === "user") {
            window.location.href = "user.html";
        } else if (role === "admin") {
            window.location.href = "admin.html";
        }
    } else {
        const errorMessage = document.getElementById("error-message");
        errorMessage.style.display = "block";
    }
});
