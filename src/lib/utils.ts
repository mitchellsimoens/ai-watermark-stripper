import { type ClassValue, clsx } from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Only invisible characters from https://cleanpaste.site/invisible-chars
const invisibleCharPattern = /\u200B|\u200C|\u200D|\u2060|\uFEFF/gu;

const getPointValName = (pointVal: number) => {
  const map: Record<number, string> = {
    0: 'Null',
    1: 'Start of Heading',
    2: 'Start of Text',
    3: 'End of Text',
    4: 'End of Transmission',
    5: 'Enquiry',
    6: 'Acknowledge',
    7: 'Bell',
    8: 'Backspace',
    9: 'Character Tabulation',
    10: 'Line Feed',
    11: 'Line Tabulation',
    12: 'Form Feed',
    13: 'Carriage Return',
    14: 'Shift Out',
    15: 'Shift In',
    16: 'Data Link Escape',
    17: 'Device Control One',
    18: 'Device Control Two',
    19: 'Device Control Three',
    20: 'Device Control Four',
    21: 'Negative Acknowledge',
    22: 'Synchronous Idle',
    23: 'End of Transmission Block',
    24: 'Cancel',
    25: 'End of Medium',
    26: 'Substitute',
    27: 'Escape',
    28: 'Information Separator Four',
    29: 'Information Separator Three',
    30: 'Information Separator Two',
    31: 'Information Separator One',
    127: 'Delete',
    160: 'No-Break Space',
    1564: 'Arabic Letter Mark',
    5760: 'Ogham Space Mark',
    6158: 'Mongolian Vowel Separator',
    8192: 'En Quad',
    8193: 'Em Quad',
    8194: 'En Space',
    8195: 'Em Space',
    8196: 'Three-Per-Em Space',
    8197: 'Four-Per-Em Space',
    8198: 'Six-Per-Em Space',
    8199: 'Figure Space',
    8200: 'Punctuation Space',
    8201: 'Thin Space',
    8202: 'Hair Space',
    8203: 'Zero Width Space',
    8204: 'Zero Width Non-Joiner',
    8205: 'Zero Width Joiner',
    8206: 'Left-To-Right Mark',
    8207: 'Right-To-Left Mark',
    8230: 'Horizontal Ellipsis',
    8232: 'Line Separator',
    8233: 'Paragraph Separator',
    8234: 'Left-To-Right Embedding',
    8235: 'Right-To-Left Embedding',
    8236: 'Pop Directional Formatting',
    8237: 'Left-To-Right Override',
    8238: 'Right-To-Left Override',
    8239: 'Narrow No-Break Space',
    8287: 'Medium Mathematical Space',
    8288: 'Word Joiner',
    8289: 'Function Application',
    8290: 'Invisible Times',
    8291: 'Invisible Separator',
    8292: 'Invisible Plus',
    8294: 'Left-To-Right Isolate',
    8295: 'Right-To-Left Isolate',
    8296: 'First Strong Isolate',
    8297: 'Pop Directional Isolate',
    10230: 'Long Rightwards Arrow',
    12288: 'Ideographic Space',
    65279: 'Zero Width No-Break Space',
  };

  return pointVal >= 57344 && pointVal <= 63743
    ? 'Private Use Area Character'
    : (map[pointVal] ?? 'Unknown Control Character');
};

export const stripInvisibleChars = (input: string): string => {
  return input.replace(invisibleCharPattern, '');
};

export const highlightInvisibleChars = (input: string): React.ReactNode => {
  const elements: React.ReactNode[] = [];
  const matches = Array.from(input.matchAll(invisibleCharPattern));
  let lastIndex = 0;

  matches.forEach((match, i) => {
    const index = match.index ?? 0;

    if (index > lastIndex) {
      elements.push(input.slice(lastIndex, index));
    }

    const pointVal = match[0].codePointAt(0);
    const char = pointVal !== undefined ? pointVal.toString(16).toUpperCase().padStart(4, '0') : '';

    elements.push(
      React.createElement(
        'span',
        {
          key: `inv-${index}-${i}`,
          className: 'highlight-invisible bg-yellow-200 text-yellow-900 px-1 rounded',
          title: getPointValName(pointVal ?? 0),
        },
        `U+${char}`,
      ),
    );

    lastIndex = index + match[0].length;
  });

  if (lastIndex < input.length) {
    elements.push(input.slice(lastIndex));
  }

  return elements;
};
