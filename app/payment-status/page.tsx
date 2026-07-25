import { Suspense } from "react";
import PaymentStatusView from "./PaymentStatusView";

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={null}>
      <PaymentStatusView />
    </Suspense>
  );
}
