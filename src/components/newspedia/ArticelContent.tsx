"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  // Check if content looks like HTML or Markdown
  const isHtml = content.trim().startsWith("<") && /<\/[^>]+$/.test(content.trim());

  if (isHtml) {
    // If it's HTML, render it directly but with proper styling
    return (
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // If it's Markdown, use ReactMarkdown
  return (
    <div className="article-content">
      <ReactMarkdown
        components={{
          // Handle images - use regular img tag for reliability
          img: ({ src, alt }) => {
            if (!src) return null;
            return (
              <figure className="my-8 flex flex-col items-center">
                <img
                  src={src}
                  alt={alt || "Article image"}
                  className="rounded-xl shadow-lg max-w-full h-auto"
                  loading="lazy"
                />
                {alt && (
                  <figcaption className="text-sm text-muted-foreground mt-3 text-center italic">
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          },
          // Handle links
          a: ({ href, children }) => {
            if (!href) return <>{children}</>;
            const isExternal = href.startsWith("http");
            if (isExternal) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 underline underline-offset-4 hover:text-teal-800 transition-colors"
                >
                  {children}
                </a>
              );
            }
            return (
              <Link href={href} className="text-teal-600 underline underline-offset-4 hover:text-teal-800 transition-colors">
                {children}
              </Link>
            );
          },
          // Headings
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-10 mb-4 font-sans text-teal-700 dark:text-teal-300">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mt-8 mb-3 font-sans text-teal-600 dark:text-teal-400">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold mt-6 mb-2 font-sans">
              {children}
            </h4>
          ),
          // Paragraphs
          p: ({ children }) => (
            <p className="mb-6 text-lg leading-relaxed text-foreground/90 text-justify hyphens-auto">
              {children}
            </p>
          ),
          // Lists
          ul: ({ children }) => (
            <ul className="my-6 pl-6 list-disc space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-6 pl-6 list-decimal space-y-2">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-lg leading-relaxed">{children}</li>
          ),
          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-teal-500 pl-6 py-2 italic my-8 bg-teal-50/50 dark:bg-teal-950/20 rounded-r-lg text-lg">
              {children}
            </blockquote>
          ),
          // Code
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 px-2 py-1 rounded text-base font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-muted p-4 rounded-lg overflow-x-auto text-base font-mono">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-muted p-6 rounded-xl overflow-x-auto my-6">{children}</pre>
          ),
          // Horizontal rule
          hr: () => <hr className="my-8 border-border" />,
          // Strong and emphasis
          strong: ({ children }) => (
            <strong className="font-bold text-foreground">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic">{children}</em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}