/**
 * checkValidity()
 * calculate()
 * removeChar()
 * reset()
 * updateScreen()
 */

let btns = document.querySelectorAll(".btn"),
  screen = document.querySelector(".screen"),
  expressionString = "",
  res = 0;

const updateScreen = (action, btn) => {
  switch (action) {
    case "reset":
      expressionString = "";
      screen.innerText = "0";
      break;

    case "removeChar":
      expressionString = expressionString.replace(/.$/, "");
      screen.innerText = expressionString;
      break;

    case "op":
      expressionString += btn.innerText;
      screen.innerText = expressionString;
      break;

    case "calculate":
      if (validateExpression()) {
        expressionString = res.toString();
        screen.innerText = expressionString;
      }
      break;

    default:
      break;
  }

  validateExpression() && screen.classList.add("valid");
  !validateExpression() && screen.classList.remove("valid");
};

const validateExpression = () => {
  let regex = /\d+(\+|-|\*|\/)\d+/;
  return regex.test(expressionString);
};

const calculate = () => {
  if (!validateExpression()) return;

  let regex = /(\+|-|\*|\/)/;

  let mathEX = expressionString.split(regex);
  let firstOperand = +mathEX[0],
    secondOperand = +mathEX[2];
  operator = mathEX[1];

  switch (operator) {
    case "+":
      res = firstOperand + secondOperand;
      break;
    case "-":
      res = firstOperand - secondOperand;
      break;
    case "*":
      res = firstOperand * secondOperand;
      break;
    case "/":
      res = firstOperand / secondOperand;
      break;

    default:
      break;
  }
  updateScreen("calculate");
};

const btnClicked = (btn) => {
  switch (btn.innerText) {
    case "c":
      updateScreen("reset");
      break;

    case "←":
      updateScreen("removeChar");
      break;

    case "=":
      calculate();
      updateScreen("calculate");
      break;

    default:
      updateScreen("op", btn);
      break;
  }
};

const start = () => {
  btns.forEach((btn) => {
    btn.addEventListener("click", () => btnClicked(btn));
  });
};

start();
