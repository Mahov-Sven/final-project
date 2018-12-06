/*
Visualization code for group 9's final project on CSP's.
Base code for force simulation by Anton Vynogradenko
Additional code, helper functions, and modifications by Group 9

To include this visualization script, the following code will be needed somewhere in the html:

<svg width="960" height="600"></svg>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="visualization.js"></script>

Please note, the visualization code is currently called on test variable "abpJSON".
To modify this code, the algorithm will need to supply a javascript object of similar format

*/

var svg = d3.select("svg");

export var simulation;

function abbreviatedProblemToGraph(abpJSON){
	var abp = abpJSON;
	var graph = {};
	graph.nodes = [];
	graph.links = [];


	for(var i = 0; i < abp.variables.length; i++){
		if( abp.variables[i].completion == 1 ){
			var value = abp.variables[i].value;
			var color = [0,0,255];
		} else{
			var value = abp.variables[i].name;
			var color = [255*(1-abp.variables[i].completion),255*abp.variables[i].completion,0];
		}
		var tempNode = {id: i, group: 1, color: color, value: value, name: abp.variables[i].name};
		graph.nodes.push(tempNode);
	}
	for(var i = 0; i < abp.constraints.length; i++){
		var tempColor = [255*Math.random(), 255*Math.random(), 255*Math.random()];
		for(var j = 0; j < abp.constraints[i].contains.length - 1; j++){
			var tempLink = {
				source: lookupIdByName(graph.nodes, abp.constraints[i].contains[j]),
				target: lookupIdByName(graph.nodes, abp.constraints[i].contains[j+1]),
				value: 1,
				color: tempColor
			};
			graph.links.push(tempLink);
		}
	}
	return JSON.stringify(graph);
}

function lookupIdByName(list, name){
	for(var i = 0; i < list.length; i++){
		if(list[i].name == name){
			return list[i].id;
		}
	}
	console.log("failed");
	console.log(list);
	console.log(name);
	return -1;
}


export function run(abpJSON){

	svg.selectAll("*").remove();

	var graph = JSON.parse(abbreviatedProblemToGraph(abpJSON));

	var link = svg.append("g")
		.attr("class", "links")
		.selectAll("line")
		.data(graph.links)
		.enter()
		.append("line")
		.style("stroke-width", "5px")
		.style("stroke", function(d) {
			return "rgb(" + d.color[0] + "," + d.color[1] + "," + d.color[2] + ")";
		});

	var node = svg.append("g")
		.attr("class", "nodes")
		.selectAll("circle")
		.data(graph.nodes)
		.enter()
		.append("circle")
		.attr("r", 16)
		.style("fill", function(d) {
			return "rgb(" + d.color[0] + "," + d.color[1] + "," + d.color[2] + ")";
		})
		.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended));

	var label = svg.append("g")
		.attr("class", "labels")
		.selectAll("text")
		.data(graph.nodes)
		.enter()
		.append("text")
		.attr("class", "label")
		.attr("pointer-events", "none")
		.style("font-size", "10px")
		.style("fill", function(d) {
			if( d.color[0] < 128 || d.color[1] < 128 ){
				return "rgb(255,255,255)";
			} else{
				return "rgb(10,10,10)";
			}
		})
		.text(function(d) { return d.value; });

	simulation = d3.forceSimulation(graph.nodes)
		.force("link", d3.forceLink(graph.links).id((d) => d.id))
		.force('charge', d3.forceManyBody()
			.strength(-400)
			.theta(.8)
			.distanceMax(150))
		.force('collision', d3.forceCollide().radius(d => d.radius))
		.force("center", d3.forceCenter($("#VisualizationSpace").width() / 2, $("#VisualizationSpace").height() / 2))
		.on("tick", ticked)

	function ticked() {
		link
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		node
			.attr("r", 16)
			.style("stroke", "#424242")
			.style("stroke-width", "1px")
			.attr("cx", function (d) { return d.x+5; })
			.attr("cy", function(d) { return d.y-3; });

		label
    		.attr("x", function(d) { return d.x; })
			.attr("y", function (d) { return d.y; });
	}
}

function dragstarted(d) {
	if (!d3.event.active) simulation.alphaTarget(0.3).restart()
	d.fx = d.x
	d.fy = d.y
}

function dragged(d) {
	d.fx = d3.event.x
	d.fy = d3.event.y
}

function dragended(d) {
	if (!d3.event.active) simulation.alphaTarget(0);
	d.fx = null;
	d.fy = null;
}
