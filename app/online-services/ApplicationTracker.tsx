"use client";

import React, { useState, useEffect } from "react";
import { Check, FileText } from "lucide-react";
import styles from "./online-services.module.css";

export default function ApplicationTracker() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 3000); // Change step every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.dashWidget}>
      <div className={styles.dashHeader}>
        <div className={styles.dashIconWrap}>
          <FileText size={18} className={styles.dashIcon} />
        </div>
        <div className={styles.dashHeaderText}>
          <span className={styles.dashTitle}>Application Tracker</span>
          <span className={styles.dashSub}>Ref: AMER-84729</span>
        </div>
      </div>

      <div className={styles.stepper}>
        {/* Step 1: Documents Verified */}
        <div className={styles.stepItem}>
          <div className={step >= 1 ? `${styles.stepCircle} ${styles.stepDone}` : styles.stepCirclePending}>
            {step >= 1 && <Check size={12} strokeWidth={4} />}
          </div>
          <div className={step >= 1 ? `${styles.stepText} ${styles.stepTextActive}` : styles.stepTextPending}>
            Documents Verified
          </div>
        </div>
        <div className={
          step > 1 ? styles.stepLine : 
          step === 1 ? styles.stepLineAnimated : 
          styles.stepLinePending
        } />

        {/* Step 2: Processing Visa */}
        <div className={styles.stepItem}>
          <div
            className={
              step > 2
                ? `${styles.stepCircle} ${styles.stepDone}`
                : step === 2
                ? `${styles.stepCircle} ${styles.stepActive}`
                : styles.stepCirclePending
            }
          >
            {step > 2 ? <Check size={12} strokeWidth={4} /> : step === 2 ? <div className={styles.stepDot} /> : null}
          </div>
          <div
            className={
              step >= 2 ? `${styles.stepText} ${styles.stepTextActive}` : styles.stepTextPending
            }
          >
            Processing Visa
          </div>
        </div>
        <div className={
          step > 2 ? styles.stepLine : 
          step === 2 ? styles.stepLineAnimated : 
          styles.stepLinePending
        } />

        {/* Step 3: Final Approval */}
        <div className={styles.stepItem}>
          <div
            className={
              step > 3
                ? `${styles.stepCircle} ${styles.stepDone}`
                : step === 3
                ? `${styles.stepCircle} ${styles.stepActive}`
                : styles.stepCirclePending
            }
          >
             {step > 3 ? <Check size={12} strokeWidth={4} /> : step === 3 ? <div className={styles.stepDot} /> : null}
          </div>
          <div
            className={
              step >= 3 ? `${styles.stepText} ${styles.stepTextActive}` : styles.stepTextPending
            }
          >
            Final Approval
          </div>
        </div>
      </div>
    </div>
  );
}
