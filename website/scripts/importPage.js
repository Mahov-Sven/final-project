// This is the file that has the functions to create the import page for csps
import * as ImportCSP from "./importCSP.js"

export default class ImportPage {
	constructor(){
		this.elem = undefined;
		this.variables = 0;
		this.constraints = 0;
		this._construct();
	}

	_construct(){
		this._constructRoot();
		if(this.elem.children().length !== 0) return;
		this._constructContainer("Variable");
		this._constructContainer("Constraint");
	}

	_constructRoot(){
		this.elem = $("#ImportOverviewContainer");
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
				break;
		}
		this.elem.append(container);
	}

	_constructAddButton(type, parent){
		const button = $("<input type=\"button\" value=\"Add\"/> ");
		button.addClass("FlexStatic");
		button.addClass("Button");
		button.addClass("ButtonText");
		button.attr("id", `Add${type}Button`);
		button.on("click", function(){
			ImportCSP.createPage(type);
		});
		parent.append(button);
	}

	importedVariable(variable){
		const container = $("<div>");
		container.addClass("FlexRow");
		container.addClass("FlexStatic");
		const name = $("<div>");
		name.html("Name: " + variable.name);
		const domain = $("<div>");
		domain.html(" Domain: " + variable.domain);

		container.append(name);
		container.append(domain);
		$("#SaveVariableContainer").append(container);
	}

	appendTo(elemId){
		$(`${elemId}`).append(this.elem);
	}
}
