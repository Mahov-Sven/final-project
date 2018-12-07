import Problem from "./csp/Problem.js"
import * as Visualization from "./visualization.js"
import AbstractAlgorithm from "/scripts/algorithms/AbstractAlgorithm.js"
import BackTrackingAlgorithm from "/scripts/algorithms/BackTrackingAlgorithm.js"
import HillClimbingAlgorithm from "/scripts/algorithms/HillClimbingAlgorithm.js"

export default class Session {
	constructor(){}

	static init(){
		Session.problem = new Problem();
		Session.algorithm = new HillClimbingAlgorithm();
		Session.algorithm.setProblem(Session.problem);
	}

	static setProblem(problem){
		$("#PausePlayButton").trigger("stop");
		$("#StepButton").addClass("Disabled");

		Session.problem = problem;
		Session.algorithm.setProblem(Session.problem);

		$("#PausePlayButton").removeClass("Disabled");
		$("#StepButton").removeClass("Disabled");
	}

	static getProblem(){
		return Session.problem;
	}

	static setAlgorithm(algorithm){
		$("#PausePlayButton").trigger("stop");
		$("#StepButton").addClass("Disabled");

		if(algorithm instanceof AbstractAlgorithm)
			Session.algorithm = algorithm;
		else if (typeof algorithm === "string"){
			switch(algorithm){
				case "BackTrack":
					Session.algorithm = new BackTrackingAlgorithm();
					Session.algorithm.setProblem(Session.problem);
					Session.visualize();
					break;
				case "HillClimbing":
					Session.algorithm = new HillClimbingAlgorithm();
					Session.algorithm.setProblem(Session.problem);
					Session.visualize();
					break;
				default: break;
			}
		}

		$("#PausePlayButton").removeClass("Disabled");
		$("#StepButton").removeClass("Disabled");
	}

	static getAlgorithm(){
		return Session.algorithm;
	}

	static restart(){
		Session.algorithm.setup();
	}

	static step(){
		if(Session.algorithm.completed()){
			$("#PausePlayButton").trigger("stop");
			$("#StepButton").addClass("Disabled");
			return;
		}
		Session.algorithm.step();
	}

	static visualize(){
		Visualization.run(Session.algorithm.progress);
	}
}
