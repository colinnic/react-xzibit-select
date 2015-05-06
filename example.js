var React = require('react/addons');
var XzibitSelect = require('./lib/react-xzibit-select.jsx');
var testData = require("./lib/test-data");
var _ = require("lodash");


var DemoXzibitSelect = React.createClass({
	options: function() {
		return testData.fruits;
	},
	filterDimensions: function() {
		var colorOptions = _.uniq(testData.fruits.map(function(fruit){
			return fruit.color;
		})).map(function(color){
			return {value: color, label: color}
		});
		var growsOnOptions = _.uniq(testData.fruits.map(function(fruit){
			return fruit.growsOn;
		})).map(function(growsOn){
			return {value: growsOn, label: growsOn}
		});

		return [
			{name: "Color",
			 key: "color",
			 options: colorOptions},
			{name: "Grows On",
			 key: "growsOn",
			 options: growsOnOptions}
		];
	},
	onChange: function(values){
		console.log(values);
	},
	render: function() {
		return (
			<XzibitSelect 
				options={this.options()} 
				initialValue={[]} 
				onChange={this.onChange} 
				filterDimensions={this.filterDimensions()}/>
		);
	}
});

React.render(React.createElement(DemoXzibitSelect), document.getElementById('main'));