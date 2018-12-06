import Constraint from "../csp/Constraint.js"
import Problem from "../csp/Problem.js"
import Assignment from "./Assignment.js";
import AbstractAlgorithm from "/scripts/algorithms/AbstractAlgorithm.js"

export default class BackTrackingAlgorithm extends AbstractAlgorithm {
	constructor(){
		super();
	}

	setup(){
		super.setup();
		this.variableNames = this.problem.getVariableNames();
		this.current = {
				parent: null,
				varIndex: 0, 
				varName: this.variableNames[0], 
				valIndex: 0
		};

		this.progress.variables[this.info.variableIs[current.varName]].completion = (current.varIndex / this.problem.variables[varIndex].length());
		this.progress.variables[this.info.variableIs[current.varName]].value = this.problem.getVariableValue(this.variableNames[current.varIndex], current.valIndex);
		
		
	}

	step(){
		this.assignment.set(this.variableNames[this.current.varIndex], this.problem.getVariableValue(this.variableNames[this.current.varIndex], this.current.valIndex));
		for(constraint of this.problem.getContraints()){
			if(!constraint.isSatisfiedBy(this.assignment)){
				if(this.current.valIndex < this.problem.getVariableValue(this.variableValues()).length){
					this.current.valIndex ++;
				} else {
					if(varIndex === 0){
						//no solution exit
					} else {
						//update visualization
						this.progress.variables[this.info.variableIs[current.varName]].completion = (current.varIndex / this.problem.variables[varIndex].length());
						this.progress.variables[this.info.variableIs[current.varName]].value = this.problem.getVariableValue(this.variableNames[current.varIndex], current.valIndex);
						//backtrack
						this.current = this.current.parent;
						//break
						//exit()?
					}
				}	
			}
		}
		
		let next = {
			parent: this.current,
			varIndex: this.current.varIndex + 1,
			varName: this.variableNames[this.current.varIndex + 1],
			valIndex: 0
		};
		
		this.progress.variables[this.info.variableIs[current.varName]].completion = (current.varIndex / this.problem.variables[varIndex].length());
		this.progress.variables[this.info.variableIs[current.varName]].value = this.problem.getVariableValue(this.variableNames[current.varIndex], current.valIndex);
		
		
		this.current = next;
	}
}
