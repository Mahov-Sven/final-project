import Problem from "./csp/Problem.js"

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
}
