//TODO: Web storage
//TODO: Add images
//Fix side box

// Event Listeners
document.querySelector("#submitBtn").addEventListener("click", submitQuiz);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

// Global Variableslet score = 0;
let attempts = localStorage.getItem("attempts") || 0;
let userAnswer = {} //create a dictionary for user answers - will be compared to dict question answers

// Dictionary holding question types - 5 question types
const quizTypes = {
    1: "multiple_choice",
    2: "drop_down",
    3: "image_choice",
    4: "input",
    5: "multiple_answer"
}

const questions = [
    {
        type: 1,
        id: "q1",
        question: "Which ocean is on the west side of the US?",
        choices: ["Atlantic_Ocean", "Pacific_Ocean", "Arctic_Ocean", "Indian_Ocean"],
        answer: "Pacific Ocean"
    },
    {
        type: 1,
        id: "q2",
        question: "What is the name of the largest swamp?",
        choices: ["Atchafalaya_Basin", "Okefenokee_Swamp", "Great_Basin", "Great_Dismal_Swamp"],
        answer: "Atchafalaya Basin"
    },
    {
        type: 1,
        id: "q3",
        question: "Which state is the top manufacturer for the US?",
        choices: ["Florida", "California", "Alaska", "Texas"],
        answer: "California"
    },
    {
        type: 2,
        id: "q4",
        question: "Which state has the biggest volcano?",
        choices: ["Arizona", "Hawaii", "Wyoming", "Alaska"],
        answer: "Hawaii"
    },
    {
        type: 2,
        id: "q5",
        question: "What is the longest river?",
        choices: ["Yukon_River", "Colorado_River", "Missouri_River", "Mississippi_River"],
        answer: "Missouri River"
    },
    {
        type: 3,
        id: "q6",
        question: "Which bridge is in California?",
        choices: [{srcKey: "images/wiki_GoldenGateBridge.jpg", value: "goldenGate"},
            {srcKey: "images/wiki_VerrazanoBridge.jpg", value: "VerrazanoBridge"}],
        answer: "goldenGate"
    },
    {
        type: 3,
        id: "q7",
        question: "Which geyser is from Yellow Stone National Park in Wyoming?",
        choices: [{srcKey: "images/wiki_GrandPrismaticSpring.jpg", value: "GPSpring"}, {srcKey: "images/wiki_FlyGeyser.jpg", value: "flyGeyser"}],
        answer: "GPSpring"
    },
    {
        type: 4,
        id: "q8",
        question: "What is the capital of Colorado?",
        answer: "denver"
    },
    {
        type: 4,
        id: "q9",
        question: "Where is the Statue of Liberty located?",
        answer: "new york"
    },
    {
        type: 5,
        id: "q10",
        question: "What are the names of the Great Lakes?",
        choices: ["Superior", "Michigan", "Huron", "Lansing", "Ontario", "Erie"],
        answer: ["Superior", "Michigan", "Huron", "Ontario", "Erie"]
    },
]


function initializeGame() {
    // Hide Reset Button
    document.querySelector("#resetBtn").classList.add("d-none");
    // Show Submit Button
    document.querySelector("#submitBtn").classList.remove("d-none");
    //Reset user answer
    userAnswer = {};
    // Show past attempts
    totalAttempts = document.querySelector("#attempts");
    totalAttempts.textContent = attempts;

    for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        if (question.type == 1) {
            displayMultipleChoiceQuestion(i, question.id, question.question, shuffleArray(question.choices));
        }
        if (question.type == 2) {
            displayDropDownQuestion(i, question.id, question.question, question.choices);
        }
        if (question.type == 3) {
            displayImageSelectQuestion(i, question.id, question.question, question.choices);
        }
        if (question.type == 4) {
            displayInputQuestion(i, question.id, question.question);
        }
        if (question.type == 5) {
            displayMultipleAnswerQuestion(i, question.id, question.question, shuffleArray(question.choices));
        }
    }
}

