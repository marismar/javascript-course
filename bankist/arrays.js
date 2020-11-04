'use strict';

// Exercise #1
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

movements.forEach((item, index, array) => {
  item > 0
    ? console.log(`Movement ${index + 1}: You deposited ${item}`)
    : console.log(`Movement ${index + 1}: You withdrew ${Math.abs(item)}`);
});

currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

currenciesUnique.forEach((value, _, set) => {
  console.log(`${value}: ${value}`);
});

// Coding challenge #1
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice(1, -2);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  // You also can use: const dogs = [...dogsJuliaCorrected, ...dogsKate];

  dogs.forEach((dog, index) => {
    dog >= 3
      ? console.log(
          `Dog number ${index + 1} is an adult, and is ${dog} years old 🐕`
        )
      : console.log(
          `Dog number ${index + 1} is an puppy, and is ${dog} years old 🐶`
        );
  });

  return dogs;
};

let dogs = checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// Exercise #2
const eurToUsd = 1.1;
const movementsToUsd = movements.map(movement => movement * eurToUsd);
const movementsDescriptions = movements.map(
  (movement, index) =>
    `Movement ${index + 1}: You ${
      movement > 0 ? 'deposited' : 'withdrew'
    } ${Math.abs(movement)}`
);

console.log(movementsToUsd);
console.log(movementsDescriptions);

// Exercise #3
const deposits = movements.filter(movement => movement > 0);
const withdrawals = movements.filter(movement => movement < 0);

console.log(deposits);
console.log(withdrawals);

// Exercise #4
const maxValue = function (movements) {
  return movements.reduce((acc, movement) => (acc > movement ? acc : movement));
};

console.log(maxValue(movements));

// Coding challenge #2
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age > 2 ? 16 + age * 4 : age * 2))
    .filter(age => age >= 18)
    .reduce((acc, age, index, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge(dogs));

// Exercise #5
const totalDepositsUSD = movements
  .filter(movement => movement > 0)
  .map(movement => movement * eurToUsd)
  .reduce((acc, movement) => acc + movement, 0);

console.log(totalDepositsUSD);

// Exercise #6
const condition = movement => movement > 0;

console.log(movements.includes(-130));
console.log(movements.some(movement => movement > 0));
console.log(movements.every(condition));

// Exercise #7
const arr = [[7, -524, -2, 14], [12, -21, -74], 12, 23];
console.log(arr.flat());

// Exercise #8
const owners = ['Jonas', 'Marismar', 'Mirele', 'Ana'];
console.log(owners.sort());

console.log(movements.slice().sort((a, b) => a - b)); //Ascending order
console.log(movements.slice().sort((a, b) => b - a)); //Descending order

// Exercise #9
console.log([1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(new Array(7).fill(23, 2, 6));
console.log(Array.from({ length: 7 }, (item, index) => index + 1));
// Array.from() also can use to convert Maps and Sets to Arrays

// Coding challenge #4
dogs = [
  { weight: 22, currentFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, currentFood: 200, owners: ['Matilda'] },
  { weight: 13, currentFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, currentFood: 340, owners: ['Michael'] },
];

// Calculate the amount of recommended food for each dog
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);

// Check and print if Sarah's dog is eating too much or too little
const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dog is eating too ${
    sarahsDog.currentFood >= sarahsDog.recommendedFood ? 'much 🔺' : 'little 🔻'
  }`
);

const ownersEatTooMuch = dogs
  .filter(dog => dog.currentFood > 1.1 * dog.recommendedFood)
  .flatMap(dog => dog.owners);

const ownersEatTooLittle = dogs
  .filter(dog => dog.currentFood < 0.9 * dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much 🔺`);
console.log(`${ownersEatTooLittle.join(' and ')} dogs eat too little 🔻`);

const checkEatingOkay = dog =>
  dog.currentFood <= 1.1 * dog.recommendedFood &&
  dog.currentFood >= 0.9 * dog.recommendedFood;

console.log(
  `There's ${
    dogs.some(checkEatingOkay) ? 'some' : 'no'
  } dogs eating an OKAY the amount of food that is recommended!`
);

console.log(
  `There's ${
    dogs.some(dog => dog.currentFood === dog.recommendedFood) ? 'some' : 'no'
  } dogs eating EXACTLY the amount of food that is recommended!`
);

// Sort a copy of dogs by recommended food portion in an ascending order
console.log(dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood));
console.log(dogs.filter(checkEatingOkay));
