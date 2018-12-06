import Constraint from "../CSP/Constraint.js"
import Problem from "../CSP/Problem.js"
import Assignment from "./Assignment.js";

export default class BackTrackingAlgorithm extends AbstractAlgorithm {
	constructor(){
		super.constructor();
	}

	setup(){
    	super.setup();
		this.ruledOutCount = {};
		for(variable of this.variables){
			ruledOutCount[variable] = 0;
		}
	}
	
	step(){
		if(iteration === 0){
			for(let x = this.ruledOutCount[this.variables[iteration]]; x < length(this.variables[this.iteration]); x ++){
				for(let y = this.ruledOutCount[this.variables[iteration+1]]; y < length(this.variables[this.iteration + 1]); y++){
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
				this.ruledOutCount[tempKey] ++;
			}

		}else{
			for(let y = this.ruledOutCount[this.variables[iteration+1]]; y < length(this.variables[this.iteration + 1]); y++){
						let tempKey = keys(this.variables)[iteration];
						let tempKeyNext = keys(this.variables)[iteration + 1];
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
					this.ruledOutCount[tempKey]++;
		}
		if(iteration !== 0){
			this.ruledOutCount[tempKeyNext]++;
			this.assignment.set(tempKeyNext, null);
			iteration --;
		} else {
			console.log("No valid solution.");
		}
	}
	
	getAssignment(){
		super.getAssignment;
	}

}
