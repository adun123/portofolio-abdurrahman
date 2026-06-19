"use client";

import { useState } from "react";

const GRADIENTS = [
  "linear-gradient(135deg, #1b2340 0%, #2a2150 100%)",
  "linear-gradient(135deg, #102031 0%, #1e3350 100%)",
  "linear-gradient(135deg, #241a3a 0%, #3a2150 100%)",
  "linear-gradient(135deg, #15202e 0%, #243a4a 100%)",
];

/**
 * A single project screenshot card in the fanned stack.
 * Loads /projects/<slug>/<n>.png; falls back to a labeled gradient until the
 * real screenshot is added.
 */
export default function ProjectTile({
  src,
  index,
  title,
}: {
  src: string;
  index: number;
  title: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="card">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${title} — screenshot ${index + 1}`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center"
          style={{ background: GRADIENTS[index % GRADIENTS.length] }}
        >
          <span className="px-4 text-center text-xs uppercase tracking-[0.18em] text-fg-muted">
            {title}
          </span>
          <span className="mt-2 text-2xl font-medium text-fg-soft">
            0{index + 1}
          </span>
        </div>
      )}
    </div>
  );
}
