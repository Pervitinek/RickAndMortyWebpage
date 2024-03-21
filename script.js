let x = 1;
let maxPage;

document.getElementById("prev").addEventListener("click", changePagePrev);
document.getElementById("next").addEventListener("click", changePageNext);

const aliveCheckbox = document.getElementById("alive");
const deadCheckbox = document.getElementById("dead");
const unknownCheckbox = document.getElementById("unknown");

aliveCheckbox.addEventListener("change", logCharacters);
deadCheckbox.addEventListener("change", logCharacters);
unknownCheckbox.addEventListener("change", logCharacters);

function changePagePrev(){
    if(x > 1){
        x--;
        logCharacters();
    }
}
function changePageNext(){
    if(x < maxPage){
        x++;
        logCharacters();
    }
}

async function logCharacters() {
    const response = await fetch("https://rickandmortyapi.com/api/character?page=" + x);
    const info = await response.json();
    maxPage = await info.info.pages;
    console.log(info);

    const container = document.getElementById("container");
    container.innerHTML = "";

    info.results.forEach(character => {
        if ((character.status === "Alive" && aliveCheckbox.checked) ||
            (character.status === "Dead" && deadCheckbox.checked) ||
            (character.status === "unknown" && unknownCheckbox.checked)) {
            document.getElementById("errorContainer").innerHTML = "";
            const containerInContainer = document.createElement("div")
            const img = document.createElement("img");
            img.src = character.image;
            img.alt = character.name;
            const name = document.createElement("p");
            name.innerText = character.name;
            const species = document.createElement("p");
            species.innerText = character.species;
            const status = document.createElement("p");
            status.innerText = "Status: " + character.status;

            const profileInfo = document.createElement("div");
            profileInfo.classList.add("profileInfo");

            containerInContainer.classList.add("containerInContainer");
            containerInContainer.appendChild(img);
            img.classList.add("pfp");
            profileInfo.appendChild(name);
            name.classList.add("characterName");
            profileInfo.appendChild(species);
            containerInContainer.appendChild(profileInfo);
            species.classList.add("characterSpecies");
            containerInContainer.appendChild(status);
            status.classList.add("characterStatus");


            container.appendChild(containerInContainer);
        }
    })
    if(!aliveCheckbox.checked && !deadCheckbox.checked && !unknownCheckbox.checked){
        const errorMsg = document.createElement("p");
        errorMsg.innerText = "There are no characters here! You unchecked every status in the filter!";
        errorMsg.classList.add("errorMsg");
        document.getElementById("errorContainer").appendChild(errorMsg);
    }
}
logCharacters();

