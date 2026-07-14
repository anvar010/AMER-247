"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Outfit } from "next/font/google";
import {
  User, Mail, Lock, Eye, EyeOff, ArrowRight, Fingerprint,
} from "lucide-react";
import styles from "./MobileLoginScreen.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

type Tab = "signin" | "register";
type Method = "phone" | "email";
type Stage = "form" | "otp";

export default function MobileLoginScreen() {
  const [tab, setTab] = useState<Tab>("signin");
  const [method, setMethod] = useState<Method>("phone");
  const [stage, setStage] = useState<Stage>("form");
  const [showPw, setShowPw] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [notice, setNotice] = useState<string | null>(null);
  const otpRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const flash = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2400);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === "phone") {
      setStage("otp");
      setTimeout(() => otpRefs[0].current?.focus(), 60);
    } else {
      flash("Sign-in isn't connected to an account system on this site yet.");
    }
  };

  const onOtpChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = otp.slice();
    next[i] = v;
    setOtp(next);
    if (v && i < 3) otpRefs[i + 1].current?.focus();
  };
  const onOtpKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs[i - 1].current?.focus();
  };
  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    flash("Sign-in isn't connected to an account system on this site yet.");
  };

  const title = stage === "otp" ? "Verify your number" : tab === "signin" ? "Welcome back" : "Create account";
  const sub = stage === "otp" ? "Enter the 4-digit code we sent" : tab === "signin" ? "Sign in to manage your applications" : "Join AMER 24/7 to apply & track online";

  return (
    <div className={`${styles.wrap} ${outfit.className}`}>
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.brand}>
          <h1 className={styles.h1}>
            Government services,<br /><span className={styles.gold}>around the clock.</span>
          </h1>
          <p className={styles.p}>One secure account for visa, residency &amp; Emirates ID applications.</p>
        </div>
      </div>

      <div className={styles.sheet}>
        <div className={styles.grip} />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{sub}</p>

        {notice && <div className={styles.notice}>{notice}</div>}

        {stage === "form" ? (
          <>
            <div className={styles.seg}>
              <button className={tab === "signin" ? styles.segOn : ""} onClick={() => setTab("signin")}>Sign In</button>
              <button className={tab === "register" ? styles.segOn : ""} onClick={() => setTab("register")}>Register</button>
            </div>

            <form onSubmit={submit}>
              {tab === "register" && (
                <div className={styles.field}>
                  <label>Full name</label>
                  <div className={styles.iw}>
                    <User size={18} className={styles.lead} />
                    <input className={styles.inputHasIcon} type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                </div>
              )}

              <div className={`${styles.seg} ${styles.segMb16}`}>
                <button type="button" className={method === "phone" ? styles.segOn : ""} onClick={() => setMethod("phone")}>Phone</button>
                <button type="button" className={method === "email" ? styles.segOn : ""} onClick={() => setMethod("email")}>Email</button>
              </div>

              {method === "phone" ? (
                <div className={styles.field}>
                  <label>Mobile number</label>
                  <div className={styles.phoneRow}>
                    <span className={styles.phoneCode}>+971</span>
                    <input className={styles.input} type="tel" inputMode="tel" placeholder="50 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.field}>
                    <label>Email address</label>
                    <div className={styles.iw}>
                      <Mail size={18} className={styles.lead} />
                      <input className={styles.inputHasIcon} type="email" placeholder="you@example.com" required />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>Password</label>
                    <div className={styles.iw}>
                      <Lock size={18} className={styles.lead} />
                      <input className={styles.inputHasIcon} type={showPw ? "text" : "password"} placeholder="••••••••" required />
                      <button type="button" className={styles.eye} onClick={() => setShowPw(!showPw)} aria-label="Toggle password visibility">
                        {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              <button type="submit" className={styles.submitBtn}>
                {method === "phone" ? "Send OTP" : tab === "signin" ? "Sign In" : "Create Account"} <ArrowRight size={18} />
              </button>
            </form>

            <div className={styles.divider}>or continue with</div>

            <button className={styles.uaePass} onClick={() => flash("UAE PASS isn't connected on this site yet.")}>
              <Fingerprint size={20} /> <span>UAE <b>PASS</b></span>
            </button>
            <div className={styles.oauthRow}>
              <button className={styles.oauth} onClick={() => flash("Google sign-in (demo)")}>Google</button>
              <button className={styles.oauth} onClick={() => flash("Apple sign-in (demo)")}>Apple</button>
            </div>

            <p className={styles.foot}>
              {tab === "signin" ? "Don't have an account? " : "Already have an account? "}
              <button type="button" className={styles.footLink} onClick={() => setTab(tab === "signin" ? "register" : "signin")}>
                {tab === "signin" ? "Register" : "Sign in"}
              </button>
            </p>
          </>
        ) : (
          <form onSubmit={verify}>
            <p className={styles.otpNote}>Sent to <b>+971 {phone || "50 000 0000"}</b></p>
            <div className={styles.otpRow}>
              {otp.map((d, i) => (
                <input
                  key={i}
                  ref={otpRefs[i]}
                  className={styles.otpCell}
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => onOtpChange(i, e.target.value)}
                  onKeyDown={(e) => onOtpKeyDown(i, e)}
                />
              ))}
            </div>
            <button type="submit" className={styles.submitBtn}>
              Verify &amp; Continue <ArrowRight size={18} />
            </button>
            <p className={styles.foot}>
              Didn&apos;t get a code?{" "}
              <button type="button" className={styles.footLink} onClick={() => flash("Code resent")}>Resend</button>
              {"  ·  "}
              <button type="button" className={styles.footLink} onClick={() => setStage("form")}>Change</button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
