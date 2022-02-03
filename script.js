const inputPokemon = document.querySelector('#pokemon');
const lightPowerLeft = document.querySelector('.bow-left');
const lighttPowerRight = document.querySelector('.bow-right');
const namePokemon = document.querySelector('.name-pokemon #name');
const habPokemon = document.querySelector('.name-pokemon #hab');
const imagePokemon = document.querySelector('.image-pokemon img');
const imageLogo = document.querySelector('#logo');
const listaPokemon = document.querySelector('#lista-pokemon');
const btnLista = document.querySelector('#btn-lista');
const btnClk = document.querySelector('#btn-search');
const btnUp = document.querySelector('#btn-up');
const btnDown = document.querySelector('#btn-down');
const btnClear = document.querySelector('#clear');
let namePokemonLow = ''
let indexLista = 0;

const opac = () => {
    imageLogo.classList.toggle('opacidade');
}

window.onload = setInterval(opac, 500)

const arrayPokemons = [
    "Bulbasaur","Ivysaur","Venusaur","Charmander",
    "Charmeleon","Charizard","Squirtle","Wartortle",
    "Blastoise","Caterpie","Metapod","Butterfree",
    "Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto",
    "Pidgeot","Rattata","Raticate","Spearow","Fearow",
    "Ekans","Arbok","Pikachu","Raichu","Sandshrew",
    "Sandslash","Nidorina","Nidoqueen",
    "Nidoran","Nidorino","Nidoking","Clefairy",
    "Clefable","Vulpix","Ninetales","Jigglypuff",
    "Wigglytuff","Zubat","Golbat","Oddish","Gloom",
    "Vileplume","Paras","Parasect","Venonat","Venomoth",
    "Diglett","Dugtrio","Meowth","Persian","Psyduck",
    "Golduck","Mankey","Primeape","Growlithe","Arcanine",
    "Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra",
    "Alakazam","Machop","Machoke","Machamp","Bellsprout",
    "Weepinbell","Victreebel","Tentacool","Tentacruel",
    "Geodude","Graveler","Golem","Ponyta","Rapidash",
    "Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd",
    "Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder",
    "Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee",
    "Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute",
    "Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan",
    "Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey",
    "Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking",
    "Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz",
    "Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras",
    "Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon",
    "Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl",
    "Snorlax","Articuno","Zapdos","Moltres","Dratini",
    "Dragonair","Dragonite","Mewtwo","Mew"
];

btnClk.addEventListener('click', () => {
    if (inputPokemon.value === '') return;

    let lowerinput = inputPokemon.value.toLowerCase();

    const containPokemon = arrayPokemons.find((pokemonsSearch) => {
        return lowerinput === pokemonsSearch.toLowerCase()
    });
    if (lowerinput !== containPokemon.toLowerCase()) return;

    namePokemon.classList.remove('escondido');
    habPokemon.classList.remove('escondido');
    imagePokemon.classList.remove('escondido');
    listaPokemon.classList.add('escondido')
    imageLogo.classList.add('escondido');
    lightPowerLeft.classList.remove('escondido');
    lighttPowerRight.classList.remove('escondido');

    const promiseResposta = fetch(`https://pokeapi.co/api/v2/pokemon/${lowerinput}`);

    promiseResposta.then((resposta) => {
        const promiseBody = resposta.json();

        promiseBody.then((body) => {
            namePokemon.textContent = `Pokemon: ${body.name}`
            habPokemon.textContent = `Habilidade: ${body.abilities[0].ability.name}`
            imagePokemon.src = body.sprites.front_default
        });
    });
});

btnLista.addEventListener('click', () => {
    namePokemon.classList.add('escondido');
    habPokemon.classList.add('escondido');
    imagePokemon.classList.add('escondido');
    imageLogo.classList.add('escondido');
    listaPokemon.classList.remove('escondido');
    for (let i = 0; i < arrayPokemons.length; i++) {
        listaPokemon.options[listaPokemon.options.length] = new Option(arrayPokemons[i],`${i}`)
    }
});

listaPokemon.addEventListener('change', () => {
    indexLista = listaPokemon.selectedIndex
    namePokemonLow = listaPokemon.options[indexLista].text
    inputPokemon.value = namePokemonLow.toLowerCase();
});

const up = (index) => {
    listaPokemon.options[index].selected = 'selected'
    namePokemonLow = listaPokemon.options[index].text
    inputPokemon.value = namePokemonLow.toLowerCase();
}

btnUp.addEventListener('click', () => {
    indexLista--
    if (indexLista < 0) {
        return indexLista = 0
    }
    console.log(indexLista)
    up(indexLista)
});

const down = (index) => {
    listaPokemon.options[index].selected = 'selected'
    namePokemonLow = listaPokemon.options[index].text
    inputPokemon.value = namePokemonLow.toLowerCase();
}

btnDown.addEventListener('click', () => {
    indexLista++
    if (indexLista > 149) {
        return indexLista = 149
    }
    down(indexLista)
    console.log(indexLista)
});

btnClear.addEventListener('click', () => {
    namePokemon.classList.add('escondido');
    habPokemon.classList.add('escondido');
    imagePokemon.classList.add('escondido');
    listaPokemon.classList.add('escondido');
    imageLogo.classList.remove('escondido');
    lightPowerLeft.classList.add('escondido');
    lighttPowerRight.classList.add('escondido');
    inputPokemon.value = ''
});


