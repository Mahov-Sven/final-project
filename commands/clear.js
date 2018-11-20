var exports = module.exports = {};

const Logger = require("../logger")
const Result = require("../result").Result
const CommandI = require("./commandI").CommandI;

const Database = require("../database").Database;

class Clear extends CommandI {

	constructor(){
		super();

		this.options = [
			[global.commandOptions.developer, false],
		];
	}

	async _execute(databaseName){
		const database = new Database();
		await database.open();

		let clearResult = await database.clear();

		await database.close();
		return clearResult;
	}

	async execute(query){
		const optionResult = this._separateOptions(query);
		if(!optionResult.success) return optionResult;
		const [developer] = optionResult.data;
		const databaseName = developer ? databases.developer : databases.production;

		Logger.warn("Clear", `Trying to clear the database ${databaseName}`);

		let clearResult = this._execute(databaseName);
		if(clearResult.success) Logger.log("Clear", `The database ${databaseName} has been cleared`);

		return new Result(
			true,
			{},
			`The database ${databaseName} has been cleared`,
			`All entries in database ${databaseName} have been removed`
		);
	}
}

exports.Command = Clear;
