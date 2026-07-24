"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/PageHero/PageHero";
import styles from "./payment-status.module.css";

export default function PaymentStatusView() {
  const searchParams = useSearchParams();
  const st = searchParams.get("st");
  const orderid = searchParams.get("orderid");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const mobile = searchParams.get("mobile");
  const amount = searchParams.get("amount");
  const [emailSent, setEmailSent] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [retryError, setRetryError] = useState("");

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
    }).catch((error) => console.error("send-application-email failed:", error));
  }, [st, orderid, emailSent]);

  const entries = Array.from(searchParams.entries()).filter(([key]) => key !== "comments" && key !== "st");

  return (
    <>
      <PageHero title="Transaction Details" />
      <div className={`container ${styles.body}`}>
        {st === "1" ? (
          <p className={styles.success}>Transaction Successful. A confirmation email has been sent to you.</p>
        ) : st === "2" ? (
          <>
            <p className={styles.failure}>Transaction Failed. Please try again or contact support.</p>
            {orderid && name && email && mobile && amount && (
              <button type="button" className={styles.retryBtn} onClick={retryPayment} disabled={retrying}>
                {retrying ? "Starting payment…" : "Retry Payment"}
              </button>
            )}
            {retryError && <p className={styles.failure}>{retryError}</p>}
          </>
        ) : (
          <p className={styles.neutral}>No transaction reference was provided.</p>
        )}

        {entries.length > 0 && (
          <ul className={styles.list}>
            {entries.map(([key, val]) => (
              <li key={key}><b>{key}:</b> {val}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
