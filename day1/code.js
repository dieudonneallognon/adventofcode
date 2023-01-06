const fs = require('fs');
const readline = require('readline');
const path = require('path');

const calories = [];

readline
    .createInterface({
        input: fs.createReadStream(path.resolve(__dirname, './puzzle-input.txt')),
    })
    .on('line', (line) => {
        line.trim().length == 0
            ? calories.push(0)
            : calories.push((calories.pop() || 0) + parseInt(line, 10));
    })
    .on('close', () => {
        const [first, second, third, ...rest] = calories.sort((a, b) => b - a);

        console.log(`The most carried calories by an Elf is: ${first}`);
        console.log(
            `The carried calories by the top three Elves is : ${
                first + second + third
            }`
        );
    });
