# json-file-mapper
I needed to modify a data set for GeoSpatial DB so I made this small NodeJS app to create a new JSON file from existing JSON.  It uses a map file to map new property names and recursion for deep nesting.

## Configuration
Set the JSON source, JSON map and new file name in config/default.json

The app will take the source file and create a new JSON file based on the map file, the map file uses dot notation strings to get the value from the source file.

Config params can also be set via environment variables: PORT, JSON_SOURCE, MAP_FILE, NEW_FILE

### Example
Source file:

    [
        {
	    "datasetid": "us-zip-code-latitude-and-longitude", 
        "recordid": "7a01d53d577937547e9732307148f756d9ce1098",
        "fields": {
            "city": "Sacramento", 
            "zip": "94253", 
            "dst": 1, 
            "geopoint": [38.377411, -121.444429], 
            "longitude": -121.444429, 
            "state": "CA", 
            "latitude": 38.377411, 
            "timezone": -8
        },
        "geometry": {
            "type": "Point", 
            "coordinates": [-121.444429, 38.377411]
        },
        "record_timestamp": "2018-02-09T08:33:38-08:00"
        }
    ]

Map file:

    {
        "city": "fields.city",
        "zip": "fields.zip",
        "dst": "fields.dst",
        "latitude": "fields.latitude",
        "longitude": "fields.longitude",
        "state": "fields.state",
        "timezone": "fields.timezone",
        "country": "US"
    }

Output file:

    [{
        "city": "Sacramento",
        "zip": "94253",
        "dst": 1,
        "latitude": 38.377411,
        "longitude": -121.444429,
        "state": "CA",
        "timezone": -8,
        "country": "US"
    }]


If the property does not exist in the source file, but listed in the map file then it is added with the static value, if there is no value then "null" is used (static objects can be added this way as well): `"country": "US"`


### Install
    git clone https://github.com/ebarahona/json-file-mapper.git 
    cd json-file-mapper && npm install
    npm start

### Test/Process
localhost:3000/process

### TODO/Nice to have
Add UI upload to set source file, download output file

Modify GET endpoint to accept configuration paramaters

Add CLI prompts to set configuration parameters
