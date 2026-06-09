import { useState } from "react";
import {
  Globe,
  Server,
  EyeOff,
  ShieldCheck,
  AlertTriangle,
  Wrench,
} from "lucide-react";
import { Card, Badge } from "../../common";
import styles from "./WalletBackendComparison.module.css";

const backends = [
  {
    id: "public",
    name: "Public Server",
    icon: Globe,
    color: "#ef4444",
    effort: "Low",
    privacy: "Weak",
    verification: "Trusts server",
    verificationTone: "bad",
    addressLeak: "Server sees queries",
    addressTone: "bad",
    canLie: "Can omit or distort history",
    failureTone: "bad",
    tools: "Mobile defaults, public Electrum",
    toolsTone: "neutral",
    summary: "Convenient, but least private.",
  },
  {
    id: "electrum",
    name: "Own Electrum Server",
    icon: Server,
    color: "#22c55e",
    effort: "Higher",
    privacy: "Strong",
    verification: "Core/Knots validates; Electrum indexes",
    verificationTone: "good",
    addressLeak: "Queries your server",
    addressTone: "good",
    canLie: "Requires Full Node",
    failureTone: "neutral",
    tools: "Electrs, Fulcrum, ElectrumX",
    toolsTone: "good",
    summary: "Best for Sparrow/Electrum workflows.",
  },
];

export function WalletBackendComparison() {
  const [selectedBackend, setSelectedBackend] = useState(backends[1]);
  const SelectedIcon = selectedBackend.icon;

  return (
    <Card variant="elevated" padding="large">
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <ShieldCheck size={24} />
        </div>
        <div>
          <h3 className={styles.title}>Who Is Your Wallet Asking?</h3>
          <p className={styles.subtitle}>
            Your privacy depends on the backend your wallet queries.
          </p>
        </div>
      </div>

      <div className={styles.backendGrid}>
        {backends.map((backend) => {
          const BackendIcon = backend.icon;
          const isSelected = selectedBackend.id === backend.id;

          return (
            <button
              key={backend.id}
              className={`${styles.backendButton} ${isSelected ? styles.selected : ""}`}
              onClick={() => setSelectedBackend(backend)}
            >
              <span className={styles.backendIcon}>
                <BackendIcon size={22} />
              </span>
              <span className={styles.backendText}>
                <strong>{backend.name}</strong>
                <span>{backend.summary}</span>
              </span>
              <Badge
                variant={backend.privacy === "Weak" ? "warning" : "success"}
                size="small"
              >
                {backend.privacy}
              </Badge>
            </button>
          );
        })}
      </div>

      <div className={styles.details}>
        <div className={styles.detailsHeader}>
          <div className={styles.detailsIcon}>
            <SelectedIcon size={28} />
          </div>
          <div>
            <h4>{selectedBackend.name}</h4>
            <div className={styles.badges}>
              <Badge variant="outline" size="small">
                Effort: {selectedBackend.effort}
              </Badge>
              <Badge
                variant={
                  selectedBackend.privacy === "Weak" ? "warning" : "success"
                }
                size="small"
              >
                Privacy: {selectedBackend.privacy}
              </Badge>
            </div>
          </div>
        </div>

        <div className={styles.detailGrid}>
          <div
            className={`${styles.detailItem} ${styles[selectedBackend.verificationTone]}`}
          >
            <ShieldCheck size={17} />
            <span>Verification</span>
            <strong>{selectedBackend.verification}</strong>
          </div>
          <div
            className={`${styles.detailItem} ${styles[selectedBackend.addressTone]}`}
          >
            <EyeOff size={17} />
            <span>Address Privacy</span>
            <strong>{selectedBackend.addressLeak}</strong>
          </div>
          <div
            className={`${styles.detailItem} ${styles[selectedBackend.toolsTone]}`}
          >
            <Wrench size={17} />
            <span>Tools</span>
            <strong>{selectedBackend.tools}</strong>
          </div>
          <div
            className={`${styles.detailItem} ${styles[selectedBackend.failureTone]}`}
          >
            <AlertTriangle size={17} />
            <span>Failure Mode</span>
            <strong>{selectedBackend.canLie}</strong>
          </div>
        </div>

        <p className={styles.summary}>{selectedBackend.summary}</p>
      </div>
    </Card>
  );
}

export default WalletBackendComparison;
