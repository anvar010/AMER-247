import { Suspense } from "react";
import MobileFormScreen from "@/components/MobileFormScreen/MobileFormScreen";

export const metadata = {
  title: "Apply — Amer 24/7",
};

export default function ApplyPage() {
  return (
    <Suspense fallback={null}>
      <MobileFormScreen />
    </Suspense>
  );
}
