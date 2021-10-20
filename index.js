// programm logic plan
// 1.) Take DOM of all card container , create hasFlipped state, create firstCard and secondCard variable
// 2.) Give all card container onClick Event and create function to handle click Event
// 3.) Add classList on clicked card
// 4.) Define firstCard and secondCard DOM element, check with hasFlipped state
// 5.) Check dataset 1st click and second click, if match remove event listener and
// if it doesnt match flip the card and delay the logic of remove classlist so it cant be clicked again, so user can see the second card has been selected
// --- fix bug section--
// 6.)If card clicked when setTimeout is running, broke the logic, so lock handle click fuction if setTimeout delay is running, add lock statement on function
// 7.) card double click ?? dilanjut besok

//=============================== execution===================================

// logic plan number 1
const cards = document.querySelectorAll('.img-container');
let hasFlipped = false;
let firstCard, secondCard;

let lockFunction = false;

//logic plan number 2
const flipCard = (e) => {
  //logic plan number 6
  if (lockFunction) return;
  //   if (e.path[1] === firstCard) return
  //logic plan number 3
  e.path[1].classList.add('flip');

  // logic plan number 4
  if (!hasFlipped) {
    hasFlipped = !hasFlipped;
    firstCard = e.path[1];
  } else {
    hasFlipped = !hasFlipped;
    secondCard = e.path[1];

    // logic plan number 5 inside else
    checkMatch();
  }
};

function checkMatch() {
  const checkMatch = firstCard.dataset.flag === secondCard.dataset.flag;
  checkMatch ? disableEvent() : unFlipCard();
}

// if match disable click event
function disableEvent() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
}

// if not match remove flip class / auto flip
function unFlipCard() {
  lockFunction = !lockFunction;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    lockFunction = !lockFunction;
  }, 1200);
}

// immediately invoke this function and do suffle the front face card
(function shuffleCard() {
  cards.forEach((card) => {
    let randomOrder = Math.floor(Math.random() * 12);
    card.style.order = randomOrder;
  });
})();

// logic plan number 2
cards.forEach((card) => card.addEventListener('click', flipCard));
