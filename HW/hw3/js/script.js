// Event Listeners
document.querySelector("#filterHeroes").addEventListener("input", filterHeroes);

// Global Variables
let hero_array;

// Populate hero page with hero card image and name
async function displayHeroes() {
    //pull data
    const hero_div = document.querySelector(`#hero-list`); // Grab the hero-container id from HTML
    //empty array
    hero_div.innerHTML = "";

    // Apped html elements into index
    for (let i=0; i < hero_array.length; i++) {

        let hero_name = hero_array[i].name;
        let hero_class_name = hero_array[i].class_name;
        let hero_portrait = hero_array[i].images.icon_hero_card;
        hero_div.innerHTML += `
            <div id="${hero_class_name}_card" class="hero-container">
                <div class="hero-name" class="selectHeroes">${hero_name}</div>
                <div class="hero-items" class="selectHeroes"><img src=${hero_portrait} alt="${hero_name}"></div>
            </div>
        `;
    }
    
    // Event Listener for each hero card
    for (let i = 0; i < hero_array.length; i++) {
        let hero_name = hero_array[i].name;
        let hero_class_name = hero_array[i].class_name;

         // When each hero card is clicked, it will take the user to the hero page
        document.querySelector(`#${hero_class_name}_card`).addEventListener("click", (event) => {
            hero_array.forEach(hero => {
                // pass in hero_name variable into html
                window.location = `hero.html?hero=${encodeURIComponent(hero_name)}`;
            });
        });

        // Event Listener for hover
        document.querySelector(`#${hero_class_name}_card`).addEventListener("mouseover", function(event) {
            event.target.style.transform = "scale(1.1)";
            event.target.style.transition = "transform 0.3s ease";
        });
        document.querySelector(`#${hero_class_name}_card`).addEventListener("mouseout", function(event) {
            event.target.style.transform = "scale(1)";
        });
    }
}


// Function for searching for heroes
async function filterHeroes(event) {
    await download_data();
    let filter_value = event.target.value.toLowerCase();
    let hero_div = document.querySelector("#hero-list");
    

    let filtered_hero = hero_array.filter((hero) => hero.name.toLowerCase().startsWith(filter_value.toLowerCase()));

    //If no results
    if (filtered_hero.length == 0 && filter_value != "") {
        hero_div.innerHTML = `
            <div class="error-title">Hero not found.</div>
        `;
        return;
    }

    //Otherwise, display results
    hero_array = filtered_hero;
    console.log(hero_array);
    displayHeroes();
}

async function download_data() {
    let url = `https://assets.deadlock-api.com/v2/heroes`;
    let response = await fetch(url); //fetch API
    hero_array = await response.json(); //convert data from api to JSON format

    hero_array = hero_array.filter((hero) => {
        return hero.in_development == false //filter in all heroes that are playable
    })

    console.log(hero_array);
}

async function initialize_data() {
    await download_data();
    document.querySelector("#filterHeroes").value = ""; //clear search results
    displayHeroes();
}


initialize_data();
