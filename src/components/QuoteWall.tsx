import { QUOTES } from "@/data/quotes";

const FEATURED_SOURCES = [
  "https://x.com/naval/status/2090497355649008059",
  "https://x.com/Austen/status/2087685264617406963",
  "https://x.com/AlexFinn/status/2089505950470459659",
  "https://x.com/lennysan/status/2087241423792087518",
  "https://x.com/GergelyOrosz/status/2090353329771631080",
  "https://x.com/yunta_tsai/status/2087415205756391461",
];

export function QuoteWall() {
  const featuredQuotes = QUOTES.filter((quote) =>
    FEATURED_SOURCES.includes(quote.source),
  );

  return (
    <section id="testimonials" className="quotes">
      <h2>Testimonials</h2>
      <p className="section-lede">
        Six reactions that capture the persistent-agent difference.
      </p>
      <div className="quote-thread">
        {featuredQuotes.map((quote) => (
          <article
            key={`${quote.handle}-${quote.date}-${quote.source}`}
            className="quote-row"
          >
            <div className="quote-who">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={quote.avatar}
                alt=""
                width={36}
                height={36}
                className="quote-avatar"
              />
              <div>
                <p className="quote-name">{quote.name}</p>
                <p className="quote-handle">{quote.handle}</p>
              </div>
            </div>
            <blockquote className="quote-bubble">{quote.quote}</blockquote>
            {quote.source ? (
              <a
                href={quote.source}
                target="_blank"
                rel="noopener noreferrer"
                className="quote-source"
              >
                Read source →
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