// Multiple Choice Questions
function displayMultipleChoiceQuestion(pos, id, question_string, choices) {
    const root_div = document.querySelector(`#${id}`);
    root_div.innerHTML = ""; //Clear choices
    root_div.innerHTML = `
        <h2 class="question_num">Question ${pos+1}</h2>
        <h1 class="question_text">${question_string}</h1>
        <div id="${id}_feedback" class="question-feedback"></div>
        <div class="row" id="${id}_choices"></div>
    `;

    const choicesContainer = document.querySelector(`#${id}_choices`);

    //Create choices in a 2x2 row
    for (let i = 0; i < choices.length; i++) {
        let mcChoice = choices[i];
        choicesContainer.innerHTML += `
            <div class="col-6 mb-3">
                <label class="choice-box d-flex align-items-center justify-content-center">
                    <input type="radio" name="${id}" value="${mcChoice}">
                    <span class="choice-text">${mcChoice.replaceAll("_", " ")}</span>
                </label>
            </div>
        `;
    }

    // Event listener for selection highlight
    const boxes = choicesContainer.querySelectorAll('input[type="radio"]');
    boxes.forEach(box => {
        box.addEventListener('change', (e) => {
            // Remove active class from all boxes in this question
            boxes.forEach(b => b.parentElement.classList.remove('selected'));
            // Add select color to the clicked box
            e.target.parentElement.classList.add('selected');
            userAnswer[id] = e.target.value.replaceAll("_", " "); //Change dictionary names to display names
            console.log('User chose:', userAnswer[id]);
        });
    });
}

// Dropdown questions
function displayDropDownQuestion(pos, id, question_string, choices) {
    root_div = document.querySelector(`#${id}`);
    root_div.innerHTML = ""; //Clear choices
    root_div.innerHTML += `<h2 class="question_num">Question ${pos+1}</h2>`;
    root_div.innerHTML += `<h1 class="question_text">${question_string}</h1>`;

    // Feedback
    root_div.innerHTML += `<div id="${id}_feedback" class="question-feedback"></div>`;

    //Dropdown Choices
    let str = `<select id="${id}_select"><option value="">Select One</option>`
    for (let i = 0; i < choices.length; i++) {
        let ddChoice = choices[i];
        str += `<option value="${ddChoice}">${ddChoice.replaceAll("_", " ")}</option>`
    }
    str += `</select>`
    root_div.innerHTML += str;

     //Event Listener to User Clicks
    document.querySelector(`#${id}_select`).addEventListener("change", (event) => {
        if (event.target.value !== "") {
            userAnswer[id] = event.target.value.replaceAll("_", " ");
            console.log('User chose: ' + userAnswer[id]);
        }
    });
}

// Image Select questions
function displayImageSelectQuestion(pos, id, question_string, choices) {
    root_div = document.querySelector(`#${id}`);
    root_div.innerHTML = ""; //Clear choices
    root_div.innerHTML += `<h2 class="question_num">Question ${pos+1}</h2>`;
    root_div.innerHTML += `<h1 class="question_text">${question_string}</h1>`;
    //Feedback
    root_div.innerHTML += `<div id="${id}_feedback" class="question-feedback"></div>`;

    //image choices
    for (let i = 0; i < choices.length; i++) {
        let imgChoice = choices[i];
        root_div.innerHTML += `<img class="img_container" id="${id}_${imgChoice.value}" src="${imgChoice.srcKey}" width="200" height="200">`
    }

    //Event Listener to User Clicks
    for (let i = 0; i < choices.length; i++) {
        let imgChoice = choices[i];
        document.querySelector(`#${id}_${imgChoice.value}`).addEventListener("click", (event) => {
            userAnswer[id] = event.target.id.replaceAll(`${id}_`, "");
            choices.forEach(choice => {
                document.querySelector(`#${id}_${choice.value}`).style.border = "none"; //reset image without border
            });
            // Add green border for clicked image
            event.target.style.border = "5px solid #E6D154";
            console.log('User chose: ' + userAnswer[id]);
        });
    }
}

// Input questions
function displayInputQuestion(pos, id, question_string) {
    root_div = document.querySelector(`#${id}`);
    root_div.innerHTML = ""; //Clear choices
    root_div.innerHTML += `<h2 class="question_num">Question ${pos+1}</h2>`;
    root_div.innerHTML += `<h1 class="question_text">${question_string}</h1>`;
    // Feedback
    root_div.innerHTML += `<div id="${id}_feedback" class="question-feedback"></div>`;
    root_div.innerHTML += `<input type="text" id="playerInput_${id}" class="form-control input_form">`;

    // Listen to user's click
    document.querySelector(`#playerInput_${id}`).addEventListener("blur", (event) => {
        userAnswer[id] = event.target.value;
    });
}

