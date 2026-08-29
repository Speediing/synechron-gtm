import type { JobId } from "./types";

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
  clip?: never;
  tabs: ChromeTab[];
};

const granola = { id: "granola", host: "granola.app", label: "Granola" };
const figma = { id: "figma", host: "figma.com", label: "Figma" };
const gmail = { id: "gmail", host: "mail.google.com", label: "Gmail" };
const gdoc = { id: "gdoc", host: "docs.google.com", label: "Docs" };
const linkedin = {
  id: "linkedin",
  host: "www.linkedin.com",
  label: "LinkedIn",
};
const web = { id: "web", host: "example.com", label: "Client site" };

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "standardize-room": {
    m1: {
      pill: "Opening notes",
      host: "granola.app",
      path: "/notes/client-account",
      title: "Client account call",
      site: "granola",
      tabs: [granola, figma, gmail],
    },
    m2: {
      pill: "Writing notes into the deck",
      host: "figma.com",
      path: "/file/client-account-deck",
      title: "Client account deck",
      site: "figma",
      tabs: [granola, figma, gmail],
    },
    m3: {
      pill: "Deck ready to review",
      host: "figma.com",
      path: "/file/client-account-deck",
      title: "Client account deck",
      site: "figma",
      tabs: [granola, figma, gmail],
    },
    m4: {
      pill: "Deck parked. Nothing sent",
      host: "figma.com",
      path: "/file/client-account-deck",
      title: "Client account deck",
      site: "figma",
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
      pill: "Checking approved sources",
      host: "docs.google.com",
      path: "/document/d/client-account-reply",
      title: "Client account reply",
      site: "gdoc",
      tabs: [gmail, gdoc],
    },
    m3: {
      pill: "Drafting the sourced reply",
      host: "docs.google.com",
      path: "/document/d/client-account-reply",
      title: "Client account reply",
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
      pill: "Draft parked. Nothing sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, gdoc],
    },
  },
  "attach-engine": {
    m1: {
      pill: "Reading public pages",
      host: "example.com",
      path: "/programs/workshop",
      title: "Discovery workshop",
      site: "research",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m2: {
      pill: "Writing the brief from those pages",
      host: "docs.google.com",
      path: "/document/d/client-account-brief",
      title: "Client account brief",
      site: "gdoc",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m3: {
      pill: "Brief ready to review",
      host: "docs.google.com",
      path: "/document/d/client-account-brief",
      title: "Client account brief",
      site: "gdoc",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m4: {
      pill: "Drafting in Gmail, not sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m5: {
      pill: "Drafts parked. Nothing sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [web, gdoc, linkedin, gmail],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
