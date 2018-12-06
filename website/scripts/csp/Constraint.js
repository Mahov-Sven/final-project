import Instruction from "./Instruction.js"
import Assignment from "../algorithms/Assignment.js"

export default class Constraint {

	constructor(instructions=[]){
		this.instructions = instructions;
	}

	static fromObject(obj){
		const constraint = new Constraint(obj.instructions);
		for(let i = 0; i < constraint.instructions.length; i++){
			constraint.instructions[i] = Instruction.fromObject(constraint.instructions[i]);
		}
		return constraint;
	}

	addInstruction(instruction){
		this.instructions.push(instruction);
	}

	isSatisfiedBy(assignment){
		const state = Object.assign({}, assignment);
		for(let i = 0; i < this.instructions.length; i ++){
			const instr = this.instructions[i];
			const instrRes = instr.execute(state);
			if(i === this.instructions.length - 1) return state[instr.rvar] !== false;
		}

		return true;
	}

	contains(varName){
		for(const instr of this.instructions){
			if(instr.var1 === varName || instr.var2 === varName)
				return true;
		}
		return false;
	}

	getVariableNames(problemVarNames){
		if(problemVarNames === undefined)
			throw new Error("You must provide a set of variable names in the problem iteself");

		if(problemVarNames instanceof Array) problemVarNames = new Set(problemVarNames);

		let varNames = new Set();
		for(const instr of this.instructions){
			if(problemVarNames.has(instr.var1)) varNames.add(instr.var1);
			if(problemVarNames.has(instr.var2)) varNames.add(instr.var2);
		}
		return Array.from(varNames);
	}
}
