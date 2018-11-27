var exports = module.exports = {};

const Logger = require("../logger")
const Result = require("../result").Result
const CommandI = require("./commandI").CommandI;

const File = require("../file").File;
const Database = require("../database").Database;

class ReadFile extends CommandI {

	constructor(){
		super();

		this.options = [
			[global.commandOptions.filePath, false],
			[global.commandOptions.fileName, true],
		];
	}

	async _execute(filePath, fileName, resource){
		const fullFilePath = `${filePath}/${fileName}`.replace(/\.\.\/|\.\.\\/g, "");
		const readFileExtension = /(?:\.([^.]+))?$/.exec(fileName)[1];
		const fileResult = await File.readWebFile(fullFilePath);
		if(fileResult.success) {
			switch (readFileExtension) {
				case "js":
					resource.writeHead(200, {'Content-Type': 'text/javascript'});
					break;
				case "css":
					resource.writeHead(200, {'Content-Type': 'text/css'});
					break;
				case "html":
					resource.writeHead(200, {'Content-Type': 'text/html'});
					break;
				case "ico":
					readFilePath = readFilePath.slice(0, -3) + "png";
					readFileExtension = "png";
				case "png":
					resource.writeHead(200, {'Content-Type': 'image/png'});
					break;
				default:
					resource.writeHead(200, {'Content-Type': 'text/plain'});
					break;
			}

			resource.write(fileResult.data);
		}

		return fileResult;
	}

	async execute(query, resource){
		const optionResult = this._separateOptions(query);
		if(!optionResult.success) return optionResult;
		let [filePath, fileName] = optionResult.data;
		if(filePath === undefined) filePath = "";
		if(fileName === undefined) fileName = "index.html";

		Logger.log("ReadFile", "File requested");
		const fileResult = await this._execute(filePath, fileName, resource);
		if(!fileResult.success) {
			Logger.warn("ReadFile", `Requested file ${filePath}/${fileName} not found`);
			return new Result(
				false,
				{},
				"The file could not be read.",
				"The file could not be read."
			);
		}

		Logger.log("ReadFile", "File read")
		return;
	}
}

exports.Command = ReadFile;
