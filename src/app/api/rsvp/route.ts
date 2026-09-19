import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { parseAndValidateSubmission } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const result = parseAndValidateSubmission(body);
  if (!result.valid) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "RSVPs are not configured yet. Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      },
      { status: 500 }
    );
  }

  const { error } = await supabase.from("rsvps").insert(result.submission);

  if (error) {
    console.error("Supabase RSVP insert failed:", error.message);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your RSVP. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    record: { attending: result.submission.attending },
  });
}
