export type AttendingValue = "yes" | "no";

export interface RSVPFormValues {
  guestName: string;
  attending: AttendingValue | "";
  adultCount: number;
  childCount: number;
  message: string;
}

export interface RSVPSubmission {
  guest_name: string;
  attending: boolean;
  adult_count: number;
  child_count: number;
  message: string | null;
}

export interface RSVPRecord extends RSVPSubmission {
  id: string;
  created_at: string;
}

export type RSVPApiResponse =
  | { ok: true; record: { attending: boolean } }
  | { ok: false; error: string };
