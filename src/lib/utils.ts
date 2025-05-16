import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const invisibleChars = [
  '\u200B', // zero-width space
  '\u200C', // zero-width non-joiner
  '\u200D', // zero-width joiner
  '\uFEFF', // zero-width no-break space
  '\u200E', // left-to-right mark
  '\u200F', // right-to-left mark
  '\u202A', // left-to-right embedding
  '\u202B', // right-to-left embedding
  '\u202C', // pop directional formatting
  '\u202D', // left-to-right override
  '\u202E', // right-to-left override
].map((c) => eval(`'${c}'`));
const invisibleCharPattern = new RegExp(`[${invisibleChars.join('')}]`, 'gu');

export const stripInvisibleChars = (input: string): string => {
  return input.replace(invisibleCharPattern, '');
};

export const highlightInvisibleChars = (input: string): string => {
  return input.replace(
    invisibleCharPattern,
    (match) =>
      `<mark title="U+${match.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}">${match}</mark>`,
  );
};
