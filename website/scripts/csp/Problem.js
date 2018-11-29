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
		const jsonObj = JSON.parse(jsonString);
		return new Problem(jsonObj.variables, jsonObj.constraints);
	}
}
