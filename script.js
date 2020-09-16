var nextButton = document.querySelector('#next-button');
var rulesContainer = document.querySelector('#rules-container');
var selectContainer = document.querySelector('#select-container');

function nextToSelect(event) {
  rulesContainer.classList.add('hide');
  selectContainer.classList.remove('hide');
}

nextButton.addEventListener('click', nextToSelect);
