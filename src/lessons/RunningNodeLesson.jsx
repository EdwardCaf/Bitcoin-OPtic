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
import { useLessonSection } from "../hooks/useLessonSection";
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
          extra services when needed.
        </p>
      </div>

      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <ShieldCheck size={24} />
          </div>
          <h3>Verify Yourself</h3>
          <p>Your node verifies blocks, transactions, and the UTXO set.</p>
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
        easier to manage. For most beginners, Umbrel or Start9 will be the best
        starting point.
      </p>

      <NeedAssistance
        tagline="Get help choosing and setting up your Bitcoin node."
        className={styles.tightBlock}
      />

      <NodeSetupPicker />

      <ResourceLinkCard section="nodes" title="Node Hardware & Software" />

      <div className={styles.factBox}>
        <h4>Hardware Defaults</h4>
        <div className={styles.factGrid}>
          <div className={styles.fact}>
            <span className={styles.factValue}>2 TB SSD</span>
            <span className={styles.factLabel}>
              Recommended full-node storage
            </span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factValue}>16 GB RAM</span>
            <span className={styles.factLabel}>
              Minimum for running the essential apps
            </span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factValue}>Modern CPU</span>
            <span className={styles.factLabel}>
              Better for UTXO lookup and Initial Block Download
            </span>
          </div>
        </div>
      </div>

      <Accordion title="Why Full Nodes Are Preferred" defaultOpen>
        <p>
          Full Nodes preserve historical block data, which gives you the most
          flexibility for wallet indexing, Electrum servers, rescans,
          troubleshooting, and future services.
        </p>
        <p>
          Pruning is a storage compromise, but not the ideal setup. A pruned
          node can still validate current consensus rules, but it discards old
          block data and limits what your node can do for your wallets, your own
          services, and other peers.
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
        A node is most useful when your wallet software actually connects to it.
        You may have downloaded and verified the blockchain, but your wallet
        could still be asking a public server for balances and transaction
        history. That means the public server can learn which addresses belong
        together, and your wallet is not relying on your own node's view of
        Bitcoin.
      </p>
      <p className={styles.sectionText}>
        Electrum servers fit here: they are wallet-query layers that sit on top
        of your validating node. Electrs is a common, lightweight choice for
        connecting wallets like Sparrow to your own node.
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
          Running a Lightning node is not necessary for every Bitcoin user. It
          can be useful, but it introduces liquidity management, channel
          backups, force-close risk, and more software to keep updated.
        </p>
        <p>
          Platforms like Umbrel and Start9 make installation easier, but they do
          not remove the need to understand channels, liquidity, and the
          importance of backups.
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
        Running a node is not set-and-forget. The ongoing work is manageable,
        but it helps to know what actually matters and what does not put your
        funds at risk.
      </p>
      <p className={styles.sectionText}>
        Downloading and validating the blockchain is only the starting point. To
        get the personal benefit, connect your wallet software to your node. To
        help the wider network, make your node reachable so other peers can
        download blocks from you.
      </p>

      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Wrench size={24} />
          </div>
          <h3>Updates</h3>
          <p>
            Updating to new major versions of the Bitcoin Node software (Bitcoin
            Core) is not required unless you desire the latest features. For
            other node applications like Lightning apps and others, generally
            avoid running old software for security and compatibility reasons.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <PlugZap size={24} />
          </div>
          <h3>Uptime</h3>
          <p>
            If your Bitcoin node is offline, your wallet may not refresh through
            it until it is turned back on. Lightning is different: channel
            monitoring, peer connectivity, and force-close safety make uptime
            essential.
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

      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Server size={24} />
          </div>
          <h3>Full Nodes</h3>
          <p>
            A full node is the recommended target for a dedicated setup because
            of what features it allows for. It is important to check storage
            space on your Node as this can quickly run out if your are running
            other apps.
          </p>
          <p>
            Pruned nodes reduce disk usage, but are just insufficient for what
            mode node runners will demand of their node.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <ShieldCheck size={24} />
          </div>
          <h3>Serving the Network</h3>
          <p>
            If your node only makes outbound connections, it can still verify
            your own wallet activity, but it is not as helpful to other peers.
            Consider forwarding port 8333 on your router so other Bitcoin nodes
            can connect to you and download blocks.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <EyeOff size={24} />
          </div>
          <h3>Tor, Privacy, and Remote Access</h3>
          <p>
            Tor can hide your home IP from peers and make remote wallet
            connections easier. You can also connect on your local network, then
            use Tor for remote access.
          </p>
        </Card>
      </div>
    </motion.div>
  );
}

export default RunningNodeLesson;
