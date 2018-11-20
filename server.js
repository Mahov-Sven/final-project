const Http = require("http")
const Path = require("path")
const Url = require("url")

const Globals = require("./globals")
const File = require("./file")
const Logger = require("./logger")
const QueryError = require("./queryError").QueryError
const Database = require("./database").Database
const CommandI = require("./commands/commandI").CommandI;

async function handleCommand(commandQuery, resource){
	Logger.log("Server", "Starting to handle command");

	const commandArray = commandRegex.exec(commandQuery);
	if(commandArray == undefined || commandArray.length < 3) throw new QueryError();
	const commandName = commandArray[1];
	const commandPath = `./commands/${commandName}.js`
	const commandOptionObj = {};
	if(commandArray[3] !== undefined){
		commandArray[3].split('&').forEach((elem) => {
			const optionArray = elem.split('=');
			commandOptionObj[optionArray[0]] = optionArray[1];
		});
	}
	const commandOptions = CommandI.separateOptions(commandOptionObj);

	Logger.log("Server", `Trying to execute command ${commandName}`);
	let Command;
	try {
		Command = require(commandPath).Command;
	} catch (e) {
		throw new QueryError();
	}
	if(!commandOptions.success) return commandOptions;
	const commandResult = await (new Command()).execute(commandOptions.data, resource);
	if(commandResult && !commandResult.success) Logger.warn("Server", `Execution of command ${commandName} failed`);
	return commandResult;
}

process.on('unhandledRejection', (error) => {
	Logger.err("Server", error);
});

const httpServer = Http.createServer(handleHTTPRequest);

async function handleHTTPRequest(request, resource){
	Logger.log("Server", "Starting to handle HTTP request");
	resource.json = (obj) => { if(obj) resource.write(JSON.stringify(obj)) };
	const uri = decodeURI(request.url);
	Logger.log("Server", `Request input: "${uri}"`);

	try {
		const commandResult = await handleCommand(uri, resource);
		resource.json(commandResult);
	} catch(e) {
		if(!(e instanceof QueryError)) throw e;
		Logger.log("Server", `Command not found`);

		const readFileArray = /^((\/|\.\.\/|\.\/|)(([0-9a-zA-Z$\-_]+\/)+))(([0-9a-zA-Z$\-_.]+)(\.\w+))$/.exec(uri);
		console.log(readFileArray);
		const readFilePath = readFileArray[3];
		const readFileName = readFileArray[5];

		Logger.log("Server", `Trying to read file ${uri}`);
		const ReadFileCommand = require("./commands/readFile").Command;
		const readFileResult = await (new ReadFileCommand())._execute(readFilePath, readFileName, resource);
		if(!readFileResult.success) {
			Logger.warn("Server", `Requested file ${uri} not found`);
			resource.json(readFileResult);
		}
	}


	resource.end();
	Logger.log("Server", "Done handling HTTP request");
}
httpServer.listen(8080);
Logger.log("Server", "Running on Port 8080 ...");
