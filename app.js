const form = document.querySelector("#searchForm");
const hogwarts = document.querySelector("#hogwarts");
const randomCharacter = document.querySelector("#random");
let cachedCharacters = null;

const fetchCharacters = function () {
    const res = axios(`http://hp-api.herokuapp.com/api/characters/`);
    return res
}

const characters = function () {
    if (cachedCharacters != null) {
        return cachedCharacters
    } else {
        const cachedCharacters = fetchCharacters()
        return cachedCharacters
    }
}

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const searchTerm = form.elements.query.value;
    const ris = await characters();
    hogwarts.innerHTML = "";
    try {
        const findCharacter = ris.data.find(character => character.name === searchTerm || character.name.toLowerCase() === searchTerm.toLowerCase() || character.name.startsWith(searchTerm) || character.name.toLowerCase().startsWith(searchTerm.toLowerCase()))

            const hName = document.createElement("h3");
            hName.append(findCharacter.name)
            hogwarts.append(hName)

            const img = document.createElement("img");
            const liImg = document.createElement("li")
            img.src = findCharacter.image;
            liImg.append(img);
            hogwarts.append(liImg)

            const liHouse = document.createElement("li");
            liHouse.innerHTML = `<li><b>House:</b> ${findCharacter.house}</li>`;
            hogwarts.append(liHouse)

            const liBirth = document.createElement("li");
            liBirth.innerHTML = `<li><b>Date of birth:</b> ${findCharacter.dateOfBirth}</li>`;
            hogwarts.append(liBirth)

            const liAncestry = document.createElement("li");
            liAncestry.innerHTML = `<li><b>Ancestry:</b> ${findCharacter.ancestry}</li>`;
            hogwarts.append(liAncestry)

            const liActor = document.createElement("li");
            liActor.innerHTML = `<li><b>Played by</b> ${findCharacter.actor}</li>`;
            hogwarts.append(liActor)
    } catch {
        console.log("uh-oh")
    }
    form.elements.query.value = "";
})

randomCharacter.addEventListener("click", async function (){
    const ris = await characters();
    const randomNumber = Math.floor(Math.random() * 25)
    const randomCharacter = ris.data[randomNumber]
    hogwarts.innerHTML = "";

        try {
            const hName = document.createElement("h3");
            hName.append(randomCharacter.name)
            hogwarts.append(hName)

            const img = document.createElement("img");
            const liImg = document.createElement("li")
            img.src = randomCharacter.image;
            liImg.append(img);
            hogwarts.append(liImg)

            const liHouse = document.createElement("li");
            liHouse.innerHTML = `<li><b>House:</b> ${randomCharacter.house}</li>`;
            hogwarts.append(liHouse)

            const liBirth = document.createElement("li");
            liBirth.innerHTML = `<li><b>Date of birth:</b> ${randomCharacter.dateOfBirth}</li>`;
            hogwarts.append(liBirth)

            const liAncestry = document.createElement("li");
            liAncestry.innerHTML = `<li><b>Ancestry:</b> ${randomCharacter.ancestry}</li>`;
            hogwarts.append(liAncestry)

            const liActor = document.createElement("li");
            liActor.innerHTML = `<li><b>Played by</b> ${randomCharacter.actor}</li>`;
            hogwarts.append(liActor)
        } catch {
            console.log("ouch!")
        }
})