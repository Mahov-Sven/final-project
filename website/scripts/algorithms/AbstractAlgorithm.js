class AbstractAlgorithm {
	constructor(problem){
		this.constraints = problem.constraints;
		this.variables = problem.variables;
	}

	setup(){
		this.iteration = 0;
		this.assignment = new Assignment();
	}

	step(){}
	
	getAssignment(){
		return this.assignment;
	}
}
