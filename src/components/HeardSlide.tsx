import type { SlideCard } from "@/data/types";

export function HeardSlide({
  slides,
  size = "lg",
}: {
  slides: SlideCard[];
  size?: "sm" | "lg";
  wash?: string;
}) {
  return (
    <div className={`leave leave-heard size-${size}`}>
      <article className={`heard-slide heard-deck size-${size}`}>
        <header className="heard-bar">
          <span>Client deck</span>
          <span>Ready to review</span>
        </header>
        <div className={`deck-slides size-${size}`}>
          {slides.map((slide) => (
            <article
              key={slide.n}
              className={`deck-tile${slide.voice ? ` voice-${slide.voice}` : ""}`}
            >
              <div className="deck-tile-bar">
                <span className="deck-kicker">
                  {slide.kicker || "Slide"}
                </span>
                <span className="deck-n">{String(slide.n).padStart(2, "0")}</span>
              </div>
              <h3 className="deck-tile-title">{slide.title}</h3>
              <p className="deck-map">{slide.body}</p>
              <p className="deck-tile-foot">
                <span>Draft</span>
                <span>Not sent</span>
              </p>
            </article>
          ))}
        </div>
      </article>
    </div>
  );
}
