'use client';

import { useState } from 'react';

type Props = {
  markdown: string;
};

export default function CopyMarkdownButton({ markdown }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown || '');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch (_) {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-full border border-fd-border/70 bg-fd-secondary/40 px-3 py-1 text-xs font-semibold text-fd-foreground transition hover:border-fd-border hover:bg-fd-secondary"
      aria-live="polite"
    >
      {copied ? 'Copied' : 'Copy Markdown'}
    </button>
  );
}
