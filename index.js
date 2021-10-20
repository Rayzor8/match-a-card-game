// programm logic plan
// 1.) Take DOM of all card container , create hasFlipped state, create firstCard and secondCard variable
// 2.) Give all card container onClick Event and create function to handle click Event
// 3.) Add classList on clicked card
// 4.) Define firstCard and secondCard DOM element, check with hasFlipped state
// 5.) Check dataset 1st click and second click, if match remove event listener and
// if it doesnt match flip the card and delay the logic of remove classlist so it cant be clicked again, so user can see the second card has been selected
// --- fix bug section--
// 6.)If card clicked when setTimeout is running, broke the logic, so lock handle click fuction if setTimeout delay is running, add lock statement on function
// 7A.)Card double click bug , if first click and second click at the same card evaluate to same dataset, to handle this bug add more condition if DOM element is the same with firstCard return the function.
// 7B.)Add resetCard logic to handleClick event, reset hasFLipped,lockFucntion to false, (back to very first statement) and reset firstCard,secondCard state to null / empty element,  (back to very first statement)
// 7C.)So in checkMatch function, if dataset is match  reset state, else if unmatch reset state too and reset state on secondClick card. 
// 7C .) if match the logic will remove the eventlistener thats why bug happen , so if match remove event and reset state
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
  // logic plan number 7A
  if (e.path[1] === firstCard) return;
  //logic plan number 3
  e.path[1].classList.add('flip');

  // logic plan number 4
  if (!hasFlipped) {
    hasFlipped = true;
    firstCard = e.path[1];
  } else {
    // hasFlipped = !hasFlipped;
    secondCard = e.path[1];
    // logic plan number 5
    checkMatch();
  }
};

function checkMatch() {
  const checkMatch = firstCard.dataset.flag === secondCard.dataset.flag;
  checkMatch ? disableEvent() : unFlipCard();
}

// if match disable click event
function disableEvent() {
  console.log('match')
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetState()
}

// if not match remove flip class / auto flip
function unFlipCard() {
  console.log('not match')
  lockFunction = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetState()
  }, 1200);
}

// logic plan number 7B
function resetState(){
   [hasFlipped,lockFunction] = [false,false]
   [firstCard,secondCard] = [null,null]
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
