import { useState, useEffect } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import SelectionScreen from "./components/SelectionScreen";
import { getPokemonNames, getPokemonDetails } from "./utils/pokemonApi";
import getRandomPokemon from "./utils/getRandomPokemon";
import shufflePokemon from "./utils/shufflePokemon";
import PostScreen from "./components/PostScreen";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemons, setPokemons] = useState(null);
  const [clickedPokemonIDS, setClickedPokemonIDS] = useState(new Set());
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const [displayOfPokemons, setDisplayOfPokemons] = useState([]);
  const [gameState, setGameState] = useState("");

  function restartGame() {
    setCurrentScore(0);
    setPokemons(null);
    setGameStarted(false);
    setClickedPokemonIDS(new Set());
    setGameState("");
    setDifficulty(0);
  }

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
      setGameState("loss");
      return;
    }

    const newClickedPokemonIDS = new Set(clickedPokemonIDS);
    newClickedPokemonIDS.add(pokemonID);
    setClickedPokemonIDS(newClickedPokemonIDS);
    setCurrentScore(currentScore + 1);
    if (currentScore + 1 > bestScore) {
      setBestScore(bestScore + 1);
    }
    if (newClickedPokemonIDS.size === pokemons.length) {
      setGameState("won");
    }
  }

  useEffect(() => {
    if (!gameStarted) return;
    async function fetchData() {
      const pokemonNames = await getPokemonNames(difficulty);
      if (!pokemonNames) return;

      const detailedPokemon = await Promise.all(
        pokemonNames.map(async (pokemon) => {
          const pokemonData = await getPokemonDetails(pokemon.name);

          return {
            name: pokemon.name,
            image: pokemonData.sprites.front_default,
            id: pokemonData.id,
          };
        }),
      );

      setPokemons(detailedPokemon);
    }

    fetchData();
  }, [gameStarted, difficulty]);

  useEffect(() => {
    if (!gameStarted || !pokemons) return;
    function getDisplay() {
      console.log(pokemons.length)
      const NUM_OF_DISPLAY_POKEMONS_NEEDED = 10;
      const seenPokemon = pokemons.filter((pokemon) =>
        clickedPokemonIDS.has(pokemon.id),
      );
      const unseenPokemon = pokemons.filter(
        (pokemon) => !clickedPokemonIDS.has(pokemon.id),
      );
      let numOfSeenPokemonsNeeded = Math.floor(
        NUM_OF_DISPLAY_POKEMONS_NEEDED * difficulty,
      );

      // if we don't have enough unseen pokemon when user get's towards discovering all, then
      // we have to set seenPokemons to num of pokemon we need - available to fill up missing unseen
      numOfSeenPokemonsNeeded =
        unseenPokemon.length <=
        NUM_OF_DISPLAY_POKEMONS_NEEDED - numOfSeenPokemonsNeeded
          ? NUM_OF_DISPLAY_POKEMONS_NEEDED - numOfSeenPokemonsNeeded
          : Math.floor(NUM_OF_DISPLAY_POKEMONS_NEEDED * difficulty);

      const display = [];
      if (seenPokemon.length <= numOfSeenPokemonsNeeded) {
        display.push(...seenPokemon);
      } else {
        const randomSeenPokemon = getRandomPokemon(
          seenPokemon,
          numOfSeenPokemonsNeeded,
        );
        display.push(...randomSeenPokemon);
      }

      const numOfUnseenPokemonsNeeded =
        NUM_OF_DISPLAY_POKEMONS_NEEDED - display.length;
      const randomUnseenPokemon = getRandomPokemon(
        unseenPokemon,
        numOfUnseenPokemonsNeeded,
      );
      display.push(...randomUnseenPokemon);

      setDisplayOfPokemons(shufflePokemon(display));
    }

    getDisplay();
  }, [clickedPokemonIDS, pokemons, gameStarted, difficulty, currentScore]);

  return (
    <>
      <div className="h-screen flex flex-col bg-stone-900">
        <Header
          title="Pokemon Memory Cards"
          currentScore={currentScore}
          bestScore={bestScore}
        ></Header>
        {gameStarted && pokemons != null && !gameState ? (
          <div className="grid gap-10 p-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {displayOfPokemons.map((pokemon) => {
              return (
                <Card
                  key={pokemon.id}
                  pokemon={pokemon}
                  onClick={handleCardClick}
                ></Card>
              );
            })}
          </div>
        ) : gameState === "loss" ? (
          <div className="h-full justify-center items-center flex p-10">
            <PostScreen onClick={restartGame}>You Lost!</PostScreen>
          </div>
        ) : gameState === "won" ? (
          <div className="h-full justify-center items-center flex p-10">
            <PostScreen onClick={restartGame}>You Won!</PostScreen>
          </div>
        ) : (
          <div className="h-full justify-center items-center flex mb-20">
            <SelectionScreen
              onClick={handleSelectionScreenClick}
            ></SelectionScreen>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
