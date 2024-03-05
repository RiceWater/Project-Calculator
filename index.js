function add(x, y){
    return Number(x) + Number(y);
}

function subtract(x, y){
    return Number(x) - Number(y);
}

function multiply(x, y){
    return Number(x) * Number(y);
}

function divide(x, y){
    return Number(x) / Number(y);
}

function operate(x, y, operator){
    switch(operator){
        case SYMBOLS[0]:
            return add(x, y);
        case SYMBOLS[1]:
            return subtract(x, y);
        case SYMBOLS[2]:
            return multiply(x, y);
        default:
            return divide(x, y);
    }
}

function extractValues(eq){
    values = [];
    let num = "";
    for (let i = 0; i < eq.length; i++){
        if (!SYMBOLS.includes(eq[i])){
            num += eq[i];
        }
        else{
            values.push(Number(num));
            values.push(eq[i]);
            num = "";
        }
    }
    if (num != ""){
        values.push(Number(num));
        num = "";
    }
}

function PEMDAS(){
    let output = 0;

    // OPERATE MULTIPLICATION AND DIVISION FIRST
    for (let i = 0; i < values.length; i++){
        if (values[i] == SYMBOLS[2] || values[i] == SYMBOLS[3]){
            if (values[i+1] == 0){
                return ERROR;
            }

            output = operate(values[i-1], values[i+1], values[i]);
            v1 = values.slice(0, i-1);
            v2 = values.slice(i+2);
            v1.push(output);
            values = v1.concat(v2);
            i = i - 2;
        }
    }

    // OPERATE ADDITION AND SUBTRACTION LAST
    for (let i = 0; i < values.length; i++){
        if (SYMBOLS.includes(values[i])){
            output = operate(values[i-1], values[i+1], values[i]);
            v1 = values.slice(0, i-1);
            v2 = values.slice(i+2);
            v1.push(output);
            values = v1.concat(v2);
            i = i - 2
        }
    }
    return values[0];
}

function calculate(eq){
    extractValues(eq);
    let output =  PEMDAS();
    return (output % 1 != 0) ? output.toFixed(2) : output;
}

const SYMBOLS = ["+", "−", "×", "÷"];
const ERROR = "CANNOT DIVIDE BY ZERO.";
const display = document.querySelector(".output");
let values = [];
let coefficient = "";
const calculator = document.querySelector(".grid_table")
calculator.addEventListener("click", (e) => {
    text = e.target.textContent;
    
    if (text === "="){
        if (SYMBOLS.includes(display.textContent[display.textContent.length - 1])){
            let equation = display.textContent.substring(0, display.textContent.length - 1);
            equation += text;
            display.textContent = equation;
        }

        display.textContent = calculate(display.textContent);
        coefficient = display.textContent;
    }
    else if (display.textContent == ERROR){
        display.textContent = "0";
        coefficient = "";
    }
    else if (display.textContent[display.textContent.length - 1] == '.' && 
             SYMBOLS.includes(text)){
        let equation = display.textContent.substring(0, display.textContent.length - 1);
        equation += text;
        display.textContent = equation;
        coefficient = coefficient.substring(0, coefficient.length-1);
    }
    // Replace operator
    else if (SYMBOLS.includes(display.textContent[display.textContent.length - 1]) &&
             SYMBOLS.includes(text)){
        let equation = display.textContent.substring(0, display.textContent.length - 1);
        equation += text;
        display.textContent = equation;
        coefficient = "";
    } 
    else if (!SYMBOLS.includes(text) && display.textContent === "0"){
        display.textContent = text;
        coefficient = text;
    } 
    else if (display.textContent === "0" && text === "0"){
        coefficient = "0";
    } 
    else if (coefficient.includes('.') && text == '.'){
    }
    else if (coefficient == "" && text == '.'){
        coefficient = "0.";
        display.textContent += "0.";
    }
    else {
        display.textContent += text;
        coefficient += text;
    }
    
    if (SYMBOLS.includes(text)){
        coefficient = "";
    }
    console.log(coefficient);
})

const AC = document.querySelector(".resetter")
AC.addEventListener("click", () => {
    display.textContent = "0";
    values = [];
    coefficient = "";
})