function pickRandom(arr, num) {
    const copy = [...arr];
    const result = [];

    for (let i = 0; i < num && copy.length > 0; ++i) {
        const index = Math.floor(Math.random() * copy.length);
        result.push(copy.splice(index, 1)[0]);
    }

    return result;
}