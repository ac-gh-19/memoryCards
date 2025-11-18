export default function getRandomPokemon(pokemons, numNeeded) {
    const copy = [...pokemons];

    for (let i = 0; i < copy.length; ++i) {
        const index = Math.floor(Math.random() * copy.length);
        [copy[i], copy[index]] = [copy[index], copy[i]];
    }

    return copy.slice(0, numNeeded);
}