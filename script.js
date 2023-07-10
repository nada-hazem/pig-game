"use strict";

// selecting elements
//converting score to 0
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//starting conditions
score0.textContent = 0;
score1.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0, 0];
//player 1 0 player 2 position 1
let currentScore = 0;
let activepalyer = 0;
let playing = true;

const switchplayer = function () {
  document.getElementById(`current--${activepalyer}`).textContent = 0;
  currentScore = 0;
  activepalyer = activepalyer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

//rolling dic funtionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // randomly load images of dice which contains numbers of dice

    //3. check for rolled 1 : if true , switch to next player
    if (dice !== 1) {
      //add dice roll to new score
      currentScore += dice;
      document.getElementById(`current--${activepalyer}`).textContent =
        currentScore;
    } else {
      switchplayer(); // set current score of active plaer to 0 before switching to next player

      //toggle add class if it's not present and remove it if present
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1.Add current score to active player's score
    scores[activepalyer] += currentScore; //scores[1]=score[1]+currentScore

    document.getElementById(`score--${activepalyer}`).textContent =
      scores[activepalyer]; //select based on active player
    //2.Check if player score is 100>=
    if (scores[activepalyer] >= 100) {
      // finish the game
      diceEl.classList.add("hidden");
      playing = false;
      document
        .querySelector(`.player--${activepalyer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activepalyer}`)
        .classList.remove("player--active");
    }
    //3.switch the player
    else {
      switchplayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  //1.set all scores to zero
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");

  //2.set player 1 as starting player
});
