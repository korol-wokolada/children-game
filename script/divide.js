const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");

const answerContainer = document.querySelector(".container-answer");

const audioFalse = document.querySelector("#false-answer");
const audioRight = document.querySelector("#right-answer");

const form = document.querySelector(".select-inreval-form");

const firstNumber = document.querySelector("#num-first");
const mathematicalRelation = document.querySelector("#mathematical-relation");
const secondNumber = document.querySelector("#num-second");

window.addEventListener("load", getEquationDivide);

let integer = {};
let rightAnswer;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  integer = Object.fromEntries(formData);
  console.log(integer);
  getEquationDivide();
});
function getRundomNum(min = 1, max = 10) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getEquationDivide() {
  let num1;
  let num2;

  mathematicalRelation.innerHTML = "/";

  if (Object.keys(integer).length == 0) {
    num1 = getRundomNum();
    num2 = getRundomNum();
  } else {
    num1 = getRundomNum(integer.min, integer.max);
    num2 = getRundomNum(integer.min, integer.max);
  }

  if (num1 < num2) {
    firstNumber.innerHTML = num2;
    secondNumber.innerHTML = num1;
    rightAnswer = Number(num2) / Number(num1);
  } else {
    firstNumber.innerHTML = num1;
    secondNumber.innerHTML = num2;
    rightAnswer = Number(num1) / Number(num2);
  }

  let wrongAnswer1 = getRundomNum(rightAnswer + 1, rightAnswer + 5);
  let wrongAnswer2 = getRundomNum(rightAnswer - 5, rightAnswer - 1);

  if (Math.sign(wrongAnswer2) !== 1) {
    wrongAnswer2 = getRundomNum(rightAnswer + 1, rightAnswer + 3);
  }

  let answerArray = [
    +rightAnswer.toFixed(2),
    +wrongAnswer1.toFixed(2),
    +wrongAnswer2.toFixed(2),
  ];
  let switchAnsweers = [];

  for (let i = answerArray.length; i--; ) {
    switchAnsweers.push(
      answerArray.splice(Math.floor(Math.random() * (i + 1)), 1)[0]
    );
  }

  option1.innerHTML = switchAnsweers[0];
  option2.innerHTML = switchAnsweers[1];
  option3.innerHTML = switchAnsweers[2];
}

answerContainer.addEventListener("click", (e) => {
  const target = e.target;
  if (target.innerHTML == +rightAnswer.toFixed(2)) {
    getEquationDivide();
    audioRight.play();
  } else {
    audioFalse.play();
  }
});
