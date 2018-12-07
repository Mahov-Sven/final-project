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
		super.step();

		let constraintFailed = false;
		let backtrack = this.current.valIndex >= this.problem.getVariableValues(this.current.varName).length;

		if(!backtrack){
			this.assignment.set(this.variableNames[this.current.varIndex], this.problem.getVariableValue(this.variableNames[this.current.varIndex], this.current.valIndex));
			for(const constraint of this.problem.getConstraints()){
				if(!constraint.isSatisfiedBy(this.assignment)){
					constraintFailed = true;
					break;
				}
			}
		}

		if(constraintFailed){
			this.current.valIndex++;


			this.progress.variables[this.info.variableIs[this.current.varName]].completion = 1;//(this.current.varIndex / this.problem.getVariableValues(this.current.varName).length);
			this.progress.variables[this.info.variableIs[this.current.varName]].value = this.problem.getVariableValue(this.variableNames[this.current.varIndex], this.current.valIndex);
		} else if(backtrack){
			this.assignment.set(this.variableNames[this.current.varIndex], undefined);
			this.progress.variables[this.info.variableIs[this.current.varName]].completion = 0;
			this.progress.variables[this.info.variableIs[this.current.varName]].value = this.variableNames[this.current.varIndex];

			this.current = this.current.parent;
			this.current.valIndex++;

			this.progress.variables[this.info.variableIs[this.current.varName]].completion = 1;
			this.progress.variables[this.info.variableIs[this.current.varName]].value = this.problem.getVariableValue(this.variableNames[this.current.varIndex], this.current.valIndex);
		} else {
			this.current = {
				parent: this.current,
				varIndex: this.current.varIndex + 1,
				varName: this.variableNames[this.current.varIndex + 1],
				valIndex: 0
			};

			this.progress.variables[this.info.variableIs[this.current.varName]].completion = 1;//(this.current.varIndex / this.problem.getVariableValues(this.current.varName).length);
			this.progress.variables[this.info.variableIs[this.current.varName]].value = this.problem.getVariableValue(this.variableNames[this.current.varIndex], this.current.valIndex);
		}
	}

	completed(){
		return this.isCompleted || super.completed();
	}
}
