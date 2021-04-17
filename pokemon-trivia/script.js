// create a custom element (parameter 1), adding a className (parameter 2) and an innerText (parameter 3)
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// random number must be from 1 to 386 (3rd generation)
function randomNumber() {
  return Math.ceil(Math.random()*386);
}

// creates an array with the name and image of each pokemon
async function pokemonNameAndImage() {
  const pokemonId = randomNumber();
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((res) => res.json());
  const { species: { name: pokemonName }, sprites: { other: { dream_world: { front_default: pokemonImage } } } } = pokemon;
  return [ pokemonName, pokemonImage ]
}

// create an arrays with 4 pokemons and images
async function arrayOfAnswers() {
  let pokemonArray = []
  for (let i = 0; i < 4; i += 1) {
    const pokemon = await pokemonNameAndImage();
    pokemonArray.push(pokemon);
  }
  return pokemonArray;
}

function resetPage() {
  document.location.reload(true);
}

// checks if the name inside the button corresponds to the image
function checkResult() {
  const clickedPokemon = this.firstChild.innerText.toLowerCase();
  const correctPokemon = document.querySelector('.pokemonAnswer').innerText;
  if (clickedPokemon !== correctPokemon) {
    this.className = 'option wrong';
    this.removeEventListener('click', checkResult);
  }
  if (clickedPokemon === correctPokemon) {
    const modal = document.querySelector('.correct');
    const again = document.querySelector('.again');
    again.addEventListener('click', resetPage)
    modal.className = 'correct'
  }
  console.log(clickedPokemon);
  console.log(correctPokemon);
}

// create button and p for each pokemon in the array above
function createOptions(pokemonArray) {
  pokemonArray.forEach((pokemon) => {
    const newButton = createCustomElement('button', 'option', '');
    newButton.addEventListener('click', checkResult)
    const newP = createCustomElement('p', '', pokemon[0]);
    newButton.appendChild(newP);
    document.querySelector('#left-content').appendChild(newButton)
  });
}

// get a random pokemon from the array and add an image and p (with display: none)
function getImage(pokemonArray) {
  const id = Math.floor(Math.random()*4)
  const newImage = createCustomElement('img', 'pokemonImage', '')
  newImage.src = pokemonArray[id][1]
  const newP = createCustomElement('p', 'pokemonAnswer', pokemonArray[id][0])
  document.querySelector('.pokemon').appendChild(newImage)
  document.querySelector('.pokemon').appendChild(newP)
}

// render all the info in the screen
async function renderImageAndAnswers() {
  const pokemonArray = await arrayOfAnswers();
  createOptions(pokemonArray);
  getImage(pokemonArray);
}

window.onload = function() {
  renderImageAndAnswers()
}