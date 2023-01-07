const fs = require('fs');
const readline = require('readline');
const path = require('path');

let totalScore = 0;


const [opponent, challenger] = [['A', 'B', 'C'], ['X', 'Y', 'Z']];

const choicesSeparator = ' ';

const charCodesDiff = challenger[0].charCodeAt(0) - opponent[0].charCodeAt(0);

const clashPoints = (opponentChoice, choice) =>
    [ 1, 2, 0].at(
        choice.charCodeAt(0) - (opponentChoice.charCodeAt(0) + charCodesDiff)
    )*3;

const choicePoints = (choice) => choice.charCodeAt(0) - challenger[0].charCodeAt(0) + 1;

readline
    .createInterface({
        input: fs.createReadStream(path.resolve(__dirname, './puzzle-input.txt')),
    })
    .on('line', (line) => {
        let [a, b] = line.trim().split(choicesSeparator);

        if (a && b) {
            totalScore += clashPoints(a, b) + choicePoints(b);
        }
    })
    .on('close', () => console.log(`The 1st strategy score is ${totalScore}`));
