/* jshint node: true, devel: true */
'use strict';

const router    = require('express').Router();
const processor = require('./processor');

router.get('/health_check',  (req, res) => {
    res.status(200).send({message: "application running"});
});

router.get('/process', processor.processJson);

module.exports = router;