var exports = module.exports = {};

class QueryError extends Error {

	constructor(...args){
		super(...args);
	}
}

exports.QueryError = QueryError;
