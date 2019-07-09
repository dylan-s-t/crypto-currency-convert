const express = require('express');
const router = express.Router();

// get url and send view
router.get('/home', (req, res) => {
    res.render('home.hbs', {
        showHeader: true,
        showFooter: true
    });
}) 

// export router for use by app
module.exports = router;