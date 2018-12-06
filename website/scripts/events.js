import * as Loader from "./loader.js"
import Problem from "./csp/Problem.js"
import * as ImportCSP from "./importCSP.js"
import Session from "./session.js"

let activeBannerButton = -1;

export function init() {

	$("#CommandInput").keypress((e) => {
	    if(e.which !== 13) return;
		Loader.request($("#CommandInput").val(), true);
	});

	$("#ImportInput").on("click", function(){
		ImportCSP.createPage("Main");
	});

	$("#LoadProblemButton").click((e) => {
		console.log("Trying to Load");
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
