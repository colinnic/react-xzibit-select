# react-voltron-select

Get the AMD module located at `react-voltron-select.js` and include it in your project.

Here is a sample integration:

```js
require.config({
  paths: {
    'react': 'vendor/bower_components/react/react',
    'ReactVoltronSelect': 'react-voltron-select'
  }
});

require(['react', 'ReactVoltronSelect'], function(React, ReactVoltronSelect) {

  React.render(React.createElement(ReactVoltronSelect), document.getElementById('widget-container'));

});
```

## Development

* Development server `npm run dev`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
