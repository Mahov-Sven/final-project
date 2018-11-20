var exports = module.exports = {};

const Logger = require("../logger")
const Result = require("../result").Result
const CommandI = require("./commandI").CommandI;

const File = require("../file");

class Website extends CommandI {

	constructor(){
		super();

		this.options = {};
	}

	async _execute(resource){
		const fileResult = await File.readWebFile("html/index.html");
		if(fileResult.success) {
			resource.writeHead(200, {'Content-Type': 'text/html'});
			resource.write(fileResult.data);
		}

		return fileResult;
	}


	async execute(query, resource){
		Logger.log("Website", "Page requested");
		const fileResult = this._execute(resource);
		if(!fileResult.success) {
			Logger.err("Website", "Page not found");
			return new Result(
				false,
				{},
				"The website could not be loaded.",
				"The website html index file could not be read."
			);
		}

		Logger.log("Website", "Page loaded")
		return;
	}
}

exports.Command = Website;
