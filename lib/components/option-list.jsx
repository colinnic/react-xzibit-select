var React = require("react/addons");
var types = React.PropTypes;
var OptionListItem = require("./option-list-item.jsx");
var LazyRender = require("react-lazy-render");

module.exports = React.createClass({
  propTypes: {
  	options: types.array,
  	onClick: types.func
  },

  render: function() {
  	var optionItems = this.props.options.map(function(opt){
  		return (<OptionListItem onClick={this.props.onClick} value={opt.value} label={opt.label} />);
  	}.bind(this));

    if (optionItems.length === 0) {
      optionItems = [(<li>Loading...</li>)];
    }

    return (
      <ul className="rvs-option-list">
    		  <LazyRender maxHeight={500}>
            {optionItems}
          </LazyRender>
    	</ul>
    );
  }
});
