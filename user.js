const userData = {
    id: 1,
    name: "User 1",
    email: "user1@example.com",
    exams: [
        { id: 1, name: "Math Exam", date: "2024-12-10" },
        { id: 2, name: "Science Exam", date: "2024-12-15" },
    ],
    results: [],
};

function openSection(section) {
    const userContent = document.getElementById("user-content");
    userContent.innerHTML = ""; // Clear content

    if (section === "start-exam") {
        startExam(userContent);
    } else if (section === "view-results") {
        viewResults(userContent);
    } else if (section === "edit-profile") {
        editProfile(userContent);
    }
}

function startExam(container) {
    container.innerHTML = `<h3>Available Exams</h3>`;
    if (sharedData.exams.length === 0) {
        container.innerHTML += "<p>No exams available at the moment.</p>";
        return;
    }

    sharedData.exams.forEach((exam) => {
        const button = document.createElement("button");
        button.textContent = `Start ${exam.name}`;
        button.onclick = () => takeExam(exam);
        container.appendChild(button);
    });
}

function takeExam(exam) {
    const container = document.getElementById("user-content");
    container.innerHTML = `
        <h3>${exam.name}</h3>
        <form id="exam-form">
            <div class="question">
                <h4>1. Who Discovered zero?</h4>
                <label><input type="radio" name="q1" value="vikas">vikas</label>
                <label><input type="radio" name="q1" value="Aditya">Aditya</label>
                <label><input type="radio" name="q1" value="Srinivas Ramanujan">Srinivas Ramanujan</label>
                <label><input type="radio" name="q1" value="Arya Bhataa"> Arya Bhataa</label>
            </div>
            <button type="submit">Submit Exam</button>
        </form>
    `;

    document.getElementById("exam-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const answer = document.querySelector('input[name="q1"]:checked');
        const score = answer && answer.value === "Arya Bhataa" ? 100 : 0;

        const currentUser = sharedData.users.find((u) => u.id === userData.id);
        if (currentUser) {
            currentUser.results.push({ examId: exam.id, score });
        }

        alert("Exam submitted! Your score is " + score + "%");
        openSection("view-results");
    });
}

function viewResults(container) {
    container.innerHTML = `<h3>View Results</h3>`;
    const currentUser = sharedData.users.find((u) => u.id === userData.id);

    if (!currentUser || currentUser.results.length === 0) {
        container.innerHTML += "<p>No results available yet. Take an exam to see your results.</p>";
        return;
    }

    const resultsTable = document.createElement("table");
    resultsTable.innerHTML = `
        <tr>
            <th>Exam Name</th>
            <th>Score (%)</th>
        </tr>
        ${currentUser.results
            .map((result) => {
                const exam = sharedData.exams.find((e) => e.id === result.examId);
                return `
                <tr>
                    <td>${exam ? exam.name : "Unknown Exam"}</td>
                    <td>${result.score}</td>
                </tr>`;
            })
            .join("")}
    `;
    container.appendChild(resultsTable);
}
function viewResultsAdmin(container) {
    container.innerHTML = `<h3>All Results</h3>`;

    if (sharedData.users.every((user) => user.results.length === 0)) {
        container.innerHTML += "<p>No results available yet.</p>";
        return;
    }

    sharedData.users.forEach((user) => {
        if (user.results.length > 0) {
            const userResultsTable = document.createElement("table");
            userResultsTable.innerHTML = `
                <caption>${user.name}'s Results</caption>
                <tr>
                    <th>Exam Name</th>
                    <th>Score (%)</th>
                </tr>
                ${user.results
                    .map((result) => {
                        const exam = sharedData.exams.find((e) => e.id === result.examId);
                        return `
                        <tr>
                            <td>${exam ? exam.name : "Unknown Exam"}</td>
                            <td>${result.score}</td>
                        </tr>`;
                    })
                    .join("")}
            `;
            container.appendChild(userResultsTable);
        }
    });
}


function editProfile(container) {
    container.innerHTML = `
        <h3>Edit Profile</h3>
        <form id="profile-form">
            <label for="name">Name:</label>
            <input type="text" id="name" value="${userData.name}" required>

            <label for="email">Email:</label>
            <input type="email" id="email" value="${userData.email}" required>

            <button type="submit">Save Changes</button>
        </form>
    `;

    document.getElementById("profile-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const newName = document.getElementById("name").value;
        const newEmail = document.getElementById("email").value;

        userData.name = newName;
        userData.email = newEmail;

        document.getElementById("username-display").textContent = newName;
        alert("Profile updated successfully!");
    });
}

