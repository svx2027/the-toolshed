/**
 * The case-study series — single source of truth for /case-studies/ and
 * /case-studies/<slug>/. Feeds the index page, each detail page, the
 * sitemap, and the "Case study" backlink each pipeline README points here.
 *
 * HOW TO ADD ONE: copy the template block at the bottom of this file,
 * fill it in, save. A build-time validator (bottom of file) fails
 * `npm run build` if an entry breaks house rules (no em-dashes, no
 * "ten times", a real github.com/svx2027 repo link, at least 3 sections),
 * so a bad paste is caught before it can ship.
 *
 * This file only ever describes anonymized, already-public work: no client
 * name, no real person's name, no competitor name. That check is run
 * externally before every push (this project's own denylist doctrine), on
 * purpose kept out of this file rather than embedded as a constant, so the
 * banned terms themselves never ship as literal strings in public source.
 */

export type Stat = {
  value: string;
  label: string;
};

export type Section = {
  heading: string;
  body: string[];
};

export type CaseStudy = {
  /** kebab-case id, also the URL slug */
  slug: string;
  title: string;
  /** One-line subtitle under the title */
  dek: string;
  repoName: string;
  repoUrl: string;
  /** Editorial date, e.g. "September 2026" */
  dated: string;
  readMinutes: number;
  stats: Stat[];
  sections: Section[];
  /** What the public repo honestly does not do yet, or never claims */
  honestScope: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  // HELD, not published (2026-09-11): svx2027/yt-playlist-seo-pipeline's own
  // already-public docs/LEARNINGS_REGISTER.md and core/config.template.json
  // carry subject-taxonomy and exam-cycle detail specific enough to narrow
  // down the real client beyond this project's accepted aggregation-risk
  // precedent. Sending case-study traffic toward that repo's docs/ before
  // that content is genericized (or the owner explicitly accepts the risk)
  // is not safe to do unilaterally. See gh-profile-builder NEEDS_ATTENTION.md
  // 2026-09-11 for the full finding and recommendation. Re-enable this entry
  // once resolved; the write-up itself was gated CLEAN/FIX-addressed.
  /*
  {
    slug: "playlist-seo-at-scale",
    title: "Rewriting SEO metadata for 384 videos without breaking one",
    dek: "A safety-gated pipeline re-optimized an entire live YouTube playlist's titles, descriptions, and chapters, grounded in each video's own transcript.",
    repoName: "yt-playlist-seo-pipeline",
    repoUrl: "https://github.com/svx2027/yt-playlist-seo-pipeline",
    dated: "September 2026",
    readMinutes: 6,
    stats: [
      { value: "384", label: "videos re-optimized on a live channel" },
      { value: "1", label: "canary video verified before every batch" },
      { value: "0", label: "hardcoded channel identity in the engine" },
    ],
    sections: [
      {
        heading: "The problem with bulk edits on a live channel",
        body: [
          "A script that rewrites titles, descriptions, and tags across an entire playlist has a huge blast radius and no bulk undo. One bad run does not fail loudly on video one; it silently degrades every video downstream, and the platform gives you no \"revert all\" button to fix it.",
          "The brief was a full playlist: every title, description, and tag rewritten and grounded in that video's own content, plus chapter timestamps where none existed, without a single video coming out worse than it started.",
        ],
      },
      {
        heading: "Snapshot first, always",
        body: [
          "Before anything writes, every video's current title, description, tags, and category get backed up. That single design choice turns \"something went wrong\" from a support ticket into a flag: revert one video or the whole playlist from the snapshot, no manual reconstruction, no guessing what it used to say.",
        ],
      },
      {
        heading: "Grounded in the transcript, not a template",
        body: [
          "Every rewrite reads that video's own transcript rather than filling a generic template, and the rules that matter are enforced in code, not left to a prompt: the revenue link sits in the first 200 characters, every link the old description had still appears in the new one (a superset, never a silent drop), and every link is checked to actually be clickable.",
          "That last check exists because of a platform quirk that is easy to miss by eye: a link only hyperlinks if it is a clean https:// URL followed by whitespace. One stray character jammed against it and it silently renders as plain, dead text, a broken revenue link that looks completely normal in a code review.",
        ],
      },
      {
        heading: "The chapter failure mode that looks perfectly formed",
        body: [
          "Chapter timestamps have a specific trap. A model samples a long transcript, guesses where a topic starts, and the guess gets snapped onto a real caption cue nearby, so the timestamp is real. But the label was still a guess, and a structurally perfect, wrong chapter is more dangerous than an obviously broken one, because it passes every shape check.",
          "The fix is architectural, not a better prompt: long videos are cut into windows and each window is labeled blind to its neighbors, and a separate truth gate checks whether a label's distinctive words actually occur at its own timestamp, not just somewhere else in the video. The gate also refuses to let a chapter open inside a sales pitch, because a viewer who clicks a chapter title was promised teaching, not an ad.",
        ],
      },
      {
        heading: "Canary before batch",
        body: [
          "Every push is a dry run first, then exactly one real video, checked against what was approved before the rest of the batch goes out. If something is wrong, it is wrong on 1 video, not 384, and the cost of finding out is one write instead of the whole playlist.",
        ],
      },
      {
        heading: "What actually shipped",
        body: [
          "384 videos on a real, live education channel had their titles, descriptions, and tags rewritten through this pipeline, each grounded in its own transcript, delivered through the snapshot-and-revert and canary-then-batch path above, start to finish.",
        ],
      },
    ],
    honestScope: [
      "The public repo linked above is a genericized rebuild of the same architecture, ported piece by piece; as of this writing its pre-flight auditor and the findings-gate that watches every check fire on a real defect are still landing.",
      "No hardcoded channel identity anywhere in the engine: creator name, exam or niche framing, links, and hashtags all come from one config file per channel.",
      "Chapter building needs real timed captions; a video with no usable transcript is queued for a fallback pass or waived and disclosed, never guessed.",
      "The canary-then-batch push path described above is the architecture used on the original flagship run; the genericized repo doesn't yet ship the push/verify-diff code that runs it live, that's part of the porting work still landing.",
    ],
  },
  */
  {
    slug: "daily-competitive-intelligence",
    title: "A script that finishes the scan before a human opens the first channel",
    dek: "Scanning 40+ channels a day, scoring every upload on six signals, and shipping a ranked report before the news cycle that made it relevant has closed.",
    repoName: "yt-competitor-swipe",
    repoUrl: "https://github.com/svx2027/yt-competitor-swipe",
    dated: "September 2026",
    readMinutes: 5,
    stats: [
      { value: "40+", label: "channels scanned every day" },
      { value: "6", label: "weighted signals behind one opportunity score" },
      { value: "66", label: "tests covering the scoring math" },
    ],
    sections: [
      {
        heading: "The problem is the clock, not the data",
        body: [
          "Competitive research in a fast-moving niche is a time trap. By the time a person has opened every competitor channel and judged every upload by eye, the window that made any of it useful has often already closed. The report has to exist before the deadline, or it is a history lesson, not intelligence.",
        ],
      },
      {
        heading: "Six signals, not one metric",
        body: [
          "Views-per-hour alone rewards channels that already have a huge audience, so the score blends it with five other signals: an outlier multiple measured against that channel's own baseline (a small channel's real breakout counts as much as a big one's), an engagement-velocity z-score, a demand-versus-supply keyword gap, cross-competitor title convergence, and a seasonal-calendar tailwind.",
          "Convergence turns out to be its own useful signal: when 3 or more competitors post near-identical titles on the same hook within 48 hours, that clustering is itself worth flagging, independent of how any single video performed. The weights live in one config file, not in code, so a niche's priorities can change without touching a line of Python.",
        ],
      },
      {
        heading: "Quota is the real constraint",
        body: [
          "One YouTube Data API endpoint, search.list, costs roughly 100x what every other call costs. That fact shapes the whole pipeline: there is an explicit degradation ladder where a quota squeeze narrows keyword discovery first, then comment mining, before it ever touches the core channel scan. The scan itself is never the thing that gets cut when the budget is tight.",
        ],
      },
      {
        heading: "The repo is the delivery surface",
        body: [
          "The report and a running history ledger are committed files in the repo, not an email or a slide deck that can quietly go stale in someone's downloads folder. A separate dashboard reads those same committed files at build time and serves a browsable, auth-gated view with expiring links for sharing one report outside the team.",
        ],
      },
      {
        heading: "Deadline discipline as the actual pitch",
        body: [
          "The report states, up front, how long the equivalent manual sweep would have taken. That is the real value proposition: not a prettier report, a finished one, sitting in the inbox before the deadline a human sweep would have missed.",
        ],
      },
    ],
    honestScope: [
      "No live hosted dashboard yet; it is built and runs locally, and a public demo deploy is planned but not live.",
      "Two configured features, community-post scraping and thumbnail-vision reads, are not built yet; the pipeline runs correctly without them by design (they default to empty or unset, never a crash).",
      "Title clustering falls back to a deterministic local method whenever the optional model call is unavailable, so the signal never depends on an external API staying up.",
    ],
  },
  // ── Template: copy this block above, fill it in, save ──────────────────
  // {
  //   slug: "case-slug",
  //   title: "The headline, plain language",
  //   dek: "One subtitle sentence.",
  //   repoName: "public-repo-name",
  //   repoUrl: "https://github.com/svx2027/public-repo-name",
  //   dated: "Month Year",
  //   readMinutes: 5,
  //   stats: [{ value: "N", label: "what it means" }],
  //   sections: [{ heading: "...", body: ["paragraph one", "paragraph two"] }],
  //   honestScope: ["what this does not do yet, or never claims"],
  // },
];

