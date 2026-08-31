import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  seat?: boolean;
  tools?: string;
};

export const FLEET: FleetBot[] = [
  {
    id: "rep",
    name: "Synechron seller",
    blurb: "You stay in control. Each agent has its own cloud computer and leaves drafts for you.",
    color: "#E8E8ED",
    mark: "AE",
    seat: true,
    tools: "Reviews drafts. Sends from your inbox.",
  },
  {
    id: "deck",
    name: "Deck from notes",
    blurb: "Reads live call notes and updates the open deck.",
    jobId: "standardize-room",
    color: "#34C759",
    tools: "Cloud computer. Granola and Figma.",
  },
  {
    id: "reply",
    name: "Sourced reply",
    blurb: "Reads a client question and drafts a sourced reply.",
    jobId: "legal-redlines",
    color: "#FF375F",
    tools: "Cloud computer. Gmail and Docs.",
  },
  {
    id: "brief",
    name: "Account brief",
    blurb: "Reads public pages and writes a first-touch brief.",
    jobId: "attach-engine",
    color: "#FF9500",
    tools: "Cloud computer. Browser and Docs.",
  },
];
