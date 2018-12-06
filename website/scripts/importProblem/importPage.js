// This is the file that has the functions to create the import page for csps
import VariablePage from "./importVariablePage.js"
import ConstraintPage from "./importConstraintPage.js"
import * as Loader from "../loader.js"
import Problem from "../csp/Problem.js"
import Notification from "../notification.js"

export default class ImportPage {
	constructor(){
		this.elem = undefined;
		this._construct();
	}

	_construct(){
		if(this._exists()) return;
		this._constructRoot();
		this._constructTitle("Problem Name", this.elem);
		this._constructProblemName();
		this._constructPageLine();
		this._constructContainer("Variable");
		this._constructPageLine();
		this._constructContainer("Constraint");
		this._constructBottomButtons();
	}

	_exists(){
		return $("#ImportOverviewContainer").length !== 0;
	}

	_constructRoot(){
		this.elem = $("<div>");
		this.elem.attr("id", "ImportOverviewContainer");
		this.elem.addClass("FlexStatic");
		this.elem.addClass("FlexColumn");
	}

	_constructProblemName(){
		const input = $("<input>");
		input.attr("spellcheck", false);
		input.attr("placeholder", "Name");
		input.attr("id", "ProblemName");
		input.addClass("Input");
		input.addClass("Text");
		this.elem.append(input);
	}

	_constructTitle(title, parent){
		const variableTitle = $("<div>");
		variableTitle.addClass("FlexStatic");
		variableTitle.addClass("Text");
		variableTitle.addClass("Title");
		variableTitle.text(title);
		parent.append(variableTitle);
	}

	_constructContainer(containerType){
		const container = $("<div>");
		container.addClass("FlexStatic");
		container.addClass("FlexColumn");
		switch(containerType){
			case "Variable":
				this._constructTitle("Variables", container);
				this._constructAddButton("Variable", container);
				const variableContainer = $("<div>");
				variableContainer.attr("id", "SaveVariableContainer");
				variableContainer.addClass("FlexColumn");
				variableContainer.addClass("FlexStatic");
				container.append(variableContainer);
				break;
			case "Constraint":
				container.addClass("Constraint");
				this._constructTitle("Constraints", container);
				this._constructAddButton("Constraint", container);
				const constraintContainer = $("<div>");
				constraintContainer.attr("id", "SaveConstraintContainer");
				constraintContainer.addClass("FlexColumn");
				constraintContainer.addClass("FlexStatic");
				container.append(constraintContainer);
				break;
		}
		this.elem.append(container);
	}

	_constructAddButton(type, parent){
		const button = $("<div>");
		button.text("Add");
		button.addClass("FlexStatic");
		button.addClass("Button");
		button.addClass("ButtonText");
		button.attr("id", `Add${type}Button`);
		switch(type){
			case "Variable":
				button.on("click", function(){
					const variablePage = new VariablePage();
					variablePage.appendTo("#Sidebar");
				});

	        	break;
			case "Constraint":
				button.on("click", function(){
					const constraintPage = new ConstraintPage();
					constraintPage.appendTo("#Sidebar");
				});
	        	break;
			default: throw new Error(`Unknown Button Type "${type}"`);
		}

		parent.append(button);
	}

	_constructPageLine(){
		const pageline = $("<div>");
		pageline.addClass("PageLine");
		this.elem.append(pageline);
	}

	_constructBottomButtons(){
		const container = $("<div>");
		container.addClass("FlexRow");
		container.addClass("FlexStatic");
		container.addClass("FlexCenter");
		container.attr("style", "margin-top: auto");

		const confirmButton = $("<div>");
		confirmButton.text("Confirm");
		confirmButton.addClass("Button");
		confirmButton.addClass("ButtonText");
		confirmButton.addClass("Disabled");
		confirmButton.attr("style", "width: 65%");
		confirmButton.on("click", () => {
			const problemName = $("#ProblemName").val();
			const variables = []
			const constraints = []
			$(".VariablesToBeImported").each((i, elem) => {
				const variable = {
					name: $($(elem).children()[0]).text().split("Name: ").pop(),
					domain: Array.from(VariablePage._parseVariableValues($($(elem).children()[1]).text().split("Domain: ").pop()))
				}
				variables.push(variable);
			});
			$(".ConstraintsToBeImported").each((i, elem) => {
				const constraint = [];
				$($(elem).find($(".Operation"))).each((i, elem) => {
					const operation = {
						operation: $($(elem).children()[0]).text().split("Op: ").pop(),
						v1: $($(elem).children()[1]).text().split("v1: ").pop(),
						v2: $($(elem).children()[2]).text().split("v2: ").pop()
					}
					constraint.push(operation);
				});
				constraints.push(constraint);
			});
			console.log(variables);
			console.log(constraints);
			const problem = new Problem(variables, constraints);
			console.log(JSON.stringify(problem));
			Loader.execCommand("createProblem", { n: $("#ProblemName").val(), d: JSON.stringify(problem) }, true);
			this.elem.remove();
		});

		this.elem.find("#ProblemName").keyup(() => {
			console.log($("#ProblemName").val())
			if($("#ProblemName").val() === "") confirmButton.addClass("Disabled");
			else confirmButton.removeClass("Disabled");
		});

		const cancelButton = $("<div>");
		cancelButton.text("Cancel");
		cancelButton.addClass("Button");
		cancelButton.addClass("ButtonText");
		cancelButton.attr("style", "width: 30%");
		cancelButton.on("click", () => this.elem.remove());
		container.append(cancelButton);
		container.append(confirmButton);
		this.elem.append(container);
	}

	static addImportedVariable(variable){
		const container = $("<div>");
		container.addClass("FlexRow");
		container.addClass("FlexStatic");
		container.addClass("VariablesToBeImported");
		const name = $("<div>");
		name.text("Name: " + variable.name);
		const domain = $("<div>");
		domain.text(" Domain: " + variable.domain.values().next().value);
		let first = true;
		for (let item of variable.domain){
			if(first){ first = false; continue;}
			domain.append(", " + item);
		}
		container.append(name);
		container.append(domain);
		$("#SaveVariableContainer").append(container);
	}

	static addImportedConstraint(constraint){
		const container = $("<div>");
		container.addClass("FlexColumn");
		container.addClass("FlexStatic");
		container.addClass("ConstraintsToBeImported");
		for (let operation of constraint){
			const operationContainer = $("<div>");
			operationContainer.addClass("FlexRow");
			operationContainer.addClass("FlexStatic");
			operationContainer.addClass("Operation");
			const operationDiv = $("<div>");
			operationDiv.html("Op: " + operation.operation);
			const v1 = $("<div>");
			v1.html(" v1: " + operation.v1);
			const v2 = $("<div>");
			v2.html(" v2: " + operation.v2);
			operationContainer.append(operationDiv);
			operationContainer.append(v1);
			operationContainer.append(v2);
			container.append(operationContainer);
		}

		$("#SaveConstraintContainer").append(container);
	}

	appendTo(elemId){
		$(`${elemId}`).append(this.elem);
	}
}
