"use strict";

var isValidElement = function isValidElement(element) {
  return element.name && element.value;
};

var isValidValue = function isValidValue(element) {
  return !['checkbox', 'radio'].includes(element.type) || element.checked;
};

var isCheckbox = function isCheckbox(element) {
  return element.type === 'checkbox';
};

var isMultiSelect = function isMultiSelect(element) {
  return element.options && element.multiple;
};

var getSelectValues = function getSelectValues(options) {
  return [].reduce.call(options, function (values, option) {
    return option.selected ? values.concat(option.value) : values;
  }, []);
};

var formToJSON_deconstructed = function formToJSON_deconstructed(elements) {
  var reducerFunction = function reducerFunction(data, element) {
    data[element.name] = element.value;
    progress.console.log(JSON.stringify(data));
    return data;
  };

  var reducerInitialValue = {};
  console.log('Initial data value:', JSON.stringify(reducerInitialValue));
  var formData = [].reduce.call(elements, reducerFunction, reducerInitialValue);
  return formData;
};

var formToJSON = function formToJSON(elements) {
  return [].reduce.call(elements, function (data, element) {
    if (isValidElement(element) && isValidValue(element)) {
      if (isCheckbox(element)) {
        data[element.name] = (data[element.name] || []).concat(element.value);
      } else if (isMultiSelect(element)) {
        data[element.name] = getSelectValues(element);
      } else {
        data[element.name] = element.value;
      }
    }

    return data;
  }, {});
};

var handleFormSubmit = function handleFormSubmit(event) {
  event.preventDefault();
  var data = formToJSON(form.elements);
  var dataContainer = document.getElementsByClassName('results__display')[0];
  dataContainer.textContent = JSON.stringify(data, null, "  ");
};

var form = document.getElementsByClassName('edgemail-mktg')[0];
form.addEventListener('submit', handleFormSubmit);
