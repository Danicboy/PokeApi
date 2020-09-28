var pokemons = [];

let iniciar = async () => {
    const { data :  pokemons } = await axios.get("https://localhost:44364/Api/PokeApi/PokeList");
    const elemento = document.getElementById('container-content');

    var contenido = "";

    pokemons.forEach( function (pokemons) {

        contenido =
        `
        <div class="content">
          <h2>#${pokemons.pokedexNumber} &nbsp ${pokemons.pokemonName}</h2>
          <div class="content-image">
            <img src="${pokemons.pokemonImage}" alt="">
          </div>
          <div class="contet-paragraph">
            <p>Type: &nbsp ${pokemons.pokemonTypeName}</p>
            <p>Height: &nbsp ${pokemons.pokemonHeight} Ft.</p>
            <p>Weight: &nbsp ${pokemons.pokemonWeight} Kg.</p>
            <p>Base Experience: &nbsp ${pokemons.pokemonBaseExperience}</p>
          </div>
          <a id="${pokemons.pokedexNumber}" onclick="openModal(${pokemons.pokedexNumber}, ${pokemons.pokemonType})">More Info</a>
        </div>
        `;

        elemento.innerHTML += contenido;

    });

        console.log(pokemons);
}

var modal = document.getElementById("myModal");

// let varId = async (pokedexNumber, btn) => {
  //Get the modal


  // Get the button that opens the modal
  // var btn = document.getElementById(pokedexNumber);

  // Get the <span> element that closes the modal
  // var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  // btn.onclick = function() {
    // modal.style.display = "block";
  // }

  // When the user clicks on <span> (x), close the modal
  // span.onclick = function() {
  //   modal.style.display = "none";
  // }

  // When the user clicks anywhere outside of the modal, close it
  // window.onclick = function(event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // }
// }

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let closeModal = () => {
  modal.style.display = "none";
}

let openModal = async ( pokedexNumber , pokemonType ) => {
    const {data : pokemonInfo} = await axios.get(`https://localhost:44364/Api/PokeApi/pokemon/${pokedexNumber}`);

    modal.style.display = "block";

    let image = document.getElementById("modal-image");

    let imageContent = `
    <img src="${pokemonInfo.pokemon.pokemonImage}" alt="">
    `

    image.innerHTML = imageContent;

    let paragraph = document.getElementById("modal-paragraph");

    let content = `
    <h2> #: ${pokemonInfo.pokemon.pokedexNumber} &nbsp ${pokemonInfo.pokemon.pokemonName}</h2>
    <p> Type: &nbsp ${pokemonInfo.pokemon.pokemonType} </p>
    <p> Height: &nbsp ${pokemonInfo.pokemon.pokemonHeight} Ft. </p>
    <p> Weight: &nbsp ${pokemonInfo.pokemon.pokemonWeight} Kg. </p>
    <p> Base Experience: &nbsp ${pokemonInfo.pokemon.pokemonBaseExperience} </p>
    `;

    paragraph.innerHTML = content;

    pokemonInfo.habitats.forEach( function (habitat) {

        let pokehabi = `
            <p id="Text">
                Habitat: ${habitat.habitat}
            </p>
            <p id="Text-Habi">
                Description: ${habitat.habitatDescription}
            </p>
        `;

        paragraph.innerHTML += pokehabi;

      });

    const {data : pokemontype} = await axios.get(`https://localhost:44364/Api/PokeApi/type/${pokemonType}`);

    let typeImage = document.getElementById("modal-imagesContent");

    let poketypeList = "";

    pokemontype.forEach( function (pokemonType) {

        let poketype = `
            <img id="pokeType" src="${pokemonType.image}">
        `;

        // typeImage.innerHTML += poketype;
        poketypeList += poketype;
    });

    typeImage.innerHTML = poketypeList;

    console.log(pokemontype);

    console.log(pokemonInfo);

}

iniciar();
