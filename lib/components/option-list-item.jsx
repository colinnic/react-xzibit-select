var React = require("react/addons");
var types = React.PropTypes;

module.exports = React.createClass({
  propTypes: {
  	label: types.string,
  	value: types.any,
  	onClick: types.func,
    addAll: types.bool
  },
  handleClick: function(){
  	this.props.onClick(this.props.value);
  },
  render: function() {
    var className = "rxs-option-list-item";
    if(this.props.addAll)
      className += " add-all";
    return <div className={className}><button className="rxs-option-button" onClick={this.handleClick}>{this.props.label}</button></div>;
  }
});
