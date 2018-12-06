// This is the file that has the functions to create the import page for csps
import Instruction from "../../csp/Instruction.js";
import ImportPage from "./importPage.js"
import Dropdown from "/scripts/components/dropdown.js"
import Constraint from "../../csp/Constraint.js"

export default class ConstraintPage {
	constructor(){
		this.elem = undefined;
		this.constraintPageContainer = undefined;
		this.constraintContainer = undefined;
		this.dropdownId = parseInt(/[0-9]+/.exec(Dropdown.nextId("Assembly"))[0]);
		this._construct();
	}

	_construct(){
		if(this._exists()) return;
		this._constructRoot();
		this._constructTitle("Constraints");
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
		constraintTitle.addClass("Title");
		this.elem.append(constraintTitle);
	}

	_constructConstraintInput(){
		const constraint = $("<div>");
		constraint.addClass("FlexStatic");
		constraint.addClass("FlexRow");
		constraint.addClass("NewConstraint");

		const variable1 = $("<input spellcheck=\"False\" placeholder=\"Var 1\">");
		variable1.addClass("FlexStatic");
		variable1.addClass("FullHeight");
		variable1.addClass("Input");
		variable1.addClass("Text");
		variable1.css("margin", "0.1rem 0.0rem");
		variable1.css("width", "6em");

		const variable2 = $("<input spellcheck=\"False\" placeholder=\"Var 2\">");
		variable2.addClass("FlexStatic");
		variable2.addClass("FullHeight");
		variable2.addClass("Input");
		variable2.addClass("Text");
		variable2.css("margin", "0.1rem 0.0rem");
		variable2.css("width", "6em");

		const returnVal = $("<input spellcheck=\"False\" placeholder=\"Ret Val\">");
		returnVal.addClass("FlexStatic");
		returnVal.addClass("FullHeight");
		returnVal.addClass("Input");
		returnVal.addClass("Text");
		returnVal.css("margin", "0.1rem 0.0rem");
		returnVal.css("width", "6em");

		this._constructAssemblyDropdown(constraint);
		constraint.append(variable1);
		constraint.append(variable2);
		constraint.append(returnVal);
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

		const confirmButton = $("<div>");
		confirmButton.text("Confirm");
		confirmButton.addClass("FlexDynamic");
		confirmButton.addClass("Button");
		confirmButton.addClass("ButtonText");
		confirmButton.css("width", "65%");
		confirmButton.on("click", () => {
			const constraint = new Constraint();
			$(".NewConstraint").each((i, elem) => {
				const operation = Dropdown.getValues(`Assembly${i + this.dropdownId}`)[0];
				const var1 = $($(elem).children()[1]).val();
				const var2 = $($(elem).children()[2]).val();
				let rvar = $($(elem).children()[3]).val();
				if (operation !== undefined && var1 !== "" && var2 !== ""){
					if(rvar === "") rvar = var1;
					const instr = new Instruction(Dropdown.getValues(`Assembly${i + this.dropdownId}`)[0], var1, var2, rvar);
					constraint.addInstruction(instr);
				}
			});

			ImportPage.addImportedConstraint(constraint);
			this.elem.remove();
		});

		const cancelButton = $("<div>");
		cancelButton.text("Cancel");
		cancelButton.addClass("FlexDynamic");
		cancelButton.addClass("Button");
		cancelButton.addClass("ButtonText");
		cancelButton.css("width", "30%");
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
