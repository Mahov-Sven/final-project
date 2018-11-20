var exports = module.exports = {};

const Timer = require("./timer").Timer
const Logger = require("./logger")
const Result = require("./result").Result
const DatabaseError = require("./databaseError").DatabaseError
const File = require("./file").File

class Database {

	constructor(){
		// TODO
	}

	async _open(){
		return new Promise((resolve, reject) => {
			// Connect to DB
			//reject(new PromiseError(error));
			resolve(new Result(true));
		});
	}

	async open(){
		Logger.log("Database", "Trying to connected to client");
		const result = await this._open();
		if(result.success) Logger.log("Database", "Successfully connected to client");
	}

	async _add(objArr){
		return new Promise((resolve, reject) => {
			//reject(new PromiseError(error));
			resolve(new Result(true));
		});
	}

	async add(input){
		const objArr = Array.isArray(input) ? input : [input];
		Logger.log("Database", `Trying to add ${objArr.length} object(s) into the database`);
		const result = await this._add(objArr);
		if(result.success) Logger.log("Database", `Successfully added ${objArr.length} object(s) into the database`);
		return result;
	}

	async _update(query, object){
		return new Promise((resolve, reject) => {
			//reject(new PromiseError(error));
			resolve(new Result(true));
		});
	}

	async update(query, object){
		Logger.log("Database", `Trying to update an object in the database`);
		const result = await this._update(query, objects);
		if(result.success) Logger.log("Database", `Successfully updated the object in the database`);
		else Logger.warn("Database", `Could not find the object in the database`);
		return result;
	}

	async _remove(query){
		return new Promise((resolve, reject) => {
			//reject(new PromiseError(error));
			resolve(new Result(true));
		});
	}

	async remove(query){
		if(query === undefined) return new Result(false);
		Logger.log("Database", `Trying to remove an object(s) from the database`);
		const result = await this._remove(query);
		if(result.success) Logger.log("Database", `Successfully removed an object(s) from the database`);
		return result;
	}

	async _query(query){
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
			//reject(new PromiseError(error));
			resolve(new Result(true));
		});
	}

	async clear(){
		Logger.warn("Database", `Trying to clear the database`);
		const result = await this._clear();
		if(result.success) Logger.warn("Database", `Successfully cleared the database`);
		return new Result(result.success);
	}

	async close(){
		Logger.log("Database", `Trying to close the database`);
		// TODO: close dB
		Logger.log("Database", `Successfully closed the database`);
	}
}

exports.Database = Database;
