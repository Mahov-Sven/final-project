var exports = module.exports = {};

const Timer = require("./timer").Timer
const Logger = require("./logger")
const Result = require("./result").Result
const DatabaseError = require("./databaseError").DatabaseError
const File = require("./file").File

class Database {

	constructor(){}

	async _add(problemName, jsonString){
		return new Promise((resolve, reject) => {
			const fullFilePath = File.removePathEscapes(`server/database/${problemName}.json`);
			const fileResult = File.writeFile(fullFilePath, jsonString, problemName)
			if(fileResult.success) resolve(fileResult);
			else reject(fileResult);
		});
	}

	async add(problemName, jsonString){
		Logger.log("Database", `Trying to add a new problem named "${problemName}" to the database`);
		const result = await this._add(problemName, jsonString);
		if(result.success) Logger.log("Database", `Successfully added a new problem named ${problemName} to the database`);
		return result;
	}

	async _query(query){
		// top 10
		return new Promise((resolve, reject) => {
			//reject(new PromiseError(error));
			resolve(new Result(true));
		});
	}

	async query(query){
		Logger.log("Database", `Trying to find an object(s) in the database`);
		const result = await this._query(query);
		if(result.success) Logger.log("Database", `Successfully found the object(s) in the database`);
		else Logger.log("Database", `Could not find the object(s) in the database`);
		return result;
	}

	async find(query){
		Logger.log("Database", `Trying to find an object in the database`);
		const result = await this._query(query);
		if(result.data.length > 1){
			Logger.warn("Database", `Query returned more than one object in the database`)
			result.success = false
		}
		if(result.success){
			Logger.log("Database", `Successfully found the object in the database`);
			result.data = result.data[0];
		}
		else Logger.log("Database", `Could not find the object in the database`);
		return result;
	}

	async _clear(){
		return new Promise((resolve, reject) => {
			File.clearDirectory("server/database", [".placeholder"]);
			resolve(new Result(true));
		});
	}

	async clear(){
		Logger.warn("Database", `Trying to clear the database`);
		const result = await this._clear();
		if(result.success) Logger.warn("Database", `Successfully cleared the database`);
		return new Result(result.success);
	}
}

exports.Database = Database;
