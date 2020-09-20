var nextButton = document.querySelector('#next-button');
var rulesContainer = document.querySelector('#rules-container');
var selectContainer = document.querySelector('#select-container');

// When user clicks next on initial screen, it hides the initial rule screen and brings them to the selection screen to choose their game pick
function nextToSelect(event) {
  rulesContainer.classList.add('hide');
  selectContainer.classList.remove('hide');
}

// When user selects their choice it alerts them of their selection and brings them to the game screen
function choiceMade(event) {
  var selectionModal = document.querySelector('#selection-modal');
  var gameChoice = document.querySelector('#game-choice');
  var id = event.target.id || event.target.parentElement.id;

  // Show modal with selection alert
  if (id === 'rock' || id === 'paper' || id === 'scissors') {
    gameChoice.textContent = id;
    selectionModal.classList.remove('hide');
  }
}

// Click functions
nextButton.addEventListener('click', nextToSelect);
selectContainer.addEventListener('click', choiceMade);
