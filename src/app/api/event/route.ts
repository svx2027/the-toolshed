import crypto from "node:crypto";

/**
 * First-party, anonymous event counter → Supabase `events` (insert-only RLS).
 * The browser fires {name, page} here when someone copies a prompt or downloads
 * a file. NO personal data: no email, no cookie, no IP stored — just a named
 * count and the page it happened on, so activation ("copies") is measurable
 * without a third-party tracker. Same publishable anon key as subscribe; RLS
 * lets anon INSERT only (never SELECT), so a leaked key can't read the counts.
 * Server-side call keeps CSP connect-src at 'self'.
 *
 * Requires this table (run once in the Supabase SQL editor):
 *   create table if not exists public.events (
 *     id bigint generated always as identity primary key,
 *     name text not null,
 *     page text,
 *     created_at timestamptz not null default now()
 *   );
 *   alter table public.events enable row level security;
 *   create policy "anon insert only" on public.events
 *     for insert to anon with check (true);
 */
const SUPABASE_URL = process.env.SUPABASE_URL || "https://kbrhnedyzoljptpdloix.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || "sb_publishable_NXzN8VbbzWPsBpzY66svgg_aOiCz5pS";
const IP_SALT = process.env.SUBSCRIBE_SALT || "toolshed-subscribe-v1";

// Only these event names are ever recorded: a fixed allowlist plus one pattern
// for the creator shelf (creator_best_<slug>), so adding a creator never needs an
// edit here. Keeps the table clean and stops the endpoint being an open write sink.
const ALLOWED = new Set(["copy_starter", "copy_fable", "download_starter", "download_fable", "share_link"]);
const ALLOWED_PATTERN = /^creator_best_[a-z0-9-]{1,32}$/;
const isAllowed = (name: string) => ALLOWED.has(name) || ALLOWED_PATTERN.test(name);

// best-effort in-memory throttle (per warm instance): hashedIP -> timestamps
const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 1000;
const MAX_PER_WINDOW = 30;

function rateLimited(ipHash: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ipHash) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ipHash, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > MAX_PER_WINDOW;
}

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export async function POST(request: Request) {
  // sendBeacon posts a Blob typed application/json; plain fetch does too.
  if (!request.headers.get("content-type")?.includes("application/json")) return json(400, { ok: false });

  let data: { name?: unknown; page?: unknown };
  try {
    const raw = await request.text();
    if (raw.length > 512) return json(400, { ok: false });
    data = JSON.parse(raw);
  } catch {
    return json(400, { ok: false });
  }

  const name = typeof data.name === "string" ? data.name : "";
  if (!isAllowed(name)) return json(400, { ok: false });

  // page path only, strict shape, capped — never a full URL with query/PII
  const page =
    typeof data.page === "string" && /^\/[a-z0-9/-]{0,48}$/.test(data.page) ? data.page : "/";

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  const ipHash = crypto.createHash("sha256").update(IP_SALT + ip).digest("hex");
  if (rateLimited(ipHash)) return json(429, { ok: false });

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/events`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "content-type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ name, page }),
    });
    // Fire-and-forget: a missing table or RLS hiccup must never surface to the
    // user (the copy already happened). Always report ok.
    return json(200, { ok: true });
  } catch {
    console.error("event failed", crypto.randomUUID());
    return json(200, { ok: true });
  }
}
