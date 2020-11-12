'use strict';

// Exercise #4
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You win');
    } else {
      reject(new Error('You lost our money'));
    }
  }, 2000);
});

lotteryPromise
  .then(response => console.log(response))
  .catch(err => console.error(err));
