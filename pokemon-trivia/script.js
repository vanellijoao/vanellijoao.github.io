// create a custom element (parameter 1), adding a className (parameter 2) and an innerText (parameter 3)
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// random number must be from 1 to 386
function randomNumber() {
  return Math.ceil(Math.random()*386);
}

// Get the Pokemon, based on the random number
async function getPokemonObject() {
  
  return pokemon
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

// create button and p for each pokemon in the array above
function createOptions(pokemonArray) {
  pokemonArray.forEach((pokemon) => {
    const newButton = createCustomElement('button', 'option', '');
    const newP = createCustomElement('p', '', pokemon[0]);
    newButton.appendChild(newP);
    document.querySelector('#left-content').appendChild(newButton)
  });
}

function getImage(pokemonArray) {
  const id = Math.floor(Math.random()*4)
  const newImage = createCustomElement('img', 'pokemonImage', '')
  newImage.src = pokemonArray[id][1]
  const newP = createCustomElement('p', 'pokemonAnswer', pokemonArray[id][0])
  document.querySelector('.pokemon').appendChild(newImage)
  document.querySelector('.pokemon').appendChild(newP)
}


async function renderImageAndAnswers() {
  const pokemonArray = await arrayOfAnswers();
  createOptions(pokemonArray);
  getImage(pokemonArray);
}

window.onload = function() {
  renderImageAndAnswers()
}