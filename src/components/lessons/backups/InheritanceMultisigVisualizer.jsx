import {
  Building2,
  CheckCircle,
  FileText,
  Home,
  Key,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Card } from "../../common";
import styles from "./InheritanceMultisigVisualizer.module.css";

const locations = [
  { id: "home", label: "Home", icon: Home },
  { id: "bank", label: "Safe deposit box", icon: Building2 },
  { id: "family", label: "Trusted family", icon: Users },
  { id: "executor", label: "Executor / attorney", icon: ShieldCheck },
];

const keyPlan = {
  result: "2 of 3 keys can recover funds",
  message:
    "A 2-of-3 setup tolerates one missing key, but no single holder or location can spend alone.",
  locations: {
    home: ["Key 1: hardware wallet"],
    bank: ["Key 2: hardware wallet"],
    family: ["Key 3: family/custody key"],
    executor: ["Sealed instructions / will"],
  },
};

const itemIcons = {
  "Key 1: daily signer": Key,
  "Key 2: hardware wallet": Key,
  "Key 3: family/custody key": Key,
  "Sealed instructions / will": FileText,
};

export function InheritanceMultisigVisualizer() {
  return (
    <Card variant="elevated" padding="large" className={styles.container}>
      <div className={styles.header}>
        <div>
          <h3>Inheritance Backup Suggestion: 2-of-3</h3>
          <p>
            Use multiple keys plus clear instructions so heirs can recover
            without giving anyone unilateral access today.
          </p>
        </div>
        <ShieldCheck size={24} />
      </div>

      <div className={styles.thresholdPanel}>
        <div className={styles.thresholdIcon}>
          <Key size={20} />
        </div>
        <div>
          <strong>2 of 3 signatures required</strong>
          <span>Three signing keys exist; any two are enough to recover.</span>
        </div>
      </div>

      <div className={styles.locationGrid}>
        {locations.map((location) => {
          const Icon = location.icon;
          const items = keyPlan.locations[location.id];

          return (
            <div key={location.id} className={styles.locationCard}>
              <div className={styles.locationHeader}>
                <Icon size={18} />
                <span>{location.label}</span>
              </div>
              <div className={styles.itemList}>
                {items.length > 0 ? (
                  items.map((item) => {
                    const ItemIcon = itemIcons[item] ?? FileText;

                    return (
                      <span key={item} className={styles.itemChip}>
                        <ItemIcon size={13} />
                        {item}
                      </span>
                    );
                  })
                ) : (
                  <span className={styles.emptyState}>No recovery items</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.resultPanel}>
        <CheckCircle size={20} />
        <div>
          <strong>{keyPlan.result}</strong>
          <p>{keyPlan.message}</p>
        </div>
      </div>

      <div className={styles.instructionsNote}>
        <FileText size={18} />
        <p>
          Sealed instructions are not a signing key. They should explain the
          coordinator wallet, quorum, key locations, and trusted helpers.
        </p>
      </div>
    </Card>
  );
}
