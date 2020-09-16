const resetBtn = document.getElementById("reset-button");
const cellDivs = document.querySelectorAll(".grid .cell");
const finalMessage = document.querySelector(".final-message");
const winningMessage = document.querySelector(".winning-message");

let xTurn = true;

const x = 'x';
const o = 'o';

const xClass = "is-x";
const oClass = "is-o";

const winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

// Game function

function startGame(){
	xTurn = true;
	for (const cellDiv of cellDivs) {
		cellDiv.innerHTML = "";
		cellDiv.classList.remove(xClass);
		cellDiv.classList.remove(oClass);
		cellDiv.removeEventListener('click', handleCell);
		cellDiv.addEventListener('click', handleCell, {once : true});
	}

	finalMessage.classList.add('hidden');
}


//Event Handlers

const handleCell = (e) => {
	const cell = e.target;
	const currentClass = xTurn ? xClass : oClass;
	const currentPlayer = xTurn ? x : o;
	placeMark(cell, currentClass, currentPlayer);

	//Check for win & draw
	if(checkWin(currentClass)){
		endgame(false)
	} else if(isDraw()){
		endgame(true)
	} else {
		switchPlayer()
	}
}

//Supporting functions

const placeMark = (cell, currentClass, currentPlayer) => {
	cell.classList.add(currentClass);
	cell.innerHTML = currentPlayer;
}

const switchPlayer = () => {
	xTurn = !xTurn
}

const checkWin = (currentClass) => {
	return winningCombinations.some(combination => {
		return combination.every(index => {
			return cellDivs[index].classList.contains(currentClass);
		})
	})
	
}

const isDraw = () => {
	return [...cellDivs].every(cell => {
		return cell.classList.contains(xClass) ||
		cell.classList.contains(oClass)
	})
}

const endgame = (draw) => {
	if(draw){
		winningMessage.innerText = '--Draw--'
	} else {
		winningMessage.innerText = `${xTurn ? 'x' : 'o'} Wins!`
	}

	finalMessage.classList.remove('hidden');
}

//Event Listeners
resetBtn.addEventListener('click', startGame);

startGame()