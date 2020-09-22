const nextButton = document.querySelector('#next-button');
const rulesContainer = document.querySelector('#rules-container');
const selectContainer = document.querySelector('#select-container');
const gameContainer = document.querySelector('#game-container');
const endContainer = document.querySelector('#end-container');
const userChoiceImage = document.querySelector('#user-hand');
const compChoiceImage = document.querySelector('#comp-hand');
const endGameButton = document.querySelector('#end-game-button');
const playAgainButton = document.querySelector('#restart-button');
const gameOverScreen = document.querySelector('#game-over');
const playButton = document.querySelector('#play-button');
localStorage.setItem('cScore', 0);
localStorage.setItem('uScore', 0);
localStorage.setItem('round', 1);

// When user clicks next on initial screen, it hides the initial rule screen and brings them to the selection screen to choose their game pick
function nextToSelect(event) {
  rulesContainer.classList.add('hide');
  selectContainer.classList.remove('hide');
}

// Function to hide the selection container and show the game container
function hideSelectShowGame() {
  let round = localStorage.getItem('round');
  compChoiceImage.setAttribute(
    'src',
    'https://res.cloudinary.com/dsxuuory9/image/upload/v1598164483/random/rock%20paper%20scissors/PngItem_2122744_idavl7.png'
  );
  userChoiceImage.setAttribute(
    'src',
    'https://res.cloudinary.com/dsxuuory9/image/upload/v1598164398/random/rock%20paper%20scissors/pngkit_scissors-icon-png_2077319_qaw7tw.png'
  );

  selectContainer.classList.add('hide');
  gameContainer.classList.remove('hide');
  playRound();
}

// Function to hide the game container and show the selection container
function hideGameShowSelect() {
  selectContainer.classList.remove('hide');
  gameContainer.classList.add('hide');
}

// Function to show end of game screen
function showEndScreen() {
  endContainer.classList.remove('hide');
  gameContainer.classList.add('hide');
}

// FUNCTION TO GET USER AND COMP PICKS
function choicesMade(event) {
  // Get user choice
  var gameChoice = document.querySelector('#game-choice');
  // grabs the id or the id of the parent id of the clicked choice (in case the p text is clicked)
  var uPick = event.target.id || event.target.parentElement.id;
  if (uPick === 'rock' || uPick === 'paper' || uPick === 'scissors') {
    localStorage.setItem('userPick', uPick);
  }
  // Get computer choice
  let cRand = Math.floor(Math.random() * 3);
  var gamePicks = ['rock', 'paper', 'scissors'];
  let cPick = gamePicks[cRand];
  localStorage.setItem('compPick', cPick);
  console.log(`compPick = ${cPick}`);
  console.log(`userPick = ${uPick}`);

  // Set score to to proper score based on local storage -- need this for when a new round is started
  let cScore = localStorage.getItem('cScore');
  let uScore = localStorage.getItem('uScore');
  // Update score
  let compScore = document.querySelector('#comp-score');
  let userScore = document.querySelector('#user-score');
  compScore.textContent = cScore;
  userScore.textContent = uScore;

  hideSelectShowGame();
}

// FUNCTION TO DISPLAY PICKS
function displayPicks() {
  // Get User and Computer game choices from local storage
  var uPick = localStorage.getItem('userPick');
  var cPick = localStorage.getItem('compPick');

  // Display Game Choices
  setTimeout(function () {
    if (uPick === 'paper') {
      userChoiceImage.setAttribute(
        'src',
        'https://res.cloudinary.com/dsxuuory9/image/upload/v1598164447/random/rock%20paper%20scissors/Daco_1650091_fxncw1.png'
      );
    } else if (uPick === 'scissors') {
      userChoiceImage.setAttribute(
        'src',
        'https://res.cloudinary.com/dsxuuory9/image/upload/v1598164611/random/rock%20paper%20scissors/Daco_5357819_glggos.png'
      );
    }
    if (cPick === 'paper') {
      compChoiceImage.setAttribute(
        'src',
        'https://res.cloudinary.com/dsxuuory9/image/upload/v1598164447/random/rock%20paper%20scissors/Daco_1650091_fxncw1.png'
      );
    } else if (cPick === 'scissors') {
      compChoiceImage.setAttribute(
        'src',
        'https://res.cloudinary.com/dsxuuory9/image/upload/a_152/v1600703838/random/rock%20paper%20scissors/compsciss_vxnu7a.png'
      );
    }
  }, 3100);
}

