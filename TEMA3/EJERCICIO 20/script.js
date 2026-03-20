const size = 5;
const board = document.getElementById('board');
let cells = [];
function createBoard() {
    for (let r = 0; r < size; r++) {
        cells[r] = [];
        for (let c = 0; c < size; c++) {
            const div = document.createElement('div');
            div.classList.add('cell');
            div.onclick = () => toggleLights(r, c);
            board.appendChild(div);
            cells[r][c] = div;
        }
    }
}
function toggleLights(r, c) {
    toggleCell(r, c);      
    toggleCell(r - 1, c);  
    toggleCell(r + 1, c); 
    toggleCell(r, c - 1);  
    toggleCell(r, c + 1);   
    checkWin();
}
function toggleCell(r, c) {
    if (r >= 0 && r < size && c >= 0 && c < size) {
        cells[r][c].classList.toggle('on');
    }
}
function setupGame() {
    for (let i = 0; i < 15; i++) {
        let r = Math.floor(Math.random() * size);
        let c = Math.floor(Math.random() * size);
        toggleLights(r, c);
    }
}
function checkWin() {
    const allOff = document.querySelectorAll('.on').length === 0;
    if (allOff && document.querySelectorAll('.cell').length > 0) {
        setTimeout(() => alert("¡Ganaste!"), 100);
    }
}
createBoard();
setupGame();
