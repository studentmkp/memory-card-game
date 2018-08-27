const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
  if(lockBoard) return;
  if(this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    //first click the card
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

    //second click the card
    secondCard = this;

    //do the cards match?
    checkForMatch()

}

function checkForMatch(){
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards(): unflipCards();
  // if (firstCard.dataset.framework === secondCard.dataset.framework){
  //   disableCards()
  // } else {
  //   unflipCards()
  // }
}

function disableCards(){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards(){
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard(){
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null ];
}

(function shuffle(){
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    })
})();

cards.forEach(card => card.addEventListener('click', flipCard));
