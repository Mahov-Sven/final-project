import ImportPage from "./importPage.js"
import ConstraintPage from "./importConstraintPage.js"
import VariablePage from "./importVariablePage.js"

export function init(){}

export function createPage(page){
	switch(page){
		case "Main":
			$("#ImportOverviewContainer").empty();
			$("#ImportOverviewContainer").show();
			const importPage = new ImportPage();
			importPage.appendTo("#ImportOverviewContainer");
			$("#ImportSpace").show();
        	break;
		case "Variable":
			$("#ImportPageContainer").empty();
			$("#ImportPageContainer").show();
			const variablePage = new VariablePage();
			variablePage.appendTo("#ImportPageContainer");
			$("#ImportSpace").show();
        	break;
		case "Constraint":
			$("#ImportPageContainer").empty();
			$("#ImportPageContainer").show();
			const constraintPage = new ConstraintPage();
			constraintPage.appendTo("#ImportPageContainer");
			$("#ImportSpace").show();
        	break;
		default: throw new Error(`Unknown Page ${page}`);
	}
}
