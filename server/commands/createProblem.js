var exports = module.exports = {};

const Logger = require("../logger")
const Result = require("../result").Result
const CommandI = require("./commandI").CommandI;

const Database = require("../database").Database;

class CreateProblem extends CommandI {

	constructor(){
		super();

		this.options = [
			[global.commandOptions.fileName, true],
			[global.commandOptions.jsonString , true],
		];
	}

	async _execute(fileName, jsonString){
		const database = new Database();
		const fileResult = await database.add(fileName, jsonString);
		return fileResult
	}

	async execute(query, resource){
		const optionResult = this._separateOptions(query);
		if(!optionResult.success) return optionResult;
		let [fileName, jsonString] = optionResult.data;

		Logger.log("CreateProblem", "Problem Json file being created");
		const fileResult = await this._execute(fileName, jsonString);
		if(!fileResult.success) {
			Logger.warn("CreateProblem", `Problem file of name "${fileName}" was not able to be created`);
			return new Result(
				false,
				{},
				"The problem could not be created.",
				"An error occured in the creation of the problem file."
			);
		}

		Logger.log("CreateProblem", "Problem file created")
		return;
	}
}

exports.Command = CreateProblem;
