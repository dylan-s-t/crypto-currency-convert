const express = require('express');
const router = express.Router();
//const requestCountryData = require('../requestCountryData.js');
const requestCryptoExchange2 = require('../requestCryptoExchange2');

// declare variables 
var currResult2;
//var countryInfo;

// get url and send view
router.get('/home/codeSearch/:code/exchange2', (req, res, next) => {
    code = req.params.code;
    console.log("getting link 2 data")

    requestCryptoExchange2.getCryptoExchange2(code)

    // if data recieved from second promise
    .then((result2) => {
        console.log("data received from exchange2")
        currResult2 = result2;
        res.render('exchangeDisplay.hbs', {
            code: code,
            siteName: "Nomics",
            BTC: currResult2[0].price,
            ETH: currResult2[1].price,
            attLink: "https://nomics.com",
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
