// memory card list

let deckArray = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];


//list of variables
let open = [];
let moves = 0;
let matches = 0;
let clicks = 0;

//card display

let fragment = document.createDocumentFragment();

function newDeck() {
  $("#deck").empty();
  $("ul.deck").removeClass("lineUp");
  deckArray = shuffle(deckArray);
  deckArray.forEach(function(cardtype) {
    let iElement = document.createElement('i');
    iElement.className += "fa " + cardtype;
    let liElement = document.createElement('li');
    liElement.className += 'card' + ' single';
    liElement.addEventListener('click', toggleCard)
    liElement.appendChild(iElement);
    fragment.appendChild(liElement);
  });
  let deck = document.getElementById('deck');
  deck.appendChild(fragment);
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//timer
let timer = "";

function startTimer() {
  let time = new Date();
    timer = setInterval(function() {
      $(".timer").text(Math.round((new Date - time) / 1000, 0) + " Seconds")
    }, 1000);
  }

function resetTimer() {
  clearInterval(timer);
  timer = "";
  clicks = 0;
  $("div.timer").empty();
}

// toggling card function
function toggleCard(cards) {
  //apply card open animation
  // $(this).addClass("open");
  clicks += 1;
  //enable/disable start of timer
  if(clicks === 0){
    $(".cards").on("click",startTimer());
  }
  else if (clicks === 1) {
    $(".cards").off("click",startTimer());
  }
  //if no card has been opened
  if (open.length === 0) {
    $(this).addClass("open show");
    $("li.open.show").off();
    open.push($(this));
  } else if (open.length === 1 && !$(this).hasClass("open show")) {
    $(this).addClass("open show");
    open.push($(this));
    $("li").off();
    updateMoves();
    starScore();
  }
  if (open.length === 2) {
    testMatch();
  }
}

//test if cards match
function testMatch() {
  if (open[0].children().attr("class") == open[1].children().attr("class")) {
    setTimeout(positiveMatch, 500);
  } else {
    setTimeout(negativeMatch, 500);
  }
}

//test for positive / negative match
function positiveMatch() {
  open[0].addClass("match pulse animated").removeClass("single");
  open[1].addClass("match pulse animated").removeClass("single");
  $("li.match.pulse.animated").off();
  $("li.single").on("click",toggleCard);
  matches += 1;
  endGame();
  open = [];
}

function negativeMatch() {
  open[0].addClass("shake animated");
  open[1].addClass("shake animated");
  setTimeout(resetCards, 500);
}

//reset cards
function resetCards() {
  open[0].removeClass("open show shake animated");
  open[1].removeClass("open show shake animated");
  setTimeout(function(){$("li.single").on("click",toggleCard),400});
  open = [];
}

//update moves
function updateMoves() {
  moves += 1;
  $("span.moves").text(moves + " Moves");
}

//reset button
function restartButton() {
  $(".restart").click(playGame);
}

//stars
function starScore() {
  if (moves == "11") {
    $(".fa-star").last().removeClass("fa-star").addClass("fa-star-o");
  } else if (moves == "16") {
    $(".fa-star").last().removeClass("fa-star").addClass("fa-star-o");
  } else if (moves == "20") {
    $(".fa-star").last().removeClass("fa-star").addClass("fa-star-o");
  }
}

//end of game
function endGame() {
  if (matches === 8) {
    clearInterval(timer);
    congratulations();
  }
}

//end of game message
function congratulations() {
  $("#deck").empty();
  $("ul.deck").addClass("lineUp");
  $("ul.deck").append("<div class='lineUp'></div>");
  $("div.lineUp").append("<h1>Congratulations!!!</h1>");
  $("div.lineUp").append("<h2>You have matched all the cards!</h2>");
  $("ul.stars").clone().appendTo($("div.lineUp")).addClass("lineUp");
  $("ul.stars.lineUp").css({
    "list-style-type": "none",
    "padding": "0px"
  });
  $("ul.stars.lineUp").children("li").addClass("lineUp");
  $("div.lineUp").append("<p></p>");
  $("div.lineUp").children("p").text(moves + " Moves");
  $("div.timer").clone().appendTo($("div.lineUp"))
  $("div.lineUp").append("<br><button class='button1'>Try Again?</button>").click(playGame);
}

//begin game
function playGame() {
  clearInterval(timer);
  resetTimer();
  // $(".card").click(startTimer);
  $(".moves").empty().text("0 Moves");
  $(".timer").text(0 + " Seconds");
  $(".fa.fa-star-o").removeClass("fa-star-o").addClass("fa-star");
  newDeck();
  restartButton();
  moves = 0;
  matches = 0;
  open = [];
}


playGame();
