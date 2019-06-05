/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
 class Game {
   //class constructor
   constructor () {
     this.missed = 0;
     this.phrases = [new Phrase('life is like a box of chocolates'),
                     new Phrase('there is no trying'),
                     new Phrase('may the force be with you'),
                     new Phrase('have a taste of your own medicine'),
                     new Phrase('you talking to me')];
     this.activePhrase = null;
   }

   /*
   * Random phrase selector
   * returns a random phrase object from game.phrases array
   */
   getRandomPhrase() {
     let randomIndex = Math.floor(Math.random() * this.phrases.length);
     return this.phrases[randomIndex];
   };

   /*
   * Start game method
   * Begins the game by selecting a random phrase and displaying it to the user
   */
   startGame() {
     const overlay = document.getElementById('overlay'); //selecting overlay div
     overlay.style.visibility = 'hidden'; //hiding the overlay div

     //removing the exisiting <ul> element to be replaced
     const phraseContainer = document.getElementById('phrase');
     const ul = document.querySelector('#phrase ul');
     phraseContainer.removeChild(ul);

     const randomPhrase = this.getRandomPhrase(); //storing the random phrase in a variable
     randomPhrase.addPhraseToDisplay(); //displaying the random phrase (which is hidden) to the user
     this.activePhrase = randomPhrase; //storing the random phrase to activePhrase

     this.resetKeyboard('.chosen'); //resetting all chosen keys
     this.resetKeyboard('.wrong'); //resetting all wrong keys

     const img = document.querySelectorAll('img');
     //resetting the score board
     for (var i = 0; i < img.length; i++) {
       img[i].setAttribute('src', 'images/liveHeart.png');
     }
     //resetting missed value
     this.missed = 0;
   };

   //keyboard reset
   resetKeyboard(className) {
     const key = document.querySelectorAll(className);

     for (var i = 0; i < key.length; i++) {
       key[i].removeAttribute('disabled');
       key[i].className = 'key';
     }
   };

   /*
   * Handle interaction
   * Checks for match between user's input and the letters of hidden phrase
   */
   handleInteraction(button){
     if (button.type !== 'keydown') {
       button.disabled = true;
       if (this.activePhrase.checkLetter(button.innerHTML)) {
         button.className = 'chosen';
         this.activePhrase.showMatchedLetter(button.innerHTML);
         let won = this.checkForWin();
         if (won === true) {
           this.gameOver(won);
         }
       } else {
         button.className = 'wrong';
         this.removeLife();
       }
     }
     /*
     * Calls keyPress() according to keydown event key
     * associated with the onscreen keyboard button
     */
     switch (button.key) {
        case 'q':
        this.keyPress(button.key);
          break;
        case 'w':
        this.keyPress(button.key);
          break;
        case 'e':
        this.keyPress(button.key);
          break;
        case 'r':
        this.keyPress(button.key);
          break;
        case 't':
        this.keyPress(button.key);
          break;
        case 'y':
        this.keyPress(button.key);
          break;
        case 'u':
        this.keyPress(button.key);
          break;
        case 'i':
        this.keyPress(button.key);
          break;
        case 'o':
        this.keyPress(button.key);
          break;
        case 'p':
        this.keyPress(button.key);
          break;
        case 'a':
        this.keyPress(button.key);
          break;
        case 's':
        this.keyPress(button.key);
          break;
        case 'd':
        this.keyPress(button.key);
          break;
        case 'f':
        this.keyPress(button.key);
          break;
        case 'g':
        this.keyPress(button.key);
          break;
        case 'h':
        this.keyPress(button.key);
          break;
        case 'j':
        this.keyPress(button.key);
          break;
        case 'k':
        this.keyPress(button.key);
          break;
        case 'l':
        this.keyPress(button.key);
          break;
        case 'z':
        this.keyPress(button.key);
          break;
        case 'x':
        this.keyPress(button.key);
          break;
        case 'c':
        this.keyPress(button.key);
          break;
        case 'v':
        this.keyPress(button.key);
          break;
        case 'b':
        this.keyPress(button.key);
          break;
        case 'n':
        this.keyPress(button.key);
          break;
        case 'm':
        this.keyPress(button.key);
          break;
     }
   };
   //handles intercation with computer keyboard
   keyPress(e) {
     if (this.activePhrase.checkLetter(e)) {
       this.activePhrase.showMatchedLetter(e);
       let won = this.checkForWin();
       if (won === true) {
         this.gameOver(won);
       }
     } else {
       this.removeLife();
     }
   };
   //checks for winning move
   checkForWin() {
     const li = document.querySelectorAll('ul li');
     const space = document.querySelectorAll('.space');
     const show = document.querySelectorAll('.show');
     let win = null; //default value is set to false

     /*
     * The class name of an <li> element turns to 'show' when the correct letter is guessed
     * and by default each <li> element has 'hide' as its class
     * this checks whether all <li> elements have 'show' as their class
     */
     if (show.length === li.length - space.length) {
       win = true;
     } else {
       win = false;
     }

     return win; //returns either true or false
   };
   //removes a life each time the user input does not match with the hidden phrase letter
   removeLife() {
     const img = document.querySelectorAll('img');

     switch (this.missed) {
        case 0:
        img[this.missed].src = 'images/lostHeart.png';
        this.missed++;
          break;
        case 1:
        img[this.missed].src = 'images/lostHeart.png';
        this.missed++;
          break;
        case 2:
        img[this.missed].src = 'images/lostHeart.png';
        this.missed++;
          break;
        case 3:
        img[this.missed].src = 'images/lostHeart.png';
        this.missed++;
          break;
        case 4:
        img[this.missed].src = 'images/lostHeart.png';
        this.missed++;
        this.gameOver(false);
          break;
     }
   };
   //displays a message when game is over
   gameOver(gameWon) {
     const overlay = document.getElementById('overlay');
     const message = document.getElementById('game-over-message');
     if (gameWon === true) {
       overlay.className = 'win';
       overlay.style.visibility = 'inherit';
       message.innerHTML = 'Great, job!';
     } else {
       overlay.className = 'lose';
       overlay.style.visibility = 'inherit';
       message.innerHTML = 'Sorry, better luck next time!';
     }
   };
 }
