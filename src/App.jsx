import { useState, useEffect } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import { getPokemonNames, getPokemonDetails } from "./utils/pokemonApi";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0)
  const [pokemons, setPokemons] = useState(null);


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
          return <Card key={pokemon.id} pokemon={pokemon}></Card>
        })
       : <div> LOADING </div> }
      </div>
    </>
  )
}

export default App;
