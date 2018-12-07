import Constraint from "../CSP/Constraint.js"
import Problem from "../CSP/Problem.js"
import Assignment from "./Assignment.js";
import AbstractAlgorithm from "/scripts/algorithms/AbstractAlgorithm.js"
import Random from "/scripts/random.js"

export default class BeamSearchAlgorithm extends AbstractAlgorithm {
	constructor(){
		super();
	}

	setup(){
        super.setup();
		//Select random k between 1 and max states
		this.variables = this.problem.getVariableNames();
		const k = Random.randInt(this.variables.length);
		console.log("k = " + k);
		
		for(var i = 0; i <= k; i++){
			//TODO: Generate state objects here
			console.log("generate state");
		}
		
	}

    step(){
		//For each k state, generate a secessor state
			//If any of these are a goal state, return solution
			
			//Else select k ""best" sucessors 
		
		//Run step() again on the sucessor states

    }

}