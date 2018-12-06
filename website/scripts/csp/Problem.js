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

	getVariableValues(varName){
		return this.variables[varName];
	}

	getVariableValue(varName, index){
		return this.variables[varName][index];
	}

	getVariableNames(){
		const varNames = [];
		for(const varName in this.variables){
			varNames.push(varName);
		}
		return varNames;
	}

	getVariableConstraintOccuranceCount(varName){
		let count = 0;
		for(const constraint of this.constraints){
			for(const instruction of constraint.instructions){
				if(instruction.var1 === varName || instruction.var2 === varName){
					count++;
					break;
				}
			}
		}
		return count;
	}

	getConstraints(){
		return this.constraints;
	}
}
