/* jshint node: true, devel: true */
'use strict';

const config  = require('config');
const express = require('express');
const routes  = require('./routes');
const app     = express();

const PORT = (process.env.PORT) ?
	(process.env.PORT) :
    config.get('port');

app.all('*', routes);

const server = app.listen(PORT, () => {
    console.log("JSON Mapper running on port: ", PORT);
});

