import Compiler from '../../src/Compiler.js';

describe('Compiler', () => {
  it('converts asterisk to cdot', () => {
    expect(Compiler('*')).toMatch('\\cdot');
  });
  it('converts "foo * bar" to "foo \\cdot bar"', () => {
    expect(Compiler('foo * bar')).toMatch('foo \\cdot bar');
  });
  it('removes curly braces from output', () => {
    expect(Compiler('{x}')).toMatch('x');
  });
  it('removes nested curly braces from output', () => {
    expect(Compiler('{{x}}')).toMatch('x');
  });
  it('correctly detects what belongs to a fraction (spaces)', () => {
    expect(Compiler('a/b+2 + 3')).toMatch('\\frac{a}{b+2} + 3');
  });
  it('correctly detects what belongs to a fraction (curly braces)', () => {
    expect(Compiler('a/{b+2 + 3}')).toMatch('\\frac{a}{{b+2} + 3}');
  });
});
