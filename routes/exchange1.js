const express = require('express');
const router = express.Router();
const requestCountryData = require('../requestCountryData.js');
const requestCryptoExchange1 = require('../requestCryptoExchange1');

// declare variables 
var currResult1;
var countryInfo;

// get url and send view
router.get('/home/country/:countryName/exchange1', (req, res, next) => {
    countryName = req.params.countryName;
    console.log("getting link 1 data")

    // get info about country from REST Countries
    requestCountryData.getCountryInfo(countryName)

    // if data received from first promise
    .then((data) => {
        console.log("data received from getCountryInfo"); // log to terminal that result received
        countryInfo = data; // store country data in countryInfo
        currCode = countryInfo.code;
        
        // create second promise for exchange data
        return requestCryptoExchange1.getCryptoExchange1(currCode);
    // if data recieved from second promise
    }).then((result1) => {
        console.log("data received from exchange1")
        currResult1 = result1;
        res.render('exchangeDisplay.hbs', {
            code: countryInfo.code,
            siteName: "CryptoCompare",
            BTC: currResult1.BTC[countryInfo.code],
            ETH: currResult1.ETH[countryInfo.code],
            attLink:"https://www.cryptocompare.com/",
            showHeader: true,
            showFooter: true
        });
    })
    // catch method for all errors
    .catch((error) => {
        console.log(error);
        res.send(`Error: ${error}`);
    })
})

// export router for use by app
module.exports = router;