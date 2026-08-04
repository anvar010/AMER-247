import { Suspense } from "react";
import PaymentStatusView from "./PaymentStatusView";

export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={null}>
      <PaymentStatusView />
    </Suspense>
  );
}
