import Constraint from "./Constraint.js"

export default class Problem {
	constructor(variables={}, constraints=[]){
		this.variables = variables;
		this.constraints = constraints;
	}

	addVariable(name, values){
		this.variables[name] = values;
	}

	addConstraint(constraint){
		this.constraints.push(constraint);
	}

	static fromJSON(jsonString){
		return Problem.fromObject(JSON.parse(jsonString));
	}

	static fromObject(obj){
		const prob = new Problem(jsonObj.variables, jsonObj.constraints);
		for(let i = 0; i < this.constraints.length; i++){
			// TODO
			this.constraints[i] = Constraint.fromObject(this.constraints[i]);
		}
		return prob;
	}
}
