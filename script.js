function CreatePlayer(value) {
  const playerName = `player${value}`;
  const player = document.querySelector(`[data-player-name="${playerName}"]`);

  const getValue = () => value;
  const getPlayerNumber = () => value;

  const setName = () => {
    if (player.getAttribute("data-name-set")) return;
    player.textContent = prompt(`Enter Player ${value} name: `);
    player.setAttribute("data-name-set", "true");
  };

  const resetName = () => {
    player.removeAttribute("data-name-set");
  };

  return {
    getValue,
    getPlayerNumber,
    setName,
    resetName,
  };
}

function CreateSquareGrid(array) {
  const board = [];
  const rows = 3;
  const cols = 3;
  index = 0;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(array[index]);
      index++;
    }
  }
  return board;
}

function setSquares(array) {
  const rows = 3;
  const cols = 3;
  let index = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      array[index].setAttribute("data-row", `${i}`);
      array[index].setAttribute("data-col", `${j}`);
      index++;
    }
  }
}

function playTicTacToe() {
  // Set players

  const players = [];
  let winningSquares = [];
  const setNameButtonP1 = document.querySelector("[data-button='player1']");
  const setNameButtonP2 = document.querySelector("[data-button='player2']");

  for (let i = 0; i < 2; i++) {
    players[i] = CreatePlayer(i + 1);
  }

  setNameButtonP1.addEventListener("click", () => {
    players[0].setName();
  });
  setNameButtonP2.addEventListener("click", () => {
    players[1].setName();
  });

  //   Active player control

  let activePlayer = players[0];

  const statusIcon = document.querySelector(".status-icon");

  const classes = statusIcon.classList;

  const fadeOutIcon = () => {
    statusIcon.style.opacity = "0";
  };

  const fadeInIcon = () => {
    statusIcon.style.opacity = "1";
  };

  const moveRight = () => {
    fadeOutIcon();
    setTimeout(() => {
      classes.replace("move-left", "move-right");
      fadeInIcon();
    }, 200);
  };

  const moveLeft = () => {
    fadeOutIcon();
    setTimeout(() => {
      classes.replace("move-right", "move-left");
      fadeInIcon();
    }, 200);
  };

  const switchPlayer = () => {
    activePlayer.getPlayerNumber() === 1 ? moveRight() : moveLeft();
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  // Squares control

  const squares = document.querySelectorAll("[data-square]");

  setSquares(squares);

  const squareGrid = CreateSquareGrid(squares);

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.getAttribute("data-square-closed", "true")) return;

      activePlayer.getPlayerNumber() === 1
        ? square.appendChild(setX())
        : square.appendChild(setO());

      square.setAttribute("data-icon", activePlayer.getValue());
      square.setAttribute("data-square-closed", "true");

      if (checkForWin(square)) {
        setWinner();
        endGame();
      } else {
        switchPlayer();
      }
    });
  });

  const clearSquares = () => {
    squares.forEach((square) => {
      square.removeAttribute("data-square-closed");
    });
  };

  // Set player properties

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

    return icon;
  }

  // Check win conditions

  function checkForWin(element) {
    const checkSquare = (index) => {
      return element === squares[index];
    };

    // Check if diagonal square was selected

    const isWin = (index1, index2, index3) => {
      return (
        squares[index1].getAttribute("data-icon") ===
          squares[index2].getAttribute("data-icon") &&
        squares[index1].getAttribute("data-icon") ===
          squares[index3].getAttribute("data-icon")
      );
    };

    if (checkSquare(0) || checkSquare(4) || checkSquare(8)) {
      if (isWin(0, 4, 8)) {
        winningSquares = [squares[0], squares[4], squares[8]];
        return true;
      }
    }

    if (checkSquare(2) || checkSquare(4) || checkSquare(6)) {
      if (isWin(2, 4, 6)) {
        winningSquares = [squares[2], squares[4], squares[6]];
        return true;
      }
    }

    // Check row of selected square

    const getRow = () => element.getAttribute("data-row");

    const isRowWin = () => {
      return (
        squareGrid[getRow()][0].getAttribute("data-icon") ===
          squareGrid[getRow()][1].getAttribute("data-icon") &&
        squareGrid[getRow()][0].getAttribute("data-icon") ===
          squareGrid[getRow()][2].getAttribute("data-icon")
      );
    };

    if (isRowWin()) {
      winningSquares = [
        squareGrid[getRow()][0],
        squareGrid[getRow()][1],
        squareGrid[getRow()][2],
      ];
      return true;
    }

    // Check column of selected square

    const getCol = () => element.getAttribute("data-col");

    const isColWin = () => {
      return (
        squareGrid[0][getCol()].getAttribute("data-icon") ===
          squareGrid[1][getCol()].getAttribute("data-icon") &&
        squareGrid[0][getCol()].getAttribute("data-icon") ===
          squareGrid[2][getCol()].getAttribute("data-icon")
      );
    };

    if (isColWin()) {
      winningSquares = [
        squareGrid[0][getCol()],
        squareGrid[1][getCol()],
        squareGrid[2][getCol()],
      ];
      return true;
    }
    return false;
  }

  function setWinner() {
    classes.toggle("winner");

    winningSquares.forEach((square) => {
      square.setAttribute("data-win", "true");
    });

    const children = document.querySelectorAll("[data-win='true'] > .icon");
    if (activePlayer.getPlayerNumber() === 1) {
      children.forEach((child) => {
        child.style.fill = "var(--green)";
      });
    } else {
      children.forEach((child) => {
        child.style.stroke = "var(--green)";
      });
    }
  }

  //   End game

  function endGame() {
    squares.forEach((square) => {
      square.setAttribute("data-square-closed", "true");
    });
  }

  // Reset game

  function resetGame() {
    classes.remove("winner");

    players[0].resetName();
    players[1].resetName();

    squares.forEach((square) => {
      if (square.getAttribute("data-square-closed")) {
        const icons = document.querySelectorAll("div > .icon");

        icons.forEach((icon) => {
          icon.style.opacity = "0";
        });

        if (square.getAttribute("data-icon")) {
          square.removeAttribute("data-icon");

          setTimeout(() => {
            const child = document.querySelector("div > .icon");
            square.removeChild(child);
            clearSquares();

            winningSquares.forEach((square) => {
              square.removeAttribute("data-win");
            });
            winningSquares = [];
          }, 200);
        }

        if (activePlayer.getPlayerNumber() === 2) {
          activePlayer = players[0];
          moveLeft();
        }
      }
    });
  }

  const resetButton = document.querySelector(".reset");

  resetButton.addEventListener("click", resetGame);
}

playTicTacToe();
