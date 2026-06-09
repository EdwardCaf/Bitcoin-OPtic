import { motion } from "framer-motion";
import {
  Server,
  ShieldCheck,
  Wallet,
  Wrench,
  EyeOff,
  PlugZap,
  Lock,
} from "lucide-react";
import { LessonLayout } from "../components/layout";
import {
  Card,
  Accordion,
  NeedAssistance,
  ResourceLinkCard,
} from "../components/common";
import {
  NodeSetupPicker,
  LightningNodeTools,
  WalletBackendComparison,
} from "../components/lessons/running-node";
import { useLessonSection } from '../hooks/useLessonSection';
import styles from "./Lessons.module.css";

const sections = [
  { id: "why", title: "Why Run a Node?" },
  { id: "setup", title: "Node Setup Options" },
  { id: "wallet", title: "Connecting Your Wallet" },
  { id: "lightning", title: "Lightning Node" },
  { id: "maintenance", title: "Maintenance & Tradeoffs" },
];

export function RunningNodeLesson() {
  const [currentSection, setCurrentSection] = useLessonSection(sections);

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return <WhySection />;
      case 1:
        return <SoftwareSection />;
      case 2:
        return <WalletSection />;
      case 3:
        return <LightningNodeSection />;
      case 4:
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
      prevLesson={{ path: "/lessons/network", title: "Network" }}
      nextLesson={{ path: "/lessons/lightning", title: "Lightning Network" }}
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
          Running a Bitcoin node means you verify incoming transactions based on
          consensus rules you accept. Start simple, connect your wallet, and add
          extra services only when they solve a real problem.
        </p>
      </div>

      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <ShieldCheck size={24} />
          </div>
          <h3>Verify Yourself</h3>
          <p>
            Your node verifies blocks, transactions, and the UTXO set before
            your wallet trusts the result.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <EyeOff size={24} />
          </div>
          <h3>Improve Privacy</h3>
          <p>
            Public wallet servers can learn which addresses belong together.
            Your own node keeps those queries private.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Lock size={24} />
          </div>
          <h3>Know the Limits</h3>
          <p>
            A node is not a vote and does not force anyone else to follow you.
            It decides what your wallet accepts as valid Bitcoin.
          </p>
        </Card>
      </div>

      <Accordion title="Analogy: Your Own Scale" defaultOpen>
        <p>
          Imagine buying gold. You can trust the seller's scale, or you can
          bring your own calibrated scale and verify the weight yourself.
        </p>
        <p>
          A Bitcoin node is your scale. Other people can announce transactions
          and blocks, but your node checks them against the rules of the Bitcoin
          software you chose before your wallet accepts what it sees.
        </p>
      </Accordion>

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
      <h2 className={styles.sectionTitle}>Node Setup Options</h2>
      <p className={styles.sectionText}>
        Your main choice is whether to run a desktop app on hardware you already
        use, or a dedicated node-in-a-box Operating System that makes services
        easier to manage. For most beginners, Umbrel or Start9 will be the
        friendlier starting point.
      </p>

      <NeedAssistance
        tagline="Get help choosing and setting up your Bitcoin node."
        className={styles.tightBlock}
      />

      <NodeSetupPicker />

      <ResourceLinkCard section="nodes" title="Node Software" />

      <div className={styles.factBox}>
        <h4>Hardware Defaults</h4>
        <div className={styles.factGrid}>
          <div className={styles.fact}>
            <span className={styles.factValue}>SSD</span>
            <span className={styles.factLabel}>Strongly preferred</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factValue}>2 TB</span>
            <span className={styles.factLabel}>
              Recommended full-node storage
            </span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factValue}>Full Node</span>
            <span className={styles.factLabel}>Better for UTXO lookup</span>
          </div>
        </div>
      </div>

      <Accordion title="Full Node First, Pruned When Needed" defaultOpen>
        <p>
          Prefer a full archival node if you can afford the disk space. It gives
          you the most flexibility for wallet indexing, Electrum servers,
          rescans, and future services.
        </p>
        <p>
          A pruned node still validates Bitcoin for you, which is valuable when
          storage is limited. The tradeoff is that it discards old block data,
          so some services and wallet indexing workflows will not work properly.
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
        A node is most useful when your wallet actually uses it. Otherwise, you
        may still be asking a public server for balances and transaction history
        while your own node sits unused. Electrum servers fit here: they are
        wallet-query layers that sit on top of your validating node. Electrs is
        a common, lightweight choice for connecting wallets like Sparrow to your
        own node.
      </p>

      <WalletBackendComparison />
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
        A Lightning node is optional and more operationally demanding than a
        Bitcoin node. It uses your Bitcoin node for on-chain channel
        transactions, then adds channels, liquidity, invoices, backups, and
        uptime concerns.
      </p>

      <LightningNodeTools />

      <Accordion title="Before You Run Lightning" defaultOpen>
        <p>
          Running Lightning is not necessary for every Bitcoin user. It can be
          useful, but it introduces liquidity management, channel backups,
          force-close risk, and more software to keep updated.
        </p>
        <p>
          Platforms like Umbrel and Start9 make installation easier, but they do
          not remove the need to understand what channels, liquidity, and
          backups mean.
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
        Running a node is not set-and-forget forever. The ongoing work is
        manageable, but it helps to know what actually matters and what does not
        put your funds at risk.
      </p>

      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Wrench size={24} />
          </div>
          <h3>Updates</h3>
          <p>
            Keep app software reasonably current. You do not need to update to
            new major Core Versions, but generally avoid running old software
            for security reasons.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <PlugZap size={24} />
          </div>
          <h3>Uptime</h3>
          <p>
            If your Bitcoin node is offline, your wallet may not refresh through
            it, but your bitcoin is not lost. Lightning is different: channel
            monitoring, peer connectivity, and force-close safety make uptime
            more important.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Lock size={24} />
          </div>
          <h3>Security</h3>
          <p>
            Do not expose RPC or admin interfaces publicly. Back up wallet seeds
            and Lightning channel backup material.
          </p>
        </Card>
      </div>

      <Accordion title="Full vs Pruned Maintenance" defaultOpen>
        <p>
          A full node is the better default for a dedicated setup because it
          preserves historical block data for rescans, indexing, Electrum
          servers, and future services.
        </p>
        <p>
          A pruned node is still a real validating node and can be a good choice
          on a laptop or low-storage machine. Just understand that you may need
          to resync from scratch if you later want services that require full
          history.
        </p>
      </Accordion>

      <Accordion title="Tor, Privacy, and Remote Access" defaultOpen>
        <p>
          Tor can hide your home IP from peers and make remote wallet
          connections easier, but it adds another moving part. Start with a
          local setup, then add Tor or remote access once you understand the
          basics.
        </p>
      </Accordion>
    </motion.div>
  );
}

export default RunningNodeLesson;
