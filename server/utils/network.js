'use strict';
let os = require('os');

module.exports = function (argument) {
	let interfaces = os.networkInterfaces();
	let addresses = [];
	for (let interfaceKey in interfaces) {
		for (let key in interfaces[interfaceKey]) {
			let address = interfaces[interfaceKey][key];
			if (address.family === 'IPv4' && !address.internal) {
				addresses.push(address.address);
			}
		}
	}
	return addresses;
};


