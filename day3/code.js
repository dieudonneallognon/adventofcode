const fs = require('fs');
const readline = require('readline');
const path = require('path');


let totalPriority = 0;

readline
    .createInterface({
        input: fs.createReadStream(path.resolve(__dirname, './puzzle-input.txt')),
    })
    .on('line', (rucksack) => {
        totalPriority += itemPriority(misplacedItem(rucksack));
    })
    .on('close', () => {
        console.log(`The total misplaced item priority is ${totalPriority}`);
    });

const misplacedItem = (ruckstack) => {
    const compartment1 = ruckstack.split('').slice(0, Math.ceil(ruckstack.length/2));
    const compartment2 = ruckstack.split('').slice(Math.ceil(ruckstack.length/2));

    const item = compartment1.find((item1) => compartment2.find((item2) => item2 === item1));

    return item;
};

    if (item === item.toLowerCase()) {
        priority += 1 + item.charCodeAt(0) - 'a'.charCodeAt(0);
    } else {
        priority += 27 + item.charCodeAt(0) - 'A'.charCodeAt(0);
    }
    return priority;
};

const itemPriority = (item) => ((item === item.toLowerCase())
    ? 1 + item.charCodeAt(0) - 'a'.charCodeAt(0)
    : 27 + item.charCodeAt(0) - 'A'.charCodeAt(0));
