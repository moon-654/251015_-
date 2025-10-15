const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const dateLabel = document.getElementById("date");
const toggleButton = document.getElementById("toggle-second-hand");

let showSeconds = true;

function pad(number) {
    return number.toString().padStart(2, "0");
}

function formatDate(now) {
    return now.toLocaleDateString("ko-KR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function updateClock() {
    const now = new Date();
    hours.textContent = pad(now.getHours());
    minutes.textContent = pad(now.getMinutes());
    seconds.textContent = pad(now.getSeconds());
    dateLabel.textContent = formatDate(now);
}

toggleButton.addEventListener("click", () => {
    showSeconds = !showSeconds;
    seconds.classList.toggle("hidden", !showSeconds);
    document.querySelectorAll(".separator")[1].classList.toggle("hidden", !showSeconds);
    toggleButton.textContent = showSeconds ? "초 숨기기" : "초 보기";
});

updateClock();
setInterval(updateClock, 1_000);
