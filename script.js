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

function setPlayer1() {
  const name = prompt("Enter player name: ");
  console.log(`Hello, ${name.toUpperCase()}!`);
  return CreatePlayer(name, "X");
}

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

GameController();
