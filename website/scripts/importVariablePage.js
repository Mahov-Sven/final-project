// This is the file that has the functions to create the import page for csps
export default class Notification {
	constructor(){
		this.elem = undefined;
		this.variablePageContainer = undefined;
		this.variableContainer = undefined;
		this._construct();
	}

	_construct(){
		this._constructRoot();
		this._constructTitle("Variables:");
		this._constructVariablePageContainer();
		this._constructVariableContainer();
		this._constructVariableInput();
		this._constructAddVariableButton();
		this._constructBottomButtons();
		this._constructEvents();
	}

	_constructRoot(){
		this.elem = $("<div>");
		this.elem.addClass("FlexStatic");
		this.elem.addClass("FlexColumn");
		this.elem.attr("overflow", "auto");
	}

	_constructVariablePageContainer(){
		this.variablePageContainer = $("<div>");
		this.variablePageContainer.addClass("FlexGrow");
		this.variablePageContainer.addClass("FlexColumn");
		this.variablePageContainer.attr("id", "variablePageContainer");
		this.elem.append(this.variablePageContainer);
	}

	_constructTitle(title){
		const variableTitle = $("<div>");
		variableTitle.text(title);
		this.elem.append(variableTitle);
	}

	_constructVariableContainer(){
		const variableContainer = $("<div>");
		this.variableContainer = variableContainer;
		this.variablePageContainer.append(variableContainer);
	}

	_constructVariableInput(){
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
		this.variableContainer.append(variable);
	}

	_constructAddVariableButton(){
		const input = $("<input type=\"button\" class=\"button\" value=\"Add Variable\"/>");
		input.on("click", () => this._constructVariableInput());
		this.variablePageContainer.append(input);
	}

	_constructBottomButtons(){
		const container = $("<div>");
		container.addClass("FlexRow");
		container.addClass("FlexStatic");
		container.addClass("FlexCenter");
		container.attr("style", "margin-top: auto");
		const confirmButton = $("<input type=\"button\" class=\"button\" value=\"Confirm\"/>");
		confirmButton.attr("style", "width: 65%");
		confirmButton.on("click", function(){
			$("#variablePageContainer :first").children().each(function(i, elem){
				const variable = {
					name: $($(elem).children()[0]).val(),
					domain: $($(elem).children()[1]).val()
				}
				console.log(variable);
			});
		});
		const cancelButton = $("<input type=\"button\" class=\"button\" value=\"Cancel\"/>");
		cancelButton.attr("style", "width: 30%");
		cancelButton.on("click", () => $("#ImportPageContainer").hide());
		container.append(cancelButton);
		container.append(confirmButton);
		this.elem.append(container);
	}

	_constructEvents(){
		
	}

	appendTo(elemId){
        $(`${elemId}`).append(this.elem);
        // Add element to another element
        // Can add other things here
	}
}