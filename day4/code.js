const fs = require('fs');
const readline = require('readline');
const path = require('path');


let totalIncludedPairs = 0;

readline
    .createInterface({
        input: fs.createReadStream(path.resolve(__dirname, './puzzle-input.txt')),
    })
    .on('line', (assignment) => {

        const [range1, range2] = assignment.split(',')
            .map(range => range.split('-').map(section => parseInt(section)));


        totalIncludedPairs += (isRangeIncluded(range1, range2) || isRangeIncluded(range2, range1));

    })
    .on('close', () => {
        console.log(`The total assignments with one range fully containing the other is ${totalIncludedPairs}`);
    });



const isRangeIncluded = (haystack, needle) => needle[0] >= haystack[0] && needle[1] <= haystack[1];
