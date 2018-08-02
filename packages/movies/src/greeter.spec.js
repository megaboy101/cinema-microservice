const assert = require("assert");
const greeter = require("./greeter.js").greeter;

assert.strictEqual("Hello, world!", greeter());

console.log("Test passed successfully");