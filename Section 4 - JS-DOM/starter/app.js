/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


Coding Challenges:
    1. A player looses his ENTIRE score when he rolls two 6's in a row. After that its the next players turn.
    2. Add an input field to the html to where players can set the winning score, so that they can change 
        the predefined score of 100.
    3. Add another die to the game, so that tere are two dice now. The Player loses his current score if 
        one die is a one.

*/




/*
*************************************************************************** 
*                            Variable setup                               *
***************************************************************************    
*/

var player1Display,
    player2Display,
    player1Round,
    player2Round,
    player1Score,
    player2Score,
    activePlayer,
    player1Name,
    player2Name,
    roundScore,
    scoreInput,
    dieImage1,
    dieImage2,
    lastRoll,
    holdBtn,
    rollBtn,
    newBtn,
    scores;

dieImage1 = document.getElementById('dice1');
dieImage2 = document.getElementById('dice2');
player1Display = document.querySelector('.player-0-panel');
player2Display = document.querySelector('.player-1-panel');
player1Round = document.getElementById('current-0');
player2Round = document.getElementById('current-1');
player1Score = document.getElementById('score-0');
player2Score = document.getElementById('score-1');
player1Name = document.querySelector('#name-0');
player2Name = document.querySelector('#name-1');
newBtn = document.querySelector('.btn-new');
holdBtn = document.querySelector('.btn-hold');
rollBtn = document.querySelector('.btn-roll');
scoreInput = document.getElementById('scoreLimit');


/*
*************************************************************************** 
*                              DOM  Setup                                 *
***************************************************************************    
*/

// grabs the elements from the document for manipulation
reset();


/*
*************************************************************************** 
*                         Event Listener Setup                            *
***************************************************************************    
*/

// events listen for things to happen to the DOM such as a click or scroll,
//  or even a hover. It wil then run the code im the callback function.
rollBtn.addEventListener('click', function() {

    // 1. randomly generate the number on the die and add them to the last roll array
    var die1 = Math.floor(Math.random() * 6) + 1;
    var die2 = Math.floor(Math.random() * 6) + 1;

    // this is a boolean to hold whether there was two Six's 
    // rolled with in two rolls of the die.
    var doubleSix =(lastRoll[0] === 6 && die1 === 6) || (lastRoll[0] === 6 && die2 ===6) ||
                        (lastRoll[1] === 6 && die1 === 6) || (lastRoll[1] === 6 && die2 === 6) || 
                        (die1 === 6 && die2 === 6);

    // 2. Display the result
    dieImage1.style.display = 'block';
    dieImage1.src = "dice-" + die1 + ".png";

    dieImage2.style.display = 'block';
    dieImage2.src = "dice-" + die2 + ".png";

    // console.log(die1);
    // console.log(die2);
    // console.log(lastRoll);
    // console.log(doubleSix);

    // set the last two rolls of the dice.
    lastRoll[0] = die1;
    lastRoll[1] = die2;
    

    // 3. Update the round score IF the roll number was NOT a 1
    if (die1 > 1 && die2 > 1 && !doubleSix) {
        // add the score
        roundScore += (die1 + die2);
        document.querySelector('#current-' + activePlayer)
            .textContent = roundScore;
    } else if (doubleSix) {
        // reset the score if there was a double six.
        scores[activePlayer] = 0;
        activePlayer === 0 ? player1Score.textContent = scores[activePlayer]:
            player2Score.textContent = scores[activePlayer];
        changePlayer();
    } else {
        changePlayer();
    }
});

holdBtn.addEventListener('click', function() {
    // add the current round score to the player's global score
    var winScore;
    scores[activePlayer] += roundScore;
    activePlayer === 0 ? player1Score.textContent = scores[activePlayer]:
        player2Score.textContent = scores[activePlayer];

    if(scoreInput.value) {
        winScore = scoreInput.value;
    } else {
        winScore = 100;
    }

    if (scores[activePlayer] >= winScore) {
        holdBtn.disabled = true;
        rollBtn.disabled = true;
        activePlayer === 0 ? setWinner(1)
             : setWinner(2);
    } else {
        // change the player
        changePlayer();
    }
});

newBtn.addEventListener('click', reset);


/*
*************************************************************************** 
*                           Custom Functions                              *
***************************************************************************    
*/


function changePlayer() {
    // reset the round score
    roundScore = 0;
    activePlayer === 0 ? player1Round.textContent = 0 : 
        player2Round.textContent = 0;

    // change the active player
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0

    player1Display.classList.toggle('active');
    player2Display.classList.toggle('active');

    // hide the die image before the next player rolls.
    dieImage1.style.display = 'none';
    dieImage2.style.display = 'none';
}

function setWinner(player) {
    // change the winning players display accordingly
    if (player === 1) {
        player1Name.textContent = 'Winner!';
        dieImage1.style.display = 'none';
        dieImage2.style.display = 'none';
        player1Display.classList.add('winner');
        player1Display.classList.remove('active');
    } else {
        player2Name.textContent = 'Winner!';
        dieImage1.style.display = 'none';
        dieImage2.style.display = 'none';
        player2Display.classList.add('winner');
        player2Display.classList.remove('active');
    }
}

function reset() {
    // reset the display
    player1Name.textContent = 'Player 1';
    player2Name.textContent = 'Player 2';
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    player1Round.textContent = 0;
    player2Round.textContent = 0;
    dieImage1.style.display = 'none';
    dieImage2.style.display = 'none';
    holdBtn.disabled = false;
    rollBtn.disabled = false;
    player1Display.classList.remove('winner');
    player2Display.classList.remove('winner');
    player1Display.classList.remove('active');
    player2Display.classList.remove('active');
    player1Display.classList.add('active');
    
    // set all counters to 0
    activePlayer = 0;
    scores = [0, 0];
    roundScore = 0;
    lastRoll = [0, 0];
}