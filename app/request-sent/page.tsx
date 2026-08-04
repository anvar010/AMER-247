import { Suspense } from "react";
import RequestSentView from "./RequestSentView";

export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function RequestSentPage() {
  return (
    <Suspense fallback={null}>
      <RequestSentView />
    </Suspense>
  );
}
