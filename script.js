const inputDisplay = document.getElementById("input-value");
const outputDisplay = document.getElementById("output");
let currentInput = "";
let firstNumber = null;
let secondNumber = "";
let operator = "";
let hasCalculated = false;
let resultValue = null;

document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

document.querySelectorAll("#add, #subtract, #multiply, #divide,#percentage").forEach((button) => {
  button.addEventListener("click", () => appendOperator(button.textContent));
});

document.getElementById("equals").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clearCalculator);
document.getElementById("delete").addEventListener("click", deleteLast);

function appendNumber(value) {
  if (hasCalculated) {
    currentInput = "";
    firstNumber = null;
    operator = "";
    hasCalculated = false;
    resultValue = null;
    outputDisplay.textContent = "";
  }

  currentInput += value;
  renderInput();
}

function appendOperator(op) {
  if (currentInput === "" && firstNumber === null) return;

  if (hasCalculated) {
    firstNumber = resultValue;
  } else if (operator !== "" && currentInput !== "") {
    firstNumber = calculate();
  } else if (currentInput !== "") {
    firstNumber = Number(currentInput);
  }
  operator = op;
  currentInput = "";
  hasCalculated = false;
  renderInput();
}

function calculate() {
  if (firstNumber === null || operator === "" || currentInput === "") return;

  secondNumber = Number(currentInput);
  let result;

  switch (operator) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "*":
      result = firstNumber * secondNumber;
      break;
    case "/":
      result = secondNumber === 0 ? "Number is not divisible by zero" : firstNumber / secondNumber;
      break;
    default:
      return;
  }

  outputDisplay.textContent = result;
  resultValue = result;
  hasCalculated = true;
  return result;
}

function renderInput() {
  const firstValue = firstNumber === null ? "" : firstNumber;
  inputDisplay.textContent = `${firstValue}${operator}${currentInput}` || "00";
}

function clearCalculator() {
  currentInput = "";
  firstNumber = null;
  secondNumber = "";
  operator = "";
  hasCalculated = false;
  resultValue = null;
  inputDisplay.textContent = "00";
  outputDisplay.textContent = "";
}

function deleteLast() {
  if (hasCalculated) return;

  if (currentInput !== "") {
    currentInput = currentInput.slice(0, -1);
  } else if (operator !== "") {
    operator = "";
  } else if (firstNumber !== null) {
    firstNumber = null;
  }

  renderInput();
}