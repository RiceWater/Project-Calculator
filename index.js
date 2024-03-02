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
        case "+":
            return add(x, y);
        default:
            return divide(x, y);
    }
}



const AC = document.querySelector(".resetter")
AC.addEventListener("click", () => {

})