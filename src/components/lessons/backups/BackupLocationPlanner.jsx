import { useState } from "react";
import {
  Archive,
  Building2,
  CheckCircle,
  FileKey,
  Home,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Card } from "../../common";
import styles from "./BackupLocationPlanner.module.css";

const locations = [
  { id: "home", label: "Home", icon: Home },
  { id: "bank", label: "Safe deposit box", icon: Building2 },
  { id: "family", label: "Trusted family", icon: Users },
  { id: "executor", label: "Attorney / executor", icon: ShieldCheck },
];

const plans = [
  {
    id: "all-home",
    name: "All at home",
    summary: "Simple, but fragile.",
    ratings: { disaster: "Weak", theft: "Weak", inheritance: "Weak" },
    locations: {
      home: ["Hardware wallet", "Seed backup"],
      bank: [],
      family: [],
      executor: [],
    },
    lesson:
      "A single location should not hold every recovery component. One burglary, fire, or cleanup mistake can become catastrophic.",
  },
  {
    id: "device-separated",
    name: "Device separated",
    summary: "Bank holds hardware only.",
    ratings: { disaster: "Strong", theft: "Strong", inheritance: "Weak" },
    locations: {
      home: ["Seed backup"],
      bank: ["Hardware wallet"],
      family: [],
      executor: [],
    },
    lesson:
      "A safe deposit box can hold a hardware wallet or encrypted SD backup, but not plaintext seed words. The seed remains outside third-party custody.",
  },
  {
    id: "inheritance",
    name: "Inheritance-aware",
    summary: "Designed for discovery.",
    ratings: { disaster: "Strong", theft: "Strong", inheritance: "Strong" },
    locations: {
      home: ["Seed backup"],
      bank: ["Hardware wallet"],
      family: ["Awareness note"],
      executor: ["Sealed instructions"],
    },
    lesson:
      "Heirs do not need every secret today. They need to know the plan exists, where to start, and who can help safely.",
  },
];

const itemIcons = {
  "Hardware wallet": Archive,
  "Seed backup": FileKey,
  "Awareness note": CheckCircle,
  "Sealed instructions": ShieldCheck,
};

function Rating({ label, value }) {
  return (
    <div className={`${styles.rating} ${styles[value.toLowerCase()]}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function BackupLocationPlanner() {
  const [selectedPlanId, setSelectedPlanId] = useState(plans[1].id);
  const selectedPlan =
    plans.find((plan) => plan.id === selectedPlanId) ?? plans[0];

  return (
    <Card variant="elevated" padding="large" className={styles.container}>
      <div className={styles.header}>
        <div>
          <h3>Backup Location Planner</h3>
          <p>
            Compare simple storage layouts. Safe deposit boxes are shown for
            hardware wallets or encrypted backups, not plaintext seed words.
          </p>
        </div>
        <MapPin size={24} />
      </div>

      <div className={styles.planButtons}>
        {plans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            className={`${styles.planButton} ${plan.id === selectedPlanId ? styles.active : ""}`}
            onClick={() => setSelectedPlanId(plan.id)}
          >
            <span>{plan.name}</span>
            <small>{plan.summary}</small>
          </button>
        ))}
      </div>

      <div className={styles.locationGrid}>
        {locations.map((location) => {
          const LocationIcon = location.icon;
          const items = selectedPlan.locations[location.id];

          return (
            <div key={location.id} className={styles.locationCard}>
              <div className={styles.locationHeader}>
                <LocationIcon size={18} />
                <span>{location.label}</span>
              </div>
              <div className={styles.itemList}>
                {items.length > 0 ? (
                  items.map((item) => {
                    const ItemIcon = itemIcons[item] ?? Archive;

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

      <div className={styles.summaryPanel}>
        <div className={styles.ratingsGrid}>
          <Rating
            label="Disaster resilience"
            value={selectedPlan.ratings.disaster}
          />
          <Rating label="Theft resistance" value={selectedPlan.ratings.theft} />
          <Rating
            label="Inheritance readiness"
            value={selectedPlan.ratings.inheritance}
          />
        </div>
        <p>
          <strong>What this teaches:</strong> {selectedPlan.lesson}
        </p>
      </div>
    </Card>
  );
}
