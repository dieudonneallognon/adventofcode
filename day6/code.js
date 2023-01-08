const fs = require('fs');
const path = require('path');


const [a, b, c, d, ...rest] = fs.readFileSync(
    path.resolve(__dirname, './puzzle-input.txt'),
    { encoding: 'utf-8', flag: 'r' }
).split('');


const packetStartChars = [a, b, c, d];
const dummyChars = [];

while (!packetStartChars.every((c, i, self) => (self.filter(e => e === c).length === 1))) {
    dummyChars.push(packetStartChars.shift());
    packetStartChars.push(rest.shift());
}

console.log(
    'The number of characters to be processed before the first ' +
    'start-of-message marker is detected is '+
    (packetStartChars.length + dummyChars.length)
);
