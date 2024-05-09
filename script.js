function GameBoard() {
  const rows = 3;
  const columns = 3;
  const cellRow = ["a", "b", "c"];
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      const name = `${cellRow[i]}${j + 1}`;
      board[i].push(Cell(name));
    }
  }
  return board;
}

function Cell(value) {
  const name = value;

  let isClosed = false;
  let markedBy;

  const getPlayerName = () => markedBy;
  const getValue = () => value;
  const getStatus = () => isClosed;
  const setValue = ([playerValue, playerMark]) => {
    value = playerValue;
    markedBy = playerMark;
    isClosed = true;

    console.log(`${markedBy} takes square ${name}`);
  };
  return { setValue, getPlayerName, getValue, getStatus };
}

function setMove(player, location) {
  location.setValue(player.addMark());
}

function CreatePlayer(name, value) {
  const addMark = () => [value, name];
  const getName = () => name;
  return { addMark, getName };
}

function setX() {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.classList.toggle("x");
  icon.setAttribute("viewBox", "0 0 100 100");
  icon.setAttribute("width", "115");

  const rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect1.classList.toggle("line");
  rect1.classList.toggle("left");
  rect1.setAttributeNS(null, "width", "80");
  rect1.setAttributeNS(null, "height", "10");
  rect1.setAttributeNS(null, "x", "10");
  rect1.setAttributeNS(null, "y", "45");

  const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect2.classList.toggle("line");
  rect2.classList.toggle("right");
  rect2.setAttributeNS(null, "width", "80");
  rect2.setAttributeNS(null, "height", "10");
  rect2.setAttributeNS(null, "x", "10");
  rect2.setAttributeNS(null, "y", "45");

  icon.appendChild(rect1);
  icon.appendChild(rect2);

  this.appendChild(icon);
}

function setO() {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.classList.toggle("o");
  icon.setAttribute("viewBox", "0 0 100 100");
  icon.setAttribute("width", "115");

  const ellipse = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "ellipse"
  );
  ellipse.classList.toggle("line");
  ellipse.setAttributeNS(null, "rx", "30");
  ellipse.setAttributeNS(null, "ry", "30");
  ellipse.setAttributeNS(null, "cx", "50");
  ellipse.setAttributeNS(null, "cy", "50");

  icon.appendChild(ellipse);

  this.appendChild(icon);
}

const testButton = document.querySelector(".testPush");
testButton.addEventListener("click", setO);

function switchPlayer() {
  const activePlayer = document.querySelector(".active-player");
  activePlayer.classList.toggle("switch-player");
}

const button = document.querySelector("button");

button.addEventListener("click", switchPlayer);

function setPlayer2() {
  const name = prompt("Enter player name: ");
  console.log(`Hello, ${name.toUpperCase()}!`);
  return CreatePlayer(name, "O");
}

function GameController() {
  const players = [setPlayer1(), setPlayer2()];
  let activePlayer = players[0];

  const board = GameBoard();

  const coordinates = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];

  const selection = [];

  selectio, (n["a1"] = board[0][0]);
  selection["a2"] = board[0][1];
  selection["a3"] = board[0][2];
  selection["b1"] = board[1][0];
  selection["b2"] = board[1][1];
  selection["b3"] = board[1][2];
  selection["c1"] = board[2][0];
  selection["c2"] = board[2][1];
  selection["c3"] = board[2][2];

  function printBoard() {
    const currentBoard = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(currentBoard);
  }

  function getPlayerInput() {
    let playerSelection;

    const isUndefined = (currentValue) => currentValue !== playerSelection;

    do {
      playerSelection = prompt("Enter coordinate: ");
    } while (coordinates.every(isUndefined));

    return playerSelection;
  }

  function setPlayerInput() {
    console.log(`${activePlayer.getName()}'s turn`);
    setMove(activePlayer, selection[getPlayerInput()]);
  }

  function switchPlayers() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  printBoard();

  setPlayerInput();
  printBoard();
  switchPlayers();

  setPlayerInput();
  printBoard();
  switchPlayers();
}
