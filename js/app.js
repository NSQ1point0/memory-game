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
let shownCards = [];
let scoreCount = 0;
let numMoves = 0;


//shuffle function
function shuffle(array) {
  var currentIndex = array.length,
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

//shuffling deck lol
shuffle(cards);

for (let i = 0; i < cards.length; i++) {
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML = "<i class='" + cards[i] + "'></i>";
  deck.appendChild(card);

  //Matching card logic and score system
  card.addEventListener("click", function() {
    if (shownCards.length === 1) {
      const firstCard = shownCards[0];
      const secondCard = this;
      card.classList.add("open", "show");
      shownCards.push(this);
      if (firstCard.innerHTML === secondCard.innerHTML) {
        firstCard.classList.add("match");
        secondCard.classList.add("match");
        shownCards = [];
        scoreCount += 5;
      } else {
        firstCard.classList.add("noMatch");
        secondCard.classList.add("noMatch");
        setTimeout(function(){firstCard.classList.remove("open", "show","noMatch");
        secondCard.classList.remove("open", "show", "noMatch");}, 500);
        shownCards = [];
        scoreCount -= 2;
      }
      numMoves += 1;
    } else {
      card.classList.add("open", "show");
      shownCards.push(this);
      numMoves += 1;
    }
    moves.appendChild("");
  });
}
