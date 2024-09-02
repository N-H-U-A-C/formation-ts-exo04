export function rollD10() {
    const min = Math.ceil(1);
    const max = Math.floor(10);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

