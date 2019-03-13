/* jshint node: true, devel: true */
'use strict';

const config  = require('config');
const fs      = require('fs-extra');
const dm      = require('./deep-merge');

const JSON_SOURCE = (process.env.JSON_SOURCE) ?
	(process.env.JSON_SOURCE) :
    config.get('json_source');

const MAP_FILE = (process.env.MAP_FILE) ?
	(process.env.MAP_FILE) :
    config.get('map_file');
    
const NEW_FILE = (process.env.NEW_FILE) ?
	(process.env.NEW_FILE) :
    config.get('new_file');

const JSON_MAP = require(MAP_FILE);

const processJson = async (req, res) => {
    try {
        // assigned for readability
        const sourceObj  = await fs.readJson(JSON_SOURCE);
        const mappedObj  = await dm.mapJson(JSON_MAP, sourceObj);
        const writtenObj = await fs.writeFile(NEW_FILE, JSON.stringify(mappedObj));

        console.log('Completed writing JSON File: ', NEW_FILE);
        res.status(200).send({message: "success - JSON completed"});

    } catch (err) {
        console.error(err);
        res.status(500).send({error: "error - JSON"});
    }
};

const API = {
    processJson
};

module.exports = API;
