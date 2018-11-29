import Import from "./import.js"

export function init(){}

export function createPage(){
    const importPage = new Import();
    importPage.appendTo("#ImportContainer");
}