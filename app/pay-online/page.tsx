import PageHero from "@/components/PageHero/PageHero";
import PayOnlineForm from "./PayOnlineForm";
import styles from "./pay-online.module.css";

export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
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
