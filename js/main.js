const quoteInputElement = document.getElementById("quote-input");
const quoteDisplayElement = document.getElementById("quote-display");
const QUOTE_API_URL = "http://api.quotable.io/random";

quoteInputElement.addEventListener("input", event => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];

    if (character == null) {
      characterSpan.classList.remove("text-success");
      characterSpan.classList.remove("text-danger", "incorrect");
    } else if (character === characterSpan.innerHTML) {
      characterSpan.classList.add("text-success");
      characterSpan.classList.remove("text-danger", "incorrect");
    } else {
      characterSpan.classList.remove("text-success");
      characterSpan.classList.add("text-danger", "incorrect");
    }
  });
});

function getRandomQuote() {
  return fetch(QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content);
}

async function getNextQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach(character => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
}

getNextQuote();
