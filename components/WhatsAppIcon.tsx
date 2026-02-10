'use client';

import Image from 'next/image';

type Props = {
  className?: string;
  width?: number;
  height?: number;
  variant?: 'app' | 'glyph';
  title?: string;
};

export default function WhatsAppIcon({
  className = 'w-6 h-6',
  width = 24,
  height = 24,
  variant = 'app',
  title = 'WhatsApp',
}: Props) {
  if (variant === 'glyph') {
    // Simple WhatsApp glyph (monochrome). Use `className` + `text-*` to color it.
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        role="img"
      >
        <title>{title}</title>
        <path
          fill="currentColor"
          d="M12 2a9.5 9.5 0 0 0-8.2 14.3L3 22l5.9-1.5A9.5 9.5 0 1 0 12 2Zm0 1.9a7.6 7.6 0 0 1 0 15.2c-1.3 0-2.5-.3-3.6-.9l-.4-.2-3.5.9.9-3.3-.2-.4A7.6 7.6 0 0 1 12 3.9Zm4.4 10.5c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.2-.6.7-.7.8-.1.1-.2.2-.4.1-.2-.1-.9-.3-1.7-1.1-.6-.5-1-1.2-1.1-1.4-.1-.2 0-.3.1-.4l.4-.5c.1-.1.1-.2.2-.4 0-.1 0-.3-.1-.4-.1-.1-.5-1.2-.7-1.6-.2-.5-.4-.4-.5-.4h-.5c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 2 0 1.2.8 2.3.9 2.5.1.2 1.6 2.6 4 3.6 2.4 1 2.4.7 2.8.7.4-.1 1.2-.5 1.4-1 .2-.5.2-1 .1-1.1-.1-.1-.2-.1-.4-.2Z"
        />
      </svg>
    );
  }

  return (
    <Image
      src="/whatsapp.png"
      alt={title}
      width={width}
      height={height}
      className={className}
    />
  );
}
