/*
* We are storing the variable modules return by the IIFE function into variable myModules
*/
var myModules = (function Manager() {

  var modules = {};

  // require a module
  function require(name) {
    return modules[name];
  }

  // define a module
  function define(name, dependencies, implementation) {
    for (var i = 0; i < dependencies.length; i++) {
      dependencies[i] = modules[dependencies[i]];
    }
    modules[name] = implementation.apply(implementation, dependencies);
  }

  return {
    require: require,
    define: define
  }

})();

myModules.define("output", [], function() {
  function write(name) {
    console.log(name);
  }

  return {
    write: write
  }
});

myModules.define("calculate", ["output"], function(output) {
  
  var total = 0;

  function add() {
    for (var j = 0; j < arguments.length; j++) {
      total += arguments[j];
    }
    output.write(total);
  }

  return {
    add: add
  }

});

var output = myModules.require("output");
output.write("Bogdan");

var calculate = myModules.require("calculate");
calculate.add(3, 4, 6, 90);