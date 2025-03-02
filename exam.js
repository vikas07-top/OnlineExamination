// Timer Logic
let timer = 600; // 10 minutes in seconds
const timerDisplay = document.getElementById("timer");

const updateTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    if (timer > 0) {
        timer--;
        setTimeout(updateTimer, 1000);
    } else {
        alert("Time's up! The exam will be submitted automatically.");
        document.getElementById("exam-form").submit();
    }
};
updateTimer();

// Handle Exam Submission
document.getElementById("exam-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Exam Submitted Successfully!");
    window.location.href = "result.html";
});
