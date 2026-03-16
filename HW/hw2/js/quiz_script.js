//TODO: Finish adding listeners to user clicks
//TODO: Validate submite
//TODO: Feedback (correct/incorrect) with images
//TODO: Bootstrap
// Event Listeners
document.querySelector("#submitBtn").addEventListener("click", checkAnswer);
// Global Variables
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
        choices: ["Atlantic_Ocean", "Pacific_Ocean", "Artic_Ocean", "Indian_Ocean"],
        answer: "Pacific Ocean"
    },
    {
        type: 1,
        id: "q2",
        question: "What is the name of the largest swamp?",
        choices: ["Atchafalaya_Basin", "Pacific_Ocean", "Arctic_Ocean", "Indian_Ocean"],
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
        choices: ["images/wiki_GoldenGateBridge.jpg", "images/wiki_VerrazanoBridge.jpg"],
        answer: "mages/wiki_GoldenGateBridge.jpg"
    },
    {
        type: 3,
        id: "q7",
        question: "Which geyser is from Yellow Stone National Park in Wyoming?",
        choices: ["images/wiki_GoldenGateBridge.jpg", "images/wiki_VerrazanoBridge.jpg"],
        answer: "Missouri River"
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

let score = 0;
const userAnswer = {}

// Multiple choice questions
function displayMultipleChoiceQuestion(index, id, question_string, choices) {
    root_div = document.querySelector(`#${id}`);
    root_div.innerHTML += `<h2>Question ${index+1}</h2>`;
    root_div.innerHTML += `<h1>${question_string}</h1>`;

    // mc choices
    for (let i = 0; i < choices.length; i++) {
        let mcChoice = choices[i];
        root_div.innerHTML += `<input type="radio" name="${id}" id="${id}_${mcChoice}"
        value="${mcChoice}"> <label for="${id}_${mcChoice}"> ${mcChoice.replaceAll("_", " ")}</label>`;
    }

    //Listen to user's click
    for (let i = 0; i < choices.length; i++) {
        let mcChoice = choices[i];
        document.querySelector(`#${id}_${mcChoice}`).addEventListener("change", (event) => {
            if (event.target.checked) {
                userAnswer[id] = event.target.value;
                console.log('User chose: ' + event.target.value);
            }
        });
    }
}

// Dropdown questions
function displayDropDownQuestion(index, id, question_string, choices) {
    root_div = document.querySelector(`#${id}`);
    root_div.innerHTML += `<h2>Question ${index+1}</h2>`;
    root_div.innerHTML += `<h1>${question_string}</h1>`;
    //dropdown choices
    let str = `<select id="${id}"><option value="">Select One</option>`
    for (let i = 0; i < choices.length; i++) {
        let ddChoice = choices[i];
        str += `<option value="${ddChoice}">${ddChoice}</option>`
    }
    str += `</select>`
    root_div.innerHTML += str;
}

// Image Select questions
function displayImageSelectQuestion(index, id, question_string, choices) {
    root_div = document.querySelector(`#${id}`);
    root_div.innerHTML += `<h2>Question ${index+1}</h2>`;
    root_div.innerHTML += `<h1>${question_string}</h1>`;
    //image choices
    for (let i = 0; i < choices.length; i++) {
        let imgChoice = choices[i];
        root_div.innerHTML += `<img src="${imgChoice}" width="100" height="100">`
    }
}

// Input questions
function displayInputQuestion(index, id, question_string) {
    root_div = document.querySelector(`#${id}`);
    root_div.innerHTML += `<h2>Question ${index+1}</h2>`;
    root_div.innerHTML += `<h1>${question_string}</h1>`;
    root_div.innerHTML += `<input type="text" id="playerInput_${id}">`
}

// Multiple choice questions
function displayMultipleAnswerQuestion(index, id, question_string, choices) {
    root_div = document.querySelector(`#${id}`);
    root_div.innerHTML += `<h2>Question ${index+1}</h2>`;
    root_div.innerHTML += `<h1>${question_string}</h1>`;

    // mc choices
    for (let i = 0; i < choices.length; i++) {
        let maChoice = choices[i];
        root_div.innerHTML += `<input type="checkbox" id="${id}_${maChoice}">
        <label for="${id}_${maChoice}">${maChoice}</label>`
    }
}

function initializeGame() {
    // First question
    for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        if (question.type == 1) {
            displayMultipleChoiceQuestion(i, question.id, question.question, question.choices);
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
            displayMultipleAnswerQuestion(i, question.id, question.question, question.choices);
        }
    }
}

function checkAnswer() {
    console.log(userAnswer);
}

function gameOver() {
    resetBtn = document.querySelector("#resetBtn");
    resetBtn.style.display = "inline"; // shows reset button
}

initializeGame();