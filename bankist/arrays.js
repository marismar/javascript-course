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

const dogs = checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

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
