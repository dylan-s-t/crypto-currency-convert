const express = require('express');
const router = express.Router();
const requestCountryData = require('../requestCountryData.js');
const requestCryptoExchange2 = require('../requestCryptoExchange2');

// declare variables 
var currResult2;
var countryInfo;

// get url and send view
router.get('/home/countrySearch/:countryName/exchange2', (req, res, next) => {
    countryName = req.params.countryName;
    console.log("getting link 2 data")

    // get info about country from REST Countries
    requestCountryData.getCountryInfo(countryName)

    // if data received from first promise
    .then((data) => {

        console.log("data received from getCountryInfo"); // log to terminal that result received
        countryInfo = data; // store country data in countryInfo
        currCode = countryInfo.code;
        return requestCryptoExchange2.getCryptoExchange2(currCode);

    // if data recieved from second promise
    }).then((result2) => {
        console.log("data received from exchange2")
        currResult2 = result2;
        res.render('exchangeDisplay.hbs', {
            code: countryInfo.code,
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
})

// export router for use by app
module.exports = router;
