'use client';

import { Copy, Download, Eraser } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '$/components/Button';
import { Textarea } from '$/components/Textarea';
import { highlightInvisibleChars, stripInvisibleChars } from '$/lib/utils';

export const TextStripper: React.FC = () => {
  const [input, setInput] = useState('');
  const [stripped, setStripped] = useState('');
  const [showHighlight, setShowHighlight] = useState(true);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // setShowHighlight(false);
  };

  const handleStrip = () => {
    const cleaned = stripInvisibleChars(input);
    setStripped(cleaned);
    setShowHighlight(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(stripped || input);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([stripped || input], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cleaned-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      <label htmlFor="text-input" className="font-semibold">
        Input Text
      </label>
      <Textarea
        id="text-input"
        ref={textAreaRef}
        value={input}
        onChange={handleInputChange}
        rows={8}
        className="font-mono"
        placeholder="Paste or type your text here..."
      />
      <div className="flex gap-2">
        <Button type="button" onClick={handleStrip}>
          <Eraser className="w-4 h-4 mr-2" />
          Strip Invisible Characters
        </Button>
        <Button type="button" onClick={handleCopy} variant="secondary">
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
        <Button type="button" onClick={handleDownload} variant="secondary">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
      <div className="mt-4">
        <label className="font-semibold">Output</label>
        <div className="whitespace-pre-wrap p-3 border rounded bg-muted font-mono min-h-[120px]">
          {showHighlight ? highlightInvisibleChars(stripped || input) : stripped || input}
        </div>
      </div>
    </div>
  );
};
