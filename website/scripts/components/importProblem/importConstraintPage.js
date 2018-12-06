// This is the file that has the functions to create the import page for csps
import Instruction from "../../csp/Instruction.js";
import ImportPage from "./importPage.js"
import Dropdown from "/scripts/components/dropdown.js"

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
		const assemblyDropdown = new Dropdown(Dropdown.nextId("Assembly"), "Select Instruction", Object.values(Instruction.names));
		assemblyDropdown.elem.css("margin", "0.1em 0.3em");
		assemblyDropdown.appendTo(parent);
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
				const operation = Dropdown.getValues(`Assembly${i}`)[0];
				const var1 = $($(elem).children()[1]).val();
				const var2 = $($(elem).children()[2]).val();
				//const rvar = $($(elem).children()[3]).val();
				if (operation !== undefined && var1 !== "" && var2 !== ""){
					const constraint = {
						operation: Dropdown.getValues(`Assembly${i}`)[0],
						v1: var1,
						v2: var2,
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
