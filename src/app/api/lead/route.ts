import crypto from "node:crypto";

/**
 * "Work with me" form → Supabase `leads` (insert-only RLS), same shape and rules as /api/subscribe:
 * the browser POSTs {email, channel, note, company} here; this server route inserts via the Supabase
 * REST endpoint with the PUBLISHABLE (anon) key. RLS lets the anon role INSERT only, never SELECT.
 * The table is created once with supabase/leads.sql. If it is missing the insert fails, this returns
 * 502, and the form shows a prefilled "Email me instead" link, so no lead is lost.
 */
const SUPABASE_URL = process.env.SUPABASE_URL || "https://kbrhnedyzoljptpdloix.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || "sb_publishable_NXzN8VbbzWPsBpzY66svgg_aOiCz5pS";
const IP_SALT = process.env.SUBSCRIBE_SALT || "toolshed-subscribe-v1";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// best-effort in-memory throttle (per warm instance): hashedIP -> timestamps
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ipHash: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ipHash) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ipHash, arr);
  if (hits.size > 5000) hits.clear(); // bound memory
  return arr.length > MAX_PER_WINDOW;
}

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "";

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) return json(400, { ok: false });

  let data: { email?: unknown; channel?: unknown; note?: unknown; company?: unknown };
  try {
    const raw = await request.text();
    if (raw.length > 4000) return json(400, { ok: false });
    data = JSON.parse(raw);
  } catch {
    return json(400, { ok: false });
  }

  // honeypot: bots fill the hidden "company" field, silently accept, store nothing
  if (typeof data.company === "string" && data.company.trim() !== "") return json(200, { ok: true });

  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) return json(400, { ok: false });
  const channel = clean(data.channel, 300);
  const note = clean(data.note, 600);

  // coarse abuse limit on a hashed IP (never store the raw IP next to the email)
  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  const ipHash = crypto.createHash("sha256").update(IP_SALT + ip).digest("hex");
  if (rateLimited(ipHash)) return json(429, { ok: false });

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "content-type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email, channel, note, source: "work-with-me" }),
    });
    if (res.ok) return json(200, { ok: true });
    return json(502, { ok: false });
  } catch {
    return json(502, { ok: false });
  }
}
