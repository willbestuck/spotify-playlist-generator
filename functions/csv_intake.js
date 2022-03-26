const csv = require('csv-parser')
const path = require('path');
const fs = require('fs')
const results = [];


module.exports = () => new Promise(function (resolve, reject) {
    fs.createReadStream(path.join(__dirname, '../artists.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(data['Artist']))
        .on('end', () => {
            resolve(results);
        });
})