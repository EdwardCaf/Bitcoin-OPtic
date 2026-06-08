import { useState } from 'react';
import { AlertTriangle, CheckCircle, FileKey, HelpCircle, LockKeyhole, MapPin, Smartphone } from 'lucide-react';
import { Card } from '../../common';
import styles from './RecoveryScenarioExplorer.module.css';

const scenarios = [
  {
    id: 'lost-device',
    title: 'Lost hardware wallet',
    icon: Smartphone,
    safe: true,
    result: 'Recoverable',
    description: 'The device is replaceable if your seed phrase and optional passphrase are available.',
    action: 'Buy a new wallet, restore the seed, verify receive addresses, then move funds if theft is possible.',
  },
  {
    id: 'lost-seed',
    title: 'Lost seed backup',
    icon: FileKey,
    safe: false,
    result: 'High risk',
    description: 'If the device also fails, there is no remaining way to reconstruct the private keys.',
    action: 'Create a new wallet immediately and move funds while the current device still works.',
  },
  {
    id: 'forgot-passphrase',
    title: 'Forgot passphrase',
    icon: LockKeyhole,
    safe: false,
    severity: 'critical',
    result: 'Funds lost',
    description: 'A passphrase creates a different wallet. The seed alone cannot recover passphrase-protected funds.',
    action: 'Only use a passphrase if you can back it up separately and test recovery before storing meaningful value.',
  },
  {
    id: 'house-fire',
    title: 'Home fire or flood',
    icon: MapPin,
    safe: true,
    result: 'Recoverable with separation',
    description: 'Geographic separation protects you when one location is destroyed or inaccessible.',
    action: 'Keep recovery redundancy outside your home, but do not put plaintext seed words in a safe deposit box. Use a hardware wallet, Coldcard encrypted SD backup, metal seed backup in a truly private location, or another protected component.',
  },
];

export function RecoveryScenarioExplorer() {
  const [selectedId, setSelectedId] = useState(scenarios[0].id);
  const selected = scenarios.find((scenario) => scenario.id === selectedId) ?? scenarios[0];
  const SelectedIcon = selected.icon;

  return (
    <Card variant="elevated" padding="large" className={styles.container}>
      <div className={styles.header}>
        <div>
          <h3>Recovery Scenario Explorer</h3>
          <p>Choose a failure and see whether your backup plan still gives you access.</p>
        </div>
        <HelpCircle size={24} />
      </div>

      <div className={styles.scenarioGrid}>
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          const isSelected = scenario.id === selectedId;

          return (
            <button
              key={scenario.id}
              type="button"
              className={`${styles.scenarioButton} ${isSelected ? styles.selected : ''}`}
              onClick={() => setSelectedId(scenario.id)}
            >
              <Icon size={18} />
              <span>{scenario.title}</span>
            </button>
          );
        })}
      </div>

      <div
        key={selected.id}
        className={`${styles.resultCard} ${selected.safe ? styles.safe : selected.severity === 'critical' ? styles.critical : styles.risky}`}
      >
        <div className={styles.resultIcon}>
          <SelectedIcon size={24} />
        </div>
        <div className={styles.resultContent}>
          <div className={styles.resultLabel}>
            {selected.safe ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
            <span>{selected.result}</span>
          </div>
          <h4>{selected.title}</h4>
          <p>{selected.description}</p>
          <div className={styles.actionBox}>
            <strong>Best response:</strong> {selected.action}
          </div>
        </div>
      </div>
    </Card>
  );
}
