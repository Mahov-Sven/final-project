// This is the file that has the functions to create the import page for csps
export default class Notification {
	constructor(){
		this.elem = undefined;
		this.variables = 0;
		this._construct();
	}

	_construct(){
		this._constructRoot();
		this._constructTitle("Constraints:");
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

	_constructEvents(){
		
	}

	appendTo(elemId){
        $(`${elemId}`).append(this.elem);
        // Add element to another element
        // Can add other things here
	}
}