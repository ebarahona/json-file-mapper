/* jshint node: true, devel: true */
'use strict';

const recursiveMapper = (base_data, post_data, result_obj) => {
	for(let key in base_data){
		if (!base_data[key] || (base_data[key].length ==0)) {
			result_obj[key] = null;
		} else if(typeof base_data[key] == 'object') {
			recursiveMapper(base_data[key],post_data, result_obj[key]= {});
		} else {
			let post_key = base_data[key].split('.');
			let len = post_key.length;
			let _post_data = post_data;
			for (var i=0; i<len; i++) {
				if (typeof _post_data == 'object' && _post_data !== null && _post_data.hasOwnProperty(post_key[i])) {
					 _post_data = _post_data[post_key[i]];
				} else {
					 _post_data = post_key[0] || null;
				}
		    }
			result_obj[key] =  _post_data;
		}
	}
	return result_obj;
};

const  mapJson = (jsonMap, sourceJson) => {
    let newData = [];
    return new Promise((resolve, reject) => {
        sourceJson.forEach(source => {
			newData.push(recursiveMapper(jsonMap, source, {}));
        });
        resolve(newData);
    });
};

const API = {
    mapJson
};

module.exports = API;
