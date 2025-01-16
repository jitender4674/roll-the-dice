'use strict'

// selection elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');


// we have to use teh # or . for the id or class resp. while using the queryselector
const score0El = document.querySelector('#score--0');

// we dont have to use # while using teh getelementbyiD.....
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// the current score counter
let currentScore = 0;

// to keep track of the active player
let activePlayer = 0;
let playing = true;
// storing scores in array
const scores = [0, 0];

score0El.textContent = 0;//just in case there is any other number present
score1El.textContent = 0;


const init = function () {
    currentScore = 0;
    // to keep track of the active player
    activePlayer = 0;
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');

    player1El.classList.remove('player--active');
    player1El.classList.remove('playe--winner');

    player0El.classList.add('player--active');
    player0El.classList.remove('player--winner');
};


// creating a function for switching the player

const switchPlayer = function () {
    // resetting the current score of the selected player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    // resetting the score counter
    currentScore = 0;
    // switching the player using the ternary operator, if the activeplayer is 0 ,,, the true condition will be held.. i.e. the active player will be assigned 1 and vice versa
    activePlayer = activePlayer === 0 ? 1 : 0;
    // toggling the player active class i.e. if it already exists it will be removed.. if it doesn't exist, it will be added..(class is defined in css)
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};




// hiding the dice, it will be shown when the roll dice button is clicked
diceEl.classList.add('hidden');

// rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // display dice
        diceEl.classList.remove('hidden');

        // the template literal will output a string i.e... the dice image no. 5.. with 5 in its name
        diceEl.src = `dice-${dice}.png`;

        // check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            // add dice to the current score
            currentScore += dice;

            // dynamically selecting the active player based on 0 or 1 with the template literal
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

            // current0El.textContent = currentScore;

            // adding this ... no need to hold to win.... the winning conditions will automatically apply when a players score reaches above the limit
            if (document.getElementById(`current--${activePlayer}`).textContent >= 20) {
                playing = false;

                document.getElementById(`score--${activePlayer}`).textContent = currentScore;

                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

                document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');


            }


        } else {
            // when dice rolla a 1
            // switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // when a player holds the score
        //1. add current score to active player's score
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];


        // 2.check if the score is above 100
        if (scores[activePlayer] >= 20) {
            playing = false;

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');


        } else {
            // 3.switch player
            switchPlayer();
        }



    }


});

btnNew.addEventListener('click', init);
