import type { Artifact, CroJob, SlideCard } from "./types";

export const CLIENT_DECK_SLIDES: SlideCard[] = [
  {
    n: 1,
    kicker: "Confirmed point",
    voice: "us",
    title: "What we covered",
    body: "Client team asked for a short discovery workshop. The deck stays on that ask.",
  },
  {
    n: 2,
    kicker: "Open question",
    voice: "them",
    title: "What is still open",
    body: "Who on Client team owns the workshop. Confirm before the next meeting.",
  },
  {
    n: 3,
    kicker: "Approved source",
    voice: "us",
    title: "What we can show",
    body: "Use the public workshop outline. Do not add extra scope on these slides.",
  },
  {
    n: 4,
    kicker: "Next step",
    voice: "us",
    title: "Ready to review",
    body: "The last slides now match the call notes. Nothing leaves this draft until you send.",
  },
];

export const CLIENT_REPLY: Extract<Artifact, { kind: "redlines" }> = {
  kind: "redlines",
  title: "Client question. Sourced reply",
  paperTitle: "Open questions",
  from: "Client contact",
  marks: [
    {
      text: "Share the workshop outline",
      note: "Yes. Use the public outline. Do not add extra scope.",
      take: true,
    },
    {
      text: "Who joins from our side",
      note: "Seller plus one delivery lead. You name the people.",
      take: true,
    },
    {
      text: "Lock a start week",
      note: "Do not promise a week. Offer times after you check.",
      take: false,
    },
  ],
  reply: {
    to: "Client contact",
    subject: "Your questions. Draft reply",
    body: "Hi Client contact,\n\nThe public workshop outline is the source for the first question. We can share that.\n\nOur side is the seller plus one delivery lead. I will name them before we book.\n\nI will not lock a start week in this note. I can offer times after I check.\n\nNothing in this draft is sent until you say so.\n\nBest,",
  },
};

export const CLIENT_BRIEF: Extract<Artifact, { kind: "one-pager" }> = {
  kind: "one-pager",
  title: "Client account brief",
  eyebrow: "First-touch brief",
  sections: [
    {
      heading: "What we saw",
      body: "The public site has a discovery workshop ask. That is the opening.",
    },
    {
      heading: "Why this account",
      body: "Client team published the ask. The first note should stay on that page.",
    },
    {
      heading: "Open question",
      body: "Who on Client team owns the ask. Confirm before you send.",
    },
    {
      heading: "Draft",
      body: "A first-touch note is ready. Nothing is sent.",
    },
  ],
};

