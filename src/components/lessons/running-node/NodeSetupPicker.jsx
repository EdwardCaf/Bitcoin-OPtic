import { useState } from "react";
import { Monitor, Boxes, SlidersHorizontal, Wrench } from "lucide-react";
import { Card, Badge } from "../../common";
import styles from "./NodeSetupPicker.module.css";

const setups = [
  {
    id: "desktop",
    name: "Core / Knots Desktop",
    icon: Monitor,
    bestFor: "Learning, wallet verification, and direct control",
    hardware: "Existing laptop or desktop with an SSD",
    simplicity: "Manual, but more complex",
    control: "Highest degree of control",
    services: "Best for tinkering with all available tools",
    notes:
      "Choose this if you are comfortable with a more manual desktop setup and want maximum visibility into what the node is doing.",
  },
  {
    id: "node-box",
    name: "Umbrel / Start9 Box",
    icon: Boxes,
    bestFor: "Always-on node services with less manual setup",
    hardware: "Dedicated mini PC, server, or vendor device with a 2 TB SSD",
    simplicity: "Simpler app management",
    control: "More platform abstraction",
    services:
      "Best for out-of-the-box functionality and very little modification is needed",
    notes:
      "This is usually the more beginner-friendly path if you want a practical home node with guided app installs. Still take time to understand what each service does.",
  },
];

export function NodeSetupPicker() {
  const [selectedSetup, setSelectedSetup] = useState(setups[0]);
  const SelectedIcon = selectedSetup.icon;

  return (
    <div className={styles.container}>
      <Card variant="elevated" padding="large">
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <Boxes size={24} />
          </div>
          <div>
            <h3 className={styles.title}>Choose a Node Setup</h3>
            <p className={styles.subtitle}>
              The practical tradeoff is hardware plus simplicity versus direct
              control.
            </p>
          </div>
        </div>

        <div className={styles.options}>
          {setups.map((setup) => {
            const SetupIcon = setup.icon;

            return (
              <button
                key={setup.id}
                className={`${styles.option} ${selectedSetup.id === setup.id ? styles.selected : ""}`}
                onClick={() => setSelectedSetup(setup)}
              >
                <SetupIcon size={20} />
                <span>{setup.name}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.details}>
          <div className={styles.detailsHeader}>
            <div className={styles.detailsIcon}>
              <SelectedIcon size={30} />
            </div>
            <div>
              <h4>{selectedSetup.name}</h4>
              <p>{selectedSetup.bestFor}</p>
            </div>
          </div>

          <div className={styles.metrics}>
            <div className={styles.metric}>
              <Monitor size={16} />
              <span>Hardware</span>
              <strong>{selectedSetup.hardware}</strong>
            </div>
            <div className={styles.metric}>
              <Wrench size={16} />
              <span>Simplicity</span>
              <strong>{selectedSetup.simplicity}</strong>
            </div>
            <div className={styles.metric}>
              <SlidersHorizontal size={16} />
              <span>Control</span>
              <strong>{selectedSetup.control}</strong>
            </div>
          </div>

          <div className={styles.serviceBox}>
            <span>Service Fit</span>
            <strong>{selectedSetup.services}</strong>
          </div>

          <div className={styles.footer}>
            <Badge variant="outline">Full node recommended</Badge>
            <p>{selectedSetup.notes}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default NodeSetupPicker;
