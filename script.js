const spreadsheet = document.getElementById('spreadsheet');

for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
        const cell = document.createElement('div');
        cell.contentEditable = true; 
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        spreadsheet.appendChild(cell);
    }
}

document.addEventListener('keydown', function(event) {
    const activeElement = document.activeElement;
    if (activeElement.classList.contains('cell')) {
        const row = parseInt(activeElement.dataset.row);
        const col = parseInt(activeElement.dataset.col);

        switch (event.key) {
            case 'ArrowUp':
                moveFocus(row - 1, col);
                break;
            case 'ArrowDown':
                moveFocus(row + 1, col);
                break;
            case 'ArrowLeft':
                moveFocus(row, col - 1);
                break;
            case 'ArrowRight':
                moveFocus(row, col + 1);
                break;
        }
    }
});

function moveFocus(row, col) {
    const targetCell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
    if (targetCell) {
        targetCell.focus();
    }
}

spreadsheet.addEventListener('input', function(event) {
    const cell = event.target;
    const content = cell.textContent;

    if (content.startsWith('=')) {
        try {
            const formula = content.substring(1);
            const result = eval(formula);
            cell.textContent = result;
        } catch (e) {
            cell.textContent = 'ERROR';
        }
    }
});

document.getElementById('save').addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');
    const data = Array.from(cells).map(cell => cell.textContent);
    localStorage.setItem('spreadsheetData', JSON.stringify(data));
});

document.getElementById('load').addEventListener('click', () => {
    const data = JSON.parse(localStorage.getItem('spreadsheetData'));
    if (data) {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = data[index] || '';
        });
    }
});

document.getElementById('clear').addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');
});
