import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wallet,
  Shield,
  Key,
  Lock,
  MonitorCheck,
  ArrowLeftRight,
  AlertTriangle,
  CheckCircle,
  Coins,
  BookOpen,
  HardDrive,
  ChevronRight
} from 'lucide-react';
import { LessonLayout } from '../components/layout';
import { Card, Accordion } from '../components/common';
import styles from './Lessons.module.css';

const sections = [
  { id: 'intro', title: 'Introduction' },
  { id: 'setup', title: 'Coldcard Q Setup' },
  { id: 'airgap', title: 'Airgapped Flow' },
  { id: 'workflow', title: 'Sparrow Workflow' },
  { id: 'security', title: 'Security & Recovery' }
];

export function ColdcardLesson() {
  const [currentSection, setCurrentSection] = useState(0);

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return <IntroSection />;
      case 1:
        return <SetupSection />;
      case 2:
        return <AirgapSection />;
      case 3:
        return <WorkflowSection />;
      case 4:
        return <SecuritySection />;
      default:
        return <IntroSection />;
    }
  };

  return (
    <LessonLayout
      lessonId="coldcard"
      title="Coldcard Q + Sparrow"
      description="Learn the airgapped Coldcard Q workflow with Sparrow Wallet"
      icon={Shield}
      sections={sections}
      currentSection={currentSection}
      onSectionChange={setCurrentSection}
      prevLesson={{ path: '/lessons/wallets', title: 'Wallets & Addresses' }}
      nextLesson={{ path: '/lessons/transactions', title: 'Transactions' }}
    >
      {renderSection()}
    </LessonLayout>
  );
}

function IntroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <div className={styles.heroCard}>
        <div className={styles.heroIcon}>
          <Shield size={48} />
        </div>
        <h2 className={styles.heroTitle}>Coldcard Q: Airgapped Bitcoin Security</h2>
        <p className={styles.heroText}>
          The Coldcard Q keeps your private keys completely offline. Sparrow Wallet acts as the
          desktop coordinator, while the Coldcard signs transactions using an SD card transfer.
        </p>
      </div>

      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Lock size={24} />
          </div>
          <h3>True Airgap</h3>
          <p>
            Your Coldcard never touches a network. Transactions move via microSD, so keys never
            leave the device.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <MonitorCheck size={24} />
          </div>
          <h3>Sparrow as Coordinator</h3>
          <p>
            Sparrow builds and broadcasts transactions, while your Coldcard Q only signs the PSBT.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Key size={24} />
          </div>
          <h3>Key Isolation</h3>
          <p>
            Seed phrases and private keys stay on the Coldcard. Sparrow only sees your public data.
          </p>
        </Card>
      </div>

      <Accordion title="Analogy: Vault + Courier" defaultOpen>
        <p>
          Think of the Coldcard Q as a vault that never opens. Sparrow is the office that drafts
          the paperwork. The microSD card is the courier that moves unsigned and signed documents
          between them.
        </p>
      </Accordion>

      <div className={styles.factBox}>
        <h4>Coldcard Flow Snapshot</h4>
        <div className={styles.factGrid}>
          <div className={styles.fact}>
            <span className={styles.factValue}>0</span>
            <span className={styles.factLabel}>USB connections required</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factValue}>2</span>
            <span className={styles.factLabel}>Files exchanged (PSBT)</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factValue}>100%</span>
            <span className={styles.factLabel}>Offline key storage</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SetupSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Coldcard Q Setup</h2>
      <p className={styles.sectionText}>
        Start by initializing your Coldcard Q offline. Focus on clean hardware, verified firmware,
        and a seed backup you can trust for decades.
      </p>

      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <CheckCircle size={24} />
          </div>
          <h3>Verify the Device</h3>
          <p>
            Inspect tamper seals, check the bag, and review the device number before powering on.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Shield size={24} />
          </div>
          <h3>Initialize Offline</h3>
          <p>
            Generate a new wallet on the Coldcard itself. Write the seed words carefully and
            verify them on-device.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <BookOpen size={24} />
          </div>
          <h3>Record Backup Details</h3>
          <p>
            Note the seed words, optional passphrase, and fingerprint. Store backups in separate
            safe locations.
          </p>
        </Card>
      </div>

      <div className={styles.keyPoints}>
        <h3>Setup Checklist</h3>
        <ul>
          <li>
            <strong>Use a fresh microSD card:</strong> Format it inside the Coldcard Q to ensure a clean slate.
          </li>
          <li>
            <strong>Optional passphrase:</strong> Add a passphrase if you can store it safely and remember it.
          </li>
          <li>
            <strong>Verify addresses:</strong> Always confirm receiving addresses on the Coldcard screen.
          </li>
        </ul>
      </div>
    </motion.div>
  );
}

function AirgapSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Airgapped SD Card Workflow</h2>
      <p className={styles.sectionText}>
        The airgapped process uses PSBT files that travel on a microSD card. Coldcard never plugs
        into your computer, and Sparrow never sees your private keys.
      </p>

      <div className={styles.conceptGridTwo}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Wallet size={24} />
          </div>
          <h3>Export Wallet Data</h3>
          <p>
            On Coldcard: <strong>Advanced &gt; MicroSD Card &gt; Export Wallet</strong>. This saves your xpub for
            Sparrow.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <ArrowLeftRight size={24} />
          </div>
          <h3>Move Files Safely</h3>
          <p>
            Only move the microSD card. Treat it like a secure courier between Coldcard and Sparrow.
          </p>
        </Card>
      </div>

      <div className={styles.flowSection}>
        <h3 className={styles.flowTitle}>SD Card Courier Path</h3>
        <div className={styles.flowSteps}>
          <div className={styles.flowStep}>
            <div className={styles.flowStepIcon}>
              <Shield size={20} />
            </div>
            <span className={styles.flowStepLabel}>Coldcard Q</span>
            <span className={styles.flowStepDesc}>Keeps keys offline</span>
          </div>
          <div className={styles.flowArrow}>
            <ChevronRight size={20} />
          </div>
          <div className={styles.flowStep}>
            <div className={styles.flowStepIcon}>
              <HardDrive size={20} />
            </div>
            <span className={styles.flowStepLabel}>MicroSD</span>
            <span className={styles.flowStepDesc}>Moves PSBT files</span>
          </div>
          <div className={styles.flowArrow}>
            <ChevronRight size={20} />
          </div>
          <div className={styles.flowStep}>
            <div className={styles.flowStepIcon}>
              <MonitorCheck size={20} />
            </div>
            <span className={styles.flowStepLabel}>Sparrow</span>
            <span className={styles.flowStepDesc}>Builds & broadcasts</span>
          </div>
        </div>
      </div>

      <Accordion title="Why PSBTs?" defaultOpen>
        <p>
          A PSBT (Partially Signed Bitcoin Transaction) lets Sparrow build a transaction without
          having signing keys. Coldcard adds signatures and returns a final file Sparrow can broadcast.
        </p>
      </Accordion>
    </motion.div>
  );
}

function WorkflowSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Sparrow Workflow</h2>
      <p className={styles.sectionText}>
        Sparrow handles watch-only tracking and transaction building, while the Coldcard Q handles
        signatures offline. The result is a clean desktop experience without exposing private keys.
      </p>

      <h3 className={styles.sectionTitle} style={{ fontSize: 'var(--text-lg)' }}>Watch-Only Setup</h3>
      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <MonitorCheck size={24} />
          </div>
          <h3>Create a New Wallet</h3>
          <p>
            In Sparrow: <strong>File &gt; New Wallet</strong>, then choose Coldcard and import the SD card
            export file.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Coins size={24} />
          </div>
          <h3>Verify Receive Addresses</h3>
          <p>
            Use Sparrow to generate a receive address, then verify it matches on the Coldcard screen.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Shield size={24} />
          </div>
          <h3>Connect to Your Node</h3>
          <p>
            For best privacy, point Sparrow to your own Bitcoin node or trusted server.
          </p>
        </Card>
      </div>

      <h3 className={styles.sectionTitle} style={{ fontSize: 'var(--text-lg)' }}>Sign & Broadcast</h3>
      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <ArrowLeftRight size={24} />
          </div>
          <h3>Export PSBT</h3>
          <p>
            In Sparrow, build your transaction and choose <strong>Save PSBT</strong> to the microSD card.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Key size={24} />
          </div>
          <h3>Sign on Coldcard</h3>
          <p>
            Insert the card into the Coldcard, review outputs carefully, and approve the signature.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <MonitorCheck size={24} />
          </div>
          <h3>Broadcast in Sparrow</h3>
          <p>
            Import the signed PSBT back into Sparrow, confirm the details, and broadcast the final
            transaction.
          </p>
        </Card>
      </div>

      <Card variant="gradient" padding="large" style={{ marginTop: 'var(--spacing-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-md)' }}>
          <AlertTriangle size={24} style={{ color: 'var(--warning)', flexShrink: 0 }} />
          <div>
            <h4 style={{ margin: '0 0 var(--spacing-sm)', color: 'var(--text-primary)' }}>
              Always Verify On-Device
            </h4>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
              Coldcard shows the exact destination and fee. If anything looks wrong, cancel and
              rebuild the transaction in Sparrow.
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function SecuritySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Security & Recovery</h2>
      <p className={styles.sectionText}>
        Coldcard Q gives you strong security defaults, but your operational habits matter most.
        Plan for both theft and loss with layered backups.
      </p>

      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Lock size={24} />
          </div>
          <h3>PIN & BrickMe</h3>
          <p>
            Use a strong PIN and consider the Coldcard Q decoy PIN feature to protect against coercion.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Key size={24} />
          </div>
          <h3>Seed Backups</h3>
          <p>
            Store backups in multiple secure locations. Consider metal backups for fire and water safety.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Shield size={24} />
          </div>
          <h3>Periodic Checks</h3>
          <p>
            Do a recovery drill once a year to confirm your backups and passphrase still work.
          </p>
        </Card>
      </div>

      <Accordion title="Recovery Plan" defaultOpen>
        <p>
          If your Coldcard is lost, you can restore the wallet using your seed phrase and optional
          passphrase on another Coldcard or compatible wallet. Sparrow will sync once it has the
          xpub or restored seed.
        </p>
      </Accordion>
    </motion.div>
  );
}

export default ColdcardLesson;
