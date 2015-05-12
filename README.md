# react-xzibit-select

When your selection needs demand a filterable select that is filtered by other filterable selects, you need react-xzibit-select. [Demo It](http://BI.github.io/react-xzibit-select)

#Properties
* **options**: (Array of objects that each have value, label properties, and also properties that are like foreign keys to the other dimensions of your data.) These options will be displayed in the select list, be filterable by the text input, and also filterable by any more dimensions that you set up as your 'filterDimensions'. These options can also have arrays of values for each dimension. Take a look at the [test data](https://github.com/BI/react-xzibit-select/blob/master/lib/test-data.js) in this repo for an example.

* **initialValue**: (Array of values selected) Usually set this to [], so that no values are initially selected.
* **onChange**: (Function) This function gets called when any values are selected or deselected in the select list. The function receives the values currently selected as a parameter.
* **filterDimensions**: (Array of objects containing 'name', 'key', and 'option' properties) These are the dimensions that the data can be filtered by. The 'name' property is what that dimension's ReactCompactMulti select will show in its heading. The 'key' is the key corresponding to the option data foreign key, and the 'options' should be an array of unique values that we can filter the dimension on.

JSX
```js
var exampleOption = [
	{value: "Apple", label: "Apple", color: ["red", "green", "yellow", growsOn: "tree"]},
	{value: "Blueberry", label: "Blueberry", color: "blue", growsOn: "bush"}
];
var exampleFilterDimensions = [
	{name: "Color", key: "color", options: ["red", "green", "yellow", "blue"]}, 
	{name: "Grows On", key: "growsOn", options: ["tree", "bush"]}
];
var onChangeFunc = function(values) { //do something with the values};

<XzibitSelect 
	options={exampleOption} 
	initialValue={[]} 
	onChange={onChangeFunc} 
	filterDimensions={exampleFilterDimensions}/>
```
![](xzibit-select.png)

## Development

* Development server `npm run dev`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
