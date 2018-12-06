// This is the file that has the functions to create the import page for csps
import VariablePage from "./importVariablePage.js"
import ConstraintPage from "./importConstraintPage.js"
import * as Loader from "../../loader.js"
import Problem from "../../csp/Problem.js"
import Notification from "../notification.js"
import Session from "/scripts/session.js"

export default class ImportPage {
	constructor(){
		this.elem = undefined;
		this.problem = new Problem();
		this._construct();
	}

	_construct(){
		if(this._exists()) return;
		this._constructRoot();
		this._constructContainer();
		this._constructBottomButtons();

		ImportPage.page = this;
	}

	_exists(){
		return $("#ImportOverviewContainer").length !== 0;
	}

	_constructRoot(){
		this.elem = $("<div>");
		this.elem.attr("id", "ImportOverviewContainer");
		this.elem.addClass("FlexStatic");
		this.elem.addClass("FlexColumn");
		this.elem.addClass("FlexCenter");
		this.elem.addClass("Scrollbar");
	}

	_constructProblemName(parent){
		const input = $("<input>");
		input.attr("spellcheck", false);
		input.attr("placeholder", "Name");
		input.attr("id", "ProblemName");
		input.addClass("Input");
		input.addClass("Text");
		parent.append(input);
	}

	_constructTitle(title, parent){
		const variableTitle = $("<div>");
		variableTitle.addClass("FlexStatic");
		variableTitle.addClass("Text");
		variableTitle.addClass("Title");
		variableTitle.text(title);
		parent.append(variableTitle);
	}

	_constructContainer(){

		const page = $("<div>");
		page.addClass("FlexDynamic");
		page.addClass("FlexColumn");
		page.addClass("FullWidth");
		page.addClass("Scrollbar");

		const container = $("<div>");
		container.addClass("FlexStatic");
		container.addClass("FlexColumn");
		container.css("margin", "0 0.5rem");

		this._constructTitle("Problem Name", container);
		this._constructProblemName(container);

		this._constructPageLine(container);

		this._constructTitle("Variables", container);
		this._constructAddButton("Variable", container);
		const variableContainer = $("<div>");
		variableContainer.attr("id", "SaveVariableContainer");
		variableContainer.addClass("FlexColumn");
		variableContainer.addClass("FlexStatic");
		container.append(variableContainer);

		this._constructPageLine(container);

		container.addClass("Constraint");
		this._constructTitle("Constraints", container);
		this._constructAddButton("Constraint", container);
		const constraintContainer = $("<div>");
		constraintContainer.attr("id", "SaveConstraintContainer");
		constraintContainer.addClass("FlexColumn");
		constraintContainer.addClass("FlexStatic");
		container.append(constraintContainer);

		page.append(container);
		this.elem.append(page);
	}

	_constructAddButton(type, parent){
		const button = $("<div>");
		button.text("Add");
		button.addClass("Button");
		button.addClass("ButtonText");
		button.attr("id", `Add${type}Button`);
		switch(type){
			case "Variable":
				button.on("click", function(){
					const variablePage = new VariablePage();
					variablePage.appendTo("#Sidebar");
					$("#VisualizationSpace").trigger("_resize");
				});

	        	break;
			case "Constraint":
				button.on("click", function(){
					const constraintPage = new ConstraintPage();
					constraintPage.appendTo("#Sidebar");
					$("#VisualizationSpace").trigger("_resize");
				});
	        	break;
			default: throw new Error(`Unknown Button Type "${type}"`);
		}

		parent.append(button);
	}

	_constructPageLine(parent){
		const pageline = $("<div>");
		pageline.addClass("PageLine");
		parent.append(pageline);
	}

	_constructSpacer(){
		const spacer = $("<div>");
		spacer.addClass("FlexDynamic");
		this.elem.append(spacer);
	}

	_constructBottomButtons(){
		const container = $("<div>");
		container.addClass("FlexRow");
		container.addClass("FlexStatic");
		container.addClass("FlexCenter");
		container.addClass("FullWidth");

		const confirmButton = $("<div>");
		confirmButton.text("Confirm");
		confirmButton.addClass("FlexDynamic");
		confirmButton.addClass("Button");
		confirmButton.addClass("ButtonText");
		confirmButton.addClass("Disabled");
		confirmButton.attr("style", "width: 65%");
		confirmButton.on("click", () => {
			console.log(this.problem);
			console.log(JSON.stringify(this.problem));
			Loader.execCommand("createProblem", { n: $("#ProblemName").val(), d: JSON.stringify(this.problem) }, true);
			Session.setProblem(this.problem);
			this.elem.remove();
		});

		this.elem.find("#ProblemName").keyup(() => {
			if($("#ProblemName").val() === "") confirmButton.addClass("Disabled");
			else confirmButton.removeClass("Disabled");
		});

		const cancelButton = $("<div>");
		cancelButton.text("Cancel");
		cancelButton.addClass("FlexDynamic");
		cancelButton.addClass("Button");
		cancelButton.addClass("ButtonText");
		cancelButton.attr("style", "width: 30%");
		cancelButton.on("click", () => {
			this.elem.remove();
			$("#VisualizationSpace").trigger("_resize");
		});
		container.append(cancelButton);
		container.append(confirmButton);
		this.elem.append(container);
	}

	static addImportedVariable(variable){
		ImportPage.page.problem.addVariable(variable.name, variable.domain);

		let container = undefined;
		if($(`#Variable${variable.name}`).length === 0){
			container = $("<div>");
			container.addClass("FlexColumn");
			container.addClass("FlexStatic");
			container.addClass("VariablesToBeImported");
			container.attr("id", `Variable${variable.name}`);
		} else {
			container = $(`#Variable${variable.name}`);
			container.empty();
		}

		let varDiv = $("<div>");
		varDiv.addClass("FlexStatic");
		varDiv.addClass("Text");
		let varText = `${variable.name} = { `;

		for (let item of variable.domain){
			const nextText = `${item}, `;
			if(varText.length + nextText.length > 30){
				varDiv.text(varText.slice(0, -1));
				container.append(varDiv);

				varDiv = $("<div>");
				varDiv.addClass("FlexStatic");
				varDiv.addClass("Text");
				varText = "";
			}
			varText += nextText;
		}

		varDiv.text(varText.slice(0, -2) + ' }');
		container.append(varDiv);

		$("#SaveVariableContainer").append(container);
	}

	static addImportedConstraint(constraint){
		ImportPage.page.problem.addConstraint(constraint);

		const container = $("<div>");
		container.addClass("FlexColumn");
		container.addClass("FlexStatic");
		container.addClass("ConstraintsToBeImported");
		for (let instr of constraint.instructions){
			const instrContainer = $("<div>");
			instrContainer.addClass("FlexRow");
			instrContainer.addClass("FlexStatic");
			instrContainer.addClass("Operation");
			const instrDiv = $("<div>");
			instrDiv.addClass("Text");
			instrDiv.text(`${instr.rvar} = ${instr.name}(${instr.var1}, ${instr.var2})`);
			instrContainer.append(instrDiv);
			container.append(instrContainer);
		}

		$("#SaveConstraintContainer").append(container);
	}

	appendTo(elemId){
		$(`${elemId}`).append(this.elem);
	}
}
