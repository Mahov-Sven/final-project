import * as Loader from "./loader.js"
import * as Events from "./events.js"
import Session from "./session.js"
import Dropdown from "/scripts/components/dropdown.js"
import Problem from "/scripts/csp/Problem.js"
import Visualization from "/scripts/visualization.js"

async function main(){
	Loader.init();
	Dropdown.init();
	Visualization.init();
	Session.init();
	Events.init();

	const result = await Loader.execCommand("loadProblem", { n: "4Rooks"});
	if(result.success) Session.setProblem(Problem.fromObject(JSON.parse(result.data)));

	Session.visualize();
} main();
