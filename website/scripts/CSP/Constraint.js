export default class Constraint {
	constructor(){
		this.instructions = [];
	}

	addInstruction(instruction){
		this.instructions.push(instruction);
	}

	isSatisfiedBy(assignment){
		// TODO
	}
}
