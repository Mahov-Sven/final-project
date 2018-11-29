// This is the file that has the functions to create the import page for csps
export default class Notification {
	constructor(){
		this.elem = undefined;

		this._construct();
	}

	_construct(){
		this._constructRoot();
		this._constructTitle("Variables:");
		this._constructContainer("Variable");
		this._constructTitle("Constraints:");
		this._constructContainer("Constraint");
		this._constructEvents();
	}

	_constructRoot(){
		this.elem = $("<div>");
		this.elem.addClass("FlexStatic");
		this.elem.addClass("FlexColumn");
	}

	_constructTitle(title){
		const variableTitle = $("<div>");
		variableTitle.text(title);
		this.elem.append(variableTitle);
	}

	_constructContainer(containerType){
		const container = $("<div>");
		if(containerType == "Variable") this._constructVariableInput(container);
		this.elem.append(container);
	}

	_constructVariableInput(container){
		const variable = $("<div>");
		variable.addClass("FlexRow");
		const nameInput = $("<input spellcheck=\"False\" placeholder=\"Name\">");
		nameInput.addClass("FlexStatic");
		const domainInput = $("<input spellcheck=\"False\" placeholder=\"Values\">");
		domainInput.addClass("FlexStatic");
		variable.append(nameInput).append(domainInput);
		container.append(variable);
	}

	_constructEvents(){
		
	}

	appendTo(elemId){
        $(`${elemId}`).append(this.elem);
        // Add element to another element
        // Can add other things here
	}
}