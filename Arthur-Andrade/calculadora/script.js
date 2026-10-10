let displaytext ="";


function concatenatedisplay(value){
    displaytext += value;
}
function clearDisplayString(){
    displaytext = "";
}
function calculateDisplay(){
    try{
        display = eval(displaytext);
    } catch (error) {
        display = "Error";
    }
}