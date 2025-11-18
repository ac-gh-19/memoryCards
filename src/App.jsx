import { useState, useEffect } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import SelectionScreen from "./components/SelectionScreen";
import { getPokemonNames, getPokemonDetails } from "./utils/pokemonApi";
import getRandomPokemon from "./utils/getRandomPokemon";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0)
  const [pokemons, setPokemons] = useState(null);
  const [clickedPokemonIDS, setClickedPokemonIDS] = useState(new Set())
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const [displayOfPokemons, setDisplayOfPokemons] = useState([]);

  function handleSelectionScreenClick(difficulty) {
    setDifficulty(difficulty);
    setGameStarted(true);
  }

  function handleCardClick(pokemonID) {
    if (clickedPokemonIDS.has(pokemonID)) {
      setCurrentScore(0);
      setPokemons(null);
      setClickedPokemonIDS(new Set());
      setGameStarted(false);
      return;
    }

    const newClickedPokemonIDS = new Set(clickedPokemonIDS);
    console.log("newlyCLicked", newClickedPokemonIDS);
    newClickedPokemonIDS.add(pokemonID);
    setClickedPokemonIDS(newClickedPokemonIDS);
    setCurrentScore(currentScore + 1);
    if (currentScore + 1 > bestScore) {
      setBestScore(bestScore + 1);
    }
  }

  useEffect(() => {
    if (!gameStarted) return;
    async function fetchData() {
      const pokemonNames = await getPokemonNames();
      if (!pokemonNames) return;

      const detailedPokemon = await Promise.all(
        pokemonNames.map(async (pokemon) => {
          const pokemonData = await getPokemonDetails(pokemon.name);

          return {
            name: pokemon.name,
            image: pokemonData.sprites.front_default,
            id: pokemonData.id,
          }
        })
      )

      console.log(detailedPokemon);
      setPokemons(detailedPokemon);
    }

    fetchData();
  }, [gameStarted])

  useEffect(() => {
    if (!gameStarted || !pokemons) return;
    function getDisplay() {
      const NUM_OF_DISPLAY_POKEMONS = 10;
      const seenPokemon = pokemons.filter(pokemon => clickedPokemonIDS.has(pokemon.id));
      const unseenPokemon = pokemons.filter(pokemon => !clickedPokemonIDS.has(pokemon.id));
      const numOfSeenPokemonsNeeded = Math.floor(NUM_OF_DISPLAY_POKEMONS * difficulty);
      console.log(numOfSeenPokemonsNeeded);

      const display = [];
      if (seenPokemon.length <= numOfSeenPokemonsNeeded) {
        display.push(...seenPokemon)
        console.log("seen pokemon", seenPokemon);
      } else {
        const randomSeenPokemon = getRandomPokemon(seenPokemon, numOfSeenPokemonsNeeded);
        display.push(...randomSeenPokemon);
      }
      console.log("WITH SEEN POKEMON", display)

      const numOfUnseenPokemonsNeeded = NUM_OF_DISPLAY_POKEMONS - display.length;
      const randomUnseenPokemon = getRandomPokemon(unseenPokemon, numOfUnseenPokemonsNeeded);
      display.push(...randomUnseenPokemon);
      console.log("WITH UNSEEN POKEMON", display)

      setDisplayOfPokemons(display);
    }

    getDisplay();
  }, [clickedPokemonIDS, pokemons, gameStarted, difficulty, currentScore])

  return (
    <>
      <div className="h-screen flex flex-col">
        <Header title="Memory Card Pokemon" currentScore={currentScore} bestScore={bestScore}></Header>
        { gameStarted && pokemons != null ? 
          <div className="grid gap-10 p-10"
            style={{gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))"}}>
              {
                displayOfPokemons.map(pokemon => {
                  return <Card key={pokemon.id} pokemon={pokemon} onClick={handleCardClick}></Card>
                })
              }
          </div>
        : 
        <div className="h-full justify-center items-center flex mb-20">
          <SelectionScreen onClick={handleSelectionScreenClick}></SelectionScreen>
        </div> }
      </div>
    </>
  )
}

export default App;
