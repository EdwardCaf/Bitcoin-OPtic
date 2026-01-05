import { QrCode, Eye, EyeOff, AlertTriangle, Check, X } from 'lucide-react';
import { Card } from '../../common';
import styles from './XpubExplainer.module.css';

export function XpubExplainer() {
  return (
    <Card variant="elevated" padding="large">
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <QrCode size={24} />
        </div>
        <div>
          <h3 className={styles.title}>Extended Public Keys (xpubs)</h3>
          <p className={styles.subtitle}>
            How one key can generate all your wallet addresses
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.description}>
          An <strong>extended public key (xpub)</strong> is derived from your seed phrase and can generate 
          all child public keys in your wallet. This allows watch-only wallets to track your balance 
          and generate receiving addresses without access to your private keys.
        </p>

        {/* Diagram */}
        <div className={styles.diagram}>
          <div className={styles.diagramTop}>
            <div className={styles.xpubBox}>
              <QrCode size={18} />
              <span className={styles.xpubLabel}>xpub</span>
              <code className={styles.xpubPreview}>xpub6CUG...k9Hj</code>
            </div>
          </div>
          
          <div className={styles.diagramArrows}>
            <div className={styles.arrowLine}></div>
            <div className={styles.arrowLine}></div>
            <div className={styles.arrowLine}></div>
            <div className={styles.arrowLine}></div>
          </div>

          <div className={styles.diagramBottom}>
            <div className={styles.addressBox}>
              <span className={styles.addressIndex}>0</span>
              <code>bc1q...x7m2</code>
            </div>
            <div className={styles.addressBox}>
              <span className={styles.addressIndex}>1</span>
              <code>bc1q...9f4k</code>
            </div>
            <div className={styles.addressBox}>
              <span className={styles.addressIndex}>2</span>
              <code>bc1q...3p8n</code>
            </div>
            <div className={styles.addressBox}>
              <span className={styles.addressIndex}>...</span>
              <code>bc1q...∞</code>
            </div>
          </div>
        </div>

        {/* Privacy Implications */}
        <div className={styles.implications}>
          <div className={styles.implicationCard}>
            <div className={styles.implicationHeader}>
              <Eye size={18} />
              <h4>What they CAN see</h4>
            </div>
            <ul className={styles.implicationList}>
              <li>
                <AlertTriangle size={14} />
                <span>All your receiving addresses</span>
              </li>
              <li>
                <AlertTriangle size={14} />
                <span>All transactions (in & out)</span>
              </li>
              <li>
                <AlertTriangle size={14} />
                <span>Your total wallet balance</span>
              </li>
              <li>
                <AlertTriangle size={14} />
                <span>Your financial activity over time</span>
              </li>
            </ul>
          </div>

          <div className={`${styles.implicationCard} ${styles.safe}`}>
            <div className={styles.implicationHeader}>
              <EyeOff size={18} />
              <h4>What they CANNOT do</h4>
            </div>
            <ul className={styles.implicationList}>
              <li>
                <Check size={14} />
                <span>Spend your Bitcoin</span>
              </li>
              <li>
                <Check size={14} />
                <span>Sign transactions</span>
              </li>
              <li>
                <Check size={14} />
                <span>Access your private keys</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Warning */}
        <div className={styles.warning}>
          <X size={16} />
          <p>
            <strong>Privacy Warning:</strong> Sharing your xpub is a significant privacy leak. 
            Only share with trusted services (like your own watch-only wallet) and never post publicly.
          </p>
        </div>
      </div>
    </Card>
  );
}

export default XpubExplainer;
