import { useState } from 'react';
import { Globe, Server, Route, EyeOff, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Card, Badge } from '../../common';
import styles from './WalletBackendComparison.module.css';

const backends = [
  {
    id: 'public',
    name: 'Public Wallet Server',
    icon: Globe,
    effort: 'Low',
    privacy: 'Weak',
    verification: 'Someone else tells your wallet what happened',
    addressLeak: 'Server may learn your addresses and balances',
    canLie: 'Can hide transactions or show an incomplete view',
    tools: 'Default mobile wallet backends, public Electrum servers',
    summary: 'Convenient, but it gives up the main privacy and verification benefits of running a node.'
  },
  {
    id: 'core',
    name: 'Direct Bitcoin Core',
    icon: Server,
    effort: 'Medium',
    privacy: 'Strong',
    verification: 'Your node verifies blocks, transactions, and your wallet history',
    addressLeak: 'Your wallet queries stay on your machine or home network',
    canLie: 'No third-party backend can lie about your balance',
    tools: 'Bitcoin Core wallet, Sparrow connected to Core, Specter Desktop',
    summary: 'The simplest self-sovereign setup when your wallet can connect directly to Bitcoin Core.'
  },
  {
    id: 'electrum',
    name: 'Own Electrum Server',
    icon: Route,
    effort: 'Higher',
    privacy: 'Strong',
    verification: 'Bitcoin Core validates; Electrum server indexes wallet lookups',
    addressLeak: 'Wallet queries go to your own server instead of a public one',
    canLie: 'Your own backend follows your own node',
    tools: 'Electrs, Fulcrum, ElectrumX, Sparrow, Electrum Wallet',
    summary: 'Best for wallets that speak the Electrum protocol, especially if you use Sparrow or Electrum Wallet from multiple devices.'
  }
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
          <p className={styles.subtitle}>Running a node matters most when your wallet actually uses it.</p>
        </div>
      </div>

      <div className={styles.backendGrid}>
        {backends.map((backend) => {
          const BackendIcon = backend.icon;

          return (
            <button
              key={backend.id}
              className={`${styles.backendButton} ${selectedBackend.id === backend.id ? styles.selected : ''}`}
              onClick={() => setSelectedBackend(backend)}
            >
              <BackendIcon size={20} />
              <span>{backend.name}</span>
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
            <h4>{selectedBackend.name}</h4>
            <div className={styles.badges}>
              <Badge variant="outline">Effort: {selectedBackend.effort}</Badge>
              <Badge variant={selectedBackend.privacy === 'Weak' ? 'warning' : 'success'}>Privacy: {selectedBackend.privacy}</Badge>
            </div>
          </div>
        </div>

        <div className={styles.rows}>
          <div className={styles.row}>
            <ShieldCheck size={18} />
            <div>
              <strong>Verification</strong>
              <p>{selectedBackend.verification}</p>
            </div>
          </div>
          <div className={styles.row}>
            <EyeOff size={18} />
            <div>
              <strong>Address Privacy</strong>
              <p>{selectedBackend.addressLeak}</p>
            </div>
          </div>
          <div className={styles.row}>
            <AlertTriangle size={18} />
            <div>
              <strong>Tools</strong>
              <p>{selectedBackend.tools}</p>
            </div>
          </div>
          <div className={styles.row}>
            <AlertTriangle size={18} />
            <div>
              <strong>Failure Mode</strong>
              <p>{selectedBackend.canLie}</p>
            </div>
          </div>
        </div>

        <p className={styles.summary}>{selectedBackend.summary}</p>
      </div>
    </Card>
  );
}

export default WalletBackendComparison;
