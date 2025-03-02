
const users = [
    { id: 1, name: "User 1", email: "user1@example.com" },
    { id: 2, name: "User 2", email: "user2@example.com" },
];

const exams = [
    { id: 1, name: "Math Exam", date: "2024-12-10" },
    { id: 2, name: "Science Exam", date: "2024-12-15" },
];

const results = [
    { userId: 1, examId: 1, score: 80 },
    { userId: 2, examId: 2, score: 90 },
];

function openSection(section) {
    const adminContent = document.getElementById("admin-content");
    adminContent.innerHTML = ""; // Clear content

    if (section === "manage-users") {
        manageUsers(adminContent);
    } else if (section === "manage-exams") {
        manageExams(adminContent);
    } else if (section === "view-results") {
        viewResults(adminContent);
    }
}

function manageUsers(container) {
    container.innerHTML = `<h3>Manage Users</h3>`;
    const userTable = document.createElement("table");
    userTable.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
        ${users
            .map(
                (user) => `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="editUser(${user.id})">Edit</button>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                </td>
            </tr>
        `
            )
            .join("")}
    `;
    container.appendChild(userTable);
    container.innerHTML += `<button onclick="addUser()">Add New User</button>`;
}

function addUser() {
    const name = prompt("Enter user name:");
    const email = prompt("Enter user email:");
    if (name && email) {
        const newUser = { id: users.length + 1, name, email };
        users.push(newUser);
        alert("User added successfully!");
        openSection("manage-users");
    }
}

function editUser(id) {
    const user = users.find((u) => u.id === id);
    if (user) {
        const newName = prompt("Edit user name:", user.name);
        const newEmail = prompt("Edit user email:", user.email);
        user.name = newName || user.name;
        user.email = newEmail || user.email;
        alert("User updated successfully!");
        openSection("manage-users");
    }
}

function deleteUser(id) {
    const index = users.findIndex((u) => u.id === id);
    if (index > -1) {
        users.splice(index, 1);
        alert("User deleted successfully!");
        openSection("manage-users");
    }
}

function manageExams(container) {
    container.innerHTML = `<h3>Manage Exams</h3>`;
    const examTable = document.createElement("table");
    examTable.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Actions</th>
        </tr>
        ${sharedData.exams
            .map(
                (exam) => `
            <tr>
                <td>${exam.id}</td>
                <td>${exam.name}</td>
                <td>${exam.date}</td>
                <td>
                    <button onclick="editExam(${exam.id})">Edit</button>
                    <button onclick="deleteExam(${exam.id})">Delete</button>
                </td>
            </tr>
        `
            )
            .join("")}
    `;
    container.appendChild(examTable);
    container.innerHTML += `<button onclick="addExam()">Add New Exam</button>`;
}

function addExam() {
    const name = prompt("Enter exam name:");
    const date = prompt("Enter exam date (YYYY-MM-DD):");
    if (name && date) {
        const newExam = {
            id: sharedData.exams.length + 1,
            name,
            date,
        };
        sharedData.exams.push(newExam);
        alert("Exam added successfully!");
        openSection("manage-exams");
    }
}

function editExam(id) {
    const exam = sharedData.exams.find((e) => e.id === id);
    if (exam) {
        const newName = prompt("Edit exam name:", exam.name);
        const newDate = prompt("Edit exam date:", exam.date);
        exam.name = newName || exam.name;
        exam.date = newDate || exam.date;
        alert("Exam updated successfully!");
        openSection("manage-exams");
    }
}

function deleteExam(id) {
    const index = sharedData.exams.findIndex((e) => e.id === id);
    if (index > -1) {
        sharedData.exams.splice(index, 1);
        alert("Exam deleted successfully!");
        openSection("manage-exams");
    }
}


function viewResults(container) {
    container.innerHTML = `<h3>View Results</h3>`;
    const resultTable = document.createElement("table");
    resultTable.innerHTML = `
        <tr>
            <th>User</th>
            <th>Exam</th>
            <th>Score</th>
        </tr>
        ${results
            .map((result) => {
                const user = users.find((u) => u.id === result.userId);
                const exam = exams.find((e) => e.id === result.examId);
                return `
                <tr>
                    <td>${user ? user.name : "Unknown"}</td>
                    <td>${exam ? exam.name : "Unknown"}</td>
                    <td>${result.score}%</td>
                </tr>
            `;
            })
            .join("")}
    `;
    container.appendChild(resultTable);
}
