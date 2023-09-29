let input ="";

function registerOnClick(children){
    Array.from(children).forEach(child => {
        child.addEventListener('click', () =>{

            if(child.textContent == "C"){
                input = "";
            }else if(child.textContent == "="){
                input = calculateInput(input);
            }
            else{
                input += child.textContent;
            }

            document.querySelector("#calculator-display>h1").textContent = input; 
        })
    })
}

function calculateInput(mathInput){
    if(Array.from(mathInput).includes('('))return isValid(mathInput);
    else return pemdas(mathInput); 
}

function pemdas(input){
    let mdas = ["x","/","+","-"]; 

    if(mdas.includes(input[0]) || mdas.includes(input[input.length-1]) || input[input.length-1] == undefined || input[input.length-1] == "") return "SYNTAX ERROR";
    let numbers = input.split(/([+\-x\/])/);

    let result = 0;
    let currentOporator = [mdas[0],mdas[1]]; 
    for(let i = 0; i < numbers.length; i++){
        if(currentOporator.includes(numbers[i])){
            result = processOporator(numbers[i-1],numbers[i],numbers[i+1]);
            numbers.splice(i-1,3,result);
            i = 0;
            continue; 
        }

        if(i == numbers.length-1){
            if(numbers.includes(currentOporator[0])||numbers.includes(currentOporator[1])){
                i = 0;
                continue;
            }
            if(currentOporator[0] != mdas[2]){
                currentOporator = [mdas[2],mdas[3]];
                i = 0;
                continue;
            }
        }
    }
    return result;
}

function processOporator(numberA, oporator, numberB){
    numberA = parseFloat(numberA);
    numberB = parseFloat(numberB);
    switch(oporator){
        case "x":
            return numberA * numberB;
        case "/":
            return numberA / numberB;
        case "+":
            return numberA + numberB;
        case "-":
            return numberA - numberB;
    }
    return "FAILED";
}

function isValid(inputMath) {
    if (inputMath == null || inputMath === "") return false;

    const map = new Map([['(', ')']]);
    const acceptedLetters = new Set(['(']);
    let latest = [];
    let input = Array.from(inputMath);
    let filtered = input.filter((letter) => (letter == "(" || letter == ")"));
    if(filtered.length < 2) return false;
    
    for (const letter of filtered) {
        if (!acceptedLetters.has(letter)) {
            if (latest.length > 0 && letter !== map.get(latest[latest.length - 1])) return false;
            if (latest.length === 0) return false;
            latest.pop();
        } else latest.push(letter);
    }
    
    if (latest.length > 0) return false;
    
        filterParenthesis(inputMath); 
    /////    read through until you find ')' then find the previous '(' and process the input inside 
    ////     replace the area with the result of the mdas
    ////     repeat until there is no more ')'
    ////     1+2+5+((545*(653-2)-121*(541 * (6+3)))+645-5/(845+50))
    ////     1+2+5+((545*651-121*(541 * (6+3)))+645-5/(845+50))
    ////     1+2+5+((545*651-121*(541 * 9))+645-5/(845+50))
    ////     1+2+5+((545*651-121*(541 * 9))+645-5/(845+50))
    ////     1+2+5+((545*651-121*4869)+645-5/(845+50))
    ////     1+2+5+(-234354+645-5/(845+50))
    ////     1+2+5+(-234354+645-5/895)
    ////     1+2+5+-233709  // consider sign change 
    ////     -233701 
}

function filterParenthesis(inputMath){
    let closingIndex = inputMath.indexOf(')'); 

    console.log(inputMath.indexOf(')')); 
    let openingIndex = inputMath.length-1 - Array.from(inputMath).reverse().indexOf('(',(inputMath.length-1 - closingIndex));
    console.log(openingIndex);

    let portion = inputMath.slice(openingIndex+1,closingIndex);
    console.log(portion); 
    console.table(inputMath); 


    let result = pemdas(portion); 
    console.log(result);


    console.log(`oepmning INDEX::::${openingIndex}`);
    arrayInputMath = Array.from(inputMath);
    let bruh  = arrayInputMath.splice(1 , 0, "FUCK"); 
    console.log(bruh);
    console.log(arrayInputMath);

    //console.log(inputMath);
    //console.log(Array.from(inputMath).splice(pemdas(portion),closingIndex-openingIndex)); 
}



function registerHoverOnChildren(children, hoverColor){

    Array.from(children).forEach((element) => {
        element.addEventListener('mouseenter', ()=>{ 
            let originalColor = element.style.backgroundColor;
            element.style.backgroundColor = hoverColor;

            element.addEventListener('mouseleave', () =>{
                element.style.backgroundColor = originalColor; 


            },originalColor)


    
        })
    })
}

registerOnClick(document.getElementsByClassName("calcNumBtn"));
registerOnClick(document.getElementsByClassName("calcOpBtn"));
