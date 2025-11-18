import shufflePokemon from "./shufflePokemon";

export default function getRandomPokemon(pokemons, numNeeded) {
    const copy = [...pokemons];

    return shufflePokemon(copy).slice(0, numNeeded);
}