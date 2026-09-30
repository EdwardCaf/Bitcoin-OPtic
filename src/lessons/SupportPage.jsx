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
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <div>
              <Badge
                variant="primary"
                size="medium"
                icon={<Handshake size={14} />}
              >
                Work with me 1-on-1
              </Badge>
            </div>

            <h1 className={styles.heroTitle}>
              Your path to
              <span className={styles.heroHighlight}>
                {" "}
                Financial Sovereignty
              </span>
            </h1>

            <p className={styles.heroSubtitle}>
              Get personalized guidance for what you need to achieve true
              self-sovereign bitcoin ownership.
            </p>

            <div className={styles.valueProps}>
              {valueProps.map((prop, index) => (
                <div key={index} className={styles.valueProp}>
                  <prop.icon size={18} className={styles.valuePropIcon} />
                  <span>{prop.text}</span>
                </div>
              ))}
            </div>

            <div className={styles.heroCta}>
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
            </div>
          </div>

          <aside
            className={styles.profileCard}
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
          </aside>
        </div>
      </section>

      <ConnectSection />
    </div>
  );
}

export default SupportPage;
