export function init(){}

export async function loadFile(fileLocation){
	return new Promise((resolve, reject) => {
		$.get(fileLocation, (file) => {
			resolve(file)
		});
	});
}
