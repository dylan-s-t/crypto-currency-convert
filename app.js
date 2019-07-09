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
const homePageRoute = require('./routes/home');
const exchangeLinksCountry = require('./routes/exchangeLinksCountry');
const exchangeLinksCode = require('./routes/exchangeLinksCode');
const exchange1Country = require('./routes/exchange1Country');
const exchange2Country = require('./routes/exchange2Country');
const exchange1Code = require('./routes/exchange1Code');
const exchange2Code = require('./routes/exchange2Code');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// register helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('getCurrentTime', () => {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time;
})

// display some information on the home page to get the user started
app.get('/home', homePageRoute);

//depending on views, perform different gets
app.post('/home/countrySearch', exchangeLinksCountry);
app.get('/home/countrySearch/:countryName/exchange1', exchange1Country);
app.get('/home/countrySearch/:countryName/exchange2', exchange2Country);

app.post('/home/codeSearch', exchangeLinksCode);
app.get('/home/codeSearch/:code/exchange1', exchange1Code);
app.get('/home/codeSearch/:code/exchange2', exchange2Code);



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

// set port to be hosted on heroku/github
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));