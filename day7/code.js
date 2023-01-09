const fs = require('fs');
const readline = require('readline');
const path = require('path');

const directories = [];

let currentDir = null;

readline
    .createInterface({
        input: fs.createReadStream(path.resolve(__dirname, './puzzle-input.txt')),
    })
    .on('line', (line) => {
        if (line.startsWith('$')) {

            if (line.startsWith('$ cd')) {
                const [$, cd, dirname] = line.split(' ');

                if (dirname !== '..') {
                    directories.push({
                        name: dirname,
                        contents: [],
                        size: undefined,
                        index: directories.length,
                        parent: currentDir?.index || 0
                    });
                }

                if (dirname === '..') {
                    currentDir = directories.at(currentDir.parent);
                }
            }

            if (line.startsWith('$ ls')) {
                currentDir = directories.at(-1);
            }
        }
        else {
            const [size, name] = line.split(' ');

            const type = isNaN(parseInt(size))
                ? 'dir'
                : 'file';

            currentDir.contents.push(
                {
                    ...{
                        name,
                        type,
                    },
                    ...(
                        type === 'file'
                            ? { size: parseInt(size) }
                            : {}
                    )
                });
        }
    })
    .on('close', () => {
        dirSize('/', 0);

        console.log(
            'The directories with a total size of at most 100000 total sizes sum is ' +
            directories
                .filter((dir) => (dir.size <= 100000))
                .reduce((sum, dir) => (sum += dir.size), 0)
        );
    });

const dirSize = (dirname, index) => {

    const directory = directories.find(dir => dir.name === dirname && dir.index === index);

    if (!directory?.size) {
        directory.size = directory
            ?.contents
            ?.reduce((size, content) => {
                if (content.type === 'file') {
                    size += content.size;
                }

                if (content.type === 'dir') {

                    const subdir = directories.find(dir => (dir.name === content.name && dir.parent === directory.index));

                    size += dirSize(subdir.name, subdir.index);
                }
                return size;
            }, 0) || 0;
    }

    return directory.size;
};
