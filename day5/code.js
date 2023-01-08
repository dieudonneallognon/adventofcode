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
            let pos = 0;

            do {
                const crate = ((c = line
                    .substring(pos + 1, pos + 2)
                    .trim()
                ).length > 0)
                    ? c
                    : undefined;

                const crateColumn = pos / 4;

                if (!crates[crateColumn]) {
                    crates.push([]);
                }

                if (crate) {
                    crates[crateColumn].push(crate);
                }
                pos += 4;
            } while(pos < line.length);
        }
    })
    .on('close', () => {
        console.log(`The crates ending up on top of each stack with CrateMover 9000 are: ${[...moves].reduce(moveSingleCrates, JSON.parse(JSON.stringify(crates))).reduce((res, col) => (res += col[0]), '')}`);
        console.log(`The crates ending up on top of each stack are: ${crates.map(col => col[0]).reduce((res, col) => (res+=col), '')}`);
    });

const moveSingleCrates = (crates, [nb, origin, destination]) => {

    const movingCrates = crates[origin - 1].slice(0, nb).reverse();

    crates[origin - 1] = crates[origin - 1].slice(nb);
    crates[destination - 1].unshift(...movingCrates);

    return crates;
};
};
