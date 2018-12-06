import Constraint from "../CSP/Constraint.js"
import Problem from "../CSP/Problem.js"
import Assignment from "./Assignment.js";
import AbstractAlgorithm from "/scripts/algorithms/AbstractAlgorithm.js"

export default class BackTrackingAlgorithm extends AbstractAlgorithm {
	constructor(){
		super();
	}

	setup(){
    	super.setup();
		this.ruledOutCount = {};
		for(variableName in this.problem.variables){
			ruledOutCount[variableName] = 0;
		}
	}

	step(){
		console.log(this);
		if(this.iteration === 0){
			for(let x = this.ruledOutCount[this.problem.variables[this.iteration]]; x < length(this.problem.variables[this.iteration]); x ++){
				for(let y = this.ruledOutCount[this.problem.variables[this.iteration + 1]]; y < length(this.problem.variables[this.iteration + 1]); y++){
					let tempKey = keys(this.problem.variables)[this.iteration];
					let tempKeyNext = keys(this.problem.variables)[this.iteration + 1];
					this.assignment.set(tempKey, variables[tempKey][x]);
					this.assignment.set(tempKeyNext, variables[tempKeyNext][y]);
					for(constraint of this.problem.constraints){
						for(instruction of constraint){
							if((instruction.var1 === tempKey && instruction.var2 === tempKeyNext) || (instruction.var2 === tempKey && instruction.var1 === tempKeyNext)){
								if(constraint.isSatisfiedBy(this.assignment)){
									this.iteration++;
									return;
								}
							}
						}
					}
				}
				this.ruledOutCount[tempKey] ++;
			}

		}else{
			for(let y = this.ruledOutCount[this.problem.variables[this.iteration+1]]; y < length(this.problem.variables[this.iteration + 1]); y++){
				let tempKey = keys(this.problem.variables)[this.iteration];
				let tempKeyNext = keys(this.problem.variables)[this.iteration + 1];
				this.assignment.set(tempKeyNext, variables[tempKeyNext][y]);
				for(constraint of this.problem.constraints){
					for(instruction of constraint){
						if((instruction.var1 === tempKey && instruction.var2 === tempKeyNext) || (instruction.var2 === tempKey && instruction.var1 === tempKeyNext)){
							if(constraint.isSatisfiedBy(this.assignment)){
								this.iteration++;
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
			this.iteration--;
		} else {
			console.log("No valid solution.");
		}
	}
}
