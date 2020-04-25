import Compiler from '../../src/Compiler.js';

import {
  Expression
} from '../../src/Compiler.js';

describe('Compiler', () => {
  it('converts asterisk to cdot', () => {
    expect(Compiler('*')).toBe('\\cdot');
  });
  it('converts "foo * bar" to "foo \\cdot bar"', () => {
    expect(Compiler('foo * bar')).toBe('foo \\cdot bar');
  });
  it('removes curly braces from output', () => {
    expect(Compiler('{x}')).toBe('x');
  });
  it('removes nested curly braces from output', () => {
    expect(Compiler('{{x}}')).toBe('x');
  });
  it('correctly detects what belongs to a fraction (spaces)', () => {
    expect(Compiler('a/b+2 + 3')).toBe('\\frac{a}{b+2} + 3');
  });
  it('correctly detects what belongs to a fraction (curly braces)', () => {
    expect(Compiler('a/{b+2 + 3}')).toBe('\\frac{a}{{b+2} + 3}');
  });
  it('ignores single line breaks', () => {
    expect(Compiler('a + b\nx + y')).toBe('a + b\nx + y');
  });
  it('respects double line breaks', () => {
    expect(Compiler('a + b\n\nx + y')).toBe('a + b\n\\\\\nx + y');
  });
});

describe('Expression', () => {
  it('handles curly braces correctly', () => {
    expect(Expression('{abc}/{def}')).toBe('\\frac{abc}{def}');
  })
});
