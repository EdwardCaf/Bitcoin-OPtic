import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  ShieldCheck,
  Download,
  Wallet,
  Route,
  Zap,
  Wrench,
  EyeOff,
  Database,
  PlugZap,
  Lock,
  Smartphone,
  Gauge
} from 'lucide-react';
import { LessonLayout } from '../components/layout';
import { Card, Accordion, ResourceLinkCard } from '../components/common';
import { NodeSetupPicker, WalletBackendComparison } from '../components/lessons/running-node';
import styles from './Lessons.module.css';

const sections = [
  { id: 'why', title: 'Why Run a Node?' },
  { id: 'software', title: 'Software & Platforms' },
  { id: 'ibd', title: 'Initial Block Download' },
  { id: 'wallet', title: 'Connecting Your Wallet' },
  { id: 'lightning', title: 'Lightning Node' },
  { id: 'maintenance', title: 'Maintenance & Tradeoffs' }
];

export function RunningNodeLesson() {
  const [currentSection, setCurrentSection] = useState(0);

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return <WhySection />;
      case 1:
        return <SoftwareSection />;
      case 2:
        return <IBDSection />;
      case 3:
        return <WalletSection />;
      case 4:
        return <LightningNodeSection />;
      case 5:
        return <MaintenanceSection />;
      default:
        return <WhySection />;
    }
  };

  return (
    <LessonLayout
      lessonId="running-a-node"
      title="Running a Node"
      description="Learn how to verify Bitcoin for yourself and choose the right node setup"
      icon={Server}
      sections={sections}
      currentSection={currentSection}
      onSectionChange={setCurrentSection}
      prevLesson={{ path: '/lessons/network', title: 'Network' }}
      nextLesson={{ path: '/lessons/lightning', title: 'Lightning Network' }}
    >
      {renderSection()}
    </LessonLayout>
  );
}

function WhySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <div className={styles.heroCard}>
        <div className={styles.heroIcon}>
          <Server size={48} />
        </div>
        <h2 className={styles.heroTitle}>Your Copy of the Rules</h2>
        <p className={styles.heroText}>
          Running a Bitcoin node means your wallet can ask software you chose what happened on Bitcoin. Start simple, connect your wallet, and add extra services only when they solve a real problem.
        </p>
      </div>

      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <ShieldCheck size={24} />
          </div>
          <h3>Verify Yourself</h3>
          <p>
            Your node checks proof-of-work, blocks, transactions, and the UTXO set before your wallet trusts the result.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <EyeOff size={24} />
          </div>
          <h3>Improve Privacy</h3>
          <p>
            Public wallet servers can learn which addresses belong together. Your own node keeps those queries closer to home.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Lock size={24} />
          </div>
          <h3>Know the Limits</h3>
          <p>
            A node is not a vote and does not force anyone else to follow you. It decides what your wallet accepts as valid Bitcoin.
          </p>
        </Card>
      </div>

      <Accordion title="Analogy: Your Own Scale" defaultOpen>
        <p>
          Imagine buying gold. You can trust the seller's scale, or you can bring your own calibrated scale and verify the weight yourself.
        </p>
        <p>
          A Bitcoin node is your scale. Other people can announce transactions and blocks, but your node checks them against the rules of the Bitcoin software you chose before your wallet accepts what it sees.
        </p>
      </Accordion>

      <ResourceLinkCard section="nodes" title="Node Software" />
    </motion.div>
  );
}

function SoftwareSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Software & Platforms</h2>
      <p className={styles.sectionText}>
        The best node stack is the one you will actually understand and maintain. Bitcoin Core or Knots are the validating software. Platforms like Umbrel and Start9 can make services easier to install, but they also add abstraction.
      </p>

      <NodeSetupPicker />

      <div className={styles.factBox}>
        <h4>Hardware Defaults</h4>
        <div className={styles.factGrid}>
          <div className={styles.fact}>
            <span className={styles.factValue}>SSD</span>
            <span className={styles.factLabel}>Strongly preferred</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factValue}>2 TB</span>
            <span className={styles.factLabel}>Comfortable archival storage</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factValue}>Pruned</span>
            <span className={styles.factLabel}>Still validates with less disk</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function IBDSection() {
  const steps = [
    ['Find peers', 'Your node connects to other Bitcoin nodes and asks for chain data.'],
    ['Download headers', 'It checks the proof-of-work chain before downloading full block data.'],
    ['Validate blocks', 'Each block and transaction is checked against the consensus rules.'],
    ['Build UTXO set', 'Your node tracks which coins are currently spendable.'],
    ['Serve your wallet', 'After sync, your wallet can ask your node for verified history.']
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Initial Block Download</h2>
      <p className={styles.sectionText}>
        Initial Block Download, or IBD, is your node's first full verification pass. It replays Bitcoin history from the genesis block to today so it can independently know the current state of the ledger.
      </p>

      <div className={styles.flowSection}>
        <h3 className={styles.flowTitle}>First Sync Pipeline</h3>
        <div className={styles.flowSteps}>
          {steps.map(([label, description], index) => (
            <div key={label} className={styles.flowStep}>
              <div className={styles.flowStepIcon}>
                {index === 0 && <Server size={20} />}
                {index === 1 && <Download size={20} />}
                {index === 2 && <ShieldCheck size={20} />}
                {index === 3 && <Database size={20} />}
                {index === 4 && <Wallet size={20} />}
              </div>
              <span className={styles.flowStepLabel}>{label}</span>
              <span className={styles.flowStepDesc}>{description}</span>
            </div>
          ))}
        </div>
      </div>

      <Accordion title="What to Expect During Sync" defaultOpen>
        <p>
          IBD can take hours or days. A modern mini PC with an SSD can sync much faster than a small single-board computer or external hard drive.
        </p>
        <p>
          Once the first sync is complete, daily operation is much lighter. Your node only needs to keep up with new blocks and transactions.
        </p>
      </Accordion>
    </motion.div>
  );
}

function WalletSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Connecting Your Wallet</h2>
      <p className={styles.sectionText}>
        A node is most useful when your wallet actually uses it. Otherwise, you may still be asking a public server for balances and transaction history while your own node sits unused. Electrum servers fit here: they are wallet-query layers that sit on top of your validating node.
      </p>

      <WalletBackendComparison />

      <div className={styles.conceptGridTwo}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Route size={24} />
          </div>
          <h3>Electrum Server</h3>
          <p>
            Bitcoin Core or Knots validates the chain. Electrs, Fulcrum, or ElectrumX indexes wallet history so wallets can query your own backend quickly.
          </p>
          <ul className={styles.columnList}>
            <li><strong>Common wallets:</strong> Sparrow, Electrum Wallet, Specter</li>
            <li><strong>Common servers:</strong> Electrs, Fulcrum, ElectrumX</li>
            <li><strong>Main benefit:</strong> better privacy and UX than public Electrum servers</li>
          </ul>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Wallet size={24} />
          </div>
          <h3>Hardware Wallet Flow</h3>
          <p>
            A hardware wallet signs transactions. Desktop software builds and broadcasts them. Your node verifies the history and broadcasts through your own backend.
          </p>
          <ul className={styles.columnList}>
            <li><strong>Signer:</strong> Coldcard, Passport, Ledger, Trezor, Jade</li>
            <li><strong>Coordinator:</strong> Sparrow, Specter, Electrum</li>
            <li><strong>Backend:</strong> Bitcoin Core, Knots, or Electrum server</li>
          </ul>
        </Card>
      </div>
    </motion.div>
  );
}

function LightningNodeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Lightning Node</h2>
      <p className={styles.sectionText}>
        A Lightning node is optional and more operationally demanding than a Bitcoin node. It uses your Bitcoin node for on-chain channel transactions, then adds channels, liquidity, invoices, backups, and uptime concerns.
      </p>

      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Zap size={24} />
          </div>
          <h3>LND</h3>
          <p>
            A widely used Lightning implementation with broad app support. Common in Umbrel-style stacks and many tutorials.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Zap size={24} />
          </div>
          <h3>Core Lightning</h3>
          <p>
            A modular Lightning implementation with a strong plugin ecosystem. Often preferred by users who want more control.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Gauge size={24} />
          </div>
          <h3>Dashboards</h3>
          <p>
            ThunderHub and Ride The Lightning help manage channels, peers, invoices, and routing without living in the command line.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Smartphone size={24} />
          </div>
          <h3>Remote Control</h3>
          <p>
            Zeus can connect to your node for mobile control. Treat remote access carefully because it touches real funds.
          </p>
        </Card>
      </div>

      <Accordion title="Before You Run Lightning" defaultOpen>
        <p>
          Running Lightning is not necessary for every Bitcoin user. It can be useful, but it introduces liquidity management, channel backups, force-close risk, and more software to keep updated.
        </p>
        <p>
          Platforms like Umbrel and Start9 make installation easier, but they do not remove the need to understand what channels, liquidity, and backups mean.
        </p>
      </Accordion>
    </motion.div>
  );
}

function MaintenanceSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Maintenance & Tradeoffs</h2>
      <p className={styles.sectionText}>
        Running a node is not set-and-forget forever. The ongoing work is manageable, but it helps to know what actually matters and what does not put your funds at risk.
      </p>

      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Wrench size={24} />
          </div>
          <h3>Updates</h3>
          <p>
            Keep node software reasonably current. You do not need every release immediately, but avoid running abandoned software or forgotten apps.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <PlugZap size={24} />
          </div>
          <h3>Uptime</h3>
          <p>
            If your Bitcoin node is offline, your wallet may not refresh through it. Your bitcoin is not lost; your wallet just needs a working backend.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Lock size={24} />
          </div>
          <h3>Security</h3>
          <p>
            Do not expose RPC or admin interfaces publicly. Back up wallet seeds and Lightning channel backup material, not the blockchain.
          </p>
        </Card>
      </div>

      <Accordion title="Tor, Privacy, and Remote Access" defaultOpen>
        <p>
          Tor can hide your home IP from peers and make remote wallet connections easier, but it adds another moving part. Start with a local setup, then add Tor or remote access once you understand the basics.
        </p>
      </Accordion>
    </motion.div>
  );
}

export default RunningNodeLesson;
