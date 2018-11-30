import ImportPage from "./importPage.js"

export function init(){}

export function createPage(){
    const importPage = new ImportPage();
    importPage.appendTo("#ImportOverviewContainer");
}