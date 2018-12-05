import * as Loader from "./loader.js"
import Problem from "./csp/Problem.js"
import ImportPage from "./importProblem/importPage.js"

let activeBannerButton = -1;

export function init() {

	$("#CommandInput").keypress((e) => {
	    if(e.which !== 13) return;
		Loader.request($("#CommandInput").val(), true);
	});

	$("#ImportInput").on("click", function(){
		const importPage = new ImportPage();
		importPage.appendTo("#Sidebar");
	});

	$("#LoadProblemButton").click((e) => {
		console.log("Trying to Load");
	});

	$("#RestartButton").click((e) => {
		console.log("Trying restart");
	});

	$("#PausePlayButton").click((e) => {
		console.log("Trying play/pause");
	});

	$("#StepButton").click((e) => {
		console.log("Trying step");
	});

	$("#ImportSpace").hide();
}
