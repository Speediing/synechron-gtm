import type { Artifact, DemoMessage, SlideCard } from "@/data/types";
import type { ComputerBeat } from "@/data/screens";
import { CLIPS } from "@/data/clips";
import { ACME_TAIL_SLIDES } from "@/data/jobs";
import { HeardSlide } from "./HeardSlide";

function asSlides(artifact?: Artifact) {
  return artifact?.kind === "slides" ? artifact : null;
}
function asTable(artifact?: Artifact) {
  return artifact?.kind === "table" ? artifact : null;
}
function asGmail(artifact?: Artifact) {
  return artifact?.kind === "gmail" ? artifact : null;
}
function asSlack(artifact?: Artifact) {
  return artifact?.kind === "slack" ? artifact : null;
}
function asOnePager(artifact?: Artifact) {
  return artifact?.kind === "one-pager" ? artifact : null;
}
function asForecast(artifact?: Artifact) {
  return artifact?.kind === "forecast" ? artifact : null;
}
function asTalks(artifact?: Artifact) {
  return artifact?.kind === "talk-tracks" ? artifact : null;
}
function asGaps(artifact?: Artifact) {
  return artifact?.kind === "gaps" ? artifact : null;
}
function asPacket(artifact?: Artifact) {
  return artifact?.kind === "packet" ? artifact : null;
}
function asLinkedin(artifact?: Artifact) {
  return artifact?.kind === "linkedin" ? artifact : null;
}
function asOutbound(artifact?: Artifact) {
  return artifact?.kind === "outbound" ? artifact : null;
}

export function SiteScreen({
  beat,
  message,
  account,
  sent,
}: {
  beat: ComputerBeat;
  message?: DemoMessage;
  account: string;
  sent: boolean;
}) {
  const artifact = message?.artifact;

  if (beat.site === "clip" && beat.clip) {
    const clip = CLIPS[beat.clip];
    return (
      <div className="site-clip">
        <video
          src={clip.file}
          controls
          playsInline
          controlsList="nodownload"
          aria-label={clip.title}
        />
      </div>
    );
  }

  switch (beat.site) {
    case "granola":
      return <GranolaScreen account={account} />;
    case "figma":
      return <FigmaScreen account={account} artifact={artifact} />;
    case "gong":
      return <GongScreen account={account} />;
    case "sfdc-account":
      return <SfdcAccountScreen account={account} />;
    case "sfdc-opp":
      return (
        <SfdcOppScreen
          account={account}
          highlight={Boolean(asGaps(artifact))}
        />
      );
    case "sheets":
      return <SheetsScreen account={account} artifact={artifact} />;
    case "gmail":
      return (
        <GmailScreen account={account} artifact={asGmail(artifact)} sent={sent} />
      );
    case "linkedin":
      return (
        <LinkedInScreen
          account={account}
          artifact={asLinkedin(artifact)}
          sent={sent}
        />
      );
    case "research":
      return <ResearchScreen account={account} />;
    case "page":
      return (
        <PageScreen
          account={account}
          onePager={asOnePager(artifact)}
          outbound={asOutbound(artifact)}
        />
      );
    case "slack":
      return (
        <SlackScreen account={account} artifact={asSlack(artifact)} sent={sent} />
      );
    case "gdoc":
      return (
        <GdocScreen
          account={account}
          onePager={asOnePager(artifact)}
          forecast={asForecast(artifact)}
          talks={asTalks(artifact)}
          packet={asPacket(artifact)}
        />
      );
    default:
      return <GranolaScreen account={account} />;
  }
}

function GranolaScreen({ account }: { account: string }) {
  return (
    <div className="site site-granola">
      <header>
        <strong>Granola</strong>
        <span>Live · last 20 min</span>
      </header>
      <p className="site-time">Still on the call · Granola in</p>
      <ul>
        <li>
          <span>14:12</span> Start with APM + Logs in one team. Not a product
          tour.
        </li>
        <li>
          <span>14:18</span> Security: SSO and an audit trail before any extra
          products.
        </li>
        <li>
          <span>14:21</span> Soft yes on a Bits AI trial if those two are named.
        </li>
        <li>
          <span>14:24</span> Cost mentioned once. RUM not in the room.
        </li>
        <li>
          <span>14:28</span> Your contact will take a Tuesday with a security
          co-owner.
        </li>
        <li>
          <span>14:31</span> Use cases named live on the demo. Sev-2 story,
          one team, SSO as the gate.
        </li>
      </ul>
    </div>
  );
}

