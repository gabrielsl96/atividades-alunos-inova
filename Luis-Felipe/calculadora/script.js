let displayElement;
let displayText = "";

window.onload = function() {
  displayElement = document.querySelector('textarea[name="display"]');
  setupEventListeners();
};


function concatenateDisplay(value) {
  displayText += value;
  displayElement.value = displayText;
}


function clearDisplay() {
  displayText = "";
  displayElement.value = "";
}


function calculate() {
  if (displayText === "") return; 
  
  try {
    
    let result = eval(displayText);
    
   
    displayText = result.toString();
    displayElement.value = displayText;
  } catch (error) {
    displayElement.value = "Erro";
    displayText = ""; 
  }
}
