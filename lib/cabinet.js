// Cabinet - Brainless Key/Value storage for MongoDB
// by Trey Griffith at Endorse.me
// see https://github.com/treygriffith/cabinet

// Built on top of Cellar (https://github.com/treygriffith/cellar).

// The keys used are not BSON ObjectIds, and as such the performance of this KV store is probably limited (for more reasons than this, it should be noted), especially if the randomly generated keys are being used.

var Cellar = require('cellar');

// Cabinet
// Initialize an Cabinet instance
// The arguments are identical to the arguments for Cellar, save the schema

// ### Arguments
// * `name` - String name of the mongoDB collection
// * `mongoose` - Object instance of Mongoose or Object literal of mongoDB credentials
// * `options` - Object of additional options
//		- Properties
//			* `maxAge` - Number of days that a document should remain in the store. -1 will not remove any documents. Defaults to 1.
//			* `verbose` - Determines whether a success message is logged when removing old documents

// ### Returns
// * Instance of Cabinet

function Cabinet(name, mongoose, options) {

	// the object literal of our schema, which has a String key, and a Mixed value
	var schema = {
		key:String,
		value:{}
	};

	// instantiate Cellar, which does most of the heavy-lifting
	// pass through the name, mongoose instance/ credentials, and options
	var cellar = new Cellar(name, mongoose, schema, options);

	// Cabinet#get

	// Public
	// Retrieve a value according to a key

	// ### Arguments
	// * `key` - String with which the desired value is associated
	// * `callback` - Function to be evaluated upon retrieval
	//		- Arguments
	//			1. Error
	//			2. Value retrieved or null if no document matched

	// ### Returns
	// * Instance of Cabinet

	this.get = function(key, callback) {
		cellar.retrieve_field({key:key}, 'value', callback);
		return this;
	};

	// Cabinet#set

	// Public
	// Store or update a value

	// ### Arguments
	// * `key` - Optional String that acts as a unique key for the value. If omitted, a random 16 character key will be generated.
	// * `value` - Mixed value to store
	// * `callback` - Function to be evaluated upon completion of the insert/update
	//		- Arguments
	//			1. Error
	//			2. Key - the key stored with the value

	// ### Returns
	// * Instance of Cabinet

	this.set = function(key, value, callback) {
		if(arguments.length < 3) {
			callback = value;
			value = key;
			key = null;
		}
		var data = {value:value};
		var where = key ? {key:key} : null;
		data.key = key || (Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)).slice(0,16);
		cellar.store(where, data, function(err, doc) {
			if(err || !doc) {
				callback(err);
				return;
			}
			callback(null, doc.key);
		});
		return this;
	};
	return this;
}

module.exports = Cabinet;