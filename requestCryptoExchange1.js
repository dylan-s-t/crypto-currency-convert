// necessary import modules
const request = require('request');

// exported function that takes input of country information object and requests currency 
// rate rate as compared to USD
module.exports.getCryptoExchange1 = (code1) => {

    // define new promise that either that returns either resolve (good data received) or reject (some sort of error)
    // to function
    return new Promise((resolve,reject) => {
        // send request to url (request takes to params: 1) url object and 2) callback function based on response)
        request({
            url:`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=${code1}&api_key=68a6dbfc109f2912b22d67b9afba2b17f461576a8620195edaf09a8878ee1eee`,
            
            //bad url for testing:
            //url:`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=${code1}&api_key=68a6dbfc109f2912b22d67b9afba2b17f461576a8620195edaf09a8878ee1eee`,
            json: true
        }
        , (error, response, body) => {
    
            // logic to handle data depending on if it was successful or not
            if (error) {
                reject("cannot connect to the API"); // reject promise with error info
            } else if (body.Response == "Error") {
                reject(`${body.Response} - ${body.Message}`); // reject promise with incorrect data message
            } else {
                let exchangeInfo1 = body;
    
                resolve(exchangeInfo1); // return data if successful
            }
    })
    }); // end request
} // end getCryptoExchange1 function









