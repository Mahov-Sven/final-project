import Problem from "./csp/Problem.js"
import run from "./visualization.js"


export default class Session {
	constructor(){}

	static init(){
		Session.setProblem(new Problem());
	}

	static setProblem(problem){
		Session.problem = problem;
	}

	static getProblem(){
		return Session.problem;
	}
	
	static setAlgorithm(algorithm){
		Session.algorithm = algorithm;
	}
	
	static getAlgorithm(){
		return Session.algorithm;
	}
	
	static step(){
		Session.algorithm.step();
	}
	
	static problemToABP(){
		//Extracts information from the Problem and Algorithm, puts it in correct format for visualization
		
		/* Pseudocode
			get variable names and domains from Problem
			from Algorithm, extract # of discarded values for each variable -> "fails"
			for each variable, set "completion" to 1 - ("fails" / domain.length)
			
			get list of constraints from Problem
			for each constraint, call "getVariableNames" which returns the needed list
			result.constraints.push({ contains: getVariableNames(whatever) });
			
			return result with .variables and .constraints 
		*/
		return null;
	}
	
	static visualize(){
		//Visualizes whatever information is currently in the session's Problem and Algorithm
		var abp = Session.problemToABP();
		const abpJSON = {
			variables: [
			{name: "v1", completion: .86, value: "3"},
			{name: "v2", completion: .14, value: "1"},
			{name: "v3", completion: 1, value: "12"},
			{name: "v4", completion: .53, value: "6"}
			],
			constraints: [
			{contains: ["v1", "v2", "v3"]},
			{contains: ["v2", "v4"]}
			]
		};		
//		run(abp);		
		run(abpJSON);
	}
		
	
}
