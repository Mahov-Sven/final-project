export default class Assignment {
	constructor(assignments){
		for(const varName in assignments){
			this.set(varName, assignments[varName]);
		}
	}

	set(varName, value){
		this[varName] = value;
	}
}
