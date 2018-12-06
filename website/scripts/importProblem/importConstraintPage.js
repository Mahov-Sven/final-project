// This is the file that has the functions to create the import page for csps
import Instruction from "../csp/Instruction.js";
import ImportPage from "./importPage.js"

export default class ConstraintPage {
	constructor(){
		this.elem = undefined;
		this.constraintPageContainer = undefined;
		this.constraintContainer = undefined;
		this._construct();
	}

	_construct(){
		if(this._exists()) return;
		this._constructRoot();
		this._constructTitle("Constraints:");
		this._constructAddOperationButton();
		this._constructConstraintPageContainer();
		this._constructConstraintContainer();
		this._constructConstraintInput();
		this._constructBottomButtons();
		this._constructEvents();
	}

	_exists(){
		return $("#ImportConstraintContainer").length !== 0;
	}

	_constructRoot(){
		this.elem = $("<div>");
		this.elem.attr("id", "ImportConstraintContainer");
		this.elem.addClass("FlexStatic");
		this.elem.addClass("FlexColumn");
	}

	_constructConstraintPageContainer(){
		this.constraintPageContainer = $("<div>");
		this.constraintPageContainer.addClass("FlexDynamic");
		this.constraintPageContainer.addClass("FlexColumn");
		this.constraintPageContainer.addClass("Scrollbar");
		this.constraintPageContainer.attr("id", "ConstraintPageContainer");
		this.elem.append(this.constraintPageContainer);
	}

	_constructConstraintContainer(){
		this.constraintContainer = $("<div>");
		this.constraintContainer.addClass("FlexStatic");
		this.constraintContainer.addClass("FlexColumn");
		this.constraintContainer.css("margin", "0 0.5rem");
		this.constraintPageContainer.append(this.constraintContainer);
	}

	_constructTitle(title){
		const constraintTitle = $("<div>");
		constraintTitle.text(title);
		constraintTitle.addClass("FlexStatic");
		constraintTitle.addClass("Text");
		constraintTitle.addClass("Text");
		this.elem.append(constraintTitle);
	}

	_constructConstraintInput(){
		const constraint = $("<div>");
		constraint.addClass("FlexDynamic");
		constraint.addClass("FlexRow");
		constraint.addClass("NewConstraint");

		const variableOne = $("<input spellcheck=\"False\" placeholder=\"Variable One\">");
		variableOne.addClass("FlexStatic");
		variableOne.addClass("FullHeight");
		variableOne.addClass("Input");
		variableOne.addClass("Text");
		variableOne.css("margin", "0.1rem 0.0rem");

		const variableTwo = $("<input spellcheck=\"False\" placeholder=\"Variable Two\">");
		variableTwo.addClass("FlexDynamic");
		variableTwo.addClass("Input");
		variableTwo.addClass("Text");
		variableTwo.css("margin", "0.1rem 0.0rem");

		this._constructAssemblyDropdown(constraint);
		constraint.append(variableOne);
		constraint.append(variableTwo);
		this.constraintContainer.append(constraint);
	}

	_constructAssemblyDropdown(parent){
		const dropdownContainer = $("<select>");
		dropdownContainer.addClass("FlexColumn");
		dropdownContainer.addClass("FlexStatic");
		dropdownContainer.addClass("Dropdown");
		dropdownContainer.addClass("Text");

		const _ = $("<option>");
		_.val("");
		_.attr("selected", true);
		_.attr("disabled", true);
		_.attr("hidden", true);
		_.html("Instruction");
		dropdownContainer.append(_);
		dropdownContainer.addClass("DropdownContent");
		dropdownContainer.addClass("FlexColumn");
		dropdownContainer.addClass("FlexStatic");

		this._constructDropdownOptions(dropdownContainer);
		parent.append(dropdownContainer);
	}

	_constructDropdownOptions(parent){
		for (let instructionKey in Instruction.names){
			const instruction = Instruction.names[instructionKey];
			const instructionDiv = $("<option>");
			instructionDiv.text(instruction[1]);
			instructionDiv.addClass(instruction);
			parent.append(instructionDiv);
		}
	}

	_constructAddOperationButton(){
		const input = $("<div>");
		input.text("Add Operation");
		input.addClass("FlexStatic");
		input.addClass("Button");
		input.addClass("ButtonText");
		input.on("click", () => this._constructConstraintInput());
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
		confirmButton.addClass("Button");
		confirmButton.addClass("ButtonText");
		confirmButton.attr("style", "width: 65%");
		confirmButton.on("click", () => {
			const constraintList = [];
			$(".NewConstraint").each((i, elem) => {
				if ($($($(elem).children()[0]).find(":selected")).text() != "Selected" && $($(elem).children()[1]).val() != "" && $($(elem).children()[2]).val() != ""){
					const constraint = {
						operation: $($($(elem).children()[0]).find(":selected")).text(),
						v1: $($(elem).children()[1]).val(),
						v2: $($(elem).children()[2]).val()
					}
					constraintList.push(constraint);
				}
			});

			ImportPage.addImportedConstraint(constraintList);
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

	_constructEvents(){

	}

	appendTo(elemId){
		$(`${elemId}`).append(this.elem);
	}
}
