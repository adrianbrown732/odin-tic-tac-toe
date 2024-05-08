function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      const name = `row[${i}], column[${j}]`;
      board[i].push(Cell(name));
    }
  }

  const cell1 = board[0][0];
  const cell2 = board[0][1];
  const cell3 = board[0][2];
  const cell4 = board[1][0];
  const cell5 = board[1][1];
  const cell6 = board[1][2];
  const cell7 = board[2][0];
  const cell8 = board[2][1];
  const cell9 = board[2][2];
}

function Cell(name) {
  let value = 0;
  let isClosed = false;
  let markedBy;

  const showName = () => name;
  const showValue = () => value;
  const showStatus = () => (isClosed ? "CLOSED" : "OPEN");
  const showMark = () => markedBy;
  const setValue = ([playerValue, playerMark]) => {
    if (isClosed) {
      console.log("ILLEGAL MOVE");
      return;
    }
    value = playerValue;
    markedBy = playerMark;
    isClosed = true;
  };
  return { setValue };
}

function CreatePlayer(name, value) {
  const newPlayer = { name, value };
  const addMark = () => [value, name];
  return { addMark };
}

const player1 = CreatePlayer("player1", 1);
const player2 = CreatePlayer("player2", 2);

console.log(cell1.showStatus());
console.log(cell1.showMark());
console.log(cell1.showValue());

cell1.setValue(player1.addMark());

console.log(cell1.showStatus());
console.log(cell1.showMark());
console.log(cell1.showValue());
