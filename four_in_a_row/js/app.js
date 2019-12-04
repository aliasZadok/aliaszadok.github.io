const game = new Game();

const startBtn = document.getElementById('begin-game');

/**
 * Listens for click on `#begin-game` and calls startGame() on game object
 */
startBtn.addEventListener('click', (e) => {
  if (startBtn.textContent.trim() === 'Start') {
    game.startGame();

    e.target.style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';

    alert('Use left arrow key to move left\nUse right arrow key to move right\nAnd use down arrow key to drop');

  } else if (startBtn.textContent.trim() === 'Restart') {
    window.location.reload();
  }

});

/**
 * Listen for keyboard presses
 */
document.addEventListener('keydown', (e) => {
    game.handleKeyDown(e);
});
