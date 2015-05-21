var React = require("react/addons");
var types = React.PropTypes;
var OptionList = require("./components/option-list.jsx");
var ReactCompactMultiselect = require("react-compact-multiselect");
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
      if (Array.isArray(opt[key])){
        var found = false;
        opt[key].forEach(function(optVal){
          if (filterVals.indexOf(optVal) > -1) {
            found = true;
          }
        });
        return found;
      } else {
    		if (filterVals.indexOf(opt[key]) > -1) {
    			return true;
    		}
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
  removeAll: function() {
    this.setState({values: []});
  },
  render: function() {
  	var selectFilters = this.props.filterDimensions.map(function(dim){
  		return (<ReactCompactMultiselect 
  					label={dim.name} 
  					options={dim.options} 
  					initialValue={[]}
  					onChange={this.generateUpdateDimensionFilter(dim.name)}
            layoutMode={ReactCompactMultiselect.ALIGN_CONTENT_NE} />);
  	}.bind(this));

    return <div className="react-xzibit-select">
      			 <div className="fluid-layout">
               <div className="header">
                <TagList 
          				values={this.tagListValues()} 
          				onRemove={this.removeValue}
                  removeAll={this.removeAll}
                  collapsedRows={1}  />
               </div>
               <OptionList 
        				 options={this.filteredOptions()} 
        				 onClick={this.addValue} />
               <div className="footer">
                <div className="rxs-label-filter">
                  <div className="rsv-label-filter-container">
                  <input  
                    onChange={this.updateLabelFilter} 
                    value={this.state.labelFilter} 
                    placeholder="Type to filter options..." />
                  <button className="rxs-label-filter-clear" name="clear-filter" onClick={this.clearLabelFilter}>&#215;</button>
                  </div>
                </div>
                <div className="filter-multiselect">
                  {selectFilters}
                </div>
               </div>
             </div>
           </div>;
  }
});
