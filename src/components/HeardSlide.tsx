import type { SlideCard } from "@/data/types";

export function HeardSlide({
  size = "lg",
}: {
  slides: SlideCard[];
  size?: "sm" | "lg";
  wash?: string;
}) {
  return (
    <div className={`leave leave-heard size-${size}`}>
      <article className="heard-slide">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/where-cursor-fits.jpg"
          alt="Where Cursor fits. Six places Cursor adds leverage alongside Claude and Copilot."
        />
      </article>
    </div>
  );
}
