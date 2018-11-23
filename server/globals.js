/* GLOBAL VARIABLES */
global.databases = {
	developer: "developer",
	production: "production",
};
/*
global.collections = {
	users: "users",
	tokens: "tokens",
}
*/
global.loggerTitleSize = 10;
global.loggerHeadingSize = 10;

// ===============================================
// 					  Commands
// ===============================================

global.commandRegex = /^\/(\w+)(\?(([^=]+=[^=]+&?)+)?)?$/;
global.commandOptions = {
	developer : {
		name: "developer",
		type: Boolean,
		names: new Set(["d", "developer"]),
		description: {
			short: "use_developer_database",
			long: "Whether to use the developer database over the production one.",
		},
	},
	filePath : {
		name: "filePath",
		type: String,
		names: new Set(["p", "fp", "path", "filePath"]),
		description: {
			short: "file_path",
			long: "The path of the requested file.",
		},
	},
	fileName : {
		name: "fileName",
		type: String,
		names: new Set(["f", "fn", "name", "file", "fileName"]),
		description: {
			short: "file_name",
			long: "The name of the requested file.",
		},
	},
}
