import ImportPage from "./importPage.js"

export default class VariablePage {
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
		variableTitle.addClass("Text");
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
		nameInput.addClass("Input");

		const domainInput = $("<input spellcheck=\"False\" placeholder=\"Values\">");
		domainInput.addClass("FlexStatic");
		domainInput.addClass("Variable");
		domainInput.addClass("Domain");
		domainInput.addClass("Input");
		variable.append(nameInput).append(domainInput);
		this.variableContainer.append(variable);
	}

	_constructAddVariableButton(){
		const input = $("<input type=\"button\" class=\"button\" value=\"Add Variable\"/>");
		input.addClass("Button");
		input.addClass("ButtonText");
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
		confirmButton.addClass("Button");
		confirmButton.addClass("ButtonText");
		confirmButton.attr("style", "width: 65%");
		confirmButton.on("click", function(){
			$("#variablePageContainer :first").children().each(function(i, elem){
				if ($($(elem).children()[0]).val() != "" && $($(elem).children()[1]).val() != ""){
					const variable = {
						name: $($(elem).children()[0]).val(),
						domain: $($(elem).children()[1]).val()
					}
					const importPage = new ImportPage();
					importPage.importedVariable(variable);
				}
			});
			$("#ImportPageContainer").hide();
		});
		const cancelButton = $("<input type=\"button\" class=\"button\" value=\"Cancel\"/>");
		cancelButton.addClass("Button");
		cancelButton.addClass("ButtonText");
		cancelButton.attr("style", "width: 30%");
		cancelButton.on("click", () => $("#ImportPageContainer").hide());
		container.append(cancelButton);
		container.append(confirmButton);
		this.elem.append(container);
	}

	_constructEvents(){

	}

	_parseVariableValues(inString){
		const valSet = new Set();
		const valueArray = inString.split(",");
		for(const valStr of valueArray){
			const valueRange = valStr.split("-");
			if(valueRange.length === 1){
				const newVal = parseInt(valStr);
				if(isNaN(newVal))
					throw new Error(`The value "${valStr}" given for a variable could not be parsed.`);

				valSet.add(newVal);
			} else if(valueRange.length === 2){
				const startVal = parseInt(valueRange[0]);
				const endVal = parseInt(valueRange[1]);
				if(isNaN(startVal) || isNaN(endVal) || startVal > endVal)
					throw new Error(`The value "${valStr}" given for a variable could not be parsed.`);

				for(let i = startVal; i <= endVal; i++) valSet.add(i);
			} else throw new Error(`The value "${valStr}" given for a variable could not be parsed.`);
		}
		return valSet;
	}

	appendTo(elemId){
        $(`${elemId}`).append(this.elem);
        // Add element to another element
        // Can add other things here
	}
}
