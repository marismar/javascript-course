'use strict';

// Coding challenge #1.1
const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / heightJohn ** 2;

const markHigherBMI = BMIMark > BMIJohn;

console.log(markHigherBMI);

// Coding challenge #1.2 (extends 1.1 challenge)
if (markHigherBMI) {
  console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`);
} else {
  console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`);
}

// Coding challenge #1.3
const dolphins = [
  [96, 108, 89],
  [97, 112, 101],
  [97, 112, 101],
];
const koalas = [
  [88, 91, 110],
  [109, 95, 123],
  [109, 95, 106],
];

for (let i = 0; i < 3; i++) {
  const scoreDolphins =
    dolphins[i].reduce((total, item) => total + item, 0) / dolphins[i].length;
  const scoreKoalas =
    koalas[i].reduce((total, item) => total + item, 0) / koalas[i].length;

  if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
    console.log('Dolphins win the trophy 🏆');
  } else if (scoreDolphins < scoreKoalas && scoreKoalas >= 100) {
    console.log('Koalas win the trophy 🏆');
  } else if (scoreDolphins === scoreKoalas && scoreDolphins >= 100) {
    console.log('Both win the trophy 🏆');
  } else {
    console.log('No one wins the trophy 😢');
  }
}

// Coding challenge #1.4
const bill = [275, 40, 430];

for (const obj of bill) {
  const tip = obj >= 50 && obj <= 300 ? obj * 0.15 : obj * 0.2;

  console.log(
    `The bill was ${obj}, the tip was ${tip}, and the total value ${obj + tip}.`
  );
}

// Coding challenge #2.1 (extends 1.3 challenge)
const calcAverage = (a, b, c) => (a + b + c) / 3;
const checkWinner = function (averageDolphins, averageKoalas) {
  if (averageDolphins >= averageKoalas * 2) {
    console.log(`Dolphins win 🏆 (${averageDolphins} vs. ${averageKoalas})`);
  } else if (averageKoalas >= averageKoalas * 2) {
    console.log(`Koalas win 🏆 (${averageKoalas} vs. ${averageDolphins})`);
  } else {
    console.log('No team wins 😢');
  }
};

let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);

checkWinner(scoreDolphins, scoreKoalas);

scoreDolphins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 34, 27);

checkWinner(scoreDolphins, scoreKoalas);

// Coding challenge #2.2 (extends 1.4 challenge)
const calcTip = bill => (bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2);

for (const obj of bill) {
  const tip = calcTip(obj);

  console.log(
    `The bill was ${obj}, the tip was ${tip}, and the total value ${obj + tip}.`
  );
}

// Coding challenge #2.3 (extends 1.2 challenge)
const mark = {
  fullName: 'Mark Miller',
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

const john = {
  fullName: 'John Smith',
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

mark.calcBMI();
john.calcBMI();

if (mark.bmi > john.bmi) {
  console.log(
    `${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})!`
  );
} else if (mark.bmi < john.bmi) {
  console.log(
    `${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})!`
  );
}

// Coding challenge #2.4 (extends 2.2 challenge)
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  totals.push(bills[i] + tips[i]);
}

console.log(bills, tips, totals);

// Coding challenge #3.1
const data = [
  [17, 21, 23],
  [12, 5, -5, 0, 4],
];

function printForecast(data) {
  let message = '...';

  for (let i = 0; i < data[1].length; i++) {
    message += ` ${data[1][i]}ºC in ${i + 1} days ...`;
  }

  console.log(message);
}

printForecast(data);
