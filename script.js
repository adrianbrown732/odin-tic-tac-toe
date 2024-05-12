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

  return {
    getValue,
    getPlayerNumber,
    setName,
  };
}

function CreateGrid(array) {
  let index = 0;
  const board = [];
  const rows = 3;
  const columns = 3;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(array[index]);
      index++;
    }
  }
  return board;
}

function playTicTacToe() {
  // Set players

  const players = [];
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

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.getAttribute("data-square-closed", "true")) return;

      if (activePlayer.getPlayerNumber() === 1) {
        square.appendChild(setX());
      } else {
        square.appendChild(setO());
      }

      square.setAttribute("data-icon", activePlayer.getValue());
      square.setAttribute("data-square-closed", "true");

      checkForWin();
    });
  });

  const squareGrid = CreateGrid(squares);

  const clearSquares = () => {
    squares.forEach((square) => {
      square.removeAttribute("data-square-closed");
    });
  };

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

  // Check win conditions

  function checkForWin() {
    let winningSquare;

    // Rows

    for (let i = 0; i < 3; i++) {
      if (squareGrid[i][0].getAttribute("data-square-closed", "true")) {
        if (
          squareGrid[i][0].getAttribute("data-icon") ===
            squareGrid[i][1].getAttribute("data-icon") &&
          squareGrid[i][0].getAttribute("data-icon") ===
            squareGrid[i][2].getAttribute("data-icon")
        ) {
          for (let j = 0; j < 3; j++) {
            squareGrid[i][0].setAttribute("data-win", "true");
            squareGrid[i][1].setAttribute("data-win", "true");
            squareGrid[i][2].setAttribute("data-win", "true");
            winningSquare = squareGrid[i][0];
          }

          const children = document.querySelectorAll(
            "[data-win='true'] > .icon"
          );

          if (winningSquare.getAttribute("data-icon") === "2") {
            children.forEach((child) => {
              child.style.fill = "var(--green)";
            });
          } else {
            children.forEach((child) => {
              child.style.stroke = "var(--green)";
            });
          }
        }
      }
    }

    // Columns

    for (let i = 0; i < 3; i++) {
      if (squareGrid[0][i].getAttribute("data-square-closed", "true")) {
        if (
          squareGrid[0][i].getAttribute("data-icon") ===
            squareGrid[1][i].getAttribute("data-icon") &&
          squareGrid[0][i].getAttribute("data-icon") ===
            squareGrid[2][i].getAttribute("data-icon")
        ) {
          for (let j = 0; j < 3; j++) {
            squareGrid[0][i].setAttribute("data-win", "true");
            squareGrid[1][i].setAttribute("data-win", "true");
            squareGrid[2][i].setAttribute("data-win", "true");
            winningSquare = squareGrid[0][i];
          }

          const children = document.querySelectorAll(
            "[data-win='true'] > .icon"
          );

          if (winningSquare.getAttribute("data-icon") === "2") {
            children.forEach((child) => {
              child.style.fill = "var(--green)";
            });
          } else {
            children.forEach((child) => {
              child.style.stroke = "var(--green)";
            });
          }
        }
      }
    }

    // Diagonals

    if (squareGrid[0][0].getAttribute("data-square-closed", "true")) {
      if (
        squareGrid[0][0].getAttribute("data-icon") ===
          squareGrid[1][1].getAttribute("data-icon") &&
        squareGrid[0][0].getAttribute("data-icon") ===
          squareGrid[2][2].getAttribute("data-icon")
      ) {
        squareGrid[0][0].setAttribute("data-win", "true");
        squareGrid[1][1].setAttribute("data-win", "true");
        squareGrid[2][2].setAttribute("data-win", "true");
        winningSquare = squareGrid[0][0];

        const children = document.querySelectorAll("[data-win='true'] > .icon");

        if (winningSquare.getAttribute("data-icon") === "2") {
          children.forEach((child) => {
            child.style.fill = "var(--green)";
          });
        } else {
          children.forEach((child) => {
            child.style.stroke = "var(--green)";
          });
        }
      }
    }

    if (squareGrid[0][2].getAttribute("data-square-closed", "true")) {
      if (
        squareGrid[0][2].getAttribute("data-icon") ===
          squareGrid[1][1].getAttribute("data-icon") &&
        squareGrid[0][2].getAttribute("data-icon") ===
          squareGrid[2][0].getAttribute("data-icon")
      ) {
        squareGrid[0][2].setAttribute("data-win", "true");
        squareGrid[1][1].setAttribute("data-win", "true");
        squareGrid[2][0].setAttribute("data-win", "true");
        winningSquare = squareGrid[0][2];

        const children = document.querySelectorAll("[data-win='true'] > .icon");

        if (winningSquare.getAttribute("data-icon") === "2") {
          children.forEach((child) => {
            child.style.fill = "var(--green)";
          });
        } else {
          children.forEach((child) => {
            child.style.stroke = "var(--green)";
          });
        }
      }
    }
  }

  // Reset game

  function resetGame() {
    squares.forEach((square) => {
      if (square.getAttribute("data-square-closed")) {
        const icons = document.querySelectorAll("div > .icon");

        icons.forEach((icon) => {
          icon.style.opacity = "0";
        });

        square.removeAttribute("data-icon");

        setTimeout(() => {
          const child = document.querySelector("div > .icon");
          square.removeChild(child);
          clearSquares();

          const winningSquares = document.querySelectorAll("[data-win='true']");
          winningSquares.forEach((winningSquare) => {
            winningSquare.removeAttribute("data-win");
          });
        }, 200);

        if (activePlayer.getPlayerNumber() === 2) {
          activePlayer = players[0];
          moveLeft();
        }
      }
    });
  }

  const resetButton = document.querySelector(".reset");

  resetButton.addEventListener("click", resetGame);

  function checkForWinnerX() {
    const row1 = [squares[0], squares[1], squares[2]];

    const winRow1 =
      row1[0].getAttribute("data-icon") == "1" &&
      row1[1].getAttribute("data-icon") == "1" &&
      row1[2].getAttribute("data-icon") === "1"
        ? true
        : false;

    if (winRow1) {
      row1.forEach((cell) => {
        cell.setAttribute("data-win", "true");
      });

      const children = document.querySelectorAll("[data-win='true'] > .icon");

      children.forEach((child) => {
        child.style.fill = "var(--green)";
      });
      endGame();
    }

    const row2 = [squares[3], squares[4], squares[5]];

    const winRow2 =
      row2[0].getAttribute("data-icon") == "1" &&
      row2[1].getAttribute("data-icon") == "1" &&
      row2[2].getAttribute("data-icon") === "1"
        ? true
        : false;

    if (winRow2) {
      row2.forEach((cell) => {
        cell.setAttribute("data-win", "true");
      });

      const children = document.querySelectorAll("[data-win='true'] > .icon");

      children.forEach((child) => {
        child.style.fill = "var(--green)";
      });
    }

    const row3 = [squares[6], squares[7], squares[8]];

    const winRow3 =
      row3[0].getAttribute("data-icon") == "1" &&
      row3[1].getAttribute("data-icon") == "1" &&
      row3[2].getAttribute("data-icon") === "1"
        ? true
        : false;

    if (winRow3) {
      row3.forEach((cell) => {
        cell.setAttribute("data-win", "true");
      });

      const children = document.querySelectorAll("[data-win='true'] > .icon");

      children.forEach((child) => {
        child.style.fill = "var(--green)";
      });
    }

    const col1 = [squares[0], squares[3], squares[6]];

    const winCol1 =
      col1[0].getAttribute("data-icon") == "1" &&
      col1[1].getAttribute("data-icon") == "1" &&
      col1[2].getAttribute("data-icon") === "1"
        ? true
        : false;

    if (winCol1) {
      col1.forEach((cell) => {
        cell.setAttribute("data-win", "true");
      });

      const children = document.querySelectorAll("[data-win='true'] > .icon");

      children.forEach((child) => {
        child.style.fill = "var(--green)";
      });
    }

    const col2 = [squares[1], squares[4], squares[7]];

    const winCol2 =
      col2[0].getAttribute("data-icon") == "1" &&
      col2[1].getAttribute("data-icon") == "1" &&
      col2[2].getAttribute("data-icon") === "1"
        ? true
        : false;

    if (winCol2) {
      col2.forEach((cell) => {
        cell.setAttribute("data-win", "true");
      });

      const children = document.querySelectorAll("[data-win='true'] > .icon");

      children.forEach((child) => {
        child.style.fill = "var(--green)";
      });
    }

    const col3 = [squares[2], squares[5], squares[8]];

    const winCol3 =
      col3[0].getAttribute("data-icon") == "1" &&
      col3[1].getAttribute("data-icon") == "1" &&
      col3[2].getAttribute("data-icon") === "1"
        ? true
        : false;

    if (winCol3) {
      col3.forEach((cell) => {
        cell.setAttribute("data-win", "true");
      });

      const children = document.querySelectorAll("[data-win='true'] > .icon");

      children.forEach((child) => {
        child.style.fill = "var(--green)";
      });
    }

    const diag1 = [squares[0], squares[4], squares[8]];

    const winDiag1 =
      diag1[0].getAttribute("data-icon") == "1" &&
      diag1[1].getAttribute("data-icon") == "1" &&
      diag1[2].getAttribute("data-icon") === "1"
        ? true
        : false;

    if (winDiag1) {
      diag1.forEach((cell) => {
        cell.setAttribute("data-win", "true");
      });

      const children = document.querySelectorAll("[data-win='true'] > .icon");

      children.forEach((child) => {
        child.style.fill = "var(--green)";
      });
    }

    const diag2 = [squares[2], squares[4], squares[6]];

    const winDiag2 =
      diag2[0].getAttribute("data-icon") == "1" &&
      diag2[1].getAttribute("data-icon") == "1" &&
      diag2[2].getAttribute("data-icon") === "1"
        ? true
        : false;

    if (winDiag2) {
      diag2.forEach((cell) => {
        cell.setAttribute("data-win", "true");
      });

      const children = document.querySelectorAll("[data-win='true'] > .icon");

      children.forEach((child) => {
        child.style.fill = "var(--green)";
      });
    }
  }

  function checkForWinnerO() {
    const row1 = [squares[0], squares[1], squares[2]];

    const winRow1 =
      row1[0].getAttribute("data-icon") == "2" &&
      row1[1].getAttribute("data-icon") == "2" &&
      row1[2].getAttribute("data-icon") === "2"
        ? true
        : false;

    if (winRow1) {
      row1.forEach((cell) => {
        cell.setAttribute("data-win", "true");
      });

      const children = document.querySelectorAll("[data-win='true'] > .icon");

      children.forEach((child) => {
        child.style.stroke = "var(--green)";
      });
    }

    const row2 = [squares[3], squares[4], squares[5]];

    const winRow2 =
      row2[0].getAttribute("data-icon") == "2" &&
      row2[1].getAttribute("data-icon") == "2" &&
      row2[2].getAttribute("data-icon") === "2"
        ? true
        : false;

    if (winRow2) {
      row2.forEach((cell) => {
        cell.setAttribute("data-win", "true");
      });

      const children = document.querySelectorAll("[data-win='true'] > .icon");

      children.forEach((child) => {
        child.style.stroke = "var(--green)";
      });
    }

    const row3 = [squares[6], squares[7], squares[8]];

    const winRow3 =
      row3[0].getAttribute("data-icon") == "2" &&
      row3[1].getAttribute("data-icon") == "2" &&
      row3[2].getAttribute("data-icon") === "2"
        ? true
        : false;

    if (winRow3) {
      row3.forEach((cell) => {
        cell.setAttribute("data-win", "true");
      });

      const children = document.querySelectorAll("[data-win='true'] > .icon");

      children.forEach((child) => {
        child.style.stroke = "var(--green)";
      });
    }

    const col1 = [squares[0], squares[3], squares[6]];

    const winCol1 =
      col1[0].getAttribute("data-icon") == "2" &&
      col1[1].getAttribute("data-icon") == "2" &&
      col1[2].getAttribute("data-icon") === "2"
        ? true
        : false;

    if (winCol1) {
      col1.forEach((cell) => {
        cell.setAttribute("data-win", "true");
      });

      const children = document.querySelectorAll("[data-win='true'] > .icon");

      children.forEach((child) => {
        child.style.stroke = "var(--green)";
      });
    }

    const col2 = [squares[1], squares[4], squares[7]];

    const winCol2 =
      col2[0].getAttribute("data-icon") == "2" &&
      col2[1].getAttribute("data-icon") == "2" &&
      col2[2].getAttribute("data-icon") === "2"
        ? true
        : false;

    if (winCol2) {
      col2.forEach((cell) => {
        cell.setAttribute("data-win", "true");
      });

      const children = document.querySelectorAll("[data-win='true'] > .icon");

      children.forEach((child) => {
        child.style.stroke = "var(--green)";
      });
    }

    const col3 = [squares[2], squares[5], squares[8]];

    const winCol3 =
      col3[0].getAttribute("data-icon") == "2" &&
      col3[1].getAttribute("data-icon") == "2" &&
      col3[2].getAttribute("data-icon") === "2"
        ? true
        : false;

    if (winCol3) {
      col3.forEach((cell) => {
        cell.setAttribute("data-win", "true");
      });

      const children = document.querySelectorAll("[data-win='true'] > .icon");

      children.forEach((child) => {
        child.style.stroke = "var(--green)";
      });
    }

    const diag1 = [squares[0], squares[4], squares[8]];

    const winDiag1 =
      diag1[0].getAttribute("data-icon") == "2" &&
      diag1[1].getAttribute("data-icon") == "2" &&
      diag1[2].getAttribute("data-icon") === "2"
        ? true
        : false;

    if (winDiag1) {
      diag1.forEach((cell) => {
        cell.setAttribute("data-win", "true");
      });

      const children = document.querySelectorAll("[data-win='true'] > .icon");

      children.forEach((child) => {
        child.style.stroke = "var(--green)";
      });
    }

    const diag2 = [squares[2], squares[4], squares[6]];

    const winDiag2 =
      diag2[0].getAttribute("data-icon") == "2" &&
      diag2[1].getAttribute("data-icon") == "2" &&
      diag2[2].getAttribute("data-icon") === "2"
        ? true
        : false;

    if (winDiag2) {
      diag2.forEach((cell) => {
        cell.setAttribute("data-win", "true");
      });

      const children = document.querySelectorAll("[data-win='true'] > .icon");

      children.forEach((child) => {
        child.style.stroke = "var(--green)";
      });
    }
  }

  function endGame() {
    squares.forEach((square) => {
      square.setAttribute("data-square", "true");
    });
  }
}

playTicTacToe();
