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

		this.progress.variables[this.info.variableIs[this.current.varName]].completion = 1; //(this.current.varIndex / this.problem.getVariableValues(this.current.varName).length);
		this.progress.variables[this.info.variableIs[this.current.varName]].value = this.problem.getVariableValue(this.variableNames[this.current.varIndex], this.current.valIndex);

		this.isCompleted = false;
	}

	step(){
		this.assignment.set(this.variableNames[this.current.varIndex], this.problem.getVariableValue(this.variableNames[this.current.varIndex], this.current.valIndex));
		console.log(this.assignment);
		let constraintFailed = false;
		for(const constraint of this.problem.getConstraints()){
			if(!constraint.isSatisfiedBy(this.assignment)){
				constraintFailed = true;
				break;
			}
		}

		if(constraintFailed){
			if(this.current.valIndex < this.problem.getVariableValues(this.current.varName).length){
				this.current.valIndex ++;
			} else {
				if(this.current.varIndex === 0){
				} else {
					this.progress.variables[this.info.variableIs[this.current.varName]].completion = 0; //(this.current.varIndex / this.problem.getVariableValues(this.current.varName).length);
					this.progress.variables[this.info.variableIs[this.current.varName]].value = this.problem.getVariableValue(this.variableNames[this.current.varIndex], this.current.valIndex);
					this.current = this.current.parent;
				}
			}

		} else {
			let next = {
				parent: this.current,
				varIndex: this.current.varIndex + 1,
				varName: this.variableNames[this.current.varIndex + 1],
				valIndex: 0
			};

			this.progress.variables[this.info.variableIs[this.current.varName]].completion = 1;//(this.current.varIndex / this.problem.getVariableValues(this.current.varName).length);
			this.progress.variables[this.info.variableIs[this.current.varName]].value = this.problem.getVariableValue(this.variableNames[this.current.varIndex], this.current.valIndex);

			this.current = next;
		}
	}

	completed(){
		return this.isCompleted || super.completed();
	}
}
