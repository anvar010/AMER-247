import PageHero from "@/components/PageHero/PageHero";
import PaymentMethod from "./PaymentMethod";
import styles from "./payment.module.css";

export const metadata = {
  title: "AMER247 - Immigration Services | Dubai Visa Applications/Renewal",
  description:
    "Amer247 is a Semi Government Organization operating 24 hrs, allowing residents to complete all Visa and Residency transactions. Apply Online!",
};

export default function PaymentPage() {
  return (
    <>
      <PageHero title="Confirm Your Payment Details" />
      <div className={`container ${styles.body}`}>
        <div className={styles.grid}>
          <div className={styles.summary}>
            <h2 className={styles.h2}>General Detail</h2>
            <div className={styles.row}><span>Name</span><b>Amer 247</b></div>
            <div className={styles.row}><span>Order</span><b>Visa Application</b></div>
            <div className={styles.row}>
              <span>Adult Passengers</span>
              <div className={styles.priceTag}>
                Price: AED400
                <small>(Inclusive of VAT)</small>
              </div>
            </div>
          </div>
          <div className={styles.methods}>
            <h2 className={styles.h2}>Passengers Detail</h2>
            <PaymentMethod />
          </div>
        </div>
      </div>
    </>
  );
}
