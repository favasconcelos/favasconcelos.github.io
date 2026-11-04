const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

/** Formats an ISO `YYYY-MM-DD` date, e.g. "November 4, 2026". Posts are English-only. */
export function formatPostDate(isoDate: string): string {
  return formatter.format(new Date(isoDate));
}
