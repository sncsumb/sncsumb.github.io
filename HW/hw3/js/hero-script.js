const urlParams = new URLSearchParams(window.location.search);
const hero_name = urlParams.get('hero');

function getHeroRender(heroName) {
    const formatted = heroName
        .replaceAll(" ", "_")
        .replaceAll("&", "%26");

    return `https://deadlock.wiki/Special:Redirect/file/${formatted}_Render.png`;
}

async function displayHeroPage() {

    // API fetch
    let url = `https://assets.deadlock-api.com/v2/heroes/by-name/${hero_name}`;
    let response = await fetch(url);
    let hero = await response.json();
    // const heroIntro = document.querySelector(`#hero-header`); // Grab the hero-container id from HTML
    console.log(hero);
    
    document.querySelector("#hero-image-icon").innerHTML = `<img src="${hero.images.icon_image_small} ">`;
    document.querySelector("#hero-name").innerHTML = hero_name.toUpperCase();

    console.log(hero.description.role != null);
    if (hero.description.role != null) {
        document.querySelector("#hero-role").innerHTML = hero.description.role;
    } else {
        document.querySelector("#hero-role").innerHTML = " ";
    }
    if (hero.description.playstyle != null) {
        document.querySelector("#hero-playstyle").innerHTML = hero.description.playstyle;
    } else {
        document.querySelector("#hero-playstyle").innerHTML = " ";
    }
    if (hero.description.role == null && hero.description.playstyle == null) {
        document.querySelector("#hero-hideout").innerHTML = hero.hero_stats_ui.hideout_rich_presence;
    }

    // Playstyle and gunplay tags
    if (hero.gun_tag != null) {
        let gun_tag = hero.gun_tag.toLowerCase();
        document.querySelector("#hero-gun-tag").innerHTML = gun_tag;
    } else {
        document.querySelector("#hero-gun-tag").innerHTML = "-";
    }
    if (hero.hero_type != null) {
        document.querySelector("#hero-type-tag").innerHTML = hero.hero_type;        
    } else {
        document.querySelector("#hero-type-tag").innerHTML = "-";
    }

    // Introduction and Lore
    document.querySelector("#lore-text").innerHTML = hero.description.lore;
    
    //Loop for tags
    const container = document.querySelector("#hero-desc-tag");
    hero.tags.forEach(tag => {
        const span = document.createElement("span");
        span.classList.add("hero-tag");
        span.textContent = tag;
        container.appendChild(span);
    });
    
    // Hero Art
    let image = getHeroRender(hero.name);
    document.querySelector("#hero-art").innerHTML = `<img src="${image}">`;

    hero_id = hero.id;
    console.log(hero.id);
}

displayHeroPage();