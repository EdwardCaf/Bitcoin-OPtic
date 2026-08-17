import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";
import { Button } from "../common/Button";
import { useMailerLiteOnVisible } from "../../hooks/useMailerLite";
import styles from "./NewsletterSection.module.css";

const MAILERLITE_SUBSCRIBE_ENDPOINT =
  "https://assets.mailerlite.com/jsonp/2111034/forms/179249626676725407/subscribe";

export function NewsletterSection({ standalone = false }) {
  const inputId = useId();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");
  const [newsletterError, setNewsletterError] = useState("");
  const { targetRef: newsletterSectionRef } = useMailerLiteOnVisible({
    rootMargin: "1000px 0px",
  });

  const submitNewsletter = async (email) => {
    if (typeof window === "undefined") {
      throw new Error("Newsletter signup is only available in the browser.");
    }

    const params = new URLSearchParams({
      "fields[email]": email,
      "ml-submit": "1",
      anticsrf: "true",
    });

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(
        `${MAILERLITE_SUBSCRIBE_ENDPOINT}?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
          },
          signal: controller.signal,
        },
      );

      if (!response.ok) {
        throw new Error("Unable to subscribe right now. Please try again.");
      }

      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        return response.json();
      }

      return {
        success: response.ok,
        message: await response.text(),
      };
    } catch (error) {
      if (error?.name === "AbortError") {
        throw new Error("The request timed out. Please try again.");
      }

      throw new Error("Unable to connect to MailerLite. Please try again.");
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  const getNewsletterOutcome = (response) => {
    const rawMessage =
      typeof response === "string"
        ? response
        : response?.msg || response?.message || response?.error || "";
    const message = String(rawMessage)
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const wasSuccessful =
      response?.success === true ||
      response?.success === "true" ||
      response?.status === "success" ||
      response?.result === "success" ||
      /success/i.test(message) ||
      /thank you/i.test(message) ||
      /already/i.test(message);

    return { wasSuccessful, message };
  };

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();

    const email = newsletterEmail.trim();
    const isEmailValid = /^\S+@\S+\.\S+$/.test(email);

    setNewsletterError("");

    if (!isEmailValid) {
      setNewsletterStatus("error");
      setNewsletterError("Please enter a valid email address.");
      return;
    }

    setNewsletterStatus("loading");

    try {
      const response = await submitNewsletter(email);
      const { wasSuccessful, message } = getNewsletterOutcome(response);

      if (wasSuccessful) {
        setNewsletterStatus("success");
        setNewsletterEmail("");
        return;
      }

      setNewsletterStatus("error");
      setNewsletterError(
        message || "Unable to subscribe right now. Please try again.",
      );
    } catch (error) {
      setNewsletterStatus("error");
      setNewsletterError(
        error?.message || "Unable to subscribe right now. Please try again.",
      );
    }
  };

  return (
    <motion.section
      ref={newsletterSectionRef}
      className={`${styles.newsletterSection} ${standalone ? styles.standalone : ""}`.trim()}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className={styles.newsletterShell}>
        <div className={styles.newsletterIntro}>
          <p className={styles.newsletterIntroEyebrow}>Read Between Blocks</p>
          <h2 className={styles.newsletterIntroTitle}>
            <span className={styles.newsletterHeadingMain}>
              The Bitcoin <span className={styles.heroHighlight}>OP</span>tic
            </span>{" "}
            <span className={styles.newsletterTitleAccent}>Newsletter</span>
          </h2>
          <p className={styles.newsletterIntroText}>
            Stay up-to-date on the latest tools, best practices, and avoid
            common mistakes.
          </p>
        </div>

        <div className={styles.newsletterCardWrap}>
          <div className={styles.newsletterSignup}>
            <p className={styles.newsletterTitle}>
              Self-custody guidance in your inbox
            </p>
            <p className={styles.newsletterPromo}>
              Get first access to exclusive promotions, resources, and new
              content I create.
            </p>
            <div className={styles.newsletterTrust}>
              <p>3 Free PDFs included:</p>
              <ul className={styles.newsletterTrustList}>
                <li>Seed Security Best Practices</li>
                <li>First Steps to Self Custody</li>
              </ul>
            </div>
            <div className={styles.newsletterMeta}>
              <span>1-2 emails/month</span>
              <span>100% Free</span>
            </div>
            <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
              <label htmlFor={inputId} className={styles.newsletterLabel}>
                Email
              </label>
              <input
                id={inputId}
                type="email"
                value={newsletterEmail}
                onChange={(event) => {
                  setNewsletterEmail(event.target.value);
                  if (newsletterStatus !== "idle") {
                    setNewsletterStatus("idle");
                    setNewsletterError("");
                  }
                }}
                placeholder="you@example.com"
                className={styles.newsletterInput}
                required
                disabled={newsletterStatus === "loading"}
              />
              <Button
                type="submit"
                size="medium"
                icon={<Mail size={16} />}
                className={styles.newsletterButton}
                loading={newsletterStatus === "loading"}
              >
                Subscribe
              </Button>
            </form>
            {newsletterStatus === "success" && (
              <p className={styles.newsletterSuccess}>
                <span className={styles.newsletterSuccessPrimary}>
                  <Check size={16} />
                  Thanks for subscribing.
                </span>
                <span>Check your inbox to confirm your subscription.</span>
              </p>
            )}
            {newsletterStatus === "error" && (
              <p className={styles.newsletterError} role="alert" aria-live="assertive">
                {newsletterError}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
