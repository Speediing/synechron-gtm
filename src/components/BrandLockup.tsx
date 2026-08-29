export function BrandLockup({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className={`brand-lockup brand-lockup-${size}`}>
      <object
        data="https://www.synechron.com/themes/synechron/images/logo.svg"
        type="image/svg+xml"
        aria-label="Synechron"
        className="brand-synechron"
      >
        <span className="brand-synechron-fallback">Synechron</span>
      </object>
      <span className="brand-times" aria-hidden>
        ×
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/spacexai.svg" alt="SpaceXAI" className="brand-sxai" />
    </div>
  );
}
