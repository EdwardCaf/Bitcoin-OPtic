import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Globe, Mail } from "lucide-react";
import styles from "./ConnectSection.module.css";

const XIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function ConnectSection({ delay = 0 }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("edward@bitcoinmentor.io");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.section
      className={styles.footerContact}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
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
        <button onClick={handleCopyEmail} className={styles.footerLink} type="button">
          {copied ? <Check size={20} /> : <Mail size={20} />}
          <span className={styles.emailText}>
            {copied ? "Copied!" : "edward@bitcoinmentor.io"}
          </span>
        </button>
      </div>
    </motion.section>
  );
}

export default ConnectSection;
