import Constraint from "../csp/Constraint.js"
import Problem from "../csp/Problem.js"
import Assignment from "./Assignment.js";
import AbstractAlgorithm from "/scripts/algorithms/AbstractAlgorithm.js"
import Random from "/scripts/random.js"

export default class BeamSearchAlgorithm extends AbstractAlgorithm {
	constructor(){
		super();
	}

	setup(){

        super.setup();
		
		this.variableNames = this.problem.getVariableNames();

		this.k = Math.ceil(Math.sqrt(this.variableNames.length));
				
		for(const varName of this.variableNames){
			const domainSize = this.problem.getVariableValues(varName).length;
			const randI = Random.randInt(domainSize);
			this.assignment.set(varName, this.problem.getVariableValue(varName, randI));
		}

		for(const varName of this.variableNames){
			let brokenConstraints = 0;
			for(const constraint of this.problem.getConstraints()){
				if(constraint.contains(varName) && !constraint.isSatisfiedBy(this.assignment)) brokenConstraints++;
			}
			this.progress.variables[this.info.variableIs[varName]].completion = 1 - (brokenConstraints / this.info.variableOCs[varName]);
			this.progress.variables[this.info.variableIs[varName]].value = this.assignment.get(varName);
		}

		if(this.completed() && this.problem.getVariableNames().length > 0) this.setup();
	}

    step(){
		let kBestAssignments = []; //initialize bestAssignment
		for(let x = 0; x <= this.k; x ++){
			let randI = Random.randInt(this.variableNames.length); //selects random index 
			let varName = this.variableNames[randI]; // selects random varName with randI
			let index = 0;
			
			for(const value of this.problem.getVariableValues(varName)){ 
				let tempAssign = Object.assign(new Assignment(), this.assignment);
				tempAssign.set(varName, value);
				let brokenConstraints = 0;
				for(const constraint of this.problem.getConstraints()){
					if(!constraint.isSatisfiedBy(tempAssign)) brokenConstraints++;
				}
				console.log(index, this.k)
				if(index < this.k){
					kBestAssignments[index] = [tempAssign, brokenConstraints, varName];
					index ++;
				} else {
					let worstIndex = 0;
					for(let x = 1; x < this.k; x ++){
						if(kBestAssignments[x][1] > kBestAssignments[worstIndex][1]){
							worstIndex = x;
						}
					}
					kBestAssignments[worstIndex] = [tempAssign, brokenConstraints,varName]
				}
			}
		}
		let bestIndex = 0;
		for(let x = 0; x < this.k; x ++){
			if(kBestAssignments[x][1] < kBestAssignments[bestIndex][1]){
				bestIndex = x;
			}
		}
		Object.assign(this.assignment, kBestAssignments[bestIndex][0])
		this.progress.variables[this.info.variableIs[kBestAssignments[bestIndex][2]]].completion = 1 - (kBestAssignments[bestIndex][1] / this.info.variableOCs[kBestAssignments[bestIndex][2]]);
		this.progress.variables[this.info.variableIs[kBestAssignments[bestIndex][2]]].value = this.assignment.get(kBestAssignments[bestIndex][2]);
    }
}
