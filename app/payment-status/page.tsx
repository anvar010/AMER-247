import { Suspense } from "react";
import PaymentStatusView from "./PaymentStatusView";

export const metadata = {
  title: "AMER247 - Immigration Services | Dubai Visa Applications/Renewal",
  description:
    "Amer247 is a Semi Government Organization operating 24 hrs, allowing residents to complete all Visa and Residency transactions. Apply Online!",
};

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={null}>
      <PaymentStatusView />
    </Suspense>
  );
}
