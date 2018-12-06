import * as Loader from "./loader.js"
import * as Events from "./events.js"
import Session from "./session.js"
import Dropdown from "/scripts/components/dropdown.js"

function main(){
	Loader.init();
	Events.init();
	Session.init();
	Dropdown.init();

	const algorithmDropdown = new Dropdown("Algorithm", "Select Algorithm", [
		["Back Track Algorithm (Tree)", "Back Track", "BackTrack"],
		["Coming Soon", "You Can't Pick This", "NoU"]
		//["Beam Search Algorithm (Local)", "Beam Search", "BeamSearch"]
	]);
	algorithmDropdown.insertBefore("#RestartButton");
} main();
