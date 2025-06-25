document.getElementById('username').innerText = localStorage.getItem('name');
let time = 30;
let correctAnswer = "";

fetch('/api/question')
  .then(res => res.json())
  .then(data => {
    document.getElementById('question').innerText = data.question;
    correctAnswer = data.answer.toLowerCase().trim();
  });

let timer = setInterval(() => {
  time--;
  document.getElementById('timer').innerText = time;
  if (time <= 0) {
    clearInterval(timer);
    document.getElementById('result').innerText = '⏰ Time’s up!';
  }
}, 1000);

function submitAnswer() {
  const answer = document.getElementById('answer').value.toLowerCase().trim();
  clearInterval(timer);

  const correct = answer === correctAnswer;
  document.getElementById('result').innerText = correct ? "✅ Correct!" : "❌ Incorrect";

  let score = parseInt(localStorage.getItem('score') || 0);
  let streak = parseInt(localStorage.getItem('streak') || 0);

  if (correct) {
    localStorage.setItem('score', score + 1);
    localStorage.setItem('streak', streak + 1);
  } else {
    localStorage.setItem('streak', 0);
  }

  setTimeout(() => {
    window.location.href = "results.html";
  }, 2000);
}
