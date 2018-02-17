/**
 * Third party modules required for this test suite.
 */
let expect = require('expect');

/**
 * Custom modules required
 */
let {
  generateMessage
} = require('./message')

describe('Message should be generated properly', () => {
  it('should correctly generate a message object', () => {
    let from = 'Admin';
    let text = 'a new user joined';
    let result = generateMessage(from, text);   // generates json object

    expect(result).toExist();
    expect(result.createdAt).toBeA('number')
    expect(result).toInclude({
      from: from,
      text: text
    });
  });
});