import { useState } from "react";
import { motion } from "framer-motion";
import {
  Handshake,
  Globe,
  ExternalLink,
  Mail,
  Check,
  Shield,
  Map,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Badge, Button } from "../components/common";
import { useMailerLiteOnVisible } from "../hooks/useMailerLite";
import styles from "./SupportPage.module.css";

const XIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const valueProps = [
  { icon: Shield, text: "Self-custody mastery" },
  { icon: Map, text: "Personalized roadmap" },
  { icon: Zap, text: "Accelerated learning" },
];

const MAILERLITE_SUBSCRIBE_ENDPOINT =
  "https://assets.mailerlite.com/jsonp/2111034/forms/179249626676725407/subscribe";

export function SupportPage() {
  const [copied, setCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");
  const [newsletterError, setNewsletterError] = useState("");
  const { targetRef: newsletterSectionRef } = useMailerLiteOnVisible();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("edward@bitcoinmentor.io");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <div className={styles.container}>
      {/* Hero Section */}
      <motion.section
        className={styles.heroSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.heroBackground}>
          <div className={styles.heroGlow} />
          <div className={styles.heroGrid} />
        </div>

        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroBadge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge
              variant="primary"
              size="medium"
              icon={<Handshake size={14} />}
            >
              1-on-1 Bitcoin Mentorship
            </Badge>
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your Path to
            <span className={styles.heroHighlight}> Financial Sovereignty</span>
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Get personalized guidance from an experienced mentor who will help
            you achieve true self-sovereign bitcoin ownership.
          </motion.p>

          <motion.div
            className={styles.valueProps}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {valueProps.map((prop, index) => (
              <div key={index} className={styles.valueProp}>
                <prop.icon size={18} className={styles.valuePropIcon} />
                <span>{prop.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className={styles.heroCta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <a
              href="https://bitcoinmentor.io/?fluent-booking=calendar&host=edward-1712805121&event=30min"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              <span>Book Your Free Session</span>
              <ArrowRight size={20} />
            </a>
            <p className={styles.ctaSubtext}>
              15-minute call &bull; No commitment &bull; 100% free
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        ref={newsletterSectionRef}
        className={styles.newsletterSection}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.55 }}
      >
        <div className={styles.newsletterTexture} aria-hidden="true" />
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
                  <li>Sparrow Wallet with Coldcard Q</li>
                </ul>
              </div>
              <div className={styles.newsletterMeta}>
                <span>1-2 emails/month</span>
                <span>100% Free</span>
              </div>
              <form
                className={styles.newsletterForm}
                onSubmit={handleNewsletterSubmit}
              >
                <label
                  htmlFor="newsletter-email"
                  className={styles.newsletterLabel}
                >
                  Email
                </label>
                <input
                  id="newsletter-email"
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
                <p
                  className={styles.newsletterError}
                  role="alert"
                  aria-live="assertive"
                >
                  {newsletterError}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Connect Section */}
      <motion.section
        className={styles.footerContact}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <span className={styles.footerLabel}>Connect with me</span>
        <div className={styles.footerLinks}>
          <a
            href="https://x.com/LiveFreeBTC"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            <XIcon size={20} />
            <span className={styles.emailText}>@LiveFreeBTC</span>
          </a>
          <a
            href="https://primal.net/edward"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            <Globe size={20} />
            <span className={styles.emailText}>Nostr</span>
          </a>
          <button
            onClick={handleCopyEmail}
            className={styles.footerLink}
            type="button"
          >
            {copied ? <Check size={20} /> : <Mail size={20} />}
            <span className={styles.emailText}>
              {copied ? "Copied!" : "edward@bitcoinmentor.io"}
            </span>
          </button>
        </div>
      </motion.section>
    </div>
  );
}

export default SupportPage;
