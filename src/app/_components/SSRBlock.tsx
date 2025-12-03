export const dynamic = "force-dynamic";

async function getNowExternal() {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 3500); // 3.5s timeout

  try {
    const res = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC", {
      cache: "no-store",
      signal: ac.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<{ datetime: string }>;
  } finally {
    clearTimeout(t);
  }
}

export default async function SSRBlock() {
  try {
    const { datetime } = await getNowExternal();
    return (
      <div style={{ marginTop: 16 }}>
        <h2>SSR content inside main page</h2>
        <p>UTC Time: {datetime}</p>
      </div>
    );
  } catch (e) {
    // graceful fallback: still proves SSR is happening
    return (
      <div style={{ marginTop: 16 }}>
        <h2>SSR content inside main page</h2>
        <p>UTC Time (local fallback): {new Date().toISOString()}</p>
        <small style={{ opacity: 0.7 }}>External API failed; showed local time.</small>
      </div>
    );
  }
}
