let correctAnswers = [
  ["C", "A", "T", "", ""],
  ["", "", "R", "", ""],
  ["D", "O", "G", "", ""]
];

fetch('daily_crossword.json')
  .then(res => res.json())
  .then(data => {
    const { grid, clues } = data;
    const crosswordDiv = document.getElementById('crossword');
    const labelsDiv = document.getElementById('labels');

    // Add column numbers
    let topLabels = document.createElement('div');
    topLabels.style.display = 'flex';
    for (let i = 0; i < grid[0].length; i++) {
      let label = document.createElement('div');
      label.className = 'number-label';
      label.innerText = i + 1;
      topLabels.appendChild(label);
    }
    labelsDiv.appendChild(topLabels);

    // Add row labels + crossword input grid
    crosswordDiv.innerHTML = '';
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        let input = document.createElement('input');
        input.className = 'cell';
        input.maxLength = 1;
        if (cell === "") input.disabled = true;
        crosswordDiv.appendChild(input);
      });
    });

    // Render clues
    const cluesDiv = document.getElementById('clues');
    cluesDiv.innerHTML = `
      <strong>Across:</strong><br>${Object.entries(clues.across).map(([k, v]) => `${k}. ${v}`).join('<br>')}
      <br><br>
      <strong>Down:</strong><br>${Object.entries(clues.down).map(([k, v]) => `${k}. ${v}`).join('<br>')}
    `;
  });

function checkAnswers() {
  const inputs = document.querySelectorAll('.cell');
  let correct = true;
  let index = 0;

  for (let row = 0; row < correctAnswers.length; row++) {
    for (let col = 0; col < correctAnswers[row].length; col++) {
      if (correctAnswers[row][col] !== "") {
        const value = inputs[index].value.toUpperCase();
        if (value !== correctAnswers[row][col]) {
          correct = false;
        }
      }
      index++;
    }
  }

  document.getElementById('feedback').innerText = correct ? "✅ Correct!" : "❌ Incorrect, try again!";
}
