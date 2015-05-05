var React = require("react/addons");
var types = React.PropTypes;
var OptionList = require("./components/option-list.jsx");
var CompactMultiselect = require("react-compact-multiselect");
var TagList = require("react-tag-list");

require("./react-voltron-select.scss");

module.exports = React.createClass({
  getInitialState: function() {
  	return {
  		values: [],
  		labelFilter: '',
  		dimensionFilter: {}
  	};
  },
  propTypes: {
  	options: types.array,
  	initialValue: types.array,
  	onChange: types.func,
  	filterDimensions: types.array
  },
  handleChange: function(){
  	this.props.onChange(this.state.values);
  },
  removeValue: function(valToRemove) {
  	var newValueState = this.state.values.filter(function(val){
  		return val !== valToRemove;
  	});
  	this.setState({values: newValueState}, this.handleChange());
  },
  addValue: function(valToAdd){ 
  	var newValueState = this.state.values.slice(0);
  	newValueState.push(valToAdd);
  	this.setState({values: newValueState}, this.handleChange());
  },
  filteredOptions: function() {
  	return this.props.options.filter(function(opt){
  		return (this.state.values.indexOf(opt.value) < 0) 
  			&& (opt.label.indexOf(this.state.labelFilter) > -1)
  			&& (this.dimensionFilterIncludes(opt));
  	}.bind(this));
  },
  dimensionFilterIncludes: function(opt) {
  	// TODO: implement me
  	return true;
  },
  updateLabelFilter: function(event) {
  	// TODO: add throttling
  	this.setState({labelFilter: event.target.value});
  },
  generateUpdateDimensionFilter: function(dimensionName) {
  	/**
  	 *  {"Source" : [], "Sector" : []}
  	 */
  	return function(values) {
  		var spec = {};
  		spec[dimensionName] = {$set: values};
  		var newState = React.addons.update(this.state.dimensionFilter, spec);
  		this.setState({dimensionFilter: newState});
  	}.bind(this);
  },
  render: function() {
  	var selectFilters = this.props.filterDimensions.map(function(dim){
  		return (<CompactMultiselect 
  					label={dim.name} 
  					options={dim.options} 
  					initialValue={[]} 
  					onChange={this.generateUpdateDimensionFilter(dim.name)} />);
  	}.bind(this));
    return <div className="react-voltron-select">
    			<ReactTagList 
    				values={this.state.values} 
    				onRemove={this.removeValue} />
    			<input 
    				className="rvs-label-filter" 
    				onChange={this.updateLabelFilter} 
    				value={this.state.labelFilter} 
    				placeholder="Type to filter options..." />
    			<OptionList 
    				options={this.filteredOptions()} 
    				onClick={this.addValue} />

    	   </div>;
  }
});
