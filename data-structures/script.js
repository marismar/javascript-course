'use strict';

// Coding challenge #1
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
const allPlayers = [...players1, ...players2];
const [goalkeeper1, ...fieldPlayers1] = players1;
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
const { team1, x: draw, team2 } = game.odds;

const printGoals = function (...players) {
  console.log(`${players.length} goals were scored`);
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals('Davies', 'Muller');

team1 < team2 && console.log('Team 1 is more likely to win!');

// Coding challenge #2 (extends 1 challenge)
const calcAverage = arr => {
  let sum = 0;
  for (const obj of arr) sum += obj;
  return sum / arr.length;
};

console.log(calcAverage(Object.values(game.odds)));

for (const [team, odd] of Object.entries(game.odds)) {
  const teamName = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamName}: ${odd}`);
}

for (const [goal, player] of game.scored.entries())
  console.log(`Goal ${goal + 1}: ${player}`);

// Coding challenge #3.1 (quiz app)
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);

console.log(question.get('question'));

for (const [key, value] of question)
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);

// const answer = Number(prompt('Your answer'));

// console.log(question.get(answer === question.get('correct')));

// Coding challenge #3.2
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = [...new Set(gameEvents.values())];
console.log(events);

gameEvents.delete(64);
console.log(gameEvents);

const time = [...gameEvents.keys()].pop();
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

for (const [minutes, event] of gameEvents) {
  const half = minutes <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${minutes}: ${event}`);
}

//Coding challenge #4
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');

  for (const [index, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;

    console.log(output.padEnd(20) + '✅'.repeat(index + 1));
  }
});
