const fs = require('fs');
const readline = require('readline');
const path = require('path');

const crates = [];
const moves = [];

readline
    .createInterface({
        input: fs.createReadStream(path.resolve(__dirname, './puzzle-input.txt')),
    })
    .on('line', (line) => {

        if (line.startsWith('move')) {
            moves.push(line.split(' ')
                .filter(el => !isNaN(parseInt(el)))
                .map(el => parseInt(el))
            );
        } else if (line.length > 0) {
            line.match(/(\s{3}|\[[A-Z]\]|\s\d\s)\s?/g)
                .map(el => el.trim().length > 0 ? el.split('')[1] : undefined)
                .forEach((crate, column) => {

                    if (!crates[column]) {
                        crates.push([]);
                    }

                    if (crate) {
                        crates[column].push(crate);
                    }
                });
        }
    })
    .on('close', () => {
        console.log(`The crates ending up on top of each stack with CrateMover 9000 are: ${[...moves].reduce(moveSingleCrates, JSON.parse(JSON.stringify(crates))).reduce((res, col) => (res += col[0]), '')}`);
        console.log(`The crates ending up on top of each stack with CrateMover 9001 are: ${[...moves].reduce(moveMultipleCrates, JSON.parse(JSON.stringify(crates))).reduce((res, col) => (res += col[0]), '')}`);
    });

const moveSingleCrates = (crates, [nb, origin, destination]) => {

    const movingCrates = crates[origin - 1].slice(0, nb).reverse();

    crates[origin - 1] = crates[origin - 1].slice(nb);
    crates[destination - 1].unshift(...movingCrates);

    return crates;
};

const moveMultipleCrates = (crates, [nb, origin, destination]) => {

    const movingCrates = crates[origin - 1].slice(0, nb);

    crates[origin-1] = crates[origin-1].slice(nb);
    crates[destination - 1].unshift(...movingCrates);

    return crates;
};
