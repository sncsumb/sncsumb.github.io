// Event listeners
// Change is triggered 
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#signupForm"),addEventListener("submit", function(event)
    {validateForm(event)});

// Functions

// Displaying city, latitude, and longitude from Web API after entering a zip code
async function displayCity() {
    // zipcode
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    // fetch API
    // store data from fetch API into response variable
    // await forces JS to complete retrieving data
    let response = await fetch(url);
    let data = await response.json(); // convert data to JSON format
    let zipError = document.querySelector("#zipError"); // for error message

    if (data) { //if zipcode found
        // city
        document.querySelector("#city").innerHTML = data.city; //display city name
     // latitude
        document.querySelector("#latitude").innerHTML = data.latitude;
    // longitude
        document.querySelector("#longitude").innerHTML = data.longitude;
        zipError.innerHTML = "";
    } else { //if zipcode not found
        zipError.innerHTML = "Zipcode not found.";
        zipError.style.color = "red";
    }

}

// Displaying counties from Web AOI based on the two-letter abbreviation of a state
async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>";
    for (let i of data) {
        countyList.innerHTML += `<option>${i.county}</option>`;
    }
}

// Checking whether the username is available
async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");
    if (data.available) {
        usernameError.innerHTML = "Username available!";
        usernameError.style.color = "green";
    } else {
        usernameError.innerHTML = "Username taken.";
        usernameError.style.color = "red";
    }
}

// Validating form data
function validateForm(e) {
    let isValid = true;

    let username = document.querySelector("#username").value;
    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username Required!";
        usernameError.style.color = "red";
        isValid = false;
    }   

    let password = document.querySelector("#password").value;
    console.log(password);
    if (password.length  == null || password.length < 6) {
        document.querySelector("#suggestedPwd").innerHTML = "Password needs to be at least 6 characters long.";
        suggestedPwd.style.color = "red";
        isValid = false;
    }
    let retype_pw = document.querySelector("#retypePwd").value;
    if (password != retype_pw || retype_pw.length == 0) {
        console.log(retype_pw);
        document.querySelector("#passwordError").innerHTML = "Password does not match. Please retype password."
        passwordError.style.color = "red";
        isValid = false;
    }

    if (!isValid) {
    e.preventDefault();
    }
}