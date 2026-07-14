// Builds the /apply URL for a priced service. When an item has both an
// inside-UAE and outside-UAE price, both are passed through separately (not
// pre-resolved to one) so the form itself can show the Inside/Outside UAE
// toggle and recompute the fee live — matching the real app's FormScreen.
export function buildApplyHref(
  item: { name: string; inside?: string; outside?: string; single?: string },
  hub: string
): string {
  const params = new URLSearchParams();
  params.set("service", item.name);
  params.set("hub", hub);

  if (item.inside && item.outside) {
    params.set("inside", item.inside);
    params.set("outside", item.outside);
  } else {
    params.set("price", item.single ?? item.inside ?? item.outside ?? "");
  }

  return `/apply?${params.toString()}`;
}
