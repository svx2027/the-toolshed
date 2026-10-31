/**
 * Keeps the Supabase Free project awake. A Free project pauses after about a week with no database
 * activity, and a paused project silently breaks every form on this site (/api/subscribe, /api/event,
 * /api/lead). Vercel's cron (see "crons" in vercel.json) calls this twice a week; each call writes one
 * "keepalive" row into the `events` table, which is a real database write and leaves a visible trace.
 *
 * Only Vercel's cron runner (user-agent "vercel-cron/1.0") or a caller holding CRON_SECRET may trigger it,
 * and a warm instance answers at most once an hour, so the endpoint cannot be used to spam the table.
 */
const SUPABASE_URL = process.env.SUPABASE_URL || "https://kbrhnedyzoljptpdloix.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || "sb_publishable_NXzN8VbbzWPsBpzY66svgg_aOiCz5pS";

let lastRun = 0;

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export async function GET(request: Request) {
  const ua = request.headers.get("user-agent") || "";
  const auth = request.headers.get("authorization") || "";
  const secret = process.env.CRON_SECRET;
  const fromCron = ua.startsWith("vercel-cron/");
  const withSecret = !!secret && auth === `Bearer ${secret}`;
  if (!fromCron && !withSecret) return json(401, { ok: false });

  const now = Date.now();
  if (now - lastRun < 60 * 60 * 1000) return json(200, { ok: true, skipped: "ran within the hour" });
  lastRun = now;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/events`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "content-type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ name: "keepalive", page: "/api/keepalive" }),
    });
    if (res.ok) return json(200, { ok: true, supabase: res.status });
    return json(502, { ok: false, supabase: res.status });
  } catch {
    return json(502, { ok: false });
  }
}
