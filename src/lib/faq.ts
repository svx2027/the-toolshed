// Single source of truth for the Help section. The Faq component renders it,
// and page.tsx serialises it into FAQPage JSON-LD so search engines see the same answers.
export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is this place?",
    a: "Code for Creatives India. A garage of tiny free apps you can use right now, plus the words to build your own with AI. One person runs it, and that person replies to every message himself.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. If you can write a clear sentence, you can write a prompt. Every tool here was built by describing what I wanted in plain English and letting AI do the heavy lifting. Judgment about what to build matters far more than the code.",
  },
  {
    q: "What does it cost? What is the catch?",
    a: "Nothing, and there is no catch. No accounts, no tracking, no captchas. Nothing leaves your device. The one exception: if you hand me your email on purpose, I store that single email to tell you when a new tool ships.",
  },
  {
    q: "What do I actually get out of it?",
    a: "Leverage. A tiny app saves you hours every week, reaches people while you sleep, and can grow into a portfolio piece or a product you sell. The goal is simple: 10x your capability and let your work earn without more hours.",
  },
  {
    q: "Where do I start?",
    a: "Play one tool from the Garage, then copy the starter prompt in the Start Here section and paste it into any AI assistant. Stuck at any step? DM me on Instagram and I answer it myself.",
  },
];
