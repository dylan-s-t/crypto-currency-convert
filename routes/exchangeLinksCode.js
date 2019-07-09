const express = require('express');
const router = express.Router();

// get url and send view
router.post('/home/codeSearch', (req, res) => {
    let code = req.body.currCode;
    res.render('exchangeLinksCode.hbs', {
        code: code,
        showHeader: true,
        showFooter: true,
        showNavBar: true
    });
}) 

// export router for use by app
module.exports = router;