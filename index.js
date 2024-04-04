const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]


//variables to store & populate the password boxes
const firstPasswordContainer = document.getElementById("first-password-container")
const secondPasswordContainer = document.getElementById("second-password-container")
const passwordLength = document.getElementById("password-length")
const errorMessage = document.getElementById('password-length-error');


//varibles for user-defined parameters
let pwLength = 15
let includeNumbers = true
let includeSymbols = true
let darkMode = true
// initializing the input field to default value of 15
passwordLength.value = pwLength
errorMessage.textContent = ' '

// event listeners
document.addEventListener("click", (e) => {
    handleIncludeNumbersToggle(e)
    handleIncludeSymbolsToggle(e)
    handleGenerateButtonClick(e)
    handleDarkModeToggle(e)
    handleCopyPassword(e)
})

// event listener functions
function handleIncludeNumbersToggle(e) {
    if (e.target.dataset.include_numbers) {
        includeNumbers = !includeNumbers
    }
}

function handleIncludeSymbolsToggle(e) {
    if (e.target.dataset.include_symbols) {
        includeSymbols = !includeSymbols
    }
}

function handleGenerateButtonClick(e) {
    if (e.target.dataset.generate) {
        checkInputLength()
    }
}

function handleDarkModeToggle(e) {
    if (e.target.dataset.dark_mode) {
        document.body.classList.toggle("dark-mode")
    }
}

function handleCopyPassword(e) {
    if (e.target.dataset.first_pw_box) {
        (firstPasswordContainer.textContent !== '') ? copyToClipboard(e) : undefined;
    } else if (e.target.dataset.second_pw_box) {
        (secondPasswordContainer.textContent !== '') ? copyToClipboard(e) : undefined;
    }
}

// other functions
function checkInputLength() {
    const pwLength = parseInt(passwordLength.value)

    if (isNaN(pwLength) || pwLength.length > 3 || pwLength > 128 || pwLength <= 0) {
        errorMessage.textContent = "Please enter a number between 1 and 128.";
        passwordLength.setCustomValidity("Invalid input"); // Set a custom validity message
    } else {
        errorMessage.textContent = " ";
        passwordLength.setCustomValidity(""); // Reset validity message
        passwordGenerate(pwLength, includeNumbers, includeSymbols)
    }
}

function passwordGenerate(pwLength, includeNumbers, includeSymbols) {
    //build array based on desired length, and whether to include numbers or symbols
    let specifiedArray = [...characters];
    
    if (includeNumbers) {
        specifiedArray.push(...numbers);
    }
    if (includeSymbols) {
        specifiedArray.push(...symbols);
    }
   
    //clear old passwords
    firstPasswordContainer.textContent = ""
    secondPasswordContainer.textContent = ""

    //for loop to randomly select characters
    let firstPassword = ''
    let secondPassword = ''
    for (i = 0; i < pwLength; i++) {
        firstPassword += specifiedArray[Math.floor( Math.random() * specifiedArray.length)]
        secondPassword += specifiedArray[Math.floor( Math.random() * specifiedArray.length)]
    }
    //put passwords in pw-box elements
    firstPasswordContainer.textContent = firstPassword
    secondPasswordContainer.textContent = secondPassword

    //add the pointer style, now that the pw-boxes aren't empty
    firstPasswordContainer.style.cursor = "pointer"
    secondPasswordContainer.style.cursor = "pointer"
}

function copyToClipboard(e) {
    const textContent = e.target.textContent
    navigator.clipboard.writeText(textContent)
    alert("Copied the text: " + textContent)
}

//ensure that include numbers, include symbols and Dark mode are all "on" by default
function setInitialToggleState() {
    document.getElementById('toggle-symbols').checked = includeSymbols
    document.getElementById('toggle-numbers').checked = includeNumbers
    document.getElementById('dark-mode').checked = darkMode
}

window.onload = function() {
    setInitialToggleState();
}

