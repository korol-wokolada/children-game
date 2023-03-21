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

window.addEventListener("load", getEquationMultiply);

let integer = {};
let rightAnswer;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  integer = Object.fromEntries(formData);
  console.log(integer);
  getEquationMultiply();
});
function getRundomNum(min = 0, max = 10) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getEquationMultiply() {
  mathematicalRelation.innerHTML = "*";

  if (Object.keys(integer).length == 0) {
    firstNumber.innerHTML = getRundomNum();
    secondNumber.innerHTML = getRundomNum();
  } else {
    firstNumber.innerHTML = getRundomNum(integer.min, integer.max);
    secondNumber.innerHTML = getRundomNum(integer.min, integer.max);
  }
  let num1 = firstNumber.innerHTML;
  let num2 = secondNumber.innerHTML;

  rightAnswer = Number(num1) * Number(num2);
  const wrongAnswer1 = getRundomNum(rightAnswer + 1, rightAnswer + 5);
  const wrongAnswer2 = getRundomNum(rightAnswer - 5, rightAnswer - 1);
  let answerArray = [rightAnswer, wrongAnswer1, wrongAnswer2];
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
  if (target.innerHTML == rightAnswer) {
    getEquationMultiply();
    audioRight.play();
  } else {
    audioFalse.play();
  }
});
