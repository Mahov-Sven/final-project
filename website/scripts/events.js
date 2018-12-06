import * as Loader from "./loader.js"
import Problem from "./csp/Problem.js"
import ImportPage from "./importProblem/importPage.js"
import * as Session from "./session.js"

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
		/*
		TODO:


		*/

	});

	$("#PausePlayButton").click((e) => {
		console.log("Trying play/pause");
		/*
		TODO


		*/
	});

	$("#StepButton").click((e) => {
		console.log("Trying step");

		var prob = Session.getProblem();


		/*
		TODO:
		prob = session.getproblem
		prob.step
			prob.step should load problem into algorithm and then call algorithm's step
		session.setproblem(prob)
		abp = probToABP(prob)
		visualization.run(abp)
		*/

	});

	$("#ImportSpace").hide();
}
