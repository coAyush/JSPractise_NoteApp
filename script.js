let dark = document.querySelector("#header img");
let b = document.body;
let isDark = false;
let heading = document.querySelector(".Heading");
let s = document.querySelector("#s");

dark.addEventListener("click", () => {
    if (!isDark) {
        dark.setAttribute("src", "icons/light.png");
        b.style.backgroundColor = "black";
        heading.style.color = "#b19cd9";
        s.style.color = "#4fc520";
        isDark = true;
    } else {
        dark.setAttribute("src", "icons/dark.png");
        b.style.backgroundColor = "white";
        heading.style.color = "#490558";
        s.style.color = "#490558";
        isDark = false;
    }
});

let notes = [];
const cardsAdd = document.querySelector("#cards-add");
const addCard = document.querySelector("#cards-addition");

const createNote = () => {
    return { title: "", description: "" };
};

function renderNotes() {
    document.querySelectorAll(".cards").forEach(card => card.remove());

    notes.forEach((note) => {
        const card = document.createElement("div");
        card.className = "cards";  // ✅ fixed
        card.id = "cards";

        card.innerHTML = `
            <textarea class="note-title" placeholder="Title...">${note.title}</textarea>
            <hr class="divider"></p>
            <textarea class="note-body" placeholder="Take a note...">${note.description}</textarea>
        `;  // ✅ fixed note.description

        card.querySelector(".note-title").addEventListener("input", e => {
            note.title = e.target.value;
        });

        card.querySelector(".note-body").addEventListener("input", e => {
            note.description = e.target.value;  // ✅ fixed
        });

        cardsAdd.insertBefore(card, addCard);
    });
}

addCard.addEventListener("click", () => {
    notes.push(createNote());
    renderNotes();
});
s.addEventListener("input", (event) => {
    const val = event.target.value.toLowerCase().trim();
    // toLowerCase so search is case-insensitive
    // trim removes accidental spaces

    // Remove any old "nothing found" message first
    const existing = document.querySelector("#no-results");
    if (existing) existing.remove();

    // Get all currently rendered note cards
    const cards = document.querySelectorAll(".cards");

    let anyVisible = false;

    cards.forEach((card) => {
        const title = card.querySelector(".note-title").value.toLowerCase();
        const body = card.querySelector(".note-body").value.toLowerCase();

        // Show card if title OR body contains the search value
        if (title.includes(val) || body.includes(val) || val === "") {
            card.style.display = "block";
            anyVisible = true;
        } else {
            card.style.display = "none";
        }
    });
   let hero=document.querySelector("#hero")
    // If nothing matched, show a message
    if (!anyVisible && val !== "") {
        const msg = document.createElement("p");
        msg.id = "no-results"; // so we can find and remove it next time
        msg.style.fontWeight = "bold";
        msg.style.fontFamily = "Comic Sans MS";
        msg.style.fontSize = "15px";
        msg.style.color = "red";
        msg.innerText = "Nothing to display.....";
        hero.insertBefore(msg, cardsAdd.nextSibling);
    }
});