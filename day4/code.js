const fs = require('fs');
const readline = require('readline');
const path = require('path');


let totalIncludedPairs = 0;
let totalOverlappedPairs = 0;

readline
    .createInterface({
        input: fs.createReadStream(path.resolve(__dirname, './puzzle-input.txt')),
    })
    .on('line', (assignment) => {

        const [range1, range2] = assignment.split(',')
            .map(range => range.split('-').map(section => parseInt(section)));

        if (isRangeIncluded(range1, range2) || isRangeIncluded(range2, range1)) {
            totalIncludedPairs ++;
            totalOverlappedPairs++;
        } else {
            totalOverlappedPairs += (isRangeOverlapped(range1, range2)|| isRangeOverlapped(range2, range1)) ? 1 : 0;
        }

    })
    .on('close', () => {
        console.log(`The total assignments with one range fully containing the other is ${totalIncludedPairs}`);
        console.log(`The total assignments with one range overlapping the other is ${totalOverlappedPairs}`);
    });



const isRangeIncluded = (haystack, needle) => needle[0] >= haystack[0] && needle[1] <= haystack[1];
const isRangeOverlapped = (haystack, needle) => needle.find((section) => section >= haystack[0] && section <= haystack[1]);
