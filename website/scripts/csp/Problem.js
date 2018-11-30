import Constraint from "./Constraint.js"

export default class Problem {

	constructor(variables={}, constraints=[]){
		this.variables = variables;
		this.constraints = constraints;
	}

	static fromObject(obj){
		const problem = new Problem(obj.variables, obj.constraints);
		for(let i = 0; i < problem.constraints.length; i++){
			problem.constraints[i] = Constraint.fromObject(problem.constraints[i]);
		}
		return problem;
	}

	addVariable(name, values){
		this.variables[name] = values;
	}

	addConstraint(constraint){
		this.constraints.push(constraint);
	}
}
