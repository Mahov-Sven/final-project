import * as Loader from "./loader.js"
import Problem from "./csp/Problem.js"
import ImportPage from "./components/importProblem/importPage.js"
import Session from "./session.js"
import Constraint from "./csp/Constraint.js";
import * as Visualization from "/scripts/visualization.js"
import Dropdown from "/scripts/components/dropdown.js"

let activeBannerButton = -1;

export function init() {

	$("#CommandInput").keypress((e) => {
	    if(e.which !== 13) return;
		Loader.request($("#CommandInput").val(), true);
	});

	$("#ImportInput").click((e)=>{
		const importPage = new ImportPage();
		importPage.appendTo("#Sidebar");
		$("#VisualizationSpace").trigger("_resize");
	});

	$(window).resize((e) => {
		Visualization.simulation
			.force("center", d3.forceCenter($("#VisualizationSpace").width() / 2, $("#VisualizationSpace").height() / 2))
			.restart()
	});

	$("#VisualizationSpace").on("_resize", (e) => {
		Visualization.simulation
			.force("center", d3.forceCenter($("#VisualizationSpace").width() / 2, $("#VisualizationSpace").height() / 2))
			.restart()
	});

	$("#LoadProblemInput").keypress(async (e) => {
		if(e.which !== 13) return;
		const result = await Loader.execCommand("loadProblem", { n: $("#LoadProblemInput").val()});
		console.log(result);
		console.log(Problem.fromObject(JSON.parse(result.data)));
		if(result.success) Session.setProblem(Problem.fromObject(JSON.parse(result.data)));

		Session.visualize();
	});



	const algorithmDropdown = new Dropdown("Algorithm", "Select Algorithm", [
		["Back Track Algorithm (Tree)", "Back Track", "BackTrack"],
		["Hill Climbing Algorithm (Local)", "Hill Climbing", "HillClimbing"],
		["Coming Soon", "...", "UndefinedLocalSearch"]
	]);
	algorithmDropdown.insertBefore("#RestartButton");
	algorithmDropdown.select((e) => {
		Session.setAlgorithm(algorithmDropdown.getValue());
	});

	let playInterval = undefined;
	$("#RestartButton").click((e) => {
		clearInterval(playInterval);
		playInterval = undefined;
		$("#PausePlayButton").removeClass("Disabled");
		$("#StepButton").removeClass("Disabled");
		Session.restart();
		Session.visualize();
	});

	$("#PausePlayButton").click((e) => {
		if(playInterval === undefined){
			$("#StepButton").addClass("Disabled");
			$("#PausePlayButton").addClass("Active");
			playInterval = setInterval(() => {
				if(Session.step()) Session.visualize();
			}, 1000);
		} else {
			clearInterval(playInterval);
			playInterval = undefined;
			$("#PausePlayButton").removeClass("Active");
			$("#StepButton").removeClass("Disabled");
		}
	});

	$("#PausePlayButton").on("stop", () => {
		clearInterval(playInterval);
		playInterval = undefined;
		$("#PausePlayButton").removeClass("Active");
		$("#PausePlayButton").addClass("Disabled");
	});

	$("#StepButton").click((e) => {
		if(Session.step()) Session.visualize();
	});

	$("#ImportSpace").hide();
	$("#ImportOverviewContainer").hide();
	$("#ImportPageContainer").hide();
}
