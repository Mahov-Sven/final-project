import Notification from "./components/notification.js"
import * as Visualization from "./visualization.js"

export function init(){}

export function request(postStr, notify=false){
	return new Promise((resolve, reject) => {
		const req = new XMLHttpRequest();
		req.onreadystatechange = () => {
			if(req.readyState == 4 && req.status == 200){
				console.log(req.responseText);
				let responseObj = {};
				try {
					responseObj = JSON.parse(req.responseText);
				} catch(e){
					responseObj.data = req.responseText;
				}
				responseObj.request = postStr;
				if(notify) Notification.create(`Request: ${postStr}`, responseObj);
				resolve(responseObj);
			}
		}
		if(postStr[0] === '/') postStr = postStr.substring(1);
		req.open("POST", encodeURIComponent(postStr), true);
		req.send();
	});
}

export async function execCommand(commandName, commandArgs={}, notify=false){
	let argsStr = "";
	for(const commandArgName in commandArgs){
		const commandArg = encodeURIComponent(`${commandArgs[commandArgName]}`);
		argsStr += `${commandArgName}=${commandArg}&`;
	}
	return await request(`/${commandName}?${argStr.substring(0, argsStr.length - 1)}`);
}
