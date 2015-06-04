var React = require("react/addons");
var types = React.PropTypes;

module.exports = React.createClass({
  propTypes: {
  	label: types.string,
  	value: types.any,
  	onClick: types.func,
    addAll: types.bool,
    hoverInfo: types.string
  },
  handleClick: function(){
  	this.props.onClick(this.props.value);
  },
  render: function() {
    var className = "rxs-option-list-item", hoverIcon = "";
    if(this.props.addAll)
      className += " add-all";
    if(this.props.hoverInfo && this.props.hoverInfo !== "") {
      hoverIcon = (
        <div className="hover-icon" title={this.props.hoverInfo}>i</div>
      );
    }
    return <div className={className}><button className="rxs-option-button" onClick={this.handleClick}>{this.props.label}{hoverIcon}</button></div>;
  }
});
