import { motion } from "framer-motion";
import { Handshake, Shield, Map, Zap, ArrowRight } from "lucide-react";
import { Badge } from "../components/common";
import { ConnectSection } from "../components/common/ConnectSection";
import styles from "./SupportPage.module.css";

const valueProps = [
  { icon: Shield, text: "Self-custody mastery" },
  { icon: Map, text: "Personalized roadmap" },
  { icon: Zap, text: "Accelerated learning" },
];

export function SupportPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <motion.section
        className={styles.heroSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.22 }}
      >
        <div className={styles.heroBackground}>
          <div className={styles.heroGlow} />
          <div className={styles.heroGrid} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <motion.div
              className={styles.heroBadge}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: 0.03 }}
            >
              <Badge
                variant="primary"
                size="medium"
                icon={<Handshake size={14} />}
              >
                Work with me 1-on-1
              </Badge>
            </motion.div>

            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: 0.06 }}
            >
              Your path to
              <span className={styles.heroHighlight}>
                {" "}
                Financial Sovereignty
              </span>
            </motion.h1>

            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: 0.09 }}
            >
              Get personalized guidance for what you need to achieve true
              self-sovereign bitcoin ownership.
            </motion.p>

            <motion.div
              className={styles.valueProps}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: 0.12 }}
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
              transition={{ duration: 0.24, delay: 0.15 }}
            >
              <a
                href="https://calendar.proton.me/bookings#hAO6Yxm96KHGyHF8Be-K3A1mMjE-jIMnG2MgNj8UnDg="
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

          <motion.aside
            className={styles.profileCard}
            initial={{ opacity: 0, y: 24, rotate: 1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.26, delay: 0.08 }}
            aria-label="About Edward"
          >
            <div className={styles.profileImageFrame}>
              <img
                src="/bio.jpg"
                alt="Edward, your Bitcoin mentor"
                className={styles.profileImage}
              />
            </div>
            <div className={styles.profileDetails}>
              <div className={styles.profileIdentityRow}>
                <div>
                  <p className={styles.profileEyebrow}>Your Mentor</p>
                  <h2 className={styles.profileName}>Edward</h2>
                </div>
                <a
                  href="https://btcmentor.io/mentor/edward-cafarella"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.profileBrand}
                  aria-label="View Edward on BTC Mentor"
                >
                  <img
                    src="/btcmentor-logo.png"
                    alt="BTC Mentor"
                    className={styles.profileBrandLogo}
                  />
                </a>
              </div>
              <p className={styles.profileBio}>
                Bitcoin educator focused on self-custody, privacy, inheritance
                planning, and all of the latest freedom tech.
              </p>
            </div>
          </motion.aside>
        </div>
      </motion.section>

      <ConnectSection delay={0.6} />
    </div>
  );
}

export default SupportPage;
