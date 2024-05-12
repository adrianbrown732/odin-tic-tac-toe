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

  return { getValue, getPlayerNumber, setName };
}

function playTicTacToe() {
  // Set players

  const players = [];
  const button = document.querySelector("[data-button]");

  for (let i = 0; i < 2; i++) {
    players[i] = CreatePlayer(i + 1);
  }

  button.addEventListener("click", () => {
    players[0].setName();
    players[1].setName();
  });

  //   Set active player

  let activePlayer = players[0];

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];

    fadeOutIcon();

    setTimeout(() => {
      moveIcon();
      fadeInIcon();
    }, 200);
  };

  // Active player moves

  const squares = document.querySelectorAll("[data-square]");

  const clearSquares = () => {
    squares.forEach((square) => {
      square.removeAttribute("data-square-closed");
    });
  };

  // Set squares

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

  function checkForWin() {
    if (squares[0].getAttribute("data-square-closed", "true")) {
      if (
        squares[0].getAttribute("data-icon") ===
        (squares[1].getAttribute("data-icon") &&
          squares[2].getAttribute("data-icon"))
      ) {
        squares[0].setAttribute("data-win", "true");
        squares[1].setAttribute("data-win", "true");
        squares[2].setAttribute("data-win", "true");

        const children = document.querySelectorAll("[data-win='true'] > .icon");

        children.forEach((child) => {
          child.style.fill = "var(--green)";
        });
      }
    }
  }

  //   const players = ["player1", "player2"];
  const resetButton = document.querySelector(".reset");
  const activeIconParent = document.querySelector(".active-player");
  const activeIcon = document.querySelector(".active-player > div");

  const moveIcon = () => {
    activeIconParent.classList.toggle("switch-player");
  };
  const fadeOutIcon = () => {
    activeIcon.style.opacity = "0";
  };
  const fadeInIcon = () => {
    activeIcon.style.opacity = "1";
  };

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

  function resetGame() {
    squares.forEach((square) => {
      if (square.getAttribute("data-square", "true")) {
        const icons = document.querySelectorAll("div > .icon");

        icons.forEach((icon) => {
          icon.style.opacity = "0";
        });

        square.removeAttribute("data-icon");

        setTimeout(() => {
          const child = document.querySelector("div > .icon");
          square.removeChild(child);
          square.setAttribute("data-square", "");

          const winningSquares = document.querySelectorAll("[data-win='true']");
          winningSquares.forEach((winningSquare) => {
            winningSquare.removeAttribute("data-win");
          });
        }, 200);

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

  function endGame() {
    squares.forEach((square) => {
      square.setAttribute("data-square", "true");
    });
  }
}

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
