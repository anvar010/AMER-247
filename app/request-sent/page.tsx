import { Suspense } from "react";
import RequestSentView from "./RequestSentView";

export default function RequestSentPage() {
  return (
    <Suspense fallback={null}>
      <RequestSentView />
    </Suspense>
  );
}
