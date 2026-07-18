import PageHero from "@/components/PageHero/PageHero";
import PayOnlineForm from "./PayOnlineForm";
import styles from "./pay-online.module.css";

export const metadata = {
  title: "AMER247 - Immigration Services | Dubai Visa Applications/Renewal",
  description:
    "Amer247 is a Semi Government Organization operating 24 hrs, allowing residents to complete all Visa and Residency transactions. Apply Online!",
};

export default function PayOnlinePage() {
  return (
    <>
      <PageHero title="Confirm the details for application" />
      <div className={`container ${styles.body}`}>
        <PayOnlineForm />
      </div>
    </>
  );
}
