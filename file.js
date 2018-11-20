var exports = module.exports = {};

const FileSystem = require("fs");
const Path = require("path")

const Logger = require("./logger");
const Result = require("./result").Result;

exports.readWebFile = function(fileName){
	const fullFilePath = Path.join(__dirname, "website", fileName);
	return _readFile(fullFilePath);
}

exports.readFile = function(fileName){
	const fullFilePath = Path.join(__dirname, fileName);
	return _readFile(fullFilePath);
}

function _readFile(fullFilePath){
	Logger.log("File", `Reading file ${fullFilePath}`);
	try {
		const data = FileSystem.readFileSync(fullFilePath);
		return new Result(true, data);
	} catch (e) {
		return new Result(false, {error: e});
	}
}
