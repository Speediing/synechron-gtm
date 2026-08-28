import type { ClipId, JobId } from "./types";

export type SiteKind =
  | "granola"
  | "figma"
  | "gong"
  | "sfdc-account"
  | "sfdc-opp"
  | "sheets"
  | "gmail"
  | "slack"
  | "gdoc"
  | "linkedin"
  | "research"
  | "page"
  | "clip";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  clip?: ClipId;
  tabs: ChromeTab[];
};

const granola = { id: "granola", host: "granola.app", label: "Granola" };
const figma = { id: "figma", host: "figma.com", label: "Figma" };
const gmail = { id: "gmail", host: "mail.google.com", label: "Gmail" };
const gong = { id: "gong", host: "app.gong.io", label: "Gong" };
const sfdc = {
  id: "sfdc",
  host: "datadog.lightning.force.com",
  label: "Salesforce",
};
const sheets = {
  id: "sheets",
  host: "docs.google.com",
  label: "Sheets",
};
const slack = { id: "slack", host: "app.slack.com", label: "Slack" };
const gdoc = { id: "gdoc", host: "docs.google.com", label: "Docs" };
const linkedin = {
  id: "linkedin",
  host: "www.linkedin.com",
  label: "LinkedIn",
};
const web = { id: "web", host: "acme.com", label: "Acme" };

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "standardize-room": {
    m1: {
      pill: "Opening Granola",
      host: "granola.app",
      path: "/notes/acme-datadog",
      title: "Acme <> Datadog",
      site: "granola",
      tabs: [granola, figma, gmail],
    },
    m2: {
      pill: "In Granola",
      host: "granola.app",
      path: "/notes/acme-datadog",
      title: "Acme <> Datadog",
      site: "granola",
      tabs: [granola, figma, gmail],
    },
    m3: {
      pill: "Pulling Granola, still on the call",
      host: "granola.app",
      path: "/notes/acme-datadog",
      title: "Acme <> Datadog",
      site: "clip",
      clip: "03-slides-granola",
      tabs: [granola, figma, gmail],
    },
    m4: {
      pill: "Writing their discovery into the deck",
      host: "figma.com",
      path: "/file/acme-next-meeting",
      title: "Acme next meeting",
      site: "figma",
      tabs: [granola, figma, gmail],
    },
    m5: {
      pill: "Drafting the one-pager",
      host: "figma.com",
      path: "/file/acme-leave-behind",
      title: "Acme one-pager",
      site: "figma",
      tabs: [granola, figma, gmail],
    },
    m6: {
      pill: "Building the inside note",
      host: "figma.com",
      path: "/file/acme-champion-packet",
      title: "Inside note",
      site: "figma",
      tabs: [granola, figma, gmail],
    },
    m7: {
      pill: "Drafting in Gmail, not sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [granola, figma, gmail],
    },
    m8: {
      pill: "Drafting in Gmail, not sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [granola, figma, gmail],
    },
  },
  "legal-redlines": {
    m1: {
      pill: "Opening Gmail",
      host: "mail.google.com",
      path: "/mail/u/0/#inbox",
      title: "Inbox",
      site: "gmail",
      tabs: [gmail, gdoc],
    },
    m2: {
      pill: "Drafting so you do not chase billing",
      host: "mail.google.com",
      path: "/mail/u/0/#inbox",
      title: "Inbox",
      site: "clip",
      clip: "01-morning-inbox",
      tabs: [gmail, gdoc],
    },
    m3: {
      pill: "Drafting the morning reply, not sent",
      host: "docs.google.com",
      path: "/document/d/acme-invoices",
      title: "Acme invoices INV-0080 · INV-0081",
      site: "gdoc",
      tabs: [gmail, gdoc],
    },
    m4: {
      pill: "Drafting in Gmail, not sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, gdoc],
    },
    m5: {
      pill: "Drafting in Gmail, not sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, gdoc],
    },
  },
  "attach-engine": {
    m1: {
      pill: "Researching the account",
      host: "acme.com",
      path: "/careers/staff-sre",
      title: "Staff SRE · Observability",
      site: "research",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m2: {
      pill: "Pulling public evidence of the pain",
      host: "acme.com",
      path: "/status",
      title: "Acme status",
      site: "clip",
      clip: "02-prospecting-pg",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m3: {
      pill: "Writing the 3-why hypothesis",
      host: "docs.google.com",
      path: "/document/d/acme-3-why",
      title: "Acme 3-why",
      site: "gdoc",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m4: {
      pill: "Naming who would care",
      host: "docs.google.com",
      path: "/document/d/acme-3-why",
      title: "Acme 3-why",
      site: "gdoc",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m5: {
      pill: "Drafting LinkedIn, not sent",
      host: "www.linkedin.com",
      path: "/messaging/compose",
      title: "Message",
      site: "linkedin",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m6: {
      pill: "Drafting in Gmail, not sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m7: {
      pill: "Building a page for this account",
      host: "acme.datadoghq.dev",
      path: "/acme-sev2",
      title: "For Acme platform",
      site: "page",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m8: {
      pill: "Drafts parked. Nothing sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [web, gdoc, linkedin, gmail],
    },
  }
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
