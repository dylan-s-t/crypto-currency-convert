const express = require('express');
const router = express.Router();

// get url and send view
router.get('/country/:countryName', (req, res) => {
    let country = req.params.countryName;
    res.render('exchangelinks.hbs', {
        country: country,
        showHeader: true,
        showFooter: true
    });
}) 

// export router for use by app
module.exports = router;