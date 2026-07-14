import { Building2, IdCard, Gem, FileText, Stethoscope, ShieldPlus } from "lucide-react";
import MobileScreenHead from "@/components/MobileScreenHead/MobileScreenHead";
import MobileMenuRow from "@/components/MobileMenuRow/MobileMenuRow";
import { amerSubCategories } from "@/app/online-services/AmerServicesData";
import styles from "./MobileServicesScreen.module.css";

const amerServiceCount = amerSubCategories.reduce((a, g) => a + g.items.length, 0);

// Mirrors the app's Services tab exactly: same 6 hubs, same order, same
// icons/accents (only Golden Visa is gold, everything else is the red
// gradient), same "<sub> · N services" row format. Only "AMER Services"
// has itemized AED pricing data in this codebase (AmerServicesData.ts) and
// gets a full priced drill-down; the rest link to the existing pricing
// browser rather than a page that doesn't exist.
const categories = [
  { icon: Building2, title: "Amer Services", sub: "Entry permits, residency & more", count: amerServiceCount, href: "/services/immigration" },
  { icon: IdCard, title: "Emirates ID", sub: "ID applications", count: 12, href: "/online-services" },
  { icon: Gem, title: "Golden Visa", sub: "5 & 10-year residency", count: 13, href: "/online-services", gold: true },
  { icon: FileText, title: "Tas-Heel Services", sub: "MOL online services", count: 1, href: "/online-services" },
  { icon: Stethoscope, title: "Medical Test", sub: "Medical fitness test", count: 3, href: "/online-services" },
  { icon: ShieldPlus, title: "Insurance", sub: "Health insurance plans", count: 8, href: "/online-services" },
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
