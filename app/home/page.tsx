import { redirect } from "next/navigation";

// Merged into "/" itself (mobile-only content there, right after the splash)
// so mobile and desktop share one canonical homepage URL. Kept as a redirect
// so any existing links/bookmarks to /home still land in the right place.
export default function HomeTabPage() {
  redirect("/");
}
