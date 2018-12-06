import * as Loader from "./loader.js"
import Problem from "./csp/Problem.js"
import ImportPage from "./components/importProblem/importPage.js"
import Session from "./session.js"
import Constraint from "./csp/Constraint.js";

let activeBannerButton = -1;

export function init() {

	$("#CommandInput").keypress((e) => {
	    if(e.which !== 13) return;
		Loader.request($("#CommandInput").val(), true);
	});

	$("#ImportInput").click((e)=>{
		const importPage = new ImportPage();
		importPage.appendTo("#Sidebar");
	});

	$("#LoadProblemInput").keypress((e) => {
		if(e.which !== 13) return;
		console.log("Trying to Load");
		Loader.request(`/loadProblem?n=${$("#LoadProblemInput").val()}`).then((a)=>{
			const parsedJson = JSON.parse(a.data);
			const problem = new Problem(parsedJson.variables, parsedJson.constraints);
			Session.setProblem(problem);
		});
	});

	$("#RestartButton").click((e) => {
		console.log("Trying restart");
		/*
		TODO
		*/
		Session.visualize();
	});

	$("#PausePlayButton").click((e) => {
		console.log("Trying play/pause");
		/*
		TODO
		*/
		Session.visualize();
	});

	$("#StepButton").click((e) => {
		console.log("Trying step");
		Session.step();
		Session.visualize();
	});

	$("#ImportSpace").hide();
	$("#ImportOverviewContainer").hide();
	$("#ImportPageContainer").hide();
}
