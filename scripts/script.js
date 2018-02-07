
//Global variables. All variables are strings
var num="";
var answer="";
var operand="";
var finalAns="";


//Function to set the nummber. Called when any number or decimal is clicked
function setNumber(numClicked) {
	//If length of number is less than 12 then only code runs. It means that it can at most accept a 12 digit number
	if(num.length < 12) {
		//If zero is clicked as the first letter of the number don't do anything
		if(num == "" && numClicked == "0") {
			return null;
		}

		//If decimal has already been pressed don't allow to repress it
		if(num.indexOf(".")>-1 && numClicked == ".") {
			return null;
		}

		//If decimal is clicked as the first letter of the number add a zero to the beginning
		if(num == "" && numClicked == ".") {
			num = "0";
		}

		num = num+numClicked;
		displayNum();	//Display the number
	}	
}

//Function to set operator. Called when operator is clicked
function setOperator(op) {
	operand = op;	//Operator is given the value passed i.e the button clicked
	if(num == "") {
		answer = "0";	//If no numer is pressed
	} else {
		answer = num;	//If any number is pressed before the operand it is passed to ans variable
		num="";	//New number is then stores in num
	}
}

//Funciton to calcute the answer. Called when = button is clicked
function calculate() {
	//If = is clicked without giving first number
	if(num == "") {
		return null;
	}

	//If = is clicked without giving second number
	if(ans="") {
		ans="0";	//Make ans as zero
	}

	operate();	//Call the operate mehtod
}

//Function to calculate and get the anwer
function operate() {
	//Based on the operand execute the particular function
	if(operand == "+") {
		finalAns = add();
	} else if(operand == "-") {
		finalAns = sub();
	} else if(operand == "*") {
		finalAns = mul();
	} else if(operand == "/") {
		finalAns = div();
	} else {
		return null;
	}

	finalAns = finalAns.toFixed(2);	//Make the final ans of 2 decimal places
	displayFinalAnswer();	//Display the final answer

	//Clear everything
	num=finalAns;	//num is given the value of finalAns so that we can then do further calcutation with it
	answer="";
	operand="";
	finalAns="";
}

//Subsidary functions that perform various operations
function add() {
	var floatNum = parseFloat(num);
	var floatAnswer = parseFloat(answer)
	return floatAnswer + floatNum;
}

function sub() {
	var floatNum = parseFloat(num);
	var floatAnswer = parseFloat(answer)
	return floatAnswer - floatNum;
}

function mul() {
	var floatNum = parseFloat(num);
	var floatAnswer = parseFloat(answer)
	return floatAnswer * floatNum;
}

function div() {
	var floatNum = parseFloat(num);
	var floatAnswer = parseFloat(answer)
	return floatAnswer / floatNum;
}

//Function to display the number
function displayNum() {
	var display = document.getElementById('result');
	display.innerHTML = num;
}

//Function to display the final answer
function displayFinalAnswer() {
	var display = document.getElementById('result');
	var finalAnsFloat = parseFloat(finalAns);	//Change string data to float as toExponential function only works in number

	if(finalAnsFloat > 999999999999) {	//If answer is greater than 12 digits then change to exponent form
		var displayNum = finalAnsFloat.toExponential(5);	//Change number to exponent form with 5 digit after decimal places
	} else {
		displayNum = finalAnsFloat;
	}
	
	display.innerHTML = displayNum;
}

//Funcition to display zero
function dispalyZero() {
	var display = document.getElementById('result');
	display.innerHTML = 0;
}

//Funztion to delete last digit. Called when back button is clicked
function del() {
	//The slice() method extracts parts of a string and returns the extracted parts in a new string.
	//Slice from first character to the second last character
	num = num.slice(0,-1);	//Negative number user for end of string
	if(num=="") {
		dispalyZero();	//If number becomes zero then display zero
	} else {
		displayNum();	//Else display num
	}
}

//Function to delete entire number
function delAll() {
	if(num === "") {	//If no number is entered and the delete button is clicked then don't do anythink
		return null;
	} else {
		num = "";	//Make number zero
		dispalyZero();
	}
}

/*Event handling code------------------------------*/
//Event hadling code for keyboard entry
document.body.onkeypress = function(event) {	//Whenever any key is pressed on the body element run this function
  	var char = getChar(event || window.event)	//Get the actual character from the code
  	if (!char)									// Special Key Clicked
  		return false; 
  	else {
  		catchCharacterFromKeyboard(char);
  		return true;
  	}
}

//Function that takes an event and returns the character that was clicked
function getChar(event) {
  	// event.which returns the key or mouse button clicked
  	if (event.which == null) {
    	// Return the char if not a special character
    	return String.fromCharCode(event.keyCode); // IE
  	} else if (event.which!=0 && event.charCode!=0) {
    	return String.fromCharCode(event.which);   // Other Browsers
  	} else {
    	return null; // Special Key Clicked
  	}
}

//Function to match the keyboard keys with the actual functioning of the calculator
function catchCharacterFromKeyboard(char) {
	if(char>=0 && char<=9) {	//Number character clicked
		setNumber(char);
	} else if(char == ".") {	//Decimal character cliked
		setNumber(char);
	} else if((char == "+")||(char == "-")||(char == "*")||(char == "/")) {	//Operand character clicked
		setOperator(char);
	} else if(char == "=") {
		calculate();
	} else if(char == "c") {
		delAll();
	} else if(char == "b") {
		del();
	}
}
 
