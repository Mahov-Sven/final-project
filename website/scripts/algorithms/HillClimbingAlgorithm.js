import Constraint from "../csp/Constraint.js"
import Problem from "../csp/Problem.js"
import Assignment from "./Assignment.js";
import AbstractAlgorithm from "/scripts/algorithms/AbstractAlgorithm.js"
import Random from "/scripts/random.js"

export default class HillClimbingAlgorithm extends AbstractAlgorithm {
	constructor(){
		super();
	}

	setup(){
    	super.setup();
		this.variableNames = this.problem.getVariableNames();
		for(const varName of this.variableNames){
			const domainSize = this.problem.getVariableValues(varName).length;
			const randI = Random.randInt(domainSize);
			this.assignment.set(varName, this.problem.getVariableValue(varName, randI));
		}

		for(const varName of this.variableNames){
			let brokenConstraints = 0;
			for(const constraint of this.problem.getConstraints()){
				if(constraint.contains(varName) && !constraint.isSatisfiedBy(this.assignment)) brokenConstraints++;
			}
			this.progress.variables[this.info.variableIs[varName]].completion = 1 - (brokenConstraints / this.info.variableOCs[varName]);
			this.progress.variables[this.info.variableIs[varName]].value = this.assignment.get(varName);
		}

		if(this.completed() && this.problem.getVariableNames().length > 0) this.setup();
	}

	step(){
		super.step();
		
		const randI = Random.randInt(this.variableNames.length);
		const varName = this.variableNames[randI];
		let minBrokenConstraints = Infinity;
		let bestAssignment = undefined;
		for(const value of this.problem.getVariableValues(varName)){
			this.assignment.set(varName, value);
			let brokenConstraints = 0;
			for(const constraint of this.problem.getConstraints()){
				if(!constraint.isSatisfiedBy(this.assignment)) brokenConstraints++;
			}
			if(brokenConstraints < minBrokenConstraints){
				minBrokenConstraints = brokenConstraints;
				bestAssignment = value;
			}
		}

		this.assignment.set(varName, bestAssignment);
		this.progress.variables[this.info.variableIs[varName]].completion = 1 - (minBrokenConstraints / this.info.variableOCs[varName]);
		this.progress.variables[this.info.variableIs[varName]].value = this.assignment.get(varName);
	}
}
