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
		
		//console.log(this.k);
				
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
		//For each k state, generate a secessor state
			//If any of these are a goal state, return solution
			
			//Else select k ""best" sucessors 
		
		//Run step() again on the sucessor states
		for(let x = 0; x < this.k; x ++){
			let randI = Random.randInt(this.variableNames.length); //selects random index 
			let varName = this.variableNames[randI]; // selects random varName with randI
			let minBrokenConstraints = Infinity; // initialize minBrokenConstraints
			let bestAssignment = undefined; //initialize bestAssignment
			
			for(const value of this.problem.getVariableValues(varName)){ //loops over all values for varName and finds assignment with least brokenConstraints
				let tempAssign = new Assignment();
				tempAssign = this.assignment;
				tempAssign.set(varName, value);
				let brokenConstraints = 0;
				for(const constraint of this.problem.getConstraints()){
					if(!constraint.isSatisfiedBy(tempAssign)) brokenConstraints++;
				}
				if(brokenConstraints < minBrokenConstraints){
					minBrokenConstraints = brokenConstraints;
					bestAssignment = value;
				}
			}
			
			randI = Random.randInt(this.variableNames.length); //selects random index 
			varName = this.variableNames[randI];
		

		this.assignment.set(varName, bestAssignment);
		this.progress.variables[this.info.variableIs[varName]].completion = 1 - (minBrokenConstraints / this.info.variableOCs[varName]);
		this.progress.variables[this.info.variableIs[varName]].value = this.assignment.get(varName);
		}
    }
}
