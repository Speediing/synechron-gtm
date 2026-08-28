import type { Clip, ClipId } from "./types";

function clip(
  id: ClipId,
  title: string,
  caption: string,
): Clip {
  return {
    id,
    file: `/api/media/krista-clips/${id}.mp4`,
    poster: `/media/krista-clips/${id}.jpg`,
    title,
    caption,
  };
}

export const CLIPS: Record<ClipId, Clip> = {
  "01-morning-inbox": clip(
    "01-morning-inbox",
    "Morning inbox",
    "7:30am weekday scan. Flags what needs a reply. Quiet if the inbox is empty.",
  ),
  "02-prospecting-pg": clip(
    "02-prospecting-pg",
    "Prospecting",
    "Five drafted emails. None send until she says so.",
  ),
  "03-slides-granola": clip(
    "03-slides-granola",
    "Slides from the room",
    "Granola is in. Slides writes the What we heard cards while she is still on the call.",
  ),
  "04-engineer-bugbot": clip(
    "04-engineer-bugbot",
    "Engineer",
    "Wired to the repo. Answers a setup question without leaving the thread.",
  ),
  "05-forecast-sfdc": clip(
    "05-forecast-sfdc",
    "Forecast",
    "Demo notes in. Next steps in the format her manager wants.",
  ),
  "06-customer-expert": clip(
    "06-customer-expert",
    "Customer expert",
    "Who is in the account, what they use, questions in Slack.",
  ),
  "07-customer-exec-brief": clip(
    "07-customer-exec-brief",
    "Exec brief",
    "Turns what it just watched her do into a short note for her boss.",
  ),
  "08-chief-groupchat": clip(
    "08-chief-groupchat",
    "Chief group chat",
    "Opens a group channel. Chief of Staff, Slides, Engineer. Splits the work.",
  ),
};

export const ALL_CLIPS: Clip[] = Object.values(CLIPS);
