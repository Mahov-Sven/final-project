export default class Notification {
	constructor(title, data){
		this.title = title;
		this.data = data;
		this.elem = undefined;

		this._construct();
	}

	_construct(){
		this._constructRoot();
		this._constructTitle();
		this._constructFields();
		this._constructEvents();
	}

	_constructRoot(){
		this.elem = $("<div>");
		this.elem.addClass("FlexStatic");
		this.elem.addClass("FlexColumn");
		this.elem.addClass("Notification");
	}

	_constructTitle(){
		const title = $("<div>");
		title.addClass("FlexStatic");
		title.addClass("Text");
		title.addClass("NotificationTitle");
		title.text(this.title);
		this.elem.append(title);
	}

	_constructFields(){
		if(typeof this.data === "string"){
			const fieldDiv = $("<div>");
			fieldDiv.addClass("FlexStatic");
			fieldDiv.addClass("Text");
			fieldDiv.text(this.data);
			this.elem.append(fieldDiv);
		} else {
			for(const fieldName in this.data){
				if(fieldName == "success"){
					if(!this.data["success"]) this.elem.addClass("NotificationFailure");
				} else {
					const fieldValue = JSON.stringify(this.data[fieldName]);
					this.elem.append(this._constructField(fieldName, fieldValue));
				}
			}
		}
	}

	_constructField(fieldName, fieldValue){
		const fieldDiv = $("<div>");
		fieldDiv.addClass("FlexStatic");
		fieldDiv.addClass("FlexRow");

		const fieldNameDiv = $("<div>");
		fieldNameDiv.addClass("FlexStatic");
		fieldNameDiv.addClass("Text");
		fieldNameDiv.addClass("NotificationFieldName");
		fieldNameDiv.text(fieldName);

		const fieldValueDiv = $("<div>");
		fieldValueDiv.addClass("FlexDynamic");
		fieldValueDiv.addClass("Text");
		fieldValueDiv.addClass("NotificationFieldValue");
		fieldValueDiv.text(fieldValue);

		fieldDiv.append(fieldNameDiv);
		fieldDiv.append(fieldValueDiv);

		return fieldDiv;
	}

	_constructEvents(){
		this.elem.click(() => {
			if(this.isSuccess) console.log(this.title, this.data);
			else console.warn(this.title, this.data);

			this.elem.stop(true).fadeIn().delay(5000).fadeOut(2000, () => {
				this.elem.remove();
			});
		});
	}

	appendTo(elemId){
		$(`${elemId}`).append(this.elem);

		this.elem.delay(5000).fadeOut(2000, () => {
			this.elem.remove();
		});
	}
}
