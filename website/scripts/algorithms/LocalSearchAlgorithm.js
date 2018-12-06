import Constraint from "../CSP/Constraint.js"
import Problem from "../CSP/Problem.js"
import Assignment from "./Assignment.js";

class LocalSearchAlgorithm extends AbstractAlgorithm {
	constructor(){
		super.constructor();
	}

	setup(){
        super.setup();
        //array of assignments
        this.candidateSpace = [];
    }

    step(){
        //pick a candidate to work on and assign a local copy
        this.assignment = this.candidateSpace[iteration];
        iteration ++;
        //TODO: apply local changes for a specified time and see if they result in a solution.
        


    }

}