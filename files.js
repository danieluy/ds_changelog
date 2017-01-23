const fs = require('fs');
const path = require('path');

const importFile = (route, file) => {
    let json = {};
    let v = undefined;
    fs.readFileSync(path.join(route, file), 'UTF-8')
        .split('\n')
        // .map(line => line.trim())
        .forEach(line => {
            if (line !== '') {
                if (line.match(/v\d+\.\d+\.\d+/)) {
                    v = line;
                    json[line] = [];
                }
                else {
                    let data = line.split('|')
                    json[v].push({ date: data[0].trim(), type: data[1].trim(), message: data[2].trim() })
                }
            }
        });
    return json;
}
// console.log(JSON.stringify(importFile(__dirname, 'changelog.txt'), null, 2))


const exportFile = (route, file, data) => {
    let output = '';
    for (var key in data) {
        output += `${key}\n`;
        data[key].forEach((line) => {
            output += `\t${line.date} | ${line.type} | ${line.message}\n`;
        })
    }
    fs.writeFileSync(path.join(route, file), output, 'UTF-8');
}
// exportFile(__dirname, 'changelog.txt', importFile(__dirname, 'changelog.txt'))

module.exports = {
    importFile: importFile,
    exportFile: exportFile
}