// Function for Countdown
function countDown() {
  const countModal = document.querySelector('#count-modal');
  const count = document.querySelector('#countdown');
  let countArr = ['Rock', 'Paper', 'Scissors', 'Shoot!'];

  // Time out function to start countdown
  setTimeout(function () {
    countModal.classList.remove('hide');
  }, 300);

  // Code to go through the countArr and display them to the screen
  let i = 0;
  var countInterval = setInterval(function () {
    if (countArr[i] === undefined) {
      clearInterval(countInterval);
      count.textContent = 'Rock';
    } else {
      count.textContent = countArr[i];
      i++;
    }
  }, 750);

  setTimeout(function () {
    countModal.classList.add('hide');
  }, 3300);
}

// Function to play the round
function playRound() {
  // Get User and Computer game choices & scores from local storage
  var uPick = localStorage.getItem('userPick');
  var cPick = localStorage.getItem('compPick');
  let cScore = localStorage.getItem('cScore');
  let uScore = localStorage.getItem('uScore');
  let round = localStorage.getItem('round');
  let outcome = document.querySelector('#outcome');
  let currentRound = document.querySelector('#round');
  // Set round text to the current round
  currentRound.textContent = round;

  // Function to start countdown
  countDown();

  // Show user and comp picks
  displayPicks();

  // In case of tie
  if (uPick === cPick) {
    // All cases where user wins
  } else if (
    (uPick === 'rock' && cPick === 'scissors') ||
    (uPick === 'paper' && cPick === 'rock') ||
    (uPick === 'scissors' && cPick === 'paper')
  ) {
    uScore++;
    round++;
    // All other possible cases computer wins
  } else {
    cScore++;
    round++;
  }
  // Set current scores and round to local storage
  localStorage.setItem('cScore', cScore);
  localStorage.setItem('uScore', uScore);
  localStorage.setItem('round', round);

  // Update score and round
  let compScore = document.querySelector('#comp-score');
  let userScore = document.querySelector('#user-score');

  setTimeout(function () {
    console.log(`Current score: \n computer: ${cScore} \n user: ${uScore}`);
    console.log(`round = ${round}`);
    compScore.textContent = cScore;
    userScore.textContent = uScore;
    // currentRound.textContent = round;
  }, 3200);

  // Hide game screen, show user selection screen for them to pick again
  setTimeout(function () {
    if (round < 4 && cScore < 2 && uScore < 2) {
      hideGameShowSelect();
    } else {
      endGame();
    }
  }, 5000);
}

function endGame() {
  const cFinal = document.querySelector('#comp-final');
  const uFinal = document.querySelector('#user-final');
  const winner = document.querySelector('#winner');
  let cScore = localStorage.getItem('cScore');
  let uScore = localStorage.getItem('uScore');
  let gameWinner;

  if (cScore > uScore) {
    gameWinner = 'Computer';
  } else {
    gameWinner = 'You';
  }

  cFinal.textContent = cScore;
  uFinal.textContent = uScore;
  winner.textContent = gameWinner;
  showEndScreen();
}

function reset() {
  localStorage.setItem('cScore', 0);
  localStorage.setItem('uScore', 0);
  localStorage.setItem('round', 1);
}

// Click functions
nextButton.addEventListener('click', nextToSelect);
selectContainer.addEventListener('click', choicesMade);
// Click function if user doesn't want to play again
endGameButton.addEventListener('click', function () {
  endContainer.classList.add('hide');
  gameOverScreen.classList.remove('hide');
  reset();
});
// Click function if user wants to play again
playAgainButton.addEventListener('click', function () {
  endContainer.classList.add('hide');
  selectContainer.classList.remove('hide');
  reset();
});
playButton.addEventListener('click', function () {
  selectContainer.classList.remove('hide');
  gameOverScreen.classList.add('hide');
  reset();
});
