import { useState } from 'react';
import { Monitor, Server, Boxes, Clock, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { Card, Badge } from '../../common';
import styles from './NodeSetupPicker.module.css';

const setups = [
  {
    id: 'core',
    name: 'Bitcoin Core',
    icon: Monitor,
    bestFor: 'Best first serious node for most people',
    cost: 'Free software, existing computer is fine',
    storage: 'Pruned or 1-2 TB SSD archival',
    effort: 'Low',
    privacy: 'Good when your wallet connects to it',
    tools: 'Built-in wallet, RPC, direct Sparrow connection',
    notes: 'The reference implementation and cleanest baseline. Start here if you want to learn what your node is actually doing.'
  },
  {
    id: 'knots',
    name: 'Bitcoin Knots',
    icon: SlidersHorizontal,
    bestFor: 'Users who want more policy/configuration choices',
    cost: 'Free software, same hardware class as Core',
    storage: 'Pruned or 1-2 TB SSD archival',
    effort: 'Medium',
    privacy: 'Good when paired with your own wallet backend',
    tools: 'Core-derived node with additional options',
    notes: 'Knots follows Bitcoin consensus rules but exposes different policy defaults and configuration choices than Core.'
  },
  {
    id: 'umbrel',
    name: 'Umbrel',
    icon: Boxes,
    bestFor: 'Easy app-store style exploration',
    cost: 'Mini PC or Umbrel hardware',
    storage: '2 TB SSD recommended for a full stack',
    effort: 'Low to medium',
    privacy: 'Depends on app choices and remote access setup',
    tools: 'Bitcoin node, Electrs, LND, ThunderHub, RTL',
    notes: 'Great for learning and trying tools quickly. The tradeoff is that the platform abstracts details you should eventually understand.'
  },
  {
    id: 'start9',
    name: 'Start9',
    icon: Server,
    bestFor: 'Self-hosted services with stronger service management',
    cost: 'Server hardware or Start9 device',
    storage: '2 TB SSD recommended',
    effort: 'Medium',
    privacy: 'Strong when configured intentionally',
    tools: 'Bitcoin node, Electrs, Lightning, Tor services',
    notes: 'A practical choice if you want Bitcoin services plus broader self-hosting without managing every Linux detail by hand.'
  },
  {
    id: 'diy',
    name: 'DIY Mini PC',
    icon: Server,
    bestFor: 'Maximum control and minimum platform dependency',
    cost: 'Moderate hardware, free software',
    storage: '2 TB SSD, or smaller with pruning',
    effort: 'Higher',
    privacy: 'Strong if you configure services carefully',
    tools: 'Core or Knots, Electrs/Fulcrum, LND/Core Lightning',
    notes: 'The most flexible path, but you own updates, service configuration, firewalling, backups, and troubleshooting.'
  }
];

export function NodeSetupPicker() {
  const [selectedSetup, setSelectedSetup] = useState(setups[0]);
  const SelectedIcon = selectedSetup.icon;

  return (
    <div className={styles.container}>
      <Card variant="elevated" padding="large">
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <Server size={24} />
          </div>
          <div>
            <h3 className={styles.title}>Choose a Node Stack</h3>
            <p className={styles.subtitle}>Pick the software or platform that matches how much abstraction you want.</p>
          </div>
        </div>

        <div className={styles.options}>
          {setups.map((setup) => {
            const SetupIcon = setup.icon;

            return (
              <button
                key={setup.id}
                className={`${styles.option} ${selectedSetup.id === setup.id ? styles.selected : ''}`}
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
              <Clock size={16} />
              <span>Effort</span>
              <strong>{selectedSetup.effort}</strong>
            </div>
            <div className={styles.metric}>
              <Boxes size={16} />
              <span>Common Tools</span>
              <strong>{selectedSetup.tools}</strong>
            </div>
            <div className={styles.metric}>
              <ShieldCheck size={16} />
              <span>Storage</span>
              <strong>{selectedSetup.storage}</strong>
            </div>
          </div>

          <div className={styles.footer}>
            <Badge variant="outline">Cost: {selectedSetup.cost}</Badge>
            <Badge variant="outline">Privacy: {selectedSetup.privacy}</Badge>
            <p>{selectedSetup.notes}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default NodeSetupPicker;
