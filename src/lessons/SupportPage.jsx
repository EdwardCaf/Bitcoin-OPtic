import { motion } from "framer-motion";
import {
  Handshake,
  Shield,
  Map,
  Zap,
  ArrowRight,
} from "lucide-react";
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

      <ConnectSection delay={0.6} />
    </div>
  );
}

export default SupportPage;
