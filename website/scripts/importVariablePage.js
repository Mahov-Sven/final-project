// This is the file that has the functions to create the import page for csps
export default class Notification {
	constructor(){
		this.elem = undefined;
		this.variables = 0;
		this._construct();
	}

	_construct(){
		this._constructRoot();
		this._constructTitle("Variables:");
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

	_constructVariableInput(container){
		const variable = $("<div>");
		variable.addClass("FlexStatic");
		variable.addClass("FlexRow");
		variable.addClass("Variable");

		const nameInput = $("<input spellcheck=\"False\" placeholder=\"Name\">");
		nameInput.addClass("FlexStatic");
		nameInput.addClass("Variable");
		nameInput.addClass("Name");
		
		const domainInput = $("<input spellcheck=\"False\" placeholder=\"Values\">");
		domainInput.addClass("FlexStatic");
		domainInput.addClass("Variable");
		domainInput.addClass("Domain");
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