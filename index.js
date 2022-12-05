
// IMPORT PACKAGES HERE
const csv = require('csv-parser')
const fs = require('fs')
// DATASET link: https://www.kaggle.com/kimjihoo/coronavirusdataset?select=PatientInfo.csv
// import functions from functions.js
const {mergeLocation, mostConfirmedCase, averageRecoveryTime, stateTally} = require('./functions.js')
const arrRecords = []

fs.createReadStream('PatientInfo.csv')
  .pipe(csv())
  .on('data', (data) => arrRecords.push(data))
  .on('end', () => {
    mergeLocation(arrRecords)
    console.log(arrRecords)
    mostConfirmedCase(arrRecords)
    averageRecoveryTime(arrRecords)
    stateTally(arrRecords)
  });

