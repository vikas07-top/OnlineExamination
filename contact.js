document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
        // Simulate form submission
        const formResponse = document.getElementById("form-response");
        formResponse.textContent = `Thank you, ${name}. We have received your message and will get back to you at ${email}.`;
        formResponse.style.color = "green";

        // Clear the form fields
        document.getElementById("contact-form").reset();
    } else {
        const formResponse = document.getElementById("form-response");
        formResponse.textContent = "Please fill out all fields.";
        formResponse.style.color = "red";
    }
});
