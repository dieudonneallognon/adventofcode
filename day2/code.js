const fs = require('fs');
const readline = require('readline');
const path = require('path');


const [opponent, challenger] = [['A', 'B', 'C'], ['X', 'Y', 'Z']];

const choicesSeparator = ' ';

const charCodesDiff = challenger[0].charCodeAt(0) - opponent[0].charCodeAt(0);


let totalScore1 = 0;
let totalScore2 = 0;

readline
    .createInterface({
        input: fs.createReadStream(path.resolve(__dirname, './puzzle-input.txt')),
    })
    .on('line', (line) => {
        let [a, b] = line.trim().split(choicesSeparator);

        const newChoice = predictedChoice(a, b);

        if (a && b) {
            totalScore1 += clashPoints(a, b) + choicePoints(b);
            totalScore2 += clashPoints(a, newChoice) + choicePoints(newChoice);
        }
    })
    .on('close', () => {
        console.log(`The 1st strategy score is ${totalScore1}`);
        console.log(`The 2nd strategy score is ${totalScore2}`);
    });



const clashPoints = (opponentChoice, choice) =>
    [ 1, 2, 0].at(
        choice.charCodeAt(0) - (opponentChoice.charCodeAt(0) + charCodesDiff)
    )*3;

const choicePoints = (choice) => choice.charCodeAt(0) - challenger[0].charCodeAt(0) + 1;

const predictedChoice = (opponentChoice, choice) => {

    const move = [-1, 0, 1].at(challenger.indexOf(choice));
    const position = opponent.indexOf(opponentChoice);

    return challenger.at((position + move)%challenger.length);
};
