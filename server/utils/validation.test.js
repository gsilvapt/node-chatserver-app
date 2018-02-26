const expect = require('expect');

const {
  isRealString
} = require('./validation')

describe('Testing validation methods', () => {
  it('should reject non-string values', () => {
    let nullString;
    let result = isRealString(nullString);
    expect(result).toBe(false);
  });
  it('should rejec strings with spaces only', () => {
    let stringWithSpaces = '    ';
    console.log(stringWithSpaces.length);
    let result = isRealString(stringWithSpaces);
    expect(result).toBe(false)
  });
  it('should allow string with non space characters', () => {
    let stringWithoutSpaces = "jazzyRoom";
    let result = isRealString(stringWithoutSpaces);
    expect(result).toBe(true);
  })
  it('should allow string with space characters', () => {
    let stringWithSpaces = "A Sample Room Name";
    let result = isRealString(stringWithSpaces);
    expect(result).toBe(true);
  })
})