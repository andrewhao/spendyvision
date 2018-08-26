import { DateTime } from "luxon";

export function isoDateToFriendlyDisplay(isoDate: string): string {
  return DateTime.fromISO(isoDate).toFormat("yyyy LLLL");
}
