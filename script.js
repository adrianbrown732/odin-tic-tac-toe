function playTicTacToe() {
  function CreatePlayer(value) {
    const playerName = `player${value}`;
    const player = document.querySelector(`[data-player-name="${playerName}"]`);

    const getValue = () => value;
    const getPlayerNumber = () => value;

    const setName = () => {
      if (player.getAttribute("data-name-set")) return;

      player.textContent = prompt(`Enter Player ${value} name: `).toLowerCase();
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

  // Create a 3x3 grid to hold reference of each playable square for later comparison inside isWinningSquare()
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

  // Assign individual row and column values to each playable square
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

  function endGame() {
    isGameOver = true;
    squares.forEach((square) => {
      square.setAttribute("data-square-closed", "true");
    });
  }

  function resetGame() {
    isGameOver = false;

    currentRound = 1;

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

  const players = [];
  let winningSquares = [];
  let currentRound = 1;
  let isGameOver = false;
  const setNameButtonP1 = document.querySelector("[data-button='player1']");
  const setNameButtonP2 = document.querySelector("[data-button='player2']");

  // Insert both players into an array in order to control the active player's turn
  for (let i = 0; i < 2; i++) {
    players[i] = CreatePlayer(i + 1);
  }

  setNameButtonP1.addEventListener("click", () => {
    players[0].setName();
  });
  setNameButtonP2.addEventListener("click", () => {
    players[1].setName();
  });

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

  const switchActivePlayer = () => {
    activePlayer.getPlayerNumber() === 1 ? moveRight() : moveLeft();
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const squares = document.querySelectorAll("[data-square]");

  setSquares(squares);

  const squareGrid = CreateSquareGrid(squares);

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.getAttribute("data-square-closed", "true")) return;

      activePlayer.getPlayerNumber() === 1
        ? square.appendChild(player1PlaysX())
        : square.appendChild(player2PlaysO());

      square.setAttribute("data-icon", activePlayer.getValue());
      square.setAttribute("data-square-closed", "true");

      if (currentRound >= 3) {
        if (isWinningSquare(square)) {
          setWinningPlayer();
          endGame();
        }
      }

      if (!isGameOver) {
        switchActivePlayer();
        if (activePlayer === players[0]) {
          currentRound++;
        }
      }
    });
  });

  const clearSquares = () => {
    squares.forEach((square) => {
      square.removeAttribute("data-square-closed");
    });
  };

  function player1PlaysX() {
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

  function player2PlaysO() {
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

  function isWinningSquare(element) {
    const isSquareEqualTo = (index) => {
      return element === squares[index];
    };

    const isDiagonalPathWinner = (index1, index2, index3) => {
      return (
        squares[index1].getAttribute("data-icon") ===
          squares[index2].getAttribute("data-icon") &&
        squares[index1].getAttribute("data-icon") ===
          squares[index3].getAttribute("data-icon")
      );
    };

    if (isSquareEqualTo(0) || isSquareEqualTo(4) || isSquareEqualTo(8)) {
      if (isDiagonalPathWinner(0, 4, 8)) {
        winningSquares = [squares[0], squares[4], squares[8]];
        return true;
      }
    }

    if (isSquareEqualTo(2) || isSquareEqualTo(4) || isSquareEqualTo(6)) {
      if (isDiagonalPathWinner(2, 4, 6)) {
        winningSquares = [squares[2], squares[4], squares[6]];
        return true;
      }
    }

    const getRowOfSquare = () => element.getAttribute("data-row");

    const isRowPathWinner = () => {
      return (
        squareGrid[getRowOfSquare()][0].getAttribute("data-icon") ===
          squareGrid[getRowOfSquare()][1].getAttribute("data-icon") &&
        squareGrid[getRowOfSquare()][0].getAttribute("data-icon") ===
          squareGrid[getRowOfSquare()][2].getAttribute("data-icon")
      );
    };

    if (isRowPathWinner()) {
      winningSquares = [
        squareGrid[getRowOfSquare()][0],
        squareGrid[getRowOfSquare()][1],
        squareGrid[getRowOfSquare()][2],
      ];
      return true;
    }

    const getColumnOfSquare = () => element.getAttribute("data-col");

    const isColumnWinner = () => {
      return (
        squareGrid[0][getColumnOfSquare()].getAttribute("data-icon") ===
          squareGrid[1][getColumnOfSquare()].getAttribute("data-icon") &&
        squareGrid[0][getColumnOfSquare()].getAttribute("data-icon") ===
          squareGrid[2][getColumnOfSquare()].getAttribute("data-icon")
      );
    };

    if (isColumnWinner()) {
      winningSquares = [
        squareGrid[0][getColumnOfSquare()],
        squareGrid[1][getColumnOfSquare()],
        squareGrid[2][getColumnOfSquare()],
      ];
      return true;
    }
    return false;
  }

  function setWinningPlayer() {
    classes.toggle("winner");

    winningSquares.forEach((square) => {
      square.setAttribute("data-win", "true");
    });

    const winningIcons = document.querySelectorAll("[data-win='true'] > .icon");
    if (activePlayer.getPlayerNumber() === 1) {
      winningIcons.forEach((icon) => {
        icon.style.fill = "var(--green)";
      });
    } else {
      winningIcons.forEach((icon) => {
        icon.style.stroke = "var(--green)";
      });
    }
  }

  const resetButton = document.querySelector(".reset");
  resetButton.addEventListener("click", resetGame);
}

playTicTacToe();
