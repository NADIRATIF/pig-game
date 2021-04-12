'use strict';

// Selection elements
const playerOne = document.querySelector('.player-1');
const playerZero = document.querySelector('.player-0');
const scoreZero = document.getElementById('score-1');
const scoreOne = document.getElementById('score-0');
const currentScoreZero = document.getElementById('current-0');
const currentScoreOne = document.getElementById('current-1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnNewGame = document.querySelector('.btn-new');
let activePlayer, currentScore = 0, scoreTotal, playing, rollTo;

// initialization game
const init = () => {
    playing = true;
    activePlayer = 0;
    currentScore = 0;
    scoreTotal = [0, 0];
    rollTo = 10; // TODO Winner should be have roolTo winn the game [change to test]

    scoreOne.textContent = '0';
    scoreZero.textContent = '0';
    currentScoreZero.textContent = '0';
    currentScoreOne.textContent = '0';

    dice.classList.add('hidden');
    btnRoll.classList.remove('hidden');
    btnHold.classList.remove('hidden');
    document.querySelector(`.player-${activePlayer}`).classList.remove('player-winner');
    document.querySelector(`.player-${activePlayer}`).classList.remove('player-winner');
}
init();

// switch player
const switchPlayer = () => {
    document.getElementById(`current-${activePlayer}`).textContent = '0';
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    playerZero.classList.toggle('player-active');
    playerOne.classList.toggle('player-active');
}

// Rolling dice functionality
const rollDice = () => {
    if (playing) {
        // generate a random dice
        const diceNumber = Math.floor(Math.random() * 6) + 1;

        // display roll dice
        dice.classList.remove('hidden');
        dice.src = `img/dice-${diceNumber}.png`;

        // check  if rolled 1
        if (diceNumber !== 1) {
            // add dice roll to current score
            currentScore += diceNumber;

            //display current score
            document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        } else {
            //switch the player if dice 1
            switchPlayer();
        }
    }
}

// hold score
const holdScore = () => {
    if (playing) {
        // add current score to the total score
        scoreTotal[activePlayer] += currentScore;

        // display scoreTotal
        document.getElementById(`score-${activePlayer}`).textContent = scoreTotal[activePlayer];

        // check if scoreTotal >= 100
        if (scoreTotal[activePlayer] >= rollTo) {
            playing = false;
            document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
            document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
            btnRoll.classList.add('hidden');
            btnHold.classList.add('hidden');
        } else {
            //switch the player if dice 1
            switchPlayer();
        }
    }
}

// player roll dice
btnRoll.addEventListener('click', rollDice)

// player Hold score
btnHold.addEventListener('click', holdScore)

// player start new game
btnNewGame.addEventListener("click", init)