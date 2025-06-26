let timeLeft = 30;
const timeEl = document.getElementById('time');
const feedback = document.getElementById('feedback');

fetch('/api/question')
    .then(res => res.json())
    .then(data => {
        document.getElementById('question').innerText = data.question;
    });

const timer = setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        timeEl.textContent = timeLeft;
    } else {
        clearInterval(timer);
        document.getElementById('submitBtn').disabled = true;
        feedback.innerText = "⏰ Time's up!";
    }
}, 1000);

document.getElementById('submitBtn').addEventListener('click', () => {
    const answer = document.getElementById('userAnswer').value;
    fetch('/api/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer })
    })
    .then(res => res.json())
    .then(data => {
        feedback.innerText = data.correct ? "✅ Correct!" : "❌ Incorrect. Try again tomorrow!";
        clearInterval(timer);
    });
});
