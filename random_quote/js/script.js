/******************************************
Treehouse Techdegree:
FSJS project 1 - A Random Quote Generator
******************************************/

//Initializing array of objects named quotes.
var quotes = [
  {
    quote:'But man is not made for defeat. A man can be destroyed but not defeated.',
    source:'Ernest Hemingway',
    tag: ['Motivational', 'Hope', 'Encouraging']
  },
  {
    quote: 'You cannot shake hands with a clenched fist.' ,
    source: 'Indira Gandhi',
    citation: 'Press conference, New Delhi',
    year: '1971',
    tag: ['Peace', 'Ethics', 'Humanism']
  },
  {
    quote: 'Total commitment is the common denominator among all successful men and women.',
    source: 'A.P.J. Abdul Kalam',
    citation: 'Wings of Fire: pg.90',
    tag: ['Success', 'Work', 'Commitment']
  },
  {
    quote: 'The journey of a thousand miles begins with one step.' ,
    source: 'Lao Tzu',
    tag: ['Journey', 'Diligence', 'Inspirational']
  },
  {
    quote: 'I have not failed. I\'ve just found 10,000 ways that won\'t work.',
    source: 'Thomas A. Edison',
    tag: ['Inspirational', 'Failure', 'Perseverance']
  }
];

/*
  An array of flat UI colors.
  Colors copied from: https://flatuicolors.com/palette/defo
*/
var flatUiColors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
                    '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50'];

/*
  Generates a random number between 1 - 5.
  Uses the randomly generated number as the index for quotes[] array.
*/
function getRandomQuote (min, max) {
  var randomQuoteIndex = Math.floor(Math.random() * (max - min)) + min;
  return quotes[randomQuoteIndex];
}

//Returns a random flat UI color from the flatUiColors[] array.
function getRandomFlatColor (min, max){
  var randomColor = Math.floor(Math.random() * (max - min)) + min;
  //background color of body changes to a random flat UI color
  return document.body.style.backgroundColor = flatUiColors[randomColor];
}


function printQuote(){
  var randomQuote = getRandomQuote(1, quotes.length); //assigning getRandomQuote() to randomQuote variable
  var html = '<p class="quote">'; //paragraph tag begins
  var tag = randomQuote.tag.join(', #'); //joining tag array into one string

  //assigning each object property to a seperate variable for convenience
  var source = randomQuote.source;
  var quote = randomQuote.quote;
  var citation = randomQuote.citation;
  var year = randomQuote.year;

  html += quote; //the quote goes here

  html += '<p class="source">' + source; //nested paragraph tag begins

  //checking whether the object has the 'citation' and 'year' properties within it
  if ('citation' in randomQuote) {
    html += '<span class="citation">' + citation + '</span>';
  }
  if ('year' in randomQuote) {
    html += '<span class="year">' + year + '</span>';
  }

  html += '<br><span class="category">' + tag + '</span>' + '</p>'; //nested paragraph tag closes

  html += '</p>' //paragraph tag closes

  getRandomFlatColor(1, flatUiColors.length);
  return document.getElementById('quote-box').innerHTML = html;
}

document.getElementById('loadQuote').addEventListener("click", printQuote, false);

setInterval(function(){printQuote()}, 20000); //display's new quote every 20 second
