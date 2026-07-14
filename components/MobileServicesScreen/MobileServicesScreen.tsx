import { Building2, IdCard, Gem, FileText, Stethoscope, ShieldPlus } from "lucide-react";
import MobileScreenHead from "@/components/MobileScreenHead/MobileScreenHead";
import MobileMenuRow from "@/components/MobileMenuRow/MobileMenuRow";
import { amerSubCategories } from "@/app/online-services/AmerServicesData";
import { OTHER_HUBS } from "@/components/MobileSearchOverlay/catalog";
import styles from "./MobileServicesScreen.module.css";

const countOf = (groups: { items: unknown[] }[]) => groups.reduce((a, g) => a + g.items.length, 0);
const hubByKey = (key: string) => OTHER_HUBS.find((h) => h.key === key)!;

// Mirrors the app's Services tab exactly: same 6 hubs, same order, same
// icons/accents (only Golden Visa is gold, everything else is the red
// gradient), same "<sub> · N services" row format. Every hub now has real
// itemized pricing (Amer Services from AmerServicesData.ts, the rest from
// MobileSearchOverlay/catalog.ts, transcribed from the real app) and its
// own priced drill-down screen — counts are computed from that same data
// so they can never drift out of sync with what the hub screen shows.
const categories = [
  { icon: Building2, title: "Amer Services", sub: "Entry permits, residency & more", count: countOf(amerSubCategories), href: "/services/immigration" },
  { icon: IdCard, title: "Emirates ID", sub: "ID applications", count: countOf(hubByKey("emirates-id").groups), href: "/services/emirates-id" },
  { icon: Gem, title: "Golden Visa", sub: "5 & 10-year residency", count: countOf(hubByKey("golden").groups), href: "/services/golden", gold: true },
  { icon: FileText, title: "Tas-Heel Services", sub: "MOL online services", count: countOf(hubByKey("tasheel").groups), href: "/services/tasheel" },
  { icon: Stethoscope, title: "Medical Test", sub: "Medical fitness test", count: countOf(hubByKey("medical").groups), href: "/services/medical" },
  { icon: ShieldPlus, title: "Insurance", sub: "Health insurance plans", count: countOf(hubByKey("insurance").groups), href: "/services/insurance" },
];

export default function MobileServicesScreen() {
  return (
    <div className={styles.wrap}>
      <MobileScreenHead
        kicker="WHAT WE DO"
        title="Services"
        sub="Every visa, residency & ID transaction — handled 24/7. Pick a category to begin."
      />
      <div className={styles.menu}>
        {categories.map((c) => (
          <MobileMenuRow
            key={c.title}
            icon={c.icon}
            iconBg={c.gold ? "gold" : "primary"}
            label={c.title}
            sub={`${c.sub} · ${c.count} services`}
            href={c.href}
          />
        ))}
      </div>
    </div>
  );
}
