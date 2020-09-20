var nextButton = document.querySelector('#next-button');
var rulesContainer = document.querySelector('#rules-container');
var selectContainer = document.querySelector('#select-container');
var selectionModal = document.querySelector('#selection-modal');
var gameContainer = document.querySelector('#game-container');

// When user clicks next on initial screen, it hides the initial rule screen and brings them to the selection screen to choose their game pick
function nextToSelect(event) {
  rulesContainer.classList.add('hide');
  selectContainer.classList.remove('hide');
}

// Function to hide the selection container and show the game container
function hideSelectShowGame() {
  selectionModal.classList.add('hide');
  selectContainer.classList.add('hide');
  gameContainer.classList.remove('hide');
}

// When user selects their choice it alerts them of their selection and brings them to the game screen
function choiceMade(event) {
  var gameChoice = document.querySelector('#game-choice');
  // grabs the id or the id of the parent id of the clicked choice (in case the p text is clicked)
  var id = event.target.id || event.target.parentElement.id;

  // Show modal with selection alert
  if (id === 'rock' || id === 'paper' || id === 'scissors') {
    gameChoice.textContent = id;
    selectionModal.classList.remove('hide');
  }
  // In 2.5 seconds the function to show the game container is called
  setTimeout(hideSelectShowGame, 2100);
}

// Click functions
nextButton.addEventListener('click', nextToSelect);
selectContainer.addEventListener('click', choiceMade);
