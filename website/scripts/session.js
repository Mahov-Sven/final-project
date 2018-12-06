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
	
	/*
	TODO:
	
	implement problemToABP
	
	visualize{
		
		var abp = problemToABP(Problem.getProblem());
		run(abp);
		
	}
	
	*/
	
	
}
