let displayText = "";

const displayElement = document.getElementById("display");

function concatenateDisplay(value) {
  displayText += value;
  displayElement.value = displayText;
}

function clearDisplay() {
  displayText = "";
  displayElement.value = displayText;
}

function calculate() {
  try {
    displayText = eval(displayText).toString();
  } catch (error) {
    displayText = "Error";
  }
  displayElement.value = displayText;
}
