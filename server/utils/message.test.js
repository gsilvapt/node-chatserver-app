/**
 * Third party modules required for this test suite.
 */
let expect = require('expect');

/**
 * Custom modules required
 */
let {
  generateMessage,
  generateLocationMessage
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

describe('Location Mesasge should be generate properly', () => {
  it('should generate correct location object', () => {
    let from = 'Admin';
    let latitude = '41';
    let longitude = '-8';
    let url = 'https://www.google.com/maps?q=41,-8';
    let result = generateLocationMessage(from, latitude, longitude)
    
    expect(result).toExist();
    expect(result.createdAt).toBeA('number')
    expect(result).toInclude({from, url});
  });
});