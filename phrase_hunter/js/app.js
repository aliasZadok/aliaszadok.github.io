/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

 //button instances
 const startBtn = document.getElementById('btn__reset');
 const keyboard = document.querySelectorAll('.key');

 //class instances
 const game = new Game();
 const phrase = new Phrase();

 //event listeners
 startBtn.addEventListener('click', (e)=>{
   game.startGame();
 });

 for (var i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener('click', (e)=>{
    game.handleInteraction(e.target);
  });
 }

 document.addEventListener('keydown', (e)=>{
   game.handleInteraction(e);
 });
