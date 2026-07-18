// 1. Grab elements and set up state
const display = document.getElementById('display');

let current = '0';
let previous = null;
let operator = null;

const buttons = document.querySelectorAll('.button');

// 2. Display update function
function updateDisplay() {
  if (operator !== null) {
    display.textContent = previous + ' ' + operator + ' ' + current;
  } else {
    display.textContent = current;
  }
}

// 3. Calculate function (its own separate function now)
function calculate() {
  if (operator === null || previous === null) {
    return; // nothing to calculate, do nothing
  }

  const a = previous;
  const b = parseFloat(current);
  let result;

  if (operator === '+') result = a + b;
  else if (operator === '-') result = a - b;
  else if (operator === '*') result = a * b;
  else if (operator === '÷') result = a / b;

  current = result.toString();
  previous = null;
  operator = null;
  updateDisplay();
}
// 4. Click listener
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;

    if (!isNaN(value) || value === '.') {
      if (current === '0' && value !== '.') {
        current = value;
      } else {
        current += value;
      }
      updateDisplay();

    } else if (value === '+' || value === '-' || value === '*' || value === '÷') {
  if (operator !== null) {
    operator = value;
  } else {
    previous = parseFloat(current);
    operator = value;
    current = '0';
  }
  updateDisplay();

    } else if (value === '=') {
      calculate();

    } else if (value === 'AC') {
      current = '0';
      previous = null;
      operator = null;
      updateDisplay();

    } else if (value === '⌫') {
      if (current.length > 1) {
        current = current.slice(0, -1);
      } else {
        current = '0';
      }
      updateDisplay();

    } else if (value === '%') {
      current = (parseFloat(current) / 100).toString();
      updateDisplay();
    }
  }
);
});