var exports = module.exports = {};

class DatabaseError extends Error {

	constructor(...args){
		super(...args);
	}
}

exports.DatabaseError = DatabaseError;
