class Game {
  constructor() {
    this.board = new Board();
    this.players = this.createPlayers();
    this.ready = false;
  }

  /**
   * Creates two player objects
   * @return {Array}  An array of two Player objects.
   */
  createPlayers() {
    const players = [
      new Player('P1', '#e15258', 1, true),
      new Player('P2', '#e59a13', 2)
    ];
    return players;
  }

/**
 * Gets the active player object
 * @return {Object} Returns the Player object whose active property is equal to true
 */
  get activePlayer() {
    return this.players.find(player => player.active);
  }

/**
 * Branches code, depending on what key player presses
 * @param   {Object}    e - Keydown event object
 */
  handleKeyDown(e) {
    if (this.ready === true) {
      let activeToken = this.activePlayer.activeToken;
      if (e.key === 'ArrowLeft') {
        activeToken.moveLeft();
      } else if (e.key === 'ArrowRight') {
        activeToken.moveRight(this.board.columns);
      } else if (e.key === 'ArrowDown') {
        this.playToken();
      }
    }
  }

  playToken() {
    let activeToken = this.activePlayer.activeToken;
    let spaces = this.board.spaces;
    let targetColumn = spaces[activeToken.columnLocation];
    let targetSpace = null;

    for (let space of targetColumn) {
      if (space.token === null) {
        targetSpace = space;
      }
    }

    if (targetSpace !== null) {
      this.ready = false;
      activeToken.drop(targetSpace, () => {
        this.updateGameState(activeToken, targetSpace);
      });
    }

  }

  /**
   * Switches active player.
   */
  switchPlayers() {
    for (let player of this.players) {
      player.active = player.active === true ? false : true;
    }
  }

  /**
   * Checks if there a winner on the board after each token drop.
   * @param   {Object}    Targeted space for dropped token.
   * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
   */
  checkForWin(target) {
    const owner = target.token.owner;
    let win = false;

    // vertical
    for (let x = 0; x < this.board.columns; x++ ){
        for (let y = 0; y < this.board.rows - 3; y++){
            if (this.board.spaces[x][y].owner === owner &&
                this.board.spaces[x][y+1].owner === owner &&
                this.board.spaces[x][y+2].owner === owner &&
                this.board.spaces[x][y+3].owner === owner) {
                    win = true;
            }
        }
    }

    // horizontal
    for (let x = 0; x < this.board.columns - 3; x++ ){
        for (let y = 0; y < this.board.rows; y++){
            if (this.board.spaces[x][y].owner === owner &&
                this.board.spaces[x+1][y].owner === owner &&
                this.board.spaces[x+2][y].owner === owner &&
                this.board.spaces[x+3][y].owner === owner) {
                    win = true;
            }
        }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++ ){
        for (let y = 0; y < this.board.rows - 3; y++){
            if (this.board.spaces[x][y].owner === owner &&
                this.board.spaces[x-1][y+1].owner === owner &&
                this.board.spaces[x-2][y+2].owner === owner &&
                this.board.spaces[x-3][y+3].owner === owner) {
                    win = true;
            }
        }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++ ){
        for (let y = 3; y < this.board.rows; y++){
            if (this.board.spaces[x][y].owner === owner &&
                this.board.spaces[x-1][y-1].owner === owner &&
                this.board.spaces[x-2][y-2].owner === owner &&
                this.board.spaces[x-3][y-3].owner === owner) {
                    win = true;
            }
        }
    }

    return win;
  }

/**
 * Initializes game.
 */
  startGame() {
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.ready = true;
  }

  /**
   * Displays game over message.
   * @param {string} message - Game over message.
   */
  gameOver(message) {
    const gameOver = document.getElementById('game-over');
    gameOver.style.display = 'block';
    gameOver.textContent = message;

    const startBtn = document.getElementById('begin-game');
    startBtn.style.display = "block";
    startBtn.textContent = "Restart";
  }

  /**
   * Updates game state after token is dropped.
   * @param   {Object}  token  -  The token that's being dropped.
   * @param   {Object}  target -  Targeted space for dropped token.
   */
  updateGameState(token, target) {
    target.mark(token);
    if (this.checkForWin(target)) {
      this.gameOver(`${token.owner.name} wins!`);
    } else {
      this.switchPlayers();
      if (this.activePlayer.checkTokens()) {
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
      } else {
        gameOver('No more tokens available');
      }
    }
  }
}
