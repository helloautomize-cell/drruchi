import type { ReactNode } from "react";

/** Wrap the last word of a headline in <em>. */
export function emLast(text: string): ReactNode {
  const i = text.lastIndexOf(" ");
  if (i < 0) return <em>{text}</em>;
  return (
    <>
      {text.slice(0, i)} <em>{text.slice(i + 1)}</em>
    </>
  );
}

/** Sprite icon name from data that may carry the "i-" prefix. */
export const ic = (n: string) => n.replace(/^i-/, "");
