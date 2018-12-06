import Assignment from "/scripts/algorithms/Assignment.js"

export default class AbstractAlgorithm {
	constructor(problem){
		this.problem = problem;
	}

	setProblem(problem){
		this.problem = problem;
		this.setup();
	}

	setup(){
		this.iteration = 0;
		this.assignment = new Assignment();
		this.progress = {};
		this.progress.variables = [];
		this.progress.constraints = [];
		this.info = {};
		this.info.variableOCs = {};
		this.info.variableIs = {};

		for(const varName of this.problem.getVariableNames()){
			this.info.variableIs[varName] = this.progress.variables.length;
			this.progress.variables.push({
				name: varName,
				completion: 0,
				value: this.problem.getVariableValue(varName, 0),
			});
			this.info.variableOCs[varName] = this.problem.getVariableConstraintOccuranceCount(varName);
		}

		for(const constraint of this.problem.getConstraints()){
			this.progress.constraints.push({
				contains: constraint.getVariableNames(this.problem.getVariableNames()),
			});
		}

		console.log(this.progress);
	}

	step(){}

	completed(){
		for(const variable of this.progress.variables){
			if(variable.completion !== 1) return false;
		}
		return true;
	}

	getAssignment(){
		return this.assignment;
	}
}
