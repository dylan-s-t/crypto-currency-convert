/************************************************************************************

BCIT COMP 2912
ASSIGNMENT 4

author: DYLAN TRERISE
date: 03-JUL-2019

Dependancies: requestCountryData.js, requestExchangeData.js, express, request

Country data from REST countries (https://restcountries.eu)
Currency exchange data from Exchange rates API (https://exchangeratesapi.io/)

*************************************************************************************/


// import necessary modules
const express = require('express');
const app = express(); // creates express application that allows you to use the methods in express?
const requestCountryData = require('./requestCountryData.js');
const requestCryptoExchange1 = require('./requestCryptoExchange1.js');
const requestCryptoExchange2 = require('./requestCryptoExchange2.js');

// declare variables to store data
var countryName;
var countryInfo;
var exchangeResult1;
var exchangeResult2;

// get route params from url that user will write in, eg /country/canada using
// function from requestCountryData.js
app.get('/country/:countryName', (req, res) => {
    countryName = req.params.countryName;

    // get info about country from REST Countries
    requestCountryData.getCountryInfo(countryName)

    // if data received from first promise
    .then((data) => {

        console.log("data received from getCountryInfo"); // log to terminal that result received
        countryInfo = data; // store country data in countryInfo

        // send second request to get currency exchange info for that country compared to USD using 
        // Exchange rates API using function from requestExchangeData.js
        return requestCryptoExchange1.getCryptoExchange1(data)

    // if data received from second promise
    }).then((result1) => {

        console.log("data received from getCryptoExchange1") // log to terminal that result received
        exchangeResult1 = result1; // store currency data in currencyInfo

        // create simplified variables to access countryInfo object
        //let name = countryInfo.name;
        //let code = countryInfo.code;

        console.log(exchangeResult1);

        // display different info on webpage depending on whether currencyInfo is received for that
        // country or not (no exchange data available for that country's currency code)
        /*
        if(exchangeResult1) {
            exchangeResult1 = JSON.stringify(exchangeResult1);
            res.send (
                //`<h2>Currency of ${name} is ${code} and 1 USD = ${currencyInfo.toFixed(2)} ${code}</h2>`
                `${exchangeResult1}`
                )
        } else {
            throw new Error("no data?");
        }
        */
       //return requestCryptoExchange2.getCryptoExchange2(countryInfo);
    }) /*.then((result2) => {
        console.log("data received from getCryptoExchange2")
        exchangeResult2 = result2;
        console.log(exchangeResult2);

    }) **/

    // display error if promise not resolved
    .catch((error) => {
        console.log(error);
        res.send(`Error: ${error}`);
    })
});

// display some information on the home page to get the user started
app.get('/home', function (req, res) {
    res.send(
        '<h2>Currency conversion display - go to /country/{your country name} to display data</h2>'
    )
});

// redirect all urls entered that are not /country/{country name} to /home
app.get('/*', function (req, res) {
    res.redirect('/home')
});

// set port for web page to be locally hosted on 
app.listen(8080, () => {
    console.log("server is running!"); // is called when connects
});

