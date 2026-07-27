// Server-only Mettpay client. Never import from a client component — the
// merchant headers must stay off the browser bundle. Card entry itself
// happens on Mettpay's own hosted checkout page (the `payment_url` this
// returns), not on our site, so no card data ever passes through here.
type MettpayOrderInput = {
  amount: string;
  referenceId: string;
  name: string;
  email: string;
  mobile: string;
  returnUrl: string;
  returnSuccUrl: string;
  returnErrorUrl: string;
};

type MettpayOrderResponse = {
  payment_url: string;
  [key: string]: unknown;
};

export async function createMettpayOrder(
  input: MettpayOrderInput
): Promise<MettpayOrderResponse> {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const merchantKey = process.env.MERCHANT_KEY;
  const merchantSecret = process.env.MERCHANT_SECRET;
  if (!url || !merchantKey || !merchantSecret) {
    throw new Error(
      "Missing Mettpay environment variables (NEXT_PUBLIC_API_URL / MERCHANT_KEY / MERCHANT_SECRET)."
    );
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      merchantKey,
      merchantSecret,
    },
    body: JSON.stringify({
      order: {
        amount: input.amount,
        currency: "AED",
        remarks: "Amer247 Payment",
        id: input.referenceId,
        returnUrl: input.returnUrl,
        returnSuccUrl: input.returnSuccUrl,
        returnErrorUrl: input.returnErrorUrl,
      },
      customer: {
        email: input.email,
        firstName: input.name,
        lastName: input.name,
        mobilePhone: input.mobile,
        phone: input.mobile,
      },
    }),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Mettpay create-order failed (${response.status}): ${text}`);
  }

  return JSON.parse(text);
}

// Mettpay's own status vocabulary — confirmed "SETTLED" (a real paid order)
// and "created" (a real not-yet-paid order) via get_order_details. The
// others are defensive synonyms in case their webhook uses different
// wording than their order-details API does. Used to recognize a real
// success and map it to our own "success" value — never write Mettpay's
// raw word into our transaction_status column directly.
export const METTPAY_SUCCESS_STATUSES = new Set([
  "SETTLED", "settled",
  "SUCCESS", "success",
  "CAPTURED", "captured",
  "AUTHORIZED", "authorized",
]);

export type MettpayOrderDetails = {
  status: string;
  amount?: string;
  paidTime?: string;
  pay_channel?: string;
  unique_order_id?: string;
  [key: string]: unknown;
};

// Actively checks an order's real status by our own reference ID — the
// reconciliation counterpart to createMettpayOrder, used when we can't rely
// on Mettpay's webhook (unconfirmed whether it's even configured) to tell us
// a payment settled. Same auth as order creation, just a GET against a
// different path on the same host.
export async function getMettpayOrderDetails(orderId: string): Promise<MettpayOrderDetails | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const merchantKey = process.env.MERCHANT_KEY;
  const merchantSecret = process.env.MERCHANT_SECRET;
  if (!apiUrl || !merchantKey || !merchantSecret) {
    throw new Error(
      "Missing Mettpay environment variables (NEXT_PUBLIC_API_URL / MERCHANT_KEY / MERCHANT_SECRET)."
    );
  }

  const base = new URL(apiUrl).origin;
  const response = await fetch(`${base}/api/get_order_details?orderId=${encodeURIComponent(orderId)}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      merchantKey,
      merchantSecret,
    },
  });

  if (!response.ok) return null;
  const json = await response.json();
  return json?.data ?? null;
}
