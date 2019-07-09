const express = require('express');
const router = express.Router();
//const requestCountryData = require('../requestCountryData.js');
const requestCryptoExchange1 = require('../requestCryptoExchange1');

// declare variables 
var currResult1;
//var countryInfo;

// get url and send view
router.get('/home/codeSearch/:code/exchange1', (req, res, next) => {
    code = req.params.code;
    requestCryptoExchange1.getCryptoExchange1(code)
    // if data recieved from first promise
    .then((result1) => {
        console.log("data received from exchange1")
        currResult1 = result1;
        res.render('exchangeDisplay.hbs', {
            code: code,
            siteName: "CryptoCompare",
            BTC: currResult1.BTC[code],
            ETH: currResult1.ETH[code],
            attLink:"https://www.cryptocompare.com/",
            showHeader: true,
            showFooter: true,
            showNavBar: true
        });
    })
    // catch method for all errors
    .catch((error) => {
        console.log(error);
        res.send(`Error: ${error}`);
    })
});

// export router for use by app
module.exports = router;