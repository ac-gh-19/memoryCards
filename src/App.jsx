import { useState, useEffect } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import { getPokemonNames, getPokemonDetails } from "./utils/pokemonApi";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0)
  const [pokemons, setPokemons] = useState(null);
  const [clickedPokemonIDS, setClickedPokemonIDS] = useState(new Set())

  function handleCardClick(pokemonID) {
    if (clickedPokemonIDS.has(pokemonID)) {
      setCurrentScore(0);
      setPokemons(null);
      return;
    }

    const newClickedPokemonIDS = new Set(clickedPokemonIDS);
    newClickedPokemonIDS.add(pokemonID);
    setClickedPokemonIDS(newClickedPokemonIDS);
    setCurrentScore(currentScore + 1);
    if (currentScore + 1 > bestScore) {
      setBestScore(bestScore + 1);
    }
  }

  useEffect(() => {
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
  }, [])

  return (
    <>
      <Header title="Memory Card Pokemon" currentScore={currentScore} bestScore={bestScore}></Header>
      <div className="grid gap-10 p-10"
      style={{gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))"}}>
        { pokemons != null ? 
        pokemons.map(pokemon => {
          return <Card key={pokemon.id} pokemon={pokemon} onClick={handleCardClick}></Card>
        })
       : <div> LOADING </div> }
      </div>
    </>
  )
}

export default App;
