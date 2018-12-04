// This is the file that has the functions to create the import page for csps
import Instruction from "./csp/Instruction.js";

export default class ConstraintPage {
	constructor(){
		this.elem = undefined;
		this._construct();
	}

	_construct(){
		this._constructRoot();
		this._constructTitle("Constraints:");
		this._constructConstraintInput();
		this._constructEvents();
	}

	_constructRoot(){
		this.elem = $("<div>");
		this.elem.addClass("FlexStatic");
		this.elem.addClass("FlexColumn");
	}

	_constructTitle(title){
		const constraintTitle = $("<div>");
		constraintTitle.text(title);
		constraintTitle.addClass("Text");
		this.elem.append(constraintTitle);
	}

	_constructConstraintInput(){
		const constraint = $("<div>");
		constraint.addClass("FlexDynamic");
		constraint.addClass("FlexRow");
		constraint.addClass("NewConstraint");

		this._constructAssemblyDropdown(constraint);

		// const domainInput = $("<input spellcheck=\"False\" placeholder=\"Values\">");
		// domainInput.addClass("FlexDynamic");
		// domainInput.addClass("VariableDomain");
		// domainInput.addClass("Input");
		// domainInput.addClass("Text");
		// domainInput.css("margin", "0.1rem 0.0rem");

		// constraint.append(domainInput);
		this.elem.append(constraint);
	}

	_constructAssemblyDropdown(parent){
		//const container = $("<div>");
		//dropdownContainer.addClass("FlexStatic");
		//dropdownContainer.addClass("VariableName");
		//container.addClass("Text");
		//container.addClass("DropdownContainer");

		// const dropdownButton = $("<div>");
		//dropdownButton.attr("type", "button");
		//dropdownButton.on("click", () => $(".DropdownContent").toggle());

		const dropdownContainer = $("<select>");
		dropdownContainer.addClass("FlexColumn");
		dropdownContainer.addClass("FlexStatic");
		dropdownContainer.addClass("Dropdown");
		dropdownContainer.addClass("Text");

		const _ = $("<option>");
		_.val("");
		_.attr("selected");
		_.attr("disabled");
		_.attr("hidden");
		_.html("Instruction");

		this._constructDropdownOptions(dropdownContainer);

		//dropdownButton.append(dropdownContainer);
		parent.append(dropdownContainer);

		//parent.append(container);
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

	_constructEvents(){

	}

	appendTo(elemId){
		$(`${elemId}`).append(this.elem);
		// Add element to another element
		// Can add other things here
	}
}
