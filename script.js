function playTicTacToe() {
  const players = ["player1", "player2"];
  const squares = document.querySelectorAll("[data-square]");
  const button = document.querySelector("button");
  const activeIconParent = document.querySelector(".active-player");
  const activeIcon = document.querySelector(".active-player > div");
  let activePlayer = players[0];

  const CreateSquare = (square) => {
    const getStatus = () => {
      console.log(square.getAttribute("data-square", "true"));
      return square.getAttribute("data-square", "true");
    };
    return { getStatus };
  };

  const updatePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const moveIcon = () => {
    activeIconParent.classList.toggle("switch-player");
  };
  const fadeOutIcon = () => {
    activeIcon.style.opacity = "0";
  };
  const fadeInIcon = () => {
    activeIcon.style.opacity = "1";
  };

  button.addEventListener("click", resetGame);

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.getAttribute("data-square", "true")) return;

      if (activePlayer === "player1") {
        square.appendChild(setX());
        square.setAttribute("data-icon", "1");
        console.log(square.getAttribute("data-icon"));
      } else {
        square.appendChild(setO());
        square.setAttribute("data-icon", "2");
        console.log(square.getAttribute("data-icon"));
      }
      square.setAttribute("data-square", "true");
    });
  });

  function setX() {
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.classList.toggle("x");
    icon.classList.toggle("icon");
    icon.setAttribute("viewBox", "0 0 100 100");
    icon.setAttribute("width", "115");

    const rect1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    rect1.classList.toggle("line");
    rect1.classList.toggle("left");
    rect1.setAttributeNS(null, "width", "80");
    rect1.setAttributeNS(null, "height", "10");
    rect1.setAttributeNS(null, "x", "10");
    rect1.setAttributeNS(null, "y", "45");

    const rect2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    rect2.classList.toggle("line");
    rect2.classList.toggle("right");
    rect2.setAttributeNS(null, "width", "80");
    rect2.setAttributeNS(null, "height", "10");
    rect2.setAttributeNS(null, "x", "10");
    rect2.setAttributeNS(null, "y", "45");

    icon.appendChild(rect1);
    icon.appendChild(rect2);

    switchPlayer();

    return icon;
  }

  function setO() {
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.classList.toggle("o");
    icon.classList.toggle("icon");
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

    switchPlayer();

    return icon;
  }

  function resetGame() {
    squares.forEach((square) => {
      if (square.getAttribute("data-square", "true")) {
        const icons = document.querySelectorAll("div > .icon");

        icons.forEach((icon) => {
          icon.style.opacity = "0";
        });

        setTimeout(() => {
          const child = document.querySelector("div > .icon");
          square.removeChild(child);
          square.setAttribute("data-square", "");
        }, 500);

        if (activePlayer === players[1]) {
          activePlayer = players[0];
          fadeOutIcon();

          setTimeout(() => {
            activeIconParent.classList.remove("switch-player");
            fadeInIcon();
          }, 200);
        }
      }
    });
  }

  function switchPlayer() {
    fadeOutIcon();

    setTimeout(() => {
      moveIcon();
      fadeInIcon();
    }, 200);

    updatePlayer();
  }
}

playTicTacToe();

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

const newBoard = CreateBoard();

function CreateBoard() {
  const board = [];
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
