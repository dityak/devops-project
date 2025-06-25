// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');
const app = express();
const PORT = 3000;

let currentQuestion = null;
let currentCrossword = null;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Load riddles and crosswords from file
const questions = JSON.parse(fs.readFileSync('./questions.json'));
const crosswords = JSON.parse(fs.readFileSync('./crosswords.json'));

// Ensure data folder exists
const dataPath = path.join(__dirname, 'data');
if (!fs.existsSync(dataPath)) fs.mkdirSync(dataPath);

// Function to rotate riddle daily
function setDailyQuestion() {
  const index = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[index];
  fs.writeFileSync('./daily_question.json', JSON.stringify(currentQuestion));
}

// Function to rotate crossword daily
function setDailyCrossword() {
  const index = Math.floor(Math.random() * crosswords.length);
  currentCrossword = crosswords[index];
  fs.writeFileSync('./daily_crossword.json', JSON.stringify(currentCrossword));
}

// Run once on start
setDailyQuestion();
setDailyCrossword();

// Run every 24 hours
cron.schedule('0 0 * * *', () => {
  setDailyQuestion();
  setDailyCrossword();
});

// API to get daily riddle
app.get('/api/question', (req, res) => {
  const question = JSON.parse(fs.readFileSync('./daily_question.json'));
  res.json(question);
});

// API to check riddle answer
app.post('/api/answer', (req, res) => {
  const { answer } = req.body;
  const correctAnswerRaw = currentQuestion.answer;
  const correctAnswer = correctAnswerRaw.toLowerCase().replace(/[^a-z0-9]/gi, '');
  const userAnswer = answer.toLowerCase().replace(/[^a-z0-9]/gi, '');
  const correct = userAnswer === correctAnswer;
  res.json({ correct, correctAnswer: correct ? undefined : correctAnswerRaw });
});

// API to get daily crossword
app.get('/api/crossword', (req, res) => {
  const crossword = JSON.parse(fs.readFileSync('./daily_crossword.json'));
  res.json(crossword);
});

// API to save user data
app.post('/api/user', (req, res) => {
  const { name, email } = req.body;
  const usersFile = path.join(dataPath, 'users.json');
  let users = [];

  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile));
  }

  const existingIndex = users.findIndex(u => u.email === email);
  if (existingIndex >= 0) {
    users[existingIndex].name = name;
    users[existingIndex].lastVisit = new Date().toISOString();
  } else {
    users.push({ name, email, firstVisit: new Date().toISOString(), lastVisit: new Date().toISOString() });
  }

  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});