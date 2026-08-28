import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  seat?: boolean;
};

export const FLEET: FleetBot[] = [
  {
    id: "rep",
    name: "Every sales rep",
    blurb: "The human stays in control. Their agents keep the surrounding work moving.",
    color: "#E8E8ED",
    mark: "AE",
    seat: true,
  },
  {
    id: "inbox",
    name: "Inbox agent",
    blurb: "Watches procurement. Finds answers overnight before the rep opens Gmail.",
    jobId: "legal-redlines",
    color: "#FF375F",
  },
  {
    id: "cross-sell",
    name: "Outbound agent",
    blurb: "Watches target accounts. Builds the 3-why and queues personalized drafts.",
    jobId: "attach-engine",
    color: "#FF9500",
  },
];
