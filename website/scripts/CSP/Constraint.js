import Instruction from "./Instruction.js"
import Assignment from "../algorithms/Assignment.js"

export default class Constraint {
	constructor(){
		this.instructions = [];
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
}

const assignment = new Assignment({"v1": 5, "v2": 7, "v13": 9});
const con = new Constraint();
const instr1 = new Instruction("mul", "v1", "v2");
const instr2 = new Instruction("pow", "v13", 2);
const instr3 = new Instruction("grt", "v1", "v13");
con.addInstruction(instr1);
con.addInstruction(instr2);
con.addInstruction(instr3);
console.log(con);
console.log(con.isSatisfiedBy(assignment));
console.log(JSON.stringify(con));
