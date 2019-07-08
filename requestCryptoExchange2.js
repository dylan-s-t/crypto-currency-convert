// necessary import modules
const request = require('request');

// exported function that takes input of country information object and requests currency 
// rate rate as compared to USD
module.exports.getCryptoExchange2 = (code2) => {

    // define new promise that either that returns either resolve (good data received) or reject (some sort of error)
    // to function
    return new Promise((resolve,reject) => {

        // send request to url (request takes to params: 1) url object and 2) callback function based on response)
        request({
            url:`https://api.nomics.com/v1/currencies/ticker?key=edcc157980ec04c836330b6bd9febe4b&ids=BTC,ETH&interval=1d,30d&convert=${code2}`,
            // bad url for testing:
            //url:`https://api.nomics.com/v1/currencies/ticker?key=edcc157980ec04c836330b6bd9febe4b&ids=BH&interval=1d,30d&convert=${code2}`,
            json: true
        }
        , (error, response, body) => {
    
            // logic to handle data depending on if it was successful or not
            if (error) {
                reject("cannot connect to the API"); // reject promise with error info
            } else if (!body[0]) {
                reject(`${body.Response} - invalid url entered`); // reject promise with incorrect data message
            } else {
                let exchangeInfo2 = body;
    
                resolve(exchangeInfo2); // return data if successful
            }
    })
    }); // end request
} // end getCryptoExchange2 function









