import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Gamepad2,
  GraduationCap,
  Mail,
  Check,
  MonitorCheck,
  BarChart3,
  Globe,
} from "lucide-react";
import { Button, Badge } from "../components/common";
import { HeroBackground } from "../components/home/HeroBackground";
import { useMailerLiteOnVisible } from "../hooks/useMailerLite";
import styles from "./HomePage.module.css";

// Lazy load below-fold components
const LearningPath = lazy(() =>
  import("../components/home/LearningPath").then((m) => ({
    default: m.LearningPath,
  })),
);

// Minimal placeholder for below-fold content
function SectionPlaceholder() {
  return <div className={styles.sectionPlaceholder} />;
}

const XIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MAILERLITE_SUBSCRIBE_ENDPOINT =
  "https://assets.mailerlite.com/jsonp/2111034/forms/179249626676725407/subscribe";

export function HomePage() {
  const learningPathTriggerRef = useRef(null);
  const [shouldRenderLearningPath, setShouldRenderLearningPath] =
    useState(false);
  const [copied, setCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");
  const [newsletterError, setNewsletterError] = useState("");
  const { targetRef: newsletterSectionRef } = useMailerLiteOnVisible();

  useEffect(() => {
    const target = learningPathTriggerRef.current;
    if (!target || shouldRenderLearningPath) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShouldRenderLearningPath(true);
        observer.disconnect();
      },
      {
        rootMargin: "550px 0px",
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldRenderLearningPath]);

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

  const handleScrollToLearningPath = () => {
    if (typeof window === "undefined") return;
    const learningPathSection = document.getElementById(
      "learning-path-section",
    );
    if (!learningPathSection) return;

    learningPathSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <HeroBackground />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroScanlines} aria-hidden="true" />
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLine}>Welcome to</span>
            <span className={styles.heroTitleMain}>
              The Bitcoin <span className={styles.heroHighlight}>OP</span>tic
            </span>
          </h1>

          <p className={styles.heroText}>
            Learn Bitcoin through beautiful visualizations. Explore wallets,
            mine blocks, route Lightning payments, and master the technology
            that's revolutionizing money. No setup required, all completely
            free.
          </p>

          <div className={styles.heroButtons}>
            <Button
              type="button"
              variant="primary"
              size="large"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
              onClick={handleScrollToLearningPath}
            >
              Start Learning
            </Button>
          </div>
        </motion.div>
      </motion.section>

      {/* Newsletter Section */}
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
                <span>Unsubscribe anytime</span>
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

      <div
        id="learning-path-section"
        ref={learningPathTriggerRef}
        className={styles.learningPathAnchor}
        aria-hidden="true"
      />

      {/* Below-fold content - lazy loaded */}
      {shouldRenderLearningPath ? (
        <Suspense fallback={<SectionPlaceholder />}>
          <LearningPath />
        </Suspense>
      ) : (
        <SectionPlaceholder />
      )}

      {/* Features Section */}
      <motion.section
        className={styles.featuresSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={styles.sectionTitle}>
          Why The Bitcoin <span className={styles.sectionOrange}>OP</span>tic?
        </h2>
        <div className={styles.featuresGrid}>
          <motion.div
            className={styles.feature}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className={styles.featureIcon}>
              <BarChart3 size={24} />
            </div>
            <h4>Visual Learning</h4>
            <p>Visualizations let you see Bitcoin concepts in real-time</p>
          </motion.div>
          <motion.div
            className={styles.feature}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className={styles.featureIcon}>
              <BookOpen size={24} />
            </div>
            <h4>Beginner Friendly</h4>
            <p>
              Start from zero knowledge with clear explanations and relatable
              analogies
            </p>
          </motion.div>
          <motion.div
            className={styles.feature}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className={styles.featureIcon}>
              <Sparkles size={24} />
            </div>
            <h4>Deep Technical Content</h4>
            <p>
              Expand certain topics to dive into the underlying technical
              details
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className={styles.ctaSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={styles.ctaTitle}>Ready to Learn?</h2>
        <Link to="/lessons/what-is-bitcoin">
          <Button
            variant="primary"
            size="large"
            icon={<ArrowRight size={18} />}
            iconPosition="right"
          >
            Begin Your Journey
          </Button>
        </Link>
        <p className={styles.ctaSubtext}>
          No account required • Completely free
        </p>
      </motion.section>

      {/* Footer Contact */}
      <motion.section
        className={styles.footerContact}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <span className={styles.footerLabel}>Connect with me</span>
        <div className={styles.footerLinks}>
          <a
            href="https://x.com/LiveFreeBTC"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            <XIcon size={18} />
            <span className={styles.emailText}>@LiveFreeBTC</span>
          </a>
          <a
            href="https://primal.net/edward"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            <Globe size={18} />
            <span className={styles.emailText}>Nostr</span>
          </a>
          <button
            onClick={handleCopyEmail}
            className={styles.footerLink}
            type="button"
          >
            {copied ? <Check size={18} /> : <Mail size={18} />}
            <span className={styles.emailText}>
              {copied ? "Copied!" : "edward@bitcoinmentor.io"}
            </span>
          </button>
        </div>
      </motion.section>
    </div>
  );
}

export default HomePage;
