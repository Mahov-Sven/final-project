import ImportPage from "./importPage.js"

export default class VariablePage {
	constructor(){
		this.elem = undefined;
		this.variablePageContainer = undefined;
		this.variableContainer = undefined;
		this._construct();
	}

	_construct(){
		if(this._exists()) return;
		this._constructRoot();
		this._constructTitle("Variables");
		this._constructAddVariableButton();
		this._constructVariablePageContainer();
		this._constructVariableContainer();
		this._constructVariableInput();
		this._constructBottomButtons();
		this._constructEvents();
	}



	_exists(){
		return $("#ImportVariableContainer").length !== 0;
	}

	_constructRoot(){
		this.elem = $("<div>");
		this.elem.attr("id", "ImportVariableContainer");
		this.elem.addClass("FlexStatic");
		this.elem.addClass("FlexColumn");
	}

	_constructVariablePageContainer(){
		this.variablePageContainer = $("<div>");
		this.variablePageContainer.addClass("FlexDynamic");
		this.variablePageContainer.addClass("FlexColumn");
		this.variablePageContainer.addClass("Scrollbar");
		this.variablePageContainer.attr("id", "VariablePageContainer");
		this.elem.append(this.variablePageContainer);
	}

	_constructVariableContainer(){
		this.variableContainer = $("<div>");
		this.variableContainer.addClass("FlexStatic");
		this.variableContainer.addClass("FlexColumn");
		this.variableContainer.css("margin", "0 0.5rem");
		this.variablePageContainer.append(this.variableContainer);
	}

	_constructTitle(title){
		const variableTitle = $("<div>");
		variableTitle.addClass("FlexStatic");
		variableTitle.addClass("Text");
		variableTitle.addClass("Title");
		variableTitle.text(title);
		this.elem.append(variableTitle);
	}

	_constructVariableInput(){
		const variable = $("<div>");
		variable.addClass("FlexDynamic");
		variable.addClass("FlexRow");
		variable.addClass("NewVariable");

		const nameInput = $("<input spellcheck=\"False\" placeholder=\"Name\">");
		nameInput.addClass("FlexStatic");
		nameInput.addClass("FullHeight");
		nameInput.addClass("VariableName");
		nameInput.addClass("Input");
		nameInput.addClass("Text");
		nameInput.css("margin", "0.1rem 0.0rem");
		nameInput.css("width", "6em");

		const domainInput = $("<input spellcheck=\"False\" placeholder=\"Values\">");
		domainInput.addClass("FlexDynamic");
		domainInput.addClass("VariableDomain");
		domainInput.addClass("Input");
		domainInput.addClass("Text");
		domainInput.css("margin", "0.1rem 0.0rem");
		domainInput.css("width", "12em");

		variable.append(nameInput);
		variable.append(domainInput);
		this.variableContainer.append(variable);
	}

	_constructAddVariableButton(){
		const input = $("<div>");
		input.text("Add Variable");
		input.addClass("FlexStatic");
		input.addClass("Button");
		input.addClass("ButtonText");
		input.on("click", () => this._constructVariableInput());
		this.elem.append(input);
	}

	_constructBottomButtons(){

		const container = $("<div>");
		container.addClass("FlexRow");
		container.addClass("FlexStatic");
		container.addClass("FlexCenter");
		container.attr("style", "margin-top: auto");

		const confirmButton = $("<div>");
		confirmButton.text("Confirm");
		confirmButton.addClass("FlexDynamic");
		confirmButton.addClass("Button");
		confirmButton.addClass("ButtonText");
		confirmButton.attr("style", "width: 65%");
		confirmButton.on("click", () => {
			$(".NewVariable").each((i, elem) => {
				if ($($(elem).children()[0]).val() != "" && $($(elem).children()[1]).val() != ""){
					const variable = {
						name: $($(elem).children()[0]).val(),
						domain: VariablePage._parseVariableValues($($(elem).children()[1]).val())
					}
					ImportPage.addImportedVariable(variable);
				}
			});
			this.elem.remove();
		});
		const cancelButton = $("<div>");
		cancelButton.text("Cancel");
		cancelButton.addClass("FlexDynamic");
		cancelButton.addClass("Button");
		cancelButton.addClass("ButtonText");
		cancelButton.attr("style", "width: 30%");
		cancelButton.on("click", () => this.elem.remove());
		container.append(cancelButton);
		container.append(confirmButton);

		this.elem.append(container);
	}

	_constructEvents(){

	}

	static _parseVariableValues(inString){
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
	}
}
