/************************************************************************************

BCIT COMP 2912
ASSIGNMENT 4

author: DYLAN TRERISE
date: 03-JUL-2019

Country data from REST countries (https://restcountries.eu)
Crypto Exchange Rate data from Nomics and CryptoCompare (see links in DisplayLinks.hbs)

*************************************************************************************/


// import necessary modules
const express = require('express');
const app = express(); // creates express application that allows you to use the methods in express?
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
const exchangelinks = require('./routes/exchangelinks');
const exchange1route = require('./routes/exchange1');
const exchange2route = require('./routes/exchange2');


// register helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('getCurrentTime', () => {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time;
})

//depending on views, perform different gets
app.get('/country/:countryName/', exchangelinks);

app.get('/country/:countryName/exchange1', exchange1route);

app.get('/country/:countryName/exchange2', exchange2route);

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

// set port for web page to be locally hosted on  - remove for actual hosting 

/*
app.listen(8080, () => {
    console.log("server is running!"); // is called when connects
});
**/
