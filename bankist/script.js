'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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

const updateUI = function (account) {
  displayMovements(account);
  calcDisplayBalance(account);
  calcDiplaySummary(account);
};

const displayMovements = function (account) {
  containerMovements.innerHTML = ''; // Clear all data of movements

  account.movements.forEach((item, index) => {
    const type = item > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${index + 1} ${type}
        </div>
        <div class="movements__value">${item}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(
    (acumulator, movement) => acumulator + movement,
    0
  );

  labelBalance.textContent = `${account.balance}€`;
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

  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(out)}€`;
  labelSumInterest.textContent = `${interest}€`;
};

createUsername(accounts);

// Event handler
let currentAccount;

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
