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
