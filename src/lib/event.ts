export const EVENT = {
  childName: "Zidaan",
  age: 2,
  title: "Zidaan 2 The Rescue",
  dateLabel: "October 31st",
  timeLabel: "11 AM – 4 PM",
  addressLine1: "845 Hazel Street",
  addressLine2: "Livermore, California",
  fullAddress: "845 Hazel Street, Livermore, CA",
  // Local wall-clock start/end used to build the .ics file (America/Los_Angeles).
  startDate: "2026-10-31T11:00:00",
  endDate: "2026-10-31T16:00:00",
} as const;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  EVENT.fullAddress
)}`;
