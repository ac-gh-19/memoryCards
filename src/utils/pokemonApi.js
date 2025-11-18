async function getPokemonNames(difficulty) {
    const limitNum = difficulty <= .4 ? 15 : difficulty <= .6 ? 20 : 30;
  const API_URL = "https://pokeapi.co/api/v2/pokemon";
  try {
    const response = await fetch(`${API_URL}?limit=${limitNum}`);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(`Error: ${error}`);
    return false;
  }
}

async function getPokemonDetails(pokemonName) {
  const API_URL = "https://pokeapi.co/api/v2/pokemon";
  try {
    const response = await fetch(`${API_URL}/${pokemonName}`);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
    return false;
  }
}

export { getPokemonNames, getPokemonDetails };
