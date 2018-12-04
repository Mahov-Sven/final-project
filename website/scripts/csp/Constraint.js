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
			console.log(state);
			const instr = this.instructions[i];
			const instrRes = instr.execute(state);
			if(i === this.instructions.length - 1) return state[instr.rvar] !== false;
		}

		return true;
	}
	
	function contains(){
		let res = new Set();
		for(let i = 0; i < this.instructions.length; i++){
			for(let item of this.instructions[i].refersTo()){
				res.add(item);
			}
		}		
		return Array.from(res);
	}
	
}
