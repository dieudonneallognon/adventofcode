const fs = require('fs');
const readline = require('readline');
const path = require('path');


let totalPriority = 0;

let groupRucksacks = [];

let totalBadgePriorities = 0;

readline
    .createInterface({
        input: fs.createReadStream(path.resolve(__dirname, './puzzle-input.txt')),
    })
    .on('line', (rucksack) => {
        totalPriority += itemPriority(misplacedItem(rucksack));

        groupRucksacks.push(rucksack);

        if (groupRucksacks.length === 3) {

            totalBadgePriorities+= itemPriority(groupBadgeItem(groupRucksacks));

            groupRucksacks = [];
        }
    })
    .on('close', () => {
        console.log(`The total misplaced item priority is ${totalPriority}`);
        console.log(`The total badge item priority is ${totalBadgePriorities}`);
    });

const misplacedItem = (ruckstack) => {
    const compartment1 = ruckstack.split('').slice(0, Math.ceil(ruckstack.length/2));
    const compartment2 = ruckstack.split('').slice(Math.ceil(ruckstack.length/2));

    const item = compartment1.find((item1) => compartment2.find((item2) => item2 === item1));

    return item;
};

const groupBadgeItem = (groupRucksacks) => {
    const [r1, ...rr] = groupRucksacks.map(r => r.split(''));

    return rr.reduce((rp, rc) => (rp.filter(item => rc.includes(item))), [...new Set(r1)]).pop();
};

const itemPriority = (item) => ((item === item.toLowerCase())
    ? 1 + item.charCodeAt(0) - 'a'.charCodeAt(0)
    : 27 + item.charCodeAt(0) - 'A'.charCodeAt(0));