export const JOBS: [CroJob, CroJob, CroJob] = [
  {
    id: "standardize-room",
    number: 1,
    title: "Update the client deck",
    trigger: "A client call starts",
    backgroundAction: "Reading call notes and updating the open deck",
    problem:
      "The open deck is generic. The client should see their own notes back on the slides before the call ends.",
    botJob:
      "The agent reads the live notes and rewrites the last slides. You review the deck. Nothing sends itself.",
    storyboard: [
      {
        when: "On the call",
        label: "The call starts. Notes are open. The agent is already in.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Client account call",
          people: [
            { initials: "YO", name: "You" },
            { initials: "CC", name: "Client contact" },
            { initials: "CT", name: "Client team" },
          ],
        },
      },
      {
        when: "Still on",
        label: "Confirmed points land in the notes. The open deck is still generic.",
        scene: "notes",
        visual: {
          kind: "deck-update",
          eyebrow: "Call notes",
          headline: "Confirmed point is in",
          product: "Workshop ask is the slide",
          status: "Notes ready",
        },
      },
      {
        when: "Still on",
        label: "The agent writes those notes into the last slides of the open deck.",
        scene: "deck",
        visual: {
          kind: "deck-update",
          eyebrow: "Open deck",
          headline: "Slides now match the notes",
          product: "Workshop outline only",
          status: "Deck updated",
        },
      },
      {
        when: "Before you leave",
        label: "The finished deck is ready to review.",
        scene: "deck",
        slides: CLIENT_DECK_SLIDES,
      },
    ],
    unlock: "Call notes on the slides before the call ends.",
    outcome: "A client-specific deck is ready to review before you leave the call.",
    clips: [],
    demo: {
      title: "Deck from notes",
      subtitle: "Live notes. Slides in the open deck",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "deck",
          name: "Deck from notes",
          role: "bot",
          persona: "Turns live call notes into slides you can review",
          color: "#34C759",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "deck",
          kind: "routine",
          body: "Client account call started. I am in the notes and watching the open deck. The deck stays put until a confirmed point is worth a slide.",
        },
        {
          id: "m2",
          from: "deck",
          kind: "text",
          body: "Confirmed point is in. Client team asked for a short discovery workshop. I am writing that into the last slides now.",
        },
        {
          id: "m3",
          from: "deck",
          kind: "draft",
          draftLabel: "Last slides of the open deck",
          artifact: {
            kind: "slides",
            title: "Client account deck",
            cards: CLIENT_DECK_SLIDES,
          },
        },
        {
          id: "m4",
          from: "deck",
          kind: "system",
          body: "Nothing sent. The deck stays a draft until you use it.",
        },
      ],
    },
  },
  {
    id: "legal-redlines",
    number: 2,
    title: "Prepare a sourced reply",
    trigger: "A client question arrives",
    backgroundAction: "Searching approved sources and drafting a reply",
    problem:
      "A client question can sit while you chase teams. The agent finds the approved answer and drafts the reply.",
    botJob:
      "The agent reads the question, checks approved sources, and leaves a draft. You send it.",
    storyboard: [
      {
        when: "Question landed",
        label: "A client question arrives. The agent starts while you are in another meeting.",
        scene: "notes",
        visual: {
          kind: "procurement-email",
          sender: "Client contact",
          subject: "Questions on the workshop",
          questions: 3,
        },
      },
      {
        when: "Sources checked",
        label: "Approved sources are open on the computer. Each question has a note.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Approved source", answer: "Public outline" },
            { name: "Confirmed point", answer: "Seller plus delivery lead" },
            { name: "Open question", answer: "Start week stays open" },
          ],
          status: "Ready to draft",
        },
      },
      {
        when: "Draft waiting",
        label: "A sourced reply is waiting. Nothing is sent.",
        scene: "send",
        visual: {
          kind: "reply-ready",
          to: "Client contact",
          subject: "Your questions. Draft reply",
          status: "Ready to review",
        },
      },
      {
        when: "Your review",
        label: "The sourced reply is ready to send or hold.",
        scene: "send",
        artifact: CLIENT_REPLY,
      },
    ],
    unlock: "Question in. A sourced draft out. No chase across teams.",
    outcome: "A sourced reply is ready to review. Nothing is sent.",
    clips: [],
    demo: {
      title: "Sourced reply",
      subtitle: "Client question. Draft waiting",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "reply",
          name: "Sourced reply",
          role: "bot",
          persona: "Finds approved answers and drafts the reply so you do not chase teams",
          color: "#FF375F",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "reply",
          kind: "routine",
          body: "New Client account thread. Client contact asked about the workshop. I am checking approved sources now.",
        },
        {
          id: "m2",
          from: "reply",
          kind: "text",
          body: "Public outline covers the first question. Seller plus one delivery lead covers the second. The start week stays open.",
        },
        {
          id: "m3",
          from: "reply",
          kind: "draft",
          draftLabel: "Questions plus reply",
          artifact: CLIENT_REPLY,
        },
        {
          id: "m4",
          from: "reply",
          kind: "draft",
          draftLabel: "Gmail reply. Not sent",
          artifact: {
            kind: "gmail",
            title: "Reply to Client contact",
            to: CLIENT_REPLY.reply.to,
            subject: CLIENT_REPLY.reply.subject,
            body: CLIENT_REPLY.reply.body,
          },
        },
        {
          id: "m5",
          from: "reply",
          kind: "system",
          body: "Nothing sent. The reply stays a draft until you tap Send.",
        },
      ],
    },
  },
  {
    id: "attach-engine",
    number: 3,
    title: "Build the account brief",
    trigger: "A target account enters your list",
    backgroundAction: "Reading public pages and writing a first-touch brief",
    problem:
      "First touch is often a generic note. The brief should come from what the account already published.",
    botJob:
      "The agent reads public pages, writes a short brief, and drafts first-touch notes. You send.",
    storyboard: [
      {
        when: "Account added",
        label: "Client account hits your list. Research starts without a prompt.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Client account",
          sources: ["Public site", "Program page", "Careers"],
          signal: "Workshop ask on the site",
        },
      },
      {
        when: "Pages open",
        label: "The computer is on the public pages. The brief is built from those pages.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Why us", answer: "Workshop shape they published" },
            { label: "Why now", answer: "The ask is on their site" },
            { label: "Why them", answer: "Client team posted the ask" },
          ],
        },
      },
      {
        when: "Brief written",
        label: "A first-touch brief and a draft note are waiting.",
        scene: "map",
        visual: {
          kind: "outreach-ready",
          person: "Client contact",
          channels: ["Brief", "Email", "Page"],
          status: "Drafts ready. None sent",
        },
      },
      {
        when: "Your review",
        label: "The first-touch brief is ready to review.",
        scene: "send",
        artifact: CLIENT_BRIEF,
      },
    ],
    unlock: "Public pages in. A first-touch brief out. You send.",
    outcome: "A first-touch brief is ready to review. Nothing is sent.",
    clips: [],
    demo: {
      title: "Account brief",
      subtitle: "Public research to a first note",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "brief",
          name: "Account brief",
          role: "bot",
          persona: "Reads public pages and writes a first-touch brief",
          color: "#FF9500",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "brief",
          kind: "routine",
          body: "Client account entered your list. No meeting yet. I am reading public pages and writing a first-touch brief. Drafts only.",
        },
        {
          id: "m2",
          from: "brief",
          kind: "text",
          body: "Public program page has a discovery workshop ask. I am writing the brief from that page, not from a guess.",
        },
        {
          id: "m3",
          from: "brief",
          kind: "draft",
          draftLabel: "First-touch brief",
          artifact: CLIENT_BRIEF,
        },
        {
          id: "m4",
          from: "brief",
          kind: "draft",
          draftLabel: "Gmail. Not sent",
          artifact: {
            kind: "gmail",
            title: "First-touch note",
            to: "Client contact",
            subject: "Client account. Discovery workshop",
            body: "Hi Client contact,\n\nI read the public workshop page. I can walk Client team through a short discovery session that stays on that ask.\n\nDraft only. Nothing sent until you tap Send.",
          },
        },
        {
          id: "m5",
          from: "brief",
          kind: "system",
          body: "Nothing sent. The brief and the note stay drafts until you tap Send.",
        },
      ],
    },
  },
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
