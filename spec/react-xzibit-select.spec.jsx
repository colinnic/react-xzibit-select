var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var ReactXzibitSelect = require('../lib/react-xzibit-select.jsx');


describe("ReactXzibitSelect", function() {
  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(
      <ReactXzibitSelect name="Jonh"/>
    );
  });

  it("should render", function() {
    expect(component.getDOMNode().className).toEqual('react-xzibit-select');
  });
});
