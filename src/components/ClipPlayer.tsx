"use client";

import { useRef, useState } from "react";

const RATES = [1, 1.5, 2] as const;

export function ClipPlayer({
  src,
  poster,
  title,
}: {
  src: string;
  poster?: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [rate, setRate] = useState(1);

  function applyRate(next: number) {
    const video = videoRef.current;
    if (video) video.playbackRate = next;
    setRate(next);
  }

  return (
    <div className="clip-player">
      <video
        ref={videoRef}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        src={src}
        aria-label={title}
        onPlay={(event) => {
          event.currentTarget.playbackRate = rate;
        }}
      />
      <div className="clip-rates" role="group" aria-label="Playback speed">
        {RATES.map((value) => (
          <button
            key={value}
            type="button"
            className={rate === value ? "is-on" : undefined}
            aria-pressed={rate === value}
            onClick={() => applyRate(value)}
          >
            {value}x
          </button>
        ))}
      </div>
    </div>
  );
}
