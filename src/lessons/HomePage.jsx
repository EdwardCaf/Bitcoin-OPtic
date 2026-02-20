import { useState, lazy, Suspense } from "react";
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
} from "lucide-react";
import { Button, Badge } from "../components/common";
import { HeroBackground } from "../components/home/HeroBackground";
import styles from "./HomePage.module.css";

// Lazy load below-fold components
const StatsSection = lazy(() =>
  import("../components/home/StatsSection").then((m) => ({
    default: m.StatsSection,
  })),
);
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

export function HomePage() {
  const [copied, setCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");
  const [newsletterError, setNewsletterError] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("edward@bitcoinmentor.io");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitNewsletter = (email) =>
    new Promise((resolve, reject) => {
      if (typeof window === "undefined") {
        reject(new Error("Newsletter signup is only available in the browser."));
        return;
      }

      const callbackName = `mlcb_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const script = document.createElement("script");
      const params = new URLSearchParams({
        "fields[email]": email,
        "ml-submit": "1",
        anticsrf: "true",
        callback: callbackName,
      });
      const endpoint =
        "https://assets.mailerlite.com/jsonp/2111034/forms/179249626676725407/subscribe";

      let settled = false;
      let timeoutId;

      const cleanup = () => {
        delete window[callbackName];
        script.remove();
      };

      const fail = (message) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        cleanup();
        reject(new Error(message));
      };

      window[callbackName] = (response) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        cleanup();
        resolve(response);
      };

      script.onerror = () => {
        fail("Unable to connect to MailerLite. Please try again.");
      };

      timeoutId = window.setTimeout(() => {
        fail("The request timed out. Please try again.");
      }, 10000);

      script.src = `${endpoint}?${params.toString()}`;
      document.body.appendChild(script);
    });

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
      const message = response?.msg || response?.message || "";
      const wasSuccessful =
        response?.success === true ||
        response?.success === "true" ||
        response?.status === "success" ||
        /success/i.test(message) ||
        /already/i.test(message);

      if (wasSuccessful) {
        setNewsletterStatus("success");
        setNewsletterEmail("");
        return;
      }

      setNewsletterStatus("error");
      setNewsletterError(message || "Unable to subscribe right now. Please try again.");
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
            <Link to="/lessons/what-is-bitcoin">
              <Button
                variant="primary"
                size="large"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                Start Learning
              </Button>
            </Link>
          </div>

          <div className={styles.newsletterSignup}>
            <p className={styles.newsletterTitle}>
              Sign up for my Free Newsletter
            </p>
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
              <p className={styles.newsletterError} role="alert" aria-live="assertive">
                {newsletterError}
              </p>
            )}
          </div>
        </motion.div>
      </motion.section>

      {/* Below-fold content - lazy loaded */}
      <Suspense fallback={<SectionPlaceholder />}>
        {/* Stats Section */}
        <StatsSection />

        {/* Learning Path */}
        <LearningPath />
      </Suspense>

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
