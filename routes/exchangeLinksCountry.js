const express = require('express');
const router = express.Router();

// get url and send view
router.post('/home/countrySearch', (req, res) => {
    let country = req.body.countryName;
    res.render('exchangeLinksCountry.hbs', {
        country: country,
        showHeader: true,
        showFooter: true,
        showNavBar: true
    });
}) 

// export router for use by app
module.exports = router;