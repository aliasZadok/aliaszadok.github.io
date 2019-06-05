/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
 class Phrase {
   constructor (phrase) {
     this.phrase = phrase;
   }
   /*
   * Add phrase to display
   * goes through a phrase, splits it into an array of letters
   * and then adds each letter to a list item
   */

   addPhraseToDisplay() {
     //selecting <div> with phrase id
     const phraseContainer = document.getElementById('phrase');
     //creating <ul> element
     const ul = document.createElement('ul');
     phraseContainer.appendChild(ul); //appending <ul> to phrase <div>
     //loop through phrase letters
     this.phrase.split('').forEach((character) => {
       const text = document.createTextNode(character);
       //check for space
       if (character !== ' ') {
         const li = document.createElement('li'); //creating <li> element
         li.className = `hide letter ${character}`; //adds class name according to phrase letter
         li.appendChild(text); //appends each letter from phrase to <li>
         ul.appendChild(li);
       } else {
         const li = document.createElement('li');
         li.className = 'space'; //space class name for <li> elements with space
         li.appendChild(text); //adds the space character
         ul.appendChild(li);
       }
     });
   };
   //checks if passed letter is in phrase
   checkLetter(letter) {
     if (this.phrase.split('').indexOf(letter) > -1) {
       return true;
     } else {
       return false;
     }
   };
   //displays phrase letter if matched with user input
   showMatchedLetter(letter) {
     const li = document.querySelectorAll('.hide');
     for (var i = 0; i < li.length; i++) {
       if (letter === li[i].innerHTML) {
         li[i].className = 'show';
       }
     }
   };
 }
