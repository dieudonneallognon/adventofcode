
const fs = require('fs');
const readline = require('readline');
const path = require('path');

var calories = [];

readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, './puzzle-input.txt'))
}).on('line', (line) => {
    line.trim().length == 0
    ? calories.push(0)
    : calories.push((calories.pop() || 0 ) + parseInt(line, 10));
}).on('close', () => {
    console.log(`The most carried calories by an Elf is: ${calories.sort((a, b) => a - b).pop()}`);
});
