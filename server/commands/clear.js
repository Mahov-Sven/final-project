var exports = module.exports = {};

const Logger = require("../logger")
const Result = require("../result").Result
const CommandI = require("./commandI").CommandI;

const Database = require("../database").Database;

class Clear extends CommandI {

	constructor(){
		super();

		this.options = [];
	}

	async _execute(){
		const database = new Database();
		let clearResult = await database.clear();
		return clearResult;
	}

	async execute(query, resource){
		/*
		const optionResult = this._separateOptions(query);
		if(!optionResult.success) return optionResult;
		const [] = optionResult.data;
		*/

		Logger.warn("Clear", `Trying to clear the database of all problems`);

		let clearResult = await this._execute();
		if(clearResult.success) Logger.log("Clear", `The database has been cleared`);

		return new Result(
			true,
			{},
			`The database has been cleared`,
			`All problems in database have been removed`
		);
	}
}

exports.Command = Clear;
