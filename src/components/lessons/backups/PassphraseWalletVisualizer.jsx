import { useState } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle, FileKey, LockKeyhole, Wallet } from 'lucide-react';
import { Card } from '../../common';
import styles from './PassphraseWalletVisualizer.module.css';

const modes = [
  {
    id: 'none',
    label: 'No passphrase',
    input: 'empty',
    wallet: 'Wallet A',
    address: 'bc1q...7m2k',
    balance: '0.00 BTC demo',
    status: 'Base wallet',
    safe: true,
    message: 'Seed-only recovery opens the base wallet. This is what most beginners use.',
  },
  {
    id: 'correct',
    label: 'Correct passphrase',
    input: 'horse33',
    wallet: 'Wallet B',
    address: 'bc1q...p9rx',
    balance: '1.25 BTC demo',
    status: 'Protected wallet',
    safe: true,
    message: 'The same seed plus the exact passphrase opens a different wallet with different addresses.',
  },
  {
    id: 'typo',
    label: 'Typo or forgotten',
    input: 'Horse33',
    wallet: 'Wallet C',
    address: 'bc1q...0v4n',
    balance: '0.00 BTC demo',
    status: 'Different wallet',
    safe: false,
    message: 'The wallet is not broken. The typo derived another wallet, so the expected funds appear missing.',
  },
];

export function PassphraseWalletVisualizer() {
  const [selectedModeId, setSelectedModeId] = useState(modes[1].id);
  const selectedMode = modes.find((mode) => mode.id === selectedModeId) ?? modes[0];

  return (
    <Card variant="elevated" padding="large" className={styles.container}>
      <div className={styles.header}>
        <div>
          <h3>Passphrase Wallet Visualizer</h3>
          <p>See why the exact passphrase matters: every variation opens a different wallet.</p>
        </div>
        <LockKeyhole size={24} />
      </div>

      <div className={styles.modeButtons}>
        {modes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            className={`${styles.modeButton} ${mode.id === selectedModeId ? styles.active : ''}`}
            onClick={() => setSelectedModeId(mode.id)}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <div className={styles.flowLane}>
        <div className={styles.flowStep}>
          <div className={styles.flowIcon}><FileKey size={22} /></div>
          <span className={styles.flowLabel}>Seed phrase</span>
          <code>same 12 or 24 words</code>
        </div>

        <ArrowRight className={styles.arrow} size={20} />

        <div className={styles.flowStep}>
          <div className={styles.flowIcon}><LockKeyhole size={22} /></div>
          <span className={styles.flowLabel}>Passphrase input</span>
          <code>{selectedMode.input}</code>
        </div>

        <ArrowRight className={styles.arrow} size={20} />

        <div className={`${styles.walletCard} ${selectedMode.safe ? styles.safe : styles.warning}`}>
          <div className={styles.walletHeader}>
            <div className={styles.walletIcon}><Wallet size={22} /></div>
            <div>
              <span className={styles.walletName}>{selectedMode.wallet}</span>
              <span className={styles.walletStatus}>{selectedMode.status}</span>
            </div>
          </div>
          <div className={styles.walletMeta}>
            <span>Address</span>
            <code>{selectedMode.address}</code>
          </div>
          <div className={styles.walletMeta}>
            <span>Visible balance</span>
            <strong>{selectedMode.balance}</strong>
          </div>
        </div>
      </div>

      <div className={`${styles.messageBox} ${selectedMode.safe ? styles.safe : styles.warning}`}>
        {selectedMode.safe ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
        <p>{selectedMode.message}</p>
      </div>
    </Card>
  );
}
