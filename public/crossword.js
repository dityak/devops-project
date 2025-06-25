fetch('/api/crossword')
  .then(res => res.json())
  .then(data => {
    const { grid, clues } = data;
    const crosswordDiv = document.getElementById('crossword');
    const cluesDiv = document.getElementById('clues');

    // Render grid
    crosswordDiv.innerHTML = grid.map(row =>
      `<div style="display:flex">${row.map(cell =>
        `<input style="width:30px;height:30px;text-transform:uppercase;text-align:center" maxlength="1" ${cell === "" ? "disabled" : ""}>`).join('')}</div>`
    ).join('');

    // Render clues
    cluesDiv.innerHTML = `
      <strong>Across:</strong><br>${Object.entries(clues.across).map(([k, v]) => `${k}. ${v}`).join('<br>')}
      <br><br>
      <strong>Down:</strong><br>${Object.entries(clues.down).map(([k, v]) => `${k}. ${v}`).join('<br>')}
    `;
  });
