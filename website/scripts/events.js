import * as Loader from "./loader.js"
import * as ImportCSP from "./importCSP.js"

let activeBannerButton = -1;

export function init() {

	$("#CommandInput").keypress((e) => {
	    if(e.which !== 13) return;
		Loader.request($("#CommandInput").val(), true);
	});

	$("#ImportInput").on("click", function(){
		ImportCSP.createPage();
		$("#ImportContainer").show();
	});

	$("#ImportContainer").hide();
}
