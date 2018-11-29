var exports = module.exports = {};

const Logger = require("../logger")
const Result = require("../result").Result
const CommandI = require("./commandI").CommandI;

const Database = require("../database").Database;

class CreateProblem extends CommandI {

	constructor(){
		super();

		this.options = [
			[global.commandOptions.name, true],
			[global.commandOptions.dataString , true],
		];
	}

	async _execute(name, dataString){
		const database = new Database();
		const fileResult = await database.add(name, dataString);
		return fileResult
	}

	async execute(query, resource){
		const optionResult = this._separateOptions(query);
		if(!optionResult.success) return optionResult;
		let [name, dataString] = optionResult.data;

		Logger.log("CreateProblem", "Problem Json file being created");
		const fileResult = await this._execute(name, dataString);
		if(!fileResult.success) {
			Logger.warn("CreateProblem", `Problem file of name "${name}" was not able to be created`);
			return new Result(
				false,
				{},
				"The problem could not be created.",
				"An error occured in the creation of the problem file."
			);
		}

		Logger.log("CreateProblem", "Problem file created")
		return fileResult;
	}
}

exports.Command = CreateProblem;
