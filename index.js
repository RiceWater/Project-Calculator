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

function calculate(eq){
    let num = "";
    for (let i = 0; i < eq.length; i++){
        if (!SYMBOLS.includes(eq[i])){
            num += eq[i];
        }
        else{
            operands.push(Number(num));
            operators.push(eq[i]);
            num = "";
        }
    }
    if (num != ""){
        operands.push(Number(num));
        num = "";
    }
    console.log(operands);
}

const SYMBOLS = ["+", "−", "×", "÷"];
let operands = [];
let operators = [];
const display = document.querySelector(".output");
let hasPeriod = false;

const calculator = document.querySelector(".grid_table")
calculator.addEventListener("click", (e) => {
    text = e.target.textContent;

    if (SYMBOLS.includes(text) && SYMBOLS.includes(display.textContent[display.textContent.length - 1])){
        equation = display.textContent.substring(0, display.textContent.length - 1);
        equation += text;
        display.textContent = equation;
    }
    else if (!SYMBOLS.includes(text) && display.textContent === "0"){
        display.textContent = text;
    }
    else if (display.textContent === "0" && text === "0"){
    } 
    else if (text === "="){
        calculate(display.textContent);
    }
    else {
        display.textContent += text;
    }    
})


const AC = document.querySelector(".resetter")
AC.addEventListener("click", () => {
    display.textContent = "0";
    operands = [];
    operators = [];
})