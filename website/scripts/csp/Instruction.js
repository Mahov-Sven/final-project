export default class Instruction {

	constructor(instructionName, var1, var2, rvar=var1){
		this.name = instructionName;
		this.var1 = var1;
		this.var2 = var2;
		this.rvar = rvar;
	}

	static fromObject(obj){
		return new Instruction(obj.instructionName, obj.var1, obj.var2, obj.rvar);
	}

	execute(state){
		let val1 = state[this.var1];
		let val2 = state[this.var2];
		console.log(val1, val2);
		if(val1 === undefined) val1 = parseInt(this.var1);
		if(val2 === undefined) val2 = parseInt(this.var2);
		if(val1 === NaN || val2 === NaN) return state[this.rvar] = false;
		if(typeof val1 !== "number" || typeof val2 !== "number")
			throw new Error(`The values for an assignment were '${val1}' and '${val2}' but were not numbers`);

		switch(this.name){
			case Instruction.names.add[2]: state[this.rvar] = val1 + val2; break;
			case Instruction.names.subtract[2]: state[this.rvar] = val1 - val2; break;
			case Instruction.names.multiply[2]: state[this.rvar] = val1 * val2; break;
			case Instruction.names.divide[2]: state[this.rvar] = val1 / val2; break;
			case Instruction.names.power[2]: state[this.rvar] = Math.pow(val1, val2); break;
			case Instruction.names.greaterThan[2]: state[this.rvar] = val1 > val2; break;
			case Instruction.names.notEqual[2]: state[this.rvar] = val1 !== val2; break;
			case Instruction.names.lessThan[2]: state[this.rvar] = val1 < val2; break;
			case Instruction.names.greaterThanOrEqualTo[2]: state[this.rvar] = val1 >= val2; break;
			case Instruction.names.equal[2]: state[this.rvar] = val1 === va2l; break;
			case Instruction.names.lessThanOrEqualTo[2]: state[this.rvar] = val1 <= val2; break;
			case Instruction.names.and[2]: state[this.rvar] = val1 && val2; break;
			case Instruction.names.or[2]: state[this.rvar] = val1 || val2; break;
			case Instruction.names.not[2]: state[this.rvar] = !val1; break;
			case Instruction.names.bitNot[2]: state[this.rvar] = ~val1; break;
			case Instruction.names.bitAnd[2]: state[this.rvar] = val1 & val2; break;
			case Instruction.names.bitOr[2]: state[this.rvar] = val1 | val2; break;
			case Instruction.names.bitXor[2]: state[this.rvar] = val1 ^ val2; break;
			case Instruction.names.shiftRight[2]: state[this.rvar] = val1 >> va2l; break;
			case Instruction.names.unsignedShiftRight[2]: state[this.rvar] = val1 >>> va2l; break;
			case Instruction.names.shiftLeft[2]: state[this.rvar] = val1 << val2; break;
			default: throw new Error(`Unknown Instruction ${this.name}`);
		}
	}
}

Instruction.names = {
	add: ["Add", "add", "add"],
	subtract: ["Subtract", "sub", "sub"],
	multiply: ["Multiply", "mul", "mul"],
	divide: ["Divide", "div", "div"],
	power: ["Power", "pow", "pow"],
	greaterThan: ["Greater Than", "grt", "grt"],
	notEqual: ["Not Equal", "neq", "neq"],
	lessThan: ["Less Than", "lst", "lst"],
	greaterThanOrEqualTo: ["Greater Than or Equal To", "geq", "geq"],
	equal: ["Equal", "eql", "eql"],
	and: ["Logical And", "lnd", "lnd"],
	or: ["Logical Or", "lor", "lor"],
	not: ["Logical Not", "lnt", "lnt"],
	bitAnd: ["Bitwise And", "bnd", "bnd"],
	bitOr: ["Bitwise Or", "bor", "bor"],
	bitXor: ["Bitwise Xor", "bxr", "bxr"],
	bitNot: ["Bitwise Not", "bnt", "bnt"],
	shiftRight: ["Bitwise Shift Right", "shr", "shr"],
	unsignedShiftRight: ["Bitwise Shift Right (Zero Fill)", "usr", "usr"],
	shiftLeft: ["Bitwise Shift Left", "shl", "shl"],
}
