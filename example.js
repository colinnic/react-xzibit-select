var React = require('react/addons');
var XzibitSelect = require('./lib/react-xzibit-select.jsx');
var testData = require("./lib/test-data");
var _ = require("lodash");


var DemoXzibitSelect = React.createClass({
	getInitialState: function(){
		return {
			values: []
		};
	},
	options: function() {
		return testData.fruits;
	},
	filterDimensions: function() {
		var colorOptions = _.uniq(testData.fruits.map(function(fruit){
			if (Array.isArray(fruit.color)){
				return fruit.color[0];
			}
			return fruit.color;
		})).map(function(color){
			return {value: color, label: color};
		});
		var growsOnOptions = _.uniq(testData.fruits.map(function(fruit){
			if (Array.isArray(fruit.growsOn)){
				return fruit.growsOn[0];
			}
			return fruit.growsOn;
		})).map(function(growsOn){
			return {value: growsOn, label: growsOn};
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
		this.setState({values: values});
		console.log(values);
	},
	render: function() {
		//var divStyles = {height: 600, width: 800, border: '1px solid #aaa;'}; width and height are fluid meaning whatever container we place this in it will fill, 
		//alternately you can also add a fixed width / height here to constrain the layout 
		var divStyles = {boxShadow: '0px 0px 0px 1px #cacaca'};


		return (
			<div style={divStyles}>
				<XzibitSelect 
					options={this.options()} 
					values={this.state.values} 
					onChange={this.onChange} 
					filterDimensions={this.filterDimensions()}/>
			</div>
		);
	}
});

React.render(React.createElement(DemoXzibitSelect), document.getElementById('main'));