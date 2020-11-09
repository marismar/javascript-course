'use strict';

// Exercise #1
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2020 - this.birthYear);
};

const marismar = new Person('Marismar', 1997);
const jonas = new Person('Jonas', 1991);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically returns {}

console.log(marismar, jonas);
console.log(marismar instanceof Person);
console.log(jonas instanceof Person);

marismar.calcAge();
jonas.calcAge();

console.log(Person.prototype.isPrototypeOf(marismar));
console.log(Person.prototype.isPrototypeOf(jonas));

Person.prototype.species = 'Homo sapiens';

console.log(marismar.species);
console.log(marismar.hasOwnProperty('species'));

console.log(marismar);
console.log(marismar.__proto__);
console.log(marismar.__proto__.__proto__);

console.log(Person.prototype.constructor);

const arr = [3, 25, 1, 54, 42, 2, 3, 65, 5, 9];
console.log(arr);
console.log(arr.__proto__);
console.log(arr.__proto__.__proto__);

// Coding challenge #1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`The current speed of ${this.make} is ${this.speed}km/h 🏎`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`The current speed of ${this.make} is ${this.speed}km/h 🏎`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.brake();

mercedes.accelerate();
mercedes.brake();

// Exercise #2 (extends exercise #1)
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2020 - this.birthYear);
  }

  greet() {
    console.log(`Hey, ${this.fullName} ✌`);
  }

  get age() {
    return 2020 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name ⛔`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there ✌');
    console.log(this);
  }
}

const mirele = new PersonCl('Mirele Costa', 1999);

mirele.greet();
mirele.calcAge();

console.log(mirele);
console.log(mirele.age);
PersonCl.hey();

// Exercise #3
const account = {
  owner: 'Marismar',
  movements: [200, 320, 450, 25, 10, 50],
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(movement) {
    this.movements.push(movement);
  },
};

console.log(account.latest);
account.latest = 100;
console.log(account.latest);

// Exercise #4
const PersonProto = {
  calcAge() {
    console.log(2020 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven);
console.log(steven.__proto__);

const sarah = Object.create(PersonProto);

sarah.init('Sarah', 1979);
sarah.calcAge();

// Coding challenge #2
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);

console.log(ford);
console.log(ford.speedUS);
ford.speedUS = 50;
console.log(ford);
console.log(ford.speedUS);

// Exercise #5 (extends exercise #1)
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.constructor = Student;

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const marcilio = new Student('Marcilio', 1975, 'Computer Science');

marcilio.introduce();
marcilio.calcAge();
console.log(marcilio);
console.log(marcilio.__proto__);
console.log(marcilio.__proto__.__proto__);

// Coding challenge #3
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Linking prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed}km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);

console.log(tesla);
tesla.chargeBattery(90);
tesla.accelerate();

// Exercise #6 (extends exercise #5)
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
}

const julia = new StudentCl('Julia Scarlet', 1992, 'Medicine');

console.log(julia);
julia.introduce();
julia.calcAge();

// Exercise #7 (extends exercise #4)
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();

// Exercise #8
class Account {
  // Public fields (intances)
  locale = navigator.language;

  // Private fileds (intances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protect property
    this.#pin = pin;

    console.log(`Thanks for opening an account, ${this.owner}`);
  }

  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);
    return this;
  }

  withdraw(value) {
    this.#movements.push(-value);
    return this;
  }

  // #approveLoan(value) {
  _approveLoan(value) {
    return true;
  }

  requestLoad(value) {
    if (this._approveLoan(value)) {
      this.deposit(value);
      console.log('Loan approved');
    }
    return this;
  }

  static helper() {
    console.log('Helper');
  }
}

const account1 = new Account('Marismar', 'EUR', 1234);

account1.deposit(500);
account1.withdraw(130);
account1.requestLoad(1000);
Account.helper();
console.log(account1);
console.log(account1.getMovements());

// account1.helper();
// account1._approveLoan(1000);
// console.log(account1.#movements);

// Exercise #9 (extends exercise #8)
account1.deposit(500).deposit(120).withdraw(200).requestLoad(25000);
console.log(account1.getMovements());

// Coding challenge #4
class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;

    console.log(
      `${this.make} is going at ${this.speed}km/h, with a charge of ${
        this.#charge
      }`
    );

    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);

console.log(rivian);
console.log(rivian.speedUS);
rivian.accelerate().accelerate().accelerate();
