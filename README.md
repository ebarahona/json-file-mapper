# json-file-mapper
Simple NodeJS app to create a new JSON file from an existing JSON file with new property names

## Configuration
Set the JSON source, JSON map and new file name in config/default.json

The app will take the source file and create a new JSON file based on the map file, the map file uses dot notation strings to get the value from the source file.

Configuration parameters can also be set via Node environment vairables: PORT, JSON_SOURCE, MAP_FILE, NEW_FILE

### Example
Source file:
`[
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
]`

map file:
`{
    "city": "fields.city",
    "zip": "fields.zip",
    "dst": "fields.dst",
    "latitude": "fields.latitude",
    "longitude": "fields.longitude",
    "state": "fields.state",
    "timezone": "fields.timezone",
    "country": "US" // This field does not exist in source so it will create this property and add the value "US" static can objects not in source also be added
}`

output file:
`[{
	"city": "Sacramento",
	"zip": "94253",
	"dst": 1,
	"latitude": 38.377411,
	"longitude": -121.444429,
	"state": "CA",
	"timezone": -8,
	"country": "US"
}]`


### Install
npm install

### Start
npm start

### Test/Process
localhost:3000/process

### TODO/Nice to have
Add UI upload to set source file, download output file

Modify GET endpoint to accept configuration paramaters

Add CLI prompts to set configuration parameters
