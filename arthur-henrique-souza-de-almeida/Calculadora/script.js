let display = "";

function concatenateDisplay(value) {
  display += value; 
}

function cleardisplay() {
  display = "";
  document.getElementById("display").value = display
}

function calculate() {
 try {
  let result = eval(display);
  document.getElementById("display").value = result;
  display = result.toString();
 }
catch (error) {
  document.getElementById("display").value = "Error";
  display = "";
};

}







