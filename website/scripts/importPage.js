// This is the file that has the functions to create the import page for csps
import * as ImportCSP from "./importCSP.js"

export default class Notification {
	constructor(){
		this.elem = undefined;
		this.variables = 0;
		this.constraints = 0;
		this._construct();
	}

	_construct(){
		this._constructRoot();
		this._constructContainer("Variable");
		this._constructContainer("Constraint");
	}

	_constructRoot(){
		this.elem = $("<div>");
		this.elem.addClass("FlexStatic");
		this.elem.addClass("FlexColumn");
		this.elem.attr("id", "ImportPage");
	}

	_constructTitle(title, parent){
		const variableTitle = $("<div>");
		variableTitle.text(title);
		parent.append(variableTitle);
	}

	_constructContainer(containerType){
		const container = $("<div>");
		container.addClass("FlexStatic");
		container.addClass("FlexColumn");
		container.addClass("ImportPageContainer");
		switch(containerType){
			case "Variable":
				this._constructTitle("Variables:", container);
				this._constructAddButton("Variable", container);
			break;
			case "Constraint":
				this._constructTitle("Constraints:", container);
				this._constructAddButton("Constraint", container);
			break;
		}
		this.elem.append(container);
	}

	_constructAddButton(type, parent){
		const button = $("<input type=\"button\" value=\"Add\"/> ");
		button.addClass("Import");
		button.addClass("Button");
		button.addClass("HorizontalCenter");
		button.attr("id", `Add${type}Button`);
		button.on("click", function(){
			ImportCSP.createPage(type);
		});
		parent.append(button);
	}

	appendTo(elemId){
        $(`${elemId}`).append(this.elem);
	}
}