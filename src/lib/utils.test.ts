import { describe, expect, it } from 'vitest';

import { highlightInvisibleChars, stripInvisibleChars } from './utils';

const INVISIBLE = {
  ZWSP: '\u200B', // zero-width space
  ZWNJ: '\u200C', // zero-width non-joiner
  ZWJ: '\u200D', // zero-width joiner
  ZWNBSP: '\uFEFF', // zero-width no-break space
  LRM: '\u200E', // left-to-right mark
  RLM: '\u200F', // right-to-left mark
  LRE: '\u202A', // left-to-right embedding
  RLE: '\u202B', // right-to-left embedding
  PDF: '\u202C', // pop directional formatting
  LRO: '\u202D', // left-to-right override
  RLO: '\u202E', // right-to-left override
};

describe('stripInvisibleChars', () => {
  it('removes all supported invisible characters', () => {
    const input = `a${INVISIBLE.ZWSP}b${INVISIBLE.ZWNJ}c${INVISIBLE.ZWJ}d${INVISIBLE.ZWNBSP}e`;
    expect(stripInvisibleChars(input)).toBe('abcde');
  });

  it('returns the same string if no invisible characters', () => {
    expect(stripInvisibleChars('hello')).toBe('hello');
  });

  it('handles empty string', () => {
    expect(stripInvisibleChars('')).toBe('');
  });
});

describe('highlightInvisibleChars', () => {
  it('wraps each invisible character in a <mark> with codepoint', () => {
    const input = `a${INVISIBLE.ZWSP}b${INVISIBLE.ZWNJ}c`;
    const output = highlightInvisibleChars(input);
    expect(output).toBe('a<mark title="U+200B">\u200B</mark>b<mark title="U+200C">\u200C</mark>c');
  });

  it('returns the same string if no invisible characters', () => {
    expect(highlightInvisibleChars('hello')).toBe('hello');
  });

  it('handles empty string', () => {
    expect(highlightInvisibleChars('')).toBe('');
  });
});

describe('stripInvisibleChars - individual characters', () => {
  Object.entries(INVISIBLE).forEach(([name, char]) => {
    it(`removes ${name} (U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')})`, () => {
      expect(stripInvisibleChars(`a${char}b`)).toBe('ab');
    });
  });
});

describe('highlightInvisibleChars - individual characters', () => {
  Object.entries(INVISIBLE).forEach(([name, char]) => {
    it(`highlights ${name} (U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')})`, () => {
      expect(highlightInvisibleChars(`a${char}b`)).toBe(
        `a<mark title="U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}">${char}</mark>b`,
      );
    });
  });
});

describe('stripInvisibleChars - all characters together', () => {
  it('removes all invisible characters in sequence', () => {
    const allChars = Object.values(INVISIBLE).join('');
    expect(stripInvisibleChars(`a${allChars}b`)).toBe('ab');
  });
});

describe('highlightInvisibleChars - all characters together', () => {
  it('highlights all invisible characters in sequence', () => {
    const allChars = Object.values(INVISIBLE).join('');
    const highlighted = Object.values(INVISIBLE)
      .map(
        (char) =>
          `<mark title="U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}">${char}</mark>`,
      )
      .join('');
    expect(highlightInvisibleChars(`a${allChars}b`)).toBe(`a${highlighted}b`);
  });
});
