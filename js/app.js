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
/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
const cards = [
  "fa fa-diamond",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-bomb"
];

const deck = document.querySelector(".deck");
const startBtn = document.getElementById("btn-start");
const moves = document.querySelector(".moves");
const stars = document.querySelector(".stars");
let shownCards = [];
let scoreCount = 0;
let numMoves = 0;
let totalCards = 0;

//shuffle function
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//appending cards in deck
window.onload = addCards();

function addCards() {
  //shuffling deck lol
  shuffle(cards);
  deck.innerHTML = "";
  for (let i = 0; i < cards.length; i++) {
    let card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = "<i class='" + cards[i] + "'></i>";
    deck.appendChild(card);
    clicked(card);
  }
}

//Matching card logic and score system
function clicked(card) {
  card.addEventListener("click", function() {
    if (shownCards.length === 1) {
      const firstCard = shownCards[0];
      const secondCard = this;
      card.classList.add("open", "show", "disable");
      shownCards.push(this);
      if (firstCard.innerHTML === secondCard.innerHTML) {
        firstCard.classList.add("match", "disable");
        secondCard.classList.add("match", "disable");
        shownCards = [];
        scoreCount += 5;
        totalCards += 2;

        setTimeout(function() {
          gameOver();
        }, 500);
      } else {
        firstCard.classList.add("noMatch");
        secondCard.classList.add("noMatch");
        setTimeout(function() {
          firstCard.classList.remove("open", "show", "noMatch", "disable");
          secondCard.classList.remove("open", "show", "noMatch", "disable");
        }, 500);
        shownCards = [];
        scoreCount -= 2;
      }
      move();
    } else {
      card.classList.add("open", "show", "disable");
      shownCards.push(this);
      move();
    }
  });
}

//Game over function goes here

function gameOver() {
  if (totalCards === 16) {
    stop += 1;
    popUpFunction();
  }
}

//reset button
const reset = document.querySelector(".restart");

reset.addEventListener("click", function() {
  addCards();
  shownCards = [];
  scoreCount = 0;
  numMoves = 0;
  totalCards = 0;
  min = 0;
  sec = 0;
  stop = 0;
  moves.innerHTML = 0;
  timer.innerHTML = "";
  stars.innerHTML =
    '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>';
});

//incrementing Moves
function move() {
  numMoves++;
  moves.innerHTML = numMoves;
  star();
}

//star rating function
let starCount = 0;

function star() {
  if (numMoves < 5 && totalCards >= 2) {
    stars.innerHTML =
      '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
  } else if (numMoves > 6 && numMoves < 10 && totalCards <= 4) {
    stars.innerHTML =
      '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li>';
  } else if (numMoves > 10 && numMoves < 18 && totalCards <= 8) {
    stars.innerHTML =
      '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>';
  } else if (numMoves > 20 && totalCards <= 8) {
    stars.innerHTML =
      '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>';
  }
}

//countdown timer

let min = 0;
let sec = 0;
let stop = 0;
const timer = document.querySelector(".timer");

window.onload = function() {
  setInterval(function() {
    if (stop !== 1) {
      sec++;
      if (sec === 60) {
        min++;
        sec = 0;
      }
      if (min === 60) {
        min = 0;
        sec = 0;
        stop += 1;
      }
      timer.innerHTML = min + " min " + sec + " sec";
    }
  }, 1000);
};

//popUp function
const popUp = document.querySelector(".popUp");
const closeBtn = document.querySelector(".closeBtn");
const resultMoves = document.querySelector(".resultMoves");
const resultStars = document.querySelector(".resultStars");
const resultScore = document.querySelector(".resultScore");
const timetaken = document.querySelector(".resultTime");
function popUpFunction() {
  popUp.style.display = "block";
  closeBtn.addEventListener("click", function() {
    popUp.style.display = "none";
  });
  resultMoves.innerHTML = numMoves + " moves made";
  resultScore.innerHTML = "Score " + scoreCount;
  timetaken.innerHTML = "Time Taken " + timer.innerHTML;
  resultStars.innerHTML = stars.innerHTML;
  playAgain();
}

//playAgain button function
const playAgainBtn = document.querySelector(".playAgain");

function playAgain() {
  playAgainBtn.addEventListener("click", function() {
    popUp.style.display = "none";
    addCards();
    shownCards = [];
    scoreCount = 0;
    numMoves = 0;
    totalCards = 0;
    min = 0;
    sec = 0;
    stop = 0;
    moves.innerHTML = 0;
    timer.innerHTML = "";
  });
}
