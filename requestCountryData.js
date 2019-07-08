// necessary import modules
const request = require('request');

// declare variable to store data
var countryInfo;

// exported function that takes input of city name and requests information about that city from an API
module.exports.getCountryInfo = (country) => {

    // define new promise that either that returns either resolve (good data received) or reject (some sort of error)
    // to function
    return new Promise((resolve,reject) => {

        // send request to url (request takes to params: 1) url object and 2) callback function based on response)
        request({
            url: `https://restcountries.eu/rest/v2/name/${country}`,
            json: true
        }
        , (error, response, body) => {
    
            // logic to handle data depending on if it was successful or not
            if (error) { 
                reject("cannot connect to the API"); // reject promise with error info
            } else if (body.status == 404) {  
                reject(`${body.message} - invalid country entered`); // reject promise with incorrect data message
            } else {
                countryInfo = {
                    name: body[0].name,
                    code: body[0].currencies[0].code,
                    symbol: body[0].currencies[0].symbol
                }
                
                resolve(countryInfo); // return data if successful
            }
    })
    }); // end request
} // end cityInput function