function FigmaScreen({
  account,
  artifact,
}: {
  account: string;
  artifact?: Artifact;
}) {
  const slides = asSlides(artifact);
  const packet = artifact?.kind === "packet" ? artifact : null;
  const pager = asOnePager(artifact);
  const cards: SlideCard[] = slides?.cards ?? ACME_TAIL_SLIDES;

  return (
    <div className="site site-figma">
      <header>
        <span className="figma-logo">F</span>
        <strong>
          {slides
            ? slides.title
            : pager
              ? `${account} one-pager`
              : packet
                ? `${account} inside note`
                : `${account} North Star`}
        </strong>
        <em>Draft</em>
      </header>
      <div className="figma-board">
        {packet ? (
          <div className="figma-doc">
            {packet.fields.map((field) => (
              <p key={field.label}>
                <b>{field.label}</b>
                {field.value}
              </p>
            ))}
          </div>
        ) : pager ? (
          <div className="figma-doc">
            {pager.sections.map((section) => (
              <p key={section.heading}>
                <b>{section.heading}</b>
                {section.body}
              </p>
            ))}
          </div>
        ) : (
          <HeardSlide slides={cards} size="sm" />
        )}
      </div>
    </div>
  );
}

function GongScreen({ account }: { account: string }) {
  return (
    <div className="site site-gong">
      <header>
        <strong>Gong</strong>
        <span>
          {account} · first meeting · 32 min
        </span>
      </header>
      <div className="gong-recap">
        <h4>Call recap</h4>
        <ul>
          <li>They have APM + Logs</li>
          <li>Security lead in the room</li>
          <li>Cost mentioned once</li>
          <li>No one who can sign was on the call</li>
        </ul>
      </div>
    </div>
  );
}

