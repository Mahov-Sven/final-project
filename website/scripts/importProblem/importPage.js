// This is the file that has the functions to create the import page for csps
import VariablePage from "./importVariablePage.js"
import ConstraintPage from "./importConstraintPage.js"

export default class ImportPage {
	constructor(){
		this.elem = undefined;
		this._construct();
	}

	_construct(){
		this._constructRoot();
		this._constructContainer("Variable");
		this._constructContainer("Constraint");
		this._constructBottomButtons();
	}

	_constructRoot(){
		this.elem = $("<div>");
		this.elem.attr("id", "ImportOverviewContainer");
		this.elem.addClass("FlexDynamic");
		this.elem.addClass("FlexColumn");
	}

	_constructTitle(title, parent){
		const variableTitle = $("<div>");
		variableTitle.addClass("FlexStatic");
		variableTitle.addClass("Text");
		variableTitle.text(title);
		parent.append(variableTitle);
	}

	_constructContainer(containerType){
		const container = $("<div>");
		container.addClass("FlexStatic");
		container.addClass("FlexColumn");
		switch(containerType){
			case "Variable":
				this._constructTitle("Variables:", container);
				this._constructAddButton("Variable", container);
				const variableContainer = $("<div>");
				variableContainer.attr("id", "SaveVariableContainer");
				variableContainer.addClass("FlexColumn");
				variableContainer.addClass("FlexStatic");
				container.append(variableContainer);
				break;
			case "Constraint":
				container.addClass("Constraint");
				this._constructTitle("Constraints:", container);
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
		confirmButton.attr("style", "width: 65%");
		confirmButton.on("click", () => {
			const variables = []
			const constraints = []
			$(".VariablesToBeImported").each((i, elem) => {
				const variablePage = new VariablePage();
				const variable = {
					name: $($(elem).children()[0]).text().split("Name: ").pop(),
					domain: variablePage._parseVariableValues($($(elem).children()[1]).text().split("Domain: ").pop())
				}
				variables.push(variable);
			});
			$(".ConstraintsToBeImported").each((i, elem) => {
				const constraint = {
					operation: $($(elem).children()[0]).text().split("Op: ").pop(),
					v1: $($(elem).children()[1]).text().split("v1: ").pop(),
					v2: $($(elem).children()[2]).text().split("v2: ").pop()
				}
				constraints.push(constraint);
			});
			console.log(variables);
			console.log(constraints);
			console.log(this);
			this.elem.remove();
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

	importedVariable(variable){
		const container = $("<div>");
		container.addClass("FlexRow");
		container.addClass("FlexStatic");
		container.addClass("VariablesToBeImported");
		const name = $("<div>");
		name.html("Name: " + variable.name);
		const domain = $("<div>");
		domain.html(" Domain: " + variable.domain.values().next().value);
		let first = true;
		for (let item of variable.domain){
			if(first){ first = false; continue;}
			domain.append(", " + item);
		}
		container.append(name);
		container.append(domain);
		$("#SaveVariableContainer").append(container);
	}

	importedConstraint(constraint){
		const container = $("<div>");
		container.addClass("FlexRow");
		container.addClass("FlexStatic");
		container.addClass("ConstraintsToBeImported");
		const operation = $("<div>");
		operation.html("Op: " + constraint.operation);
		const v1 = $("<div>");
		v1.html(" v1: " + constraint.v1);
		const v2 = $("<div>");
		v2.html(" v2: " + constraint.v2);

		container.append(operation);
		container.append(v1);
		container.append(v2);
		$("#SaveConstraintContainer").append(container);
	}

	appendTo(elemId){
		$(`${elemId}`).append(this.elem);
	}
}
