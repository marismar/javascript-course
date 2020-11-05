'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-02-10T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-15T10:17:24.185Z',
    '2020-05-30T14:11:59.604Z',
    '2020-11-01T17:01:17.194Z',
    '2020-11-02T23:36:17.929Z',
    '2020-11-03T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
    '2020-05-08T14:11:59.604Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Functions
const createUsername = function (accounts) {
  // Create username for each account
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 3600 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDay()}`.padStart(2, 0);
  // const month = `${date.getMonth()}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = ''; // Clear all data of movements
  // Create a copy of movements and sort it
  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach((item, index) => {
    const type = item > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[index]);
    const displayDate = formatMovementDate(date, account.locale);

    const formattedMov = formatCur(item, account.locale, account.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${index + 1} ${type}
        </div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayDate = function (locale) {
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    //weekday: 'long',
  };

  labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(
    (acumulator, movement) => acumulator + movement,
    0
  );

  labelBalance.textContent = formatCur(
    account.balance,
    account.locale,
    account.currency
  );
};

const calcDiplaySummary = function (account) {
  const incomes = account.movements
    .filter(movement => movement > 0)
    .reduce((acc, movement) => acc + movement, 0);

  const out = account.movements
    .filter(movement => movement < 0)
    .reduce((acc, movement) => acc + movement, 0);

  const interest = account.movements
    .filter(movement => movement > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(value => value >= 1)
    .reduce((acc, value) => acc + value, 0);

  labelSumIn.textContent = formatCur(incomes, account.locale, account.currency);

  labelSumOut.textContent = formatCur(
    Math.abs(out),
    account.locale,
    account.currency
  );

  labelSumInterest.textContent = formatCur(
    interest,
    account.locale,
    account.currency
  );
};

const updateUI = function (account) {
  displayMovements(account);
  calcDisplayBalance(account);
  calcDiplaySummary(account);
  calcDisplayDate(account.locale);
};

const startLogOutTimer = function () {
  let time = 300;
  let second = 60;
  const counting = function () {
    if (time === 1) {
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
    } else {
      time--;
    }
    let minute = Math.floor(time / 60);
    if (second === 0) {
      second = 59;
    } else {
      second--;
    }

    labelTimer.textContent = `${minute}:${second}`;
  };

  return setInterval(counting, 1000);
};

// Event handler
let currentAccount;
let sorted = false;
let timer;

createUsername(accounts);

btnLogin.addEventListener('click', event => {
  event.preventDefault(); // Prevent form from submitting

  currentAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    containerApp.style.opacity = 100;
  }
});

btnTransfer.addEventListener('click', event => {
  event.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiveAccount = accounts.find(
    account => account.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiveAccount &&
    currentAccount.balance >= amount &&
    receiveAccount.username !== currentAccount.username
  ) {
    receiveAccount.movements.push(amount);
    currentAccount.movements.push(-amount);
    receiveAccount.movementsDates.push(new Date().toISOString());
    currentAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    inputTransferAmount.value = inputTransferTo.value = '';
  }
});

btnClose.addEventListener('click', event => {
  event.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // Delete account
    accounts.splice(
      accounts.findIndex(
        account => account.username === currentAccount.username
      ),
      1
    );

    // Hide UI
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
    labelWelcome.textContent = 'Log in to get started';
  }
});

btnLoan.addEventListener('click', event => {
  event.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some(movement => movement >= 0.1 * amount)
  ) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);
    }, 100);
  }

  inputLoanAmount.value = '';
});

btnSort.addEventListener('click', event => {
  event.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// Aditional
/* const overalBalance = accounts
  .flatMap(account => account.movements)
  .reduce((acumulator, movement) => acumulator + movement, 0);

console.log(overalBalance);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);
});
 */
