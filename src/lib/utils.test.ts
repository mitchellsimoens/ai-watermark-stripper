import fs from 'fs';
import path from 'path';

import React from 'react';
import { describe, expect, it } from 'vitest';

import { highlightInvisibleChars, stripInvisibleChars } from './utils';

const INVISIBLE = {
  ZWSP: '\u200B', // zero-width space
  ZWNJ: '\u200C', // zero-width non-joiner
  ZWJ: '\u200D', // zero-width joiner
  WJ: '\u2060', // word joiner
  ZWNBSP: '\uFEFF', // zero-width no-break space
};

describe('stripInvisibleChars', () => {
  it('removes all supported invisible characters', () => {
    const input = `a${INVISIBLE.ZWSP}b${INVISIBLE.ZWNJ}c${INVISIBLE.ZWJ}d${INVISIBLE.WJ}e`;
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
  it('wraps each invisible character in a <span> with codepoint and tooltip', () => {
    const input = `a${INVISIBLE.ZWSP}b${INVISIBLE.ZWNJ}c`;
    const output = highlightInvisibleChars(input);
    expect(Array.isArray(output)).toBe(true);
    if (Array.isArray(output)) {
      expect(output[0]).toBe('a');
      expect(output[2]).toBe('b');
      expect(output[4]).toBe('c');
      const zwsp = output[1];
      const zwnj = output[3];
      expect(typeof zwsp).toBe('object');
      expect(typeof zwnj).toBe('object');
      expect(zwsp).toEqual(
        expect.objectContaining({
          type: 'span',
          props: expect.objectContaining({
            className: expect.stringContaining('highlight-invisible'),
            title: expect.any(String),
            children: 'U+200B',
          }),
        }),
      );
      expect(zwnj).toEqual(
        expect.objectContaining({
          type: 'span',
          props: expect.objectContaining({
            className: expect.stringContaining('highlight-invisible'),
            title: expect.any(String),
            children: 'U+200C',
          }),
        }),
      );
    }
  });

  it('returns an array with the string if no invisible characters', () => {
    const output = highlightInvisibleChars('hello');
    expect(Array.isArray(output)).toBe(true);
    expect(output).toEqual(['hello']);
  });

  it('returns an empty array if input is empty', () => {
    const output = highlightInvisibleChars('');
    expect(Array.isArray(output)).toBe(true);
    expect(output).toEqual([]);
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
      const output = highlightInvisibleChars(`a${char}b`);
      expect(Array.isArray(output)).toBe(true);
      if (Array.isArray(output)) {
        expect(output[0]).toBe('a');
        const mark = output[1];
        expect(typeof mark).toBe('object');
        expect(mark).toEqual(
          expect.objectContaining({
            type: 'span',
            props: expect.objectContaining({
              className: expect.stringContaining('highlight-invisible'),
              title: expect.any(String),
              children: `U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`,
            }),
          }),
        );
        expect(output[2]).toBe('b');
      }
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
    const output = highlightInvisibleChars(`a${allChars}b`);
    expect(Array.isArray(output)).toBe(true);
    if (Array.isArray(output)) {
      expect(output[0]).toBe('a');
      expect(output[output.length - 1]).toBe('b');
      // Check that all invisible chars are highlighted as <span>
      Object.values(INVISIBLE).forEach((char, i) => {
        const mark = output[i + 1];
        expect(typeof mark).toBe('object');
        expect(mark).toEqual(
          expect.objectContaining({
            type: 'span',
            props: expect.objectContaining({
              className: expect.stringContaining('highlight-invisible'),
              title: expect.any(String),
              children: `U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`,
            }),
          }),
        );
      });
    }
  });
});

describe('stripInvisibleChars - fixtures', () => {
  it('removes invisible characters from markdown fixture', () => {
    const input = fs.readFileSync(
      path.join(__dirname, '__fixtures__', 'with-invisible.input.md'),
      'utf8',
    );
    const expected = fs.readFileSync(
      path.join(__dirname, '__fixtures__', 'with-invisible.expected.md'),
      'utf8',
    );
    expect(stripInvisibleChars(input)).toBe(expected);
  });

  it('returns the same string for input without invisible characters (fixture)', () => {
    const input = fs.readFileSync(
      path.join(__dirname, '__fixtures__', 'without-invisible.input.md'),
      'utf8',
    );
    const expected = fs.readFileSync(
      path.join(__dirname, '__fixtures__', 'without-invisible.expected.md'),
      'utf8',
    );
    expect(stripInvisibleChars(input)).toBe(expected);
  });
});

describe('highlightInvisibleChars - fixtures', () => {
  it('highlights invisible characters in markdown fixture', () => {
    const input = fs.readFileSync(
      path.join(__dirname, '__fixtures__', 'with-invisible.input.md'),
      'utf8',
    );
    const output = highlightInvisibleChars(input);
    expect(Array.isArray(output)).toBe(true);
    if (Array.isArray(output)) {
      const expected = fs.readFileSync(
        path.join(__dirname, '__fixtures__', 'with-invisible.highlighted.expected.md'),
        'utf8',
      );
      const actual = output
        .map((node) => {
          if (typeof node === 'string') {
            return node;
          }
          if (React.isValidElement(node) && node.type === 'span') {
            const { className, title, children } = node.props as {
              className?: string;
              title?: string;
              children?: React.ReactNode;
            };
            return `<span class="${className}" title="${title}">${children}</span>`;
          }
          return '';
        })
        .join('');
      expect(actual).toBe(expected);
    }
  });
});
