let displayString ="";
    function concatenateDisplay(value) {
        displayString += value;
    }

function clearDisplay() {
    displayString = "";
    document.getElementById("display").value = displayString;
}

function calculate() {
    try {
        let result = eval(displayString);
        document.getElementById("display").value = result;
        displayString = result.toString();
    }
    catch (error) {
        document.getElementById("display").value = "Error";
        displayString = "";
    }
}
