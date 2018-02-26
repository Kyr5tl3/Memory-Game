
//  Create a list that holds all of your cards

let deckArray = ["fa-diamond", "fa-diamond","fa-paper-plane-o","fa-paper-plane-o","fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 let fragment = document.createDocumentFragment();

 function newDeck(){
   deckArray = shuffle(deckArray);
   deckArray.forEach(function(cardtype){
     let iElement = document.createElement('i');
     iElement.className += "fa " + cardtype;
     let liElement = document.createElement('li');
     liElement.className += 'card';
     liElement.addEventListener('click',toggleCard)
     liElement.appendChild(iElement);
     fragment.appendChild(liElement);
   });
   let deck = document.getElementById('deck');
   deck.appendChild(fragment);
 }


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//list of variables
let open = [];
let moves = 0;
let matches = 0;

// toggling card function
function toggleCard(cards){
  //apply card open animation
  this.classList.toggle("open");
  this.removeEventListener('click',toggleCard);
  //if no card has been opened
  if(open.length === 0){
    this.classList.toggle("show");

    // let cardImage = this.children
    open.push(this);
  }
    else if (open.length === 1) {
      this.classList.toggle("show");
      open.push(this);
      updateMoves();
    }
    if(open.length === 2){
  testMatch();
  }
}

//test if cards match
function testMatch(){

  if(open[0].firstChild.className == open[1].firstChild.className) {
    setTimeout(positiveMatch,500)
      }
      else {
        setTimeout(negativeMatch,500);
      }
}

//test for positive / negative match
function positiveMatch(){
  open[0].classList.add("match","pulse","animated");
  open[1].classList.add("match","pulse","animated");
  // open[0].removeEventListener('click',toggleCard);
  // open[1].removeEventListener('click',toggleCard);
  matches += 1;
  open = [];
}

function negativeMatch(){
  open[0].classList.add("shake","animated");
  open[1].classList.add("shake","animated");
  setTimeout(resetCards, 1000);
}

//reset cards
function resetCards(){
  open[0].classList.remove("card","open","show","shake","animated");
  open[0].classList.add("card");
  open[0].addEventListener('click',toggleCard);
  open[1].classList.remove("card","open","show","shake","animated");
  open[1].classList.add("card")
  open[1].addEventListener('click',toggleCard);
  open =[];
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
