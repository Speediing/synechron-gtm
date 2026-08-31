import type { Clip } from "@/data/types";
import { ClipPlayer } from "./ClipPlayer";

export function ClipFigure({
  clip,
  compact = false,
}: {
  clip: Clip;
  compact?: boolean;
}) {
  return (
    <figure className={compact ? "clip-card clip-card-compact" : "clip-card"}>
      <ClipPlayer src={clip.file} poster={clip.poster} title={clip.title} />
      <figcaption>
        {compact ? <span className="clip-title">{clip.title}</span> : null}
        <span className="clip-caption">{clip.caption}</span>
      </figcaption>
    </figure>
  );
}
