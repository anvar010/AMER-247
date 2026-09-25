// Strips invisible Unicode formatting/control characters that mobile
// keyboards (especially RTL-enabled ones, switching between Arabic and
// Latin fields in the same form) can silently leave in user input — e.g.
// a Right-to-Left Mark (U+200F) prepended to an otherwise normal email
// address. These are never visible to the user and never intentional, but
// third-party APIs (Mettpay's create-order, in the case that motivated
// this) can fail validation on them with an opaque error.
//
// Deliberately narrow, using explicit \u escapes (not the literal
// characters themselves — those are invisible in a source file and easy
// to lose/corrupt via editors or encodings). Only matches: zero-width
// spaces/joiners (U+200B-U+200D), RTL/LTR marks (U+200E-U+200F), bidi
// embedding/override/isolate controls (U+202A-U+202E, U+2066-U+2069), and
// the byte-order-mark (U+FEFF). Never matches any visible character —
// digits, letters, punctuation, or real RTL script (Arabic/Hebrew text
// itself is untouched, only the invisible formatting marks around it).
const INVISIBLE_CHARS = /[​-‏‪-‮⁦-⁩﻿]/g;

export function stripInvisibleChars(value: string): string {
  return value.replace(INVISIBLE_CHARS, "");
}

// Deliberately simple (not RFC 5322) — just enough to reject the junk that
// has actually slipped through the old "length > 3" check on the client
// (an Emirates ID number like "784-1988-9328293-3" is 19 characters and
// contains no "@", so it passed): requires a local part, an "@", a domain
// with at least one ".", and no whitespace anywhere. Good real-world
// addresses always pass this; it only exists to catch obvious non-emails.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}
