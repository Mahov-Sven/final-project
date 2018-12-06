import Constraint from "../CSP/Constraint.js"
import Problem from "../CSP/Problem.js"
import Assignment from "./Assignment.js";

export default class BackTrackingAlgorithm extends AbstractAlgorithm {
	constructor(){
		super.constructor();
	}

	setup(){
    	super.setup();
	}

	step(){
		for(let x = 0; x < length(this.variables[this.iteration]); x ++){
			for(let y = 0; y < length(this.variables[this.iteration + 1]); y++){
				let tempKey = keys(this.variables)[iteration];
				let tempKeyNext = keys(this.variables)[iteration + 1];
				this.assignment.set(tempKey, variables[tempKey][x]);
				this.assignment.set(tempKeyNext, variables[tempKeyNext][y]);
				for(constraint of this.constraints){
					for(instruction of constraint){
						if((instruction.var1 === tempKey && instruction.var2 === tempKeyNext) || (instruction.var2 === tempKey && instruction.var1 === tempKeyNext)){
							if(constraint.isSatisfiedBy(this.assignment)){
								iteration ++;
								return;
							}
						}
					}
				}
			}
		}
		if(iteration !== 0){
			iteration --;
		} else {
			console.log("No valid solution.");
		}
	}
	
	getAssignment(){
		super.getAssignment;
	}

}
