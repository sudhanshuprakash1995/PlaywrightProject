const { When, Then, Given } = require('@cucumber/cucumber')
import { POManager } from '../pageObjects/POManager';


Givn('Login to ecommerce application with {string} and {string}', function (username, password) {

When('add {string} to cart', function (itemName) {
  this.whatIHeard = new Greeter().sayHello()
})

Then('I should have heard {string}', function (expectedResponse) {
  assert.equal(this.whatIHeard, expectedResponse)
})