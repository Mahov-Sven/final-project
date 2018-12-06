export default class Dropdown {
	constructor(id, title, rows){
		this.id = id;
		this.title = title;
		this.rows = rows;
		this.selectedIndex = -1;
		this.elem = undefined;

		this._construct();
	}

	_construct(){
		this._constructRoot();
		this._constructSelected();
		this._constructSelection();
		this._constructEvents();
	}

	_constructRoot(){
		this.elem = $("<div>");
		this.elem.addClass("FlexStatic");
		this.elem.addClass("FlexColumn");
		this.elem.addClass("Dropdown");
		this.elem.attr("id", `${this.id}Dropdown`);
	}

	_constructSelected(){
		const selectedElem = $("<div>");
		selectedElem.addClass("FlexStatic");
		selectedElem.addClass("DropdownSelection");
		selectedElem.addClass("ButtonText");
		selectedElem.text(this.title);
		Dropdown.values[this.id] = undefined;

		this.elem.append(selectedElem);
	}

	_constructSelection(){
		const noSizeContainer = $("<div>");
		noSizeContainer.addClass("FlexStatic");
		noSizeContainer.css("position", "relative");

		const optionContainer = $("<div>");
		optionContainer.addClass("FlexColumn");
		optionContainer.addClass("DropdownContainer");
		optionContainer.css("position", "absolute");

		for(const row of this.rows){
			const option = $("<div>");
			option.addClass("FlexStatic");
			option.addClass("ButtonText");
			option.addClass("TextLeft");
			option.addClass("DropdownOption");
			option.text(row[0]);

			optionContainer.append(option);
		}

		noSizeContainer.append(optionContainer);
		this.elem.append(noSizeContainer);
	}

	_constructEvents(){
		const selectedElem = this.elem.find(".DropdownSelection");
		const optionContainer = this.elem.find(".DropdownContainer");
		const options = this.elem.find(".DropdownOption");

		selectedElem.click(() => {
			optionContainer.toggle();
			if(this.selectedIndex !== -1){
				if(selectedElem.text() === this.rows[this.selectedIndex][0])
					selectedElem.text(this.rows[this.selectedIndex][1]);
				else selectedElem.text(this.rows[this.selectedIndex][0]);
			}
		});

		options.each((i, elem) => {
			$(elem).click(() => {
				selectedElem.text(this.rows[i][1]);
				Dropdown.values[this.id] = this.rows[i][2];
				this.selectedIndex = i;
				optionContainer.hide();
			})
		});

		optionContainer.hide();
	}

	static init(){
		Dropdown.values = {};
	}

	static getValues(id){
		const values = [];
		if(Dropdown.values.hasOwnProperty(id)){
			values.push(Dropdown.values[id]);
		} else {
			let count = 0;
			let currentId = `${id}${count}`;
			while(Dropdown.values.hasOwnProperty(currentId)){
				values.push(Dropdown.values[currentId]);
				currentId = `${id}${++count}`;
			}
		}

		return values;
	}

	static nextId(id){
		let count = 0;
		let currentId = `${id}${count}`;
		while(Dropdown.values.hasOwnProperty(currentId))
			currentId = `${id}${++count}`;
		return currentId;
	}

	value(){
		return this.selectedValue;
	}

	insertBefore(elem){
		if(typeof elem === "string") $(`${elem}`).before(this.elem);
		else elem.before(this.elem);
	}

	appendTo(elem){
		if(typeof elem === "string") $(`${elem}`).append(this.elem);
		else elem.append(this.elem);
	}
}
