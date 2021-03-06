var React = require("react/addons");
var types = React.PropTypes;
var Opentip = require('opentip');
require('opentip/css/opentip.css');

var OptionListItem = React.createClass({
  propTypes: {
  	label: types.any,
  	value: types.any,
  	onClick: types.func,
    addAll: types.bool,
    toolTipContent: types.string,
    toolTipTitle: types.string
  },
  handleClick: function(){
    this.props.onClick(this.props.value);
  },
  createTooltip: function(component) {
    if(component === null) {
      return;
    }

    if(component.tooltip) {
      return;
    }

    component.tooltip = new Opentip(React.findDOMNode(component), this.props.toolTipContent, this.props.toolTipTitle, {delay: 0});
  },
  //needed for mobile to be able to show tooltips on mobile
  blockEvent: function(event) {
    event.preventDefault();
    event.stopPropagation();
  },
  render: function() {
    var className = "rxs-option-list-item", hoverIcon = "";

    if(this.props.addAll)
      className += " add-all";
    if(this.props.toolTipContent && this.props.toolTipContent !== "") {
      hoverIcon = (
        <div className="hover-icon" onClick={this.blockEvent} ref={this.createTooltip}>i</div>
      );
    }
    return <div className={className}><button className="rxs-option-button" onClick={this.handleClick}>{this.props.label}{hoverIcon}</button></div>;
  }
});

module.exports = OptionListItem;