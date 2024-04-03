const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]


//variables to store & populate the password boxes
const firstPasswordContainer = document.getElementById("first-password-container")
const secondPasswordContainer = document.getElementById("second-password-container")
const passwordLength = document.getElementById("password-length")


//varibles for user-defined parameters
let pwLength = 15
let includeNumbers = true
let includeSymbols = true
passwordLength.value = pwLength


document.addEventListener("click", function(e) {
    if (e.target.dataset.include_numbers) {
        includeNumbers = !includeNumbers
    }
    if (e.target.dataset.include_symbols) {
        includeSymbols = !includeSymbols
    }
    
    // click 'generate' button, run generate function
    if (e.target.dataset.generate) {
        pwLength = passwordLength.value
        passwordGenerate(pwLength, includeNumbers, includeSymbols)
        firstPasswordContainer.style.cursor = "pointer"
        secondPasswordContainer.style.cursor = "pointer"
    } 
    // dark mode button
    else if (e.target.dataset.dark_mode) {
        document.body.classList.toggle("dark-mode")
    } 
    // copy password fields
    else if (e.target.dataset.first_pw_box) {
    // don't copy if blank
        (firstPasswordContainer.textContent !== '') ? copyToClipboard(e) : undefined;
    } 
    else if (e.target.dataset.second_pw_box) {
        (secondPasswordContainer.textContent !== '') ? copyToClipboard(e) : undefined;
    }
})



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
    firstPasswordContainer.textContent = firstPassword
    secondPasswordContainer.textContent = secondPassword
}



function copyToClipboard(e) {
    const textContent = e.target.textContent
    navigator.clipboard.writeText(textContent)
    alert("Copied the text: " + textContent)
}

