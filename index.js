const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

//variables to store & populate the password boxes
let firstPasswordContainer = document.getElementById("first-password-container")
let secondPasswordContainer = document.getElementById("second-password-container")

//define passwordGenerate()
function passwordGenerate() {
    //clear old passwords
    firstPasswordContainer.textContent = ""
    secondPasswordContainer.textContent = ""

    //for loop to randomly select characters
    for (i = 0; i < 15; i++) {
        /* 1. get a random number between 0 and length of character[] array
           2. Use this number to get a value from the character[] array
           3. get text from the 'first-password-container' element and add the value to it */
        firstPasswordContainer.textContent += characters[Math.floor( Math.random() * characters.length)]
        //same thing but for 'second-password-container'
        secondPasswordContainer.textContent += characters[Math.floor( Math.random() * characters.length)]
    }
}

//define copyToClipboard()
function copyToClipboard(elementToCopy) {
    //create a string to hold the text we'll copy to the clipboard
    let textToCopy = ""
    
    //check which text field the user clicked
    if (elementToCopy === 1) {
        //grab the text from the relevant html element & write to clipboard
        textToCopy = firstPasswordContainer.textContent
        navigator.clipboard.writeText(textToCopy)
    } else if (elementToCopy === 2) {
        textToCopy = secondPasswordContainer.textContent
        navigator.clipboard.writeText(textToCopy)
    }
    alert("Copied the text: " + textToCopy)
}

//define darkOrLightMode()
function darkOrLightMode() {
    document.body.classList.toggle("dark-mode")
}
  
/*how to populate 2 fields with a single function
    1. I need to generate a single random password which follows some rules
    2. after I generate one password I need to store it or update the field
    3. then I need to generate another password using the same rules
    and store it or update it somewhere
    4. I know I need the same code to generate a password, so let's start there
    Done! 
    5. Now I could either stick it in a variable (firstPwd) or the <p> directly
    6. I imagine that having a variable will help with copy-on-click
    7. Nevermind directly populating the <p> meets the need
    8. The real question is whether I can copy text from any text element? (<p> <button> etc?) 
    9. seems like you can.
    10.So, how do I create a second password?
    11. Just do it in the same for loop
*/
