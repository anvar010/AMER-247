"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, X, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero/PageHero";
import styles from "./payment-status.module.css";

// Mettpay's own redirect appears to HTML-entity-encode the return URL
// somewhere on their end without decoding it back before the actual
// browser redirect — the query string arrives as "...&amp;orderid=..."
// instead of "...&orderid=...", which the browser's own parser then reads
// as a param literally named "amp;orderid". Falling back to the "amp;"
// prefixed key keeps every field working regardless of which form Mettpay
// sends.
function param(searchParams: URLSearchParams, key: string): string | null {
  return searchParams.get(key) ?? searchParams.get(`amp;${key}`);
}

export default function PaymentStatusView() {
  const searchParams = useSearchParams();
  const st = param(searchParams, "st");
  const orderid = param(searchParams, "orderid");
  const name = param(searchParams, "name");
  const email = param(searchParams, "email");
  const mobile = param(searchParams, "mobile");
  const amount = param(searchParams, "amount");
  const [emailSent, setEmailSent] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [retryError, setRetryError] = useState("");
  const [mettpayOrderId, setMettpayOrderId] = useState("");

  // Re-attempts payment against the SAME reference/submission row instead of
  // sending the user back to refill the whole form — a fresh form load would
  // generate a brand-new reference (see ApplicationForm/TouristVisaForm's
  // refNum), leaving this failed attempt orphaned in Supabase forever with
  // no link to whatever the user eventually completes.
  const retryPayment = async () => {
    if (!orderid || !name || !email || !mobile || !amount) return;
    setRetrying(true);
    setRetryError("");
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile, amount, referenceId: orderid, returnUrl: window.location.origin }),
      });
      const json = await res.json();
      if (!res.ok || !json.paymentUrl) throw new Error(json.error || "Could not start payment.");
      window.location.href = json.paymentUrl;
    } catch {
      setRetrying(false);
      setRetryError("Couldn't start the payment. Please try again later.");
    }
  };

  // Fires the deferred admin/customer emails now that Mettpay has confirmed
  // success — /api/apply intentionally skipped sending them at submission
  // time for any priced item (see `deferEmail` there). The route itself is
  // idempotent (checks `data.emailSent` in Supabase), so a reload here can't
  // double-send even though this local flag can't survive one.
  useEffect(() => {
    if (st !== "1" || !orderid || emailSent) return;
    setEmailSent(true);
    fetch("/api/send-application-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderid }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json?.mettpayOrderId) setMettpayOrderId(String(json.mettpayOrderId));
      })
      .catch((error) => console.error("send-application-email failed:", error));
  }, [st, orderid, emailSent]);

  const details: [string, string][] = [
    ["Reference", orderid ?? ""],
    ["Name", name ?? ""],
    ["Email", email ?? ""],
    ["Mobile", mobile ?? ""],
    ["Amount", amount ? `AED ${amount}` : ""],
    ["Mettpay Order ID", mettpayOrderId],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <>
      <PageHero title="Transaction Details" />
      <div className={`container ${styles.body}`}>
        <div className={styles.wrap}>
          {st === "1" ? (
            <>
              <span className={`${styles.burst} ${styles.burstOk}`}><Check size={34} /></span>
              <h1 className={styles.title}>Payment Successful</h1>
              <p className={styles.copy}>Your payment has been confirmed. A confirmation email has been sent to you.</p>
            </>
          ) : st === "2" ? (
            <>
              <span className={`${styles.burst} ${styles.burstFail}`}><X size={34} /></span>
              <h1 className={styles.title}>Payment Failed</h1>
              <p className={styles.copy}>Please try again or contact support.</p>
            </>
          ) : (
            <>
              <h1 className={styles.title}>No Transaction Found</h1>
              <p className={styles.copy}>No transaction reference was provided.</p>
            </>
          )}

          {details.length > 0 && (
            <div className={styles.card}>
              {details.map(([label, value]) => (
                <div key={label} className={styles.row}>
                  <span className={styles.rowLabel}>{label}</span>
                  <span className={styles.rowValue}>{value}</span>
                </div>
              ))}
            </div>
          )}

          {st === "2" && (
            <div className={styles.actions}>
              {orderid && name && email && mobile && amount && (
                <button type="button" className={styles.primary} onClick={retryPayment} disabled={retrying}>
                  {retrying ? "Starting payment…" : "Retry Payment"}
                </button>
              )}
              <Link href="/" className={styles.secondary}>Back to home</Link>
            </div>
          )}
          {retryError && <p className={styles.retryError}>{retryError}</p>}

          {st === "1" && (
            <div className={styles.actions}>
              <Link href="/" className={styles.primary}>Back to home <ArrowRight size={16} /></Link>
            </div>
          )}
          {!st && (
            <div className={styles.actions}>
              <Link href="/" className={styles.secondary}>Back to home</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
