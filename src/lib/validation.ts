import type { RSVPFormValues, RSVPSubmission } from "@/types/rsvp";

export const COUNT_OPTIONS = [0, 1, 2, 3, 4, 5, 6] as const;

const MAX_NAME_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 500;

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof RSVPFormValues, string>>;
}

/**
 * Shared validation used by both the client form and the server API route.
 * Keeping this in one place means the two can never silently drift apart.
 */
export function validateRSVP(values: RSVPFormValues): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  const name = values.guestName.trim();
  if (!name) {
    errors.guestName = "Please tell us your name.";
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.guestName = `Name must be ${MAX_NAME_LENGTH} characters or fewer.`;
  }

  if (values.attending !== "yes" && values.attending !== "no") {
    errors.attending = "Please let us know if you can make it.";
  }

  if (
    !Number.isInteger(values.adultCount) ||
    values.adultCount < 0 ||
    values.adultCount > 6
  ) {
    errors.adultCount = "Please choose a number of adults.";
  }

  if (
    !Number.isInteger(values.childCount) ||
    values.childCount < 0 ||
    values.childCount > 6
  ) {
    errors.childCount = "Please choose a number of children.";
  }

  if (values.message.trim().length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function toSubmission(values: RSVPFormValues): RSVPSubmission {
  const message = values.message.trim();
  return {
    guest_name: values.guestName.trim(),
    attending: values.attending === "yes",
    adult_count: values.adultCount,
    child_count: values.childCount,
    message: message.length > 0 ? message : null,
  };
}

/** Re-validates a raw JSON payload on the server, independent of client types. */
export function parseAndValidateSubmission(
  body: unknown
): { valid: true; submission: RSVPSubmission } | { valid: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Invalid request body." };
  }

  const record = body as Record<string, unknown>;

  const guestName =
    typeof record.guest_name === "string" ? record.guest_name.trim() : "";
  const attending = record.attending;
  const adultCount = Number(record.adult_count);
  const childCount = Number(record.child_count);
  const message =
    typeof record.message === "string" ? record.message.trim() : "";

  if (!guestName || guestName.length > MAX_NAME_LENGTH) {
    return { valid: false, error: "A valid guest name is required." };
  }

  if (typeof attending !== "boolean") {
    return { valid: false, error: "Attendance status is required." };
  }

  if (
    !Number.isInteger(adultCount) ||
    adultCount < 0 ||
    adultCount > 6 ||
    !Number.isInteger(childCount) ||
    childCount < 0 ||
    childCount > 6
  ) {
    return { valid: false, error: "Guest counts must be between 0 and 6." };
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: "Message is too long." };
  }

  return {
    valid: true,
    submission: {
      guest_name: guestName,
      attending,
      adult_count: adultCount,
      child_count: childCount,
      message: message.length > 0 ? message : null,
    },
  };
}