/**
 * Build-time guardrail, same pattern as src/lib/creators.ts: runs on import,
 * so any rule break fails `npm run build` with a clear message instead of
 * shipping. A case study is anonymized, already-approved work; this is the
 * mechanical half of that promise, not the whole of it.
 */
function validateCaseStudies(list: CaseStudy[]): void {
  const fail = (m: string) => {
    throw new Error(`caseStudies.ts: ${m}`);
  };
  const seen = new Set<string>();
  for (const cs of list) {
    if (!/^[a-z0-9-]+$/.test(cs.slug)) fail(`slug "${cs.slug}" must be kebab-case`);
    if (seen.has(cs.slug)) fail(`duplicate slug "${cs.slug}"`);
    seen.add(cs.slug);
    if (cs.sections.length < 3) fail(`"${cs.title}" needs at least 3 sections`);

    let host: string;
    try {
      host = new URL(cs.repoUrl).hostname.replace(/^www\./, "");
    } catch {
      fail(`"${cs.title}" has an unparseable repoUrl: ${cs.repoUrl}`);
      continue;
    }
    if (host !== "github.com" || !cs.repoUrl.includes("/svx2027/")) {
      fail(`"${cs.title}" repoUrl must point at a github.com/svx2027 repo: ${cs.repoUrl}`);
    }

    const copy = [
      cs.title,
      cs.dek,
      ...cs.sections.flatMap((s) => [s.heading, ...s.body]),
      ...cs.honestScope,
      ...cs.stats.map((s) => s.label),
    ].join(" ");
    if (copy.includes("—")) fail(`"${cs.title}" copy has an em-dash (house rule: none)`);
    if (/\bten times\b/i.test(copy)) fail(`"${cs.title}" copy says "ten times"; use "10x"`);
  }
}
validateCaseStudies(CASE_STUDIES);
