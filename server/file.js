var exports = module.exports = {};

const FileSystem = require("fs");
const Path = require("path")

const Logger = require("./logger");
const Result = require("./result").Result;

const rootDir = Path.join(__dirname, "..");

class File {

	constructor(){}

	static _readFile(fullFilePath, errPartialFileName=""){
		Logger.log("File", `Reading file "${fullFilePath}"`);
		try {
			const data = FileSystem.readFileSync(fullFilePath);
			return new Result(true, data);
		} catch (e) {
			switch(e.code){
				case "ENOENT": return new Result(false, {}, "File not found.", `The file "${errPartialFileName}" was not found.`);
				default: return new Result(false, {}, "Unknown File Error", `An unknown File IO Error occured.`);
			}
		}
	}

	static readWebFile(fileName){
		const fullFilePath = Path.join(rootDir, "website", fileName);
		return _readFile(fullFilePath, fileName);
	}

	static readFile(fileName){
		const fullFilePath = Path.join(rootDir, fileName);
		return _readFile(fullFilePath, fileName);
	}
}

exports.File = File;
