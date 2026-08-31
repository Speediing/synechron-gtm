export type HeroJobIcon =
  | "outbound"
  | "research"
  | "follow-up"
  | "deal-desk"
  | "pipeline"
  | "renewal"
  | "competitive"
  | "chief-of-staff";

export type HeroJob = {
  name: string;
  icon: HeroJobIcon;
  account: string;
  signal: string;
  work: string;
  result: string;
  user: string;
  bot: string;
};

export const HERO_JOBS: [HeroJob, ...HeroJob[]] = [
  {
    name: "Outbound drafts",
    icon: "outbound",
    account: "Client account",
    signal: "New digital program on their site",
    work: "I opened the account in the browser, read the public program page, and drafted a first email about a short discovery workshop. Nothing sent.",
    result: "Draft outreach ready to review",
    user: "keep it as a draft",
    bot: "draft stays here. you send when you want.",
  },
  {
    name: "Account brief",
    icon: "research",
    account: "Target account",
    signal: "Workshop request landed",
    work: "I searched the public site and news on the computer, then wrote a one-page brief with who they are, what they asked for, and what to ask next.",
    result: "Account brief ready to review",
    user: "open the brief",
    bot: "it is in the thread. i will update it if the ask changes.",
  },
  {
    name: "Call recap",
    icon: "follow-up",
    account: "Today's call",
    signal: "Client call ended",
    work: "I used the call notes on the computer, wrote the recap, and listed owners and next steps. The follow-up email is a draft.",
    result: "Recap and draft email ready",
    user: "i will send the recap",
    bot: "recap stays a draft until you send.",
  },
  {
    name: "Deal paper",
    icon: "deal-desk",
    account: "Open proposal",
    signal: "Security questions arrived",
    work: "I searched our approved answers on the computer and filled the questionnaire. Two items still need a person.",
    result: "Questionnaire draft ready",
    user: "leave the open items for me",
    bot: "those two stay marked. the rest is ready to review.",
  },
  {
    name: "Pipeline check",
    icon: "pipeline",
    account: "Active pipeline",
    signal: "A few deals went quiet",
    work: "I opened the tracker, read the last activity, and wrote the missing next step for each quiet deal.",
    result: "Next-step notes ready",
    user: "send me the list",
    bot: "list is in the thread. i will watch the tracker.",
  },
  {
    name: "Renewal watch",
    icon: "renewal",
    account: "Renewal cycle",
    signal: "Client notes look thin",
    work: "I read the account notes and open tickets on the computer, then wrote a short renewal brief with the gaps to fill before the next meeting.",
    result: "Renewal brief ready to review",
    user: "share it with the account team",
    bot: "brief stays here until you forward it.",
  },
  {
    name: "Competitive notes",
    icon: "competitive",
    account: "Live opportunity",
    signal: "Another firm came up on the call",
    work: "I pulled the public comparison points into a talk track for this account. No win story. Just what to say and what not to claim.",
    result: "Talk track ready to review",
    user: "add it to the next call brief",
    bot: "added to the brief. review it before the call.",
  },
  {
    name: "Weekly brief",
    icon: "chief-of-staff",
    account: "This week's review",
    signal: "Open decisions still sitting",
    work: "I gathered pipeline notes, open asks, and follow-ups from your tools, then wrote the one-page brief for your manager.",
    result: "Weekly brief ready to review",
    user: "i will send it after i read it",
    bot: "it stays a draft. next week's list is started.",
  },
];
