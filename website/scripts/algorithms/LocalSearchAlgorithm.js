import Constraint from "../CSP/Constraint.js"
import Problem from "../CSP/Problem.js"
import Assignment from "./Assignment.js";
import AbstractAlgorithm from "/scripts/algorithms/AbstractAlgorithm.js"
import Random from "/scripts/random.js"

class BeamSearchAlgorithm extends AbstractAlgorithm {
	constructor(){
		super.constructor();
	}

	setup(){
        super.setup();
		
		
    }

    step(){
        //pick a candidate to work on and assign a local copy
        this.assignment = this.candidateSpace[iteration];
        iteration ++;
        //TODO: apply local changes for a specified time and see if they result in a solution.
        


    }

}