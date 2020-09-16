const resetBtn = document.getElementById("reset-button");
const cellDivs = document.querySelectorAll(".grid .cell");

let xTurn = true;

const x = 'x';
const o = 'o';

const xClass = "is-x";
const oClass = "is-o";


//Event Handlers
const resetGame = (e) => {
	console.log(e);
}

const handleCell = (e) => {
	const cell = e.target;
	const currentClass = xTurn ? xClass : oClass;
	const currentPlayer = xTurn ? x : o;
	placeMark(cell, currentClass, currentPlayer);

	//switch player
	switchPlayer()
}

//Supporting functions

const placeMark = (cell, currentClass, currentPlayer) => {
	cell.classList.add(currentClass);
	cell.innerHTML = currentPlayer;
}

const switchPlayer = () => {
	xTurn = !xTurn
}

//Event Listeners
resetBtn.addEventListener('click', resetGame);

for (const cellDiv of cellDivs) {
	cellDiv.addEventListener('click', handleCell, {once : true});
}