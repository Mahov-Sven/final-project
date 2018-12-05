import * as Loader from "./loader.js"
import * as Events from "./events.js"
import Session from "./session.js"

function main(){
	Loader.init();
	Events.init();
	Session.init();
} main();
