var React = require("react/addons");
var types = React.PropTypes;
var OptionList = require("./components/option-list.jsx");
var ReactCompactMultiselect = require("react-compact-multiselect");
var MultiSelect = ReactCompactMultiselect.ReactCompactMultiselect;
var TagList = require("react-tag-list");

require("./react-xzibit-select.scss");

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
  			&& (opt.label.toLowerCase().indexOf(this.state.labelFilter.toLowerCase()) > -1)
  			&& (this.dimensionFilterIncludes(opt));
  	}.bind(this));
  },
  dimensionFilterIncludes: function(opt) {
  	
  	if (Object.keys(this.state.dimensionFilter).length < 1){
  		return true;
  	}

  	var retVal = true;
  	var filterHits = this.props.filterDimensions.map(function(dimension){
  		var key = dimension.key;
  		var name = dimension.name;
  		var filterVals = this.state.dimensionFilter[name];
  		if (filterVals === undefined || filterVals.length < 1) {
  			return true;
  		}
  		var index = filterVals.indexOf(opt[key]);
  		if (index > -1) {
  			return true;
  		}
  		return false;
  	}.bind(this));
  	filterHits.forEach(function(fh){
  		if (!fh){
  			retVal = false;
  		}
  	});
  	return retVal;
  },
  updateLabelFilter: function(event) {
  	// TODO: add throttling
  	this.setState({labelFilter: event.target.value});
  },
  clearLabelFilter: function(event) {
    this.setState({labelFilter: ''});
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
  tagListValues: function() {
    // SLOW!! too slow??
   	return this.state.values.map(function(val){
   		return this.props.options.filter(function(opt){
   			return opt.value === val;
   		})[0];
  	}.bind(this));
  },
  render: function() {
  	var selectFilters = this.props.filterDimensions.map(function(dim){
  		return (<MultiSelect 
  					label={dim.name} 
  					options={dim.options} 
  					initialValue={[]}
  					onChange={this.generateUpdateDimensionFilter(dim.name)}
            layoutMode={ReactCompactMultiselect.LEFT_ALIGN} />);
  	}.bind(this));

    return <div className="react-xzibit-select">
      			 <div className="fluid-layout">
               <div className="header">
                <TagList 
          				values={this.tagListValues()} 
          				onRemove={this.removeValue} />
          			{selectFilters}
                <div className="rvs-label-filter">
            			<input  
            				onChange={this.updateLabelFilter} 
            				value={this.state.labelFilter} 
            				placeholder="Type to filter options..." />
                    <span className="rvs-label-filter-clear" onClick={this.clearLabelFilter}>X</span>
                </div>
              </div>
        			<div className="content">
                <div className="overflow-y">
                  <OptionList 
            				options={this.filteredOptions()} 
            				onClick={this.addValue} />
          	   </div>
             </div>
           </div>
         </div>;
  }
});
