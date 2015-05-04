var React = require('react');
var TestUtils = React.addons.TestUtils;
var ReactVoltronSelect = require('../lib/react-voltron-select.jsx');


describe("ReactVoltronSelect", function() {
  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(
      <ReactVoltronSelect name="Jonh"/>
    );
  });

  it("should render", function() {
    expect(component.getDOMNode().className).toEqual('react-voltron-select');
  });
});