// Multiple answer questions
function displayMultipleAnswerQuestion(pos, id, question_string, choices) {
    root_div = document.querySelector(`#${id}`);
    root_div.innerHTML = ""; //Clear choices
    root_div.innerHTML += `<h2 class="question_num">Question ${pos+1}</h2>`;
    root_div.innerHTML += `<h1 class="question_text">${question_string}</h1>`;

    // Feedback
    root_div.innerHTML += `<div id="${id}_feedback" class="question-feedback"></div>`;

    // mc choices -- og
    for (let i = 0; i < choices.length; i++) {
        let maChoice = choices[i];
        root_div.innerHTML += `<input type="checkbox" id="${id}_${maChoice}">
        <label for="${id}_${maChoice}" class="subtitle checkbox_prop">${maChoice}</label>`
    }

    //Listen to user's click
    for (let i = 0; i < choices.length; i++) {
        let mcChoice = choices[i];
        document.querySelector(`#${id}_${mcChoice}`).addEventListener("change", (event) => {
            if (event.target.checked) {
                if (userAnswer[id] == null) { //if question has not been answered yet, initialize answer array
                    userAnswer[id] = [];
                }
                userAnswer[id].push(event.target.id.replaceAll(`${id}_`, "")); //push selected choices into array
                console.log('User chose: ' + userAnswer[id]);
            } else { //update array if element is unchecked
                let valueToRemove = event.target.id.replaceAll(`${id}_`, "")
                updatedArray = userAnswer[id].filter(item => item !== valueToRemove); //keep every item that is not the item to remove
                userAnswer[id] = updatedArray; //Update the array
                console.log('User chose: ' + userAnswer[id]);
            }
        });
    }
}

//Validate quiz
function isQuizValid(userAnswer) {
    let isValid = true;

    for (let i=1; i < questions.length+1; i++) { //check if all questions have been completed
        let qID = `q${i}`;
        let feedback = document.querySelector(`#${qID}_feedback`);
        feedback.textContent = ""; //Clear old feedback

        let checkAnswer = userAnswer[qID];
        console.log(checkAnswer);
        if(checkAnswer == null) {
            feedback.textContent = "Please provide an answer."
            feedback.style.color = "#E6D154";
            isValid = false;
        }
    }
    return isValid;
}

function checkAnswer(pos, id) {
    console.log(userAnswer[id] == questions[pos].answer);
    let feedback = document.querySelector(`#${id}_feedback`);
    let correctAnswer = questions[pos].answer;
    let isCorrect = false;

    // For checking multiple answers questions
    if (Array.isArray(questions[pos].answer)) {
        let user_set = new Set(userAnswer[id])
        let answer_set = new Set(questions[pos].answer)
        isCorrect = 
            user_set.size == answer_set.size && user_set.intersection(answer_set).size == answer_set.size;
    } else { 
        isCorrect = userAnswer[id]?.toLowerCase() == correctAnswer.toLowerCase();
    }

    //For correct answers - display text in green and add +10
    if (isCorrect) {
        feedback.innerHTML = `
            <div style="display:flex; align-items:center; gap:8px;">
                <img src="images/check.png" width=20>
                <span>Correct answer!</span>
            </div>`;

        feedback.style.color = "#7FBA6D";
        score += 10;
    } else { //For incorrect answers - display text in red
        feedback.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
            <img src="images/x.png" width=20>
            <span>Incorrect answer! Correct answer: ${correctAnswer}</span>
        </div>`;
        feedback.style.color = "#FF1111"
    }
}

function shuffleArray(choices) {
    const arrayCopy = [...choices];
    for (let i=0; i<5; i++) {
        let randomPos = Math.floor(Math.random() * choices.length);
        let randomPos2 = Math.floor(Math.random() * choices.length);

        console.log(randomPos);
        console.log(randomPos2);

        let x = arrayCopy[randomPos2];
        let temp = arrayCopy[randomPos]
        arrayCopy[randomPos] = x;
        arrayCopy[randomPos2] = temp;
    }
    console.log(arrayCopy);
    return arrayCopy;
}

function submitQuiz() {
    score = 0; //reset score
    
    //Check if all questions have been answered
    if (!isQuizValid(userAnswer)) {
        return;
    }

    //If all questions have been answered, grade the quiz
    for (let i = 0; i < questions.length; i++) {
        let id = questions[i].id;
        checkAnswer(i, id);
    }

    //Calculate score
    const totalScore = document.querySelector("#score");
    totalScore.textContent = `${score}`;
    //Show certain score color depending on the total score
    totalScore.style.color = score >= 80 ? "#7FBA6D" : "#FF1111";
    if (score >= 80) {
        totalScore.textContent = `${score} - Congratulations!`;
    }

    console.log("Final Score:", score);
    //Count attempt
    attempts++;
    localStorage.setItem("attempts", attempts); //save attemps to web storage
    const totalAttempts = document.querySelector("#attempts");
    totalAttempts.textContent = `${attempts}`;
    gameOver();
}

function gameOver() {
    submitBtn = document.querySelector("#submitBtn");
    resetBtn = document.querySelector("#resetBtn");
    submitBtn.classList.add("d-none"); // Hide guess button
    resetBtn.classList.remove("d-none"); // Show reset button
}

initializeGame();