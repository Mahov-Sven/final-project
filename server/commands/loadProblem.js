var exports = module.exports = {};

const Logger = require("../logger")
const Result = require("../result").Result
const CommandI = require("./commandI").CommandI;

const Database = require("../database").Database;

class LoadProblem extends CommandI {

	constructor(){
		super();

		this.options = [
			[global.commandOptions.name, true],
		];
	}

	async _execute(name, jsonString){
		const database = new Database();
		const queryResult = await database.query(name);
		return queryResult;
	}

	async execute(query, resource){
		const optionResult = this._separateOptions(query);
		if(!optionResult.success) return optionResult;
		let [name] = optionResult.data;

		Logger.log("LoadProblem", "Finding possible problem files");
		const commandResult = await this._execute(name);
		if(!commandResult.success) {
			Logger.warn("LoadProblem", `No matches for a problem file of name "${name}" could be found`);
			return new Result(
				false,
				{},
				"The problem could not be found",
				"No matching or revelent problems could be found."
			);
		}

		Logger.log("LoadProblem", "Problem file(s) found");
		return commandResult;
	}
}

exports.Command = LoadProblem;
