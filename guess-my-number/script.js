'use strict';

const messageElement = document.querySelector('.message');
const numberElement = document.querySelector('.number');
const scoreElement = document.querySelector('.score');
const highscoreElement = document.querySelector('.highscore');

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

function displayTextContent(element, text) {
  element.textContent = text;
}

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayTextContent(messageElement, '⛔ No number!');
  } else if (guess === secretNumber) {
    highscore = score > highscore ? score : highscore;

    displayTextContent(highscoreElement, highscore);
    displayTextContent(numberElement, secretNumber);
    displayTextContent(messageElement, '🎉 Correct number!');

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
  } else if (guess !== secretNumber) {
    if (score > 1) {
      score--;

      displayTextContent(scoreElement, score);
      displayTextContent(
        messageElement,
        guess > secretNumber ? '📈 Too high!' : '📉 Too low!'
      );
    } else {
      displayTextContent(scoreElement, 0);
      displayTextContent(messageElement, '💥 You lost the game!');
    }
  }
});

document.querySelector('.again').addEventListener('click', () => {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  displayTextContent(messageElement, 'Start guessing...');
  displayTextContent(scoreElement, 20);
  displayTextContent(numberElement, '?');

  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
