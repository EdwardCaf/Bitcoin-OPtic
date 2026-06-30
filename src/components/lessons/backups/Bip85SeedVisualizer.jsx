import {
  FileKey,
  KeyRound,
  Smartphone,
  TestTube2,
  Users,
  Wallet,
} from "lucide-react";
import { Card } from "../../common";
import styles from "./Bip85SeedVisualizer.module.css";

const childWallets = [
  {
    id: "mobile",
    label: "Hot Wallet",
    icon: Smartphone,
  },
  {
    id: "travel",
    label: "Travel",
    icon: Wallet,
  },
  {
    id: "testing",
    label: "Testing",
    icon: TestTube2,
  },
  {
    id: "family",
    label: "Family Member",
    icon: Users,
  },
];

export function Bip85SeedVisualizer() {
  return (
    <Card variant="elevated" padding="large" className={styles.container}>
      <div className={styles.header}>
        <div>
          <h3>Derived Seed Tree - Coldcard Example</h3>
          <p>
            Coldcard uses BIP-85 to derive separate wallet seeds from one
            offline master seed.
          </p>
        </div>
        <KeyRound size={24} />
      </div>

      <div
        className={styles.tree}
        aria-label="Coldcard BIP-85 derived seed tree"
      >
        <div className={`${styles.treeNode} ${styles.rootNode}`}>
          <div className={styles.nodeIcon}>
            <FileKey size={24} />
          </div>
          <span>Coldcard Master Seed</span>
        </div>

        <div className={`${styles.treeNode} ${styles.derivationNode}`}>
          <div className={styles.nodeIcon}>
            <KeyRound size={24} />
          </div>
          <span>BIP-85</span>
          <small>Seed phrase + Index #</small>
        </div>

        <div className={styles.branchLine} />

        <div className={styles.childrenGrid}>
          {childWallets.map((wallet) => {
            const WalletIcon = wallet.icon;

            return (
              <div
                key={wallet.id}
                className={`${styles.treeNode} ${styles.childNode}`}
              >
                <div className={styles.nodeIcon}>
                  <WalletIcon size={20} />
                </div>
                <span>{wallet.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.recoveryNote}>
        Back up the master seed and keep a simple index map.
      </div>
    </Card>
  );
}
