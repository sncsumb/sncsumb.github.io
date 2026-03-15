/*ISSUES:
TODO: CSS
TODO: Win State and Lose State
*/
// Event Listeneres
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

// Global Variables
let randomNumber = Math.floor(Math.random() * 99) + 1;
let attempts = 0;
let winCount = 0;
let lossCount = 0;

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);

    // hiding the reset button
    document.querySelector("#resetBtn").style.display = "none";

    // showing the guess button
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); // adding focus to textbox
    playerGuess.value =""; // clearing the textbox
    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; // clearing feedback message
    document.querySelector("#guesses").textContent = ""; // clearing previous guesses
    document.querySelector("#attempts").textContent = "--" ; //clearing number of attempts left
    document.querySelector("#wins").textContent = winCount; // keep win count
    document.querySelector("#losses").textContent = lossCount; // keep loss count
}

function checkGuess() {
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    if (guess < 1 || guess > 99) {
        feedback.textContent = "Please enter a value between 1 and 99";
        feedback.style.color = "red";
        return;
    }
    attempts++;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    document.querySelector("#attempts").textContent = "0" + attempts;

    if(guess == randomNumber) {
        feedback.textContent = "You guessed it! You won!";
        feedback.style.color = "darkgreen";
        winCount++;
        console.log("Wins: " + winCount);
        document.querySelector("#wins").textContent = winCount;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if(attempts == 7) {
            feedback.textContent = "Sorry, you lost!";
            feedback.style.color = "red";
            lossCount++;
            console.log("Losses: " + lossCount);
            document.querySelector("#losses").textContent = lossCount;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high!";
        } else if (guess < randomNumber) {
            feedback.textContent = "Guess was low!";
        }
    }
}

function gameOver() {
    guessBtn = document.querySelector("#guessBtn");
    resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; // hides guess button
    resetBtn.style.display = "inline"; // shows reset button

    attempts = 0; // clear attempts
}