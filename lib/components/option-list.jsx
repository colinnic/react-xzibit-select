var React = require("react/addons");
var types = React.PropTypes;
var OptionListItem = require("./option-list-item.jsx");
var LazyRender = require("react-lazy-render");
var ReactSizeBox = require("react-sizebox");

var OptionList = React.createClass({
	propTypes: {
		options: types.array,
		onClick: types.func,
		addAll: types.bool,
		addAllFunc: types.func
	},
	render: function() {
		var optionItems = this.props.options.map(function(opt){
			var toolTipContent = "", toolTipTitle = "", label;
			if(opt.toolTipContent) toolTipContent = String(opt.toolTipContent);
			if(opt.toolTipTitle) toolTipTitle = String(opt.toolTipTitle);
			if(opt.labelComponent) 
				label = opt.labelComponent;
			else
				label = opt.label;

			return (
				<OptionListItem 
					key={opt.value}
					onClick={this.props.onClick} 
					value={opt.value} 
					label={label} 
					toolTipContent={toolTipContent}
					toolTipTitle={toolTipTitle}/>
			);

		}.bind(this));

		if (optionItems.length === 0)
			optionItems = [(<li>None Found</li>)];
		else if(this.props.addAll) {
			var addAllOption = (
				<OptionListItem key="Add All" addAll={this.props.addAll} onClick={this.props.addAllFunc} value={"Add All"} label="Add All" />
			);
			optionItems.splice(0, 0, addAllOption);
		}

		return (
			<div className="content">
				<ReactSizeBox className="overflow-y rsx-SizeBox" heightProp="maxHeight">
					<LazyRender className="rxs-option-list rsx-lazyRender">
						{optionItems}
					</LazyRender>
				</ReactSizeBox>
			</div>
		);
	}
});

module.exports = OptionList;