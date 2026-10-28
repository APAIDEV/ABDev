const TZ = "America/New_York";

export function formatDateTime(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatDate(isoDate: string | null | undefined) {
  if (!isoDate) return "—";
  // Plain dates (YYYY-MM-DD) are calendar dates, not instants.
  const [y, m, d] = isoDate.slice(0, 10).split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "short", day: "numeric", year: "numeric" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}

function tzOffsetMinutes(utcMs: number) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: TZ,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
      .formatToParts(new Date(utcMs))
      .map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
  return (asUtc - utcMs) / 60000;
}

/** "2026-12-20T14:30" entered in New York time → ISO instant. */
export function easternLocalToIso(value: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if (!m) return null;
  const guess = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
  const offset = tzOffsetMinutes(guess);
  const utc = guess - offset * 60000;
  // Re-check once in case the guess crossed a daylight-saving boundary.
  const corrected = guess - tzOffsetMinutes(utc) * 60000;
  return new Date(corrected).toISOString();
}

/** ISO instant → "2026-12-20T14:30" in New York time, for datetime-local inputs. */
export function isoToEasternLocal(iso: string | null | undefined) {
  if (!iso) return "";
  const ms = new Date(iso).getTime();
  return new Date(ms + tzOffsetMinutes(ms) * 60000).toISOString().slice(0, 16);
}

/** Today's date in New York, YYYY-MM-DD. */
export function easternToday(now: Date) {
  return new Date(now.getTime() + tzOffsetMinutes(now.getTime()) * 60000).toISOString().slice(0, 10);
}
