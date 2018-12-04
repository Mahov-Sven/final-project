class AbstractAlgorithm {
	constructor(constraints, problem){
		this.constraints = constraints;
		this.variables = problem.variables;
	}

	setup(){
		this.iteration = 0;
		this.assignment = new Assignment();
	}

	step(){}
}