function SfdcAccountScreen({ account }: { account: string }) {
  return (
    <div className="site site-sfdc">
      <header>
        <span className="sfdc-cloud" />
        <strong>Sales</strong>
        <em>Lightning</em>
      </header>
      <div className="sfdc-title">
        <p>Account</p>
        <h3>{account}</h3>
      </div>
      <dl className="sfdc-fields">
        <div>
          <dt>Has now</dt>
          <dd>APM + Logs</dd>
        </div>
        <div>
          <dt>Security lead</dt>
          <dd>In first meeting</dd>
        </div>
        <div>
          <dt>Cost</dt>
          <dd>Mentioned once</dd>
        </div>
        <div>
          <dt>Who can sign</dt>
          <dd>Not confirmed</dd>
        </div>
      </dl>
      <table className="sfdc-related">
        <caption>Next 90 days</caption>
        <thead>
          <tr>
            <th>Product</th>
            <th>Owner</th>
            <th>Window</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bits AI</td>
            <td>Platform eng manager</td>
            <td>Day 15 to 45</td>
          </tr>
          <tr>
            <td>Cloud SIEM</td>
            <td>Security lead</td>
            <td>Day 15 to 45</td>
          </tr>
          <tr>
            <td>Cost</td>
            <td>FinOps alias</td>
            <td>Day 45 to 90</td>
          </tr>
          <tr>
            <td>RUM</td>
            <td>Frontend guild</td>
            <td>Day 45 to 90</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function SfdcOppScreen({
  account,
  highlight,
}: {
  account: string;
  highlight: boolean;
}) {
  return (
    <div className="site site-sfdc">
      <header>
        <span className="sfdc-cloud" />
        <strong>Sales</strong>
        <em>Lightning</em>
      </header>
      <div className="sfdc-title">
        <p>Opportunity</p>
        <h3>
          {account} · $1.4M
        </h3>
      </div>
      <dl className="sfdc-fields">
        <div>
          <dt>Stage</dt>
          <dd>4 · this quarter</dd>
        </div>
        <div className={highlight ? "gap" : undefined}>
          <dt>Signer meeting</dt>
          <dd>None on calendar</dd>
        </div>
        <div className={highlight ? "gap" : undefined}>
          <dt>Legal</dt>
          <dd>Slow · no dated path</dd>
        </div>
        <div className={highlight ? "gap" : undefined}>
          <dt>Inside contact</dt>
          <dd>Likes us · weak map</dd>
        </div>
        <div className={highlight ? "gap" : undefined}>
          <dt>Cloud SIEM</dt>
          <dd>Not in the story</dd>
        </div>
      </dl>
    </div>
  );
}

function SheetsScreen({
  account,
  artifact,
}: {
  account: string;
  artifact?: Artifact;
}) {
  const table = asTable(artifact);
  const rows = table
    ? table.rows
    : [
        [account, "Inside contact", "Signer TBD", "APM + Logs", "Tue SIEM"],
        ["Globex", "VP Eng", "CISO", "APM + Logs", "First meeting"],
        ["Initech", "SRE lead", "CTO", "APM + Logs", "Bits AI"],
        ["Umbrella", "Sec eng", "CISO", "APM + Logs", "Open source drill"],
        ["Hooli", "Platform", "Signer TBD", "APM + Logs", "Cost later"],
      ];
  const cols = table
    ? table.columns
    : ["Account", "Inside contact", "Who can sign", "Start with", "Next"];

  return (
    <div className="site site-sheets">
      <header>
        <span className="sheets-mark">Sheets</span>
        <strong>
          {table ? `${account} next 90 days` : "5 accounts x 5 prospects"}
        </strong>
      </header>
      <table>
        <thead>
          <tr>
            {cols.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GmailScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof asGmail>;
  sent: boolean;
}) {
  return (
    <div className="site site-gmail">
      <header>
        <strong>Gmail</strong>
        <em>{sent ? "Sent" : "Draft · not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {artifact?.to || `${account} contact`}
      </p>
      <p>
        <span>Subject</span>
        {artifact?.subject || `${account} / Datadog`}
      </p>
      <div>{artifact?.body || "Draft parked here until you tap Send?"}</div>
    </div>
  );
}

function SlackScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof asSlack>;
  sent: boolean;
}) {
  return (
    <div className="site site-slack">
      <header>
        <h4>{artifact?.channel || "#gtm-field"}</h4>
        <em>{sent ? "Sent" : "Draft · not sent"}</em>
      </header>
      <div className="slack-draft">
        {artifact?.body ||
          `Friday pack for ${account}. Draft only. Nothing posted.`}
      </div>
    </div>
  );
}

function GdocScreen({
  account,
  onePager,
  forecast,
  talks,
  packet,
}: {
  account: string;
  onePager: ReturnType<typeof asOnePager>;
  forecast: ReturnType<typeof asForecast>;
  talks: ReturnType<typeof asTalks>;
  packet: ReturnType<typeof asPacket>;
}) {
  return (
    <div className="site site-gdoc">
      <header>
        <strong>Docs</strong>
        <span>
          {forecast
            ? `${account} forecast`
            : talks
              ? "Bits AI talk tracks"
              : packet
                ? packet.title
                : onePager?.title || `${account} brief`}
        </span>
      </header>
      <article>
        {forecast ? (
          <>
            <p className="gdoc-status">{forecast.status}</p>
            <p>{forecast.body}</p>
          </>
        ) : talks ? (
          talks.tracks.map((track) => (
            <p key={track.seat}>
              <b>{track.seat}.</b> {track.line}
            </p>
          ))
        ) : packet ? (
          packet.fields.map((field) => (
            <p key={field.label}>
              <b>{field.label}.</b> {field.value}
            </p>
          ))
        ) : onePager ? (
          onePager.sections.map((section) => (
            <p key={section.heading}>
              <b>{section.heading}.</b> {section.body}
            </p>
          ))
        ) : (
          <p>Working note for {account}.</p>
        )}
      </article>
    </div>
  );
}

function ResearchScreen({ account }: { account: string }) {
  return (
    <div className="site site-research">
      <header>
        <strong>{account}.com</strong>
        <span>Public · last 30 days</span>
      </header>
      <p className="site-time">Researching the account · not a sequence</p>
      <ul>
        <li>
          <span>Status</span> Sev-2, 14 days ago. 47 minutes to name the failing
          service. Postmortem still says they jumped three tools.
        </li>
        <li>
          <span>Careers</span> Staff SRE JD: experience stitching APM and logs
          across teams. Posted this month.
        </li>
        <li>
          <span>Blog</span> We outgrew homegrown dashboards. No named
          replacement.
        </li>
        <li>
          <span>Org</span> VP Eng owns time-to-fix. Platform director sits on
          that stitch.
        </li>
      </ul>
    </div>
  );
}

function LinkedInScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof asLinkedin>;
  sent: boolean;
}) {
  return (
    <div className="site site-linkedin">
      <header>
        <strong>LinkedIn</strong>
        <em>{sent ? "Sent" : "Draft · not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {artifact?.to || `${account} VP Eng`}
        {artifact?.role ? ` · ${artifact.role}` : ""}
      </p>
      <div>{artifact?.body || "InMail parked here until you tap Send."}</div>
    </div>
  );
}

function PageScreen({
  account,
  onePager,
  outbound,
}: {
  account: string;
  onePager: ReturnType<typeof asOnePager>;
  outbound: ReturnType<typeof asOutbound>;
}) {
  const headline =
    outbound?.page.headline || onePager?.title || `For ${account}`;
  const body =
    outbound?.page.body ||
    onePager?.sections.map((section) => section.body).join(" ") ||
    `A page for ${account}. Draft only.`;

  return (
    <div className="site site-page">
      <header>
        <strong>Page</strong>
        <em>Not live</em>
      </header>
      <h4>{headline}</h4>
      {onePager ? (
        onePager.sections.map((section) => (
          <p key={section.heading}>
            <b>{section.heading}.</b> {section.body}
          </p>
        ))
      ) : (
        <p>{body}</p>
      )}
    </div>
  );
}
