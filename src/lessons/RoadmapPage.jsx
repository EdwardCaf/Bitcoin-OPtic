import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Layers, Map, Target, Trophy, Zap } from 'lucide-react';
import styles from './RoadmapPage.module.css';

const levelsOrder = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const roadmapNodes = [
  {
    id: 'start-here',
    title: 'Start Here',
    level: 'Beginner',
    icon: Map,
    summary: [
      'Why Bitcoin matters: scarcity, censorship resistance, neutral money',
      'Keys, addresses, on-chain vs. off-chain, confirmations',
      'How nodes, miners, and wallets fit together',
    ],
    milestones: ['Read: What is Bitcoin?', 'Install a simple mobile wallet on testnet'],
    children: ['wallets-keys', 'utxo-transactions', 'blocks-consensus'],
  },
  {
    id: 'wallets-keys',
    title: 'Wallets & Keys',
    level: 'Beginner',
    icon: Layers,
    summary: [
      'Seed phrases, entropy, backups, and common failure modes',
      'Hot vs. cold storage, hardware vs. software wallets',
      'Address types: legacy, SegWit, Taproot; descriptors basics',
    ],
    milestones: ['Create a seed offline and test a restore', 'Send/receive a small testnet transaction'],
    children: ['privacy-coin-control', 'multisig-psbt', 'lightning-foundations'],
  },
  {
    id: 'utxo-transactions',
    title: 'Transactions & UTXOs',
    level: 'Beginner',
    icon: Target,
    summary: [
      'Inputs, outputs, change, and why UTXOs matter for privacy and fees',
      'Fee estimation, mempool basics, replace-by-fee (RBF)',
      'Address reuse pitfalls and labeling for coin control',
    ],
    milestones: ['Build a raw transaction in a simulator', 'Practice coin control on testnet'],
    children: ['privacy-coin-control', 'fee-mastery'],
  },
  {
    id: 'blocks-consensus',
    title: 'Blocks, Mining & Consensus',
    level: 'Beginner',
    icon: Zap,
    summary: [
      'Proof-of-work, difficulty adjustment, and halving cycles',
      'Block structure: headers, Merkle trees, coinbase transactions',
      'Consensus rules vs. networking rules; forks and finality intuition',
    ],
    milestones: ['Inspect a block in a block explorer', 'Mine a toy block in the simulator'],
    children: ['node-operations'],
  },
  {
    id: 'node-operations',
    title: 'Running a Node',
    level: 'Intermediate',
    icon: Trophy,
    summary: [
      'Full node vs. pruned vs. light clients (SPV)',
      'Peers, mempool policy, bandwidth/storage considerations',
      'Security: verify your own transactions and supply',
    ],
    milestones: ['Run Bitcoin Core (pruned or full)', 'Verify your wallet against your node'],
    children: ['lightning-foundations', 'sidechains-ecash'],
  },
  {
    id: 'privacy-coin-control',
    title: 'Privacy & Coin Control',
    level: 'Intermediate',
    icon: Map,
    summary: [
      'Threat models: chain analysis, network observers, exchange surveillance',
      'Best practices: address reuse avoidance, labeling, batching, coin control',
      'Tools: CoinJoin basics, PayJoin, Whirlpool/JoinMarket, Stonewall',
    ],
    milestones: ['Label UTXOs with provenance', 'Complete a CoinJoin on testnet'],
    children: ['sidechains-ecash', 'protocol-dev'],
  },
  {
    id: 'fee-mastery',
    title: 'Fees & Mempool Mastery',
    level: 'Intermediate',
    icon: Target,
    summary: [
      'Fee estimation strategies and mempool policy constraints',
      'RBF/CPFP, batching, consolidation vs. spam risk',
      'Planning for fee spikes and time-sensitive spends',
    ],
    milestones: ['Execute an RBF bump on testnet', 'Plan a consolidation set under low fees'],
    children: ['protocol-dev'],
  },
  {
    id: 'multisig-psbt',
    title: 'Multisig & PSBTs',
    level: 'Intermediate',
    icon: Layers,
    summary: [
      'm-of-n schemes, policy design, inheritance/security tradeoffs',
      'Partially Signed Bitcoin Transactions (PSBT) workflow',
      'Descriptors and Miniscript basics for safer wallet policies',
    ],
    milestones: ['Draft and sign a PSBT across devices', 'Set up a 2-of-3 vault on testnet'],
    children: ['vaults-inheritance'],
  },
  {
    id: 'lightning-foundations',
    title: 'Lightning Foundations',
    level: 'Intermediate',
    icon: Zap,
    summary: [
      'Channels, HTLCs, invoices, and routing fees',
      'Channel opens/closes, force closures, and watchtowers',
      'Backups (SCBs) and liquidity considerations',
    ],
    milestones: ['Open a channel on testnet', 'Send/receive through your own node'],
    children: ['lightning-operations'],
  },
  {
    id: 'lightning-operations',
    title: 'Lightning Operations',
    level: 'Advanced',
    icon: Zap,
    summary: [
      'Liquidity management, circular rebalancing, channel policies',
      'Routing node operations: gossip, fees, uptime, security posture',
      'Failure recovery: force-close handling, justice txs, backups in practice',
    ],
    milestones: ['Route a payment you did not originate', 'Recover a channel from backup'],
    children: ['protocol-dev'],
  },
  {
    id: 'sidechains-ecash',
    title: 'Sidechains & Ecash',
    level: 'Advanced',
    icon: Map,
    summary: [
      'Liquid: federated pegs, confidential transactions, issued assets',
      'Fedimint/ecash: Chaumian mints, privacy tradeoffs, guardians',
      'When to use L1 vs. LN vs. sidechains/ecash',
    ],
    milestones: ['Try a Liquid transfer on testnet', 'Join a Fedimint test federation'],
    children: ['protocol-dev'],
  },
  {
    id: 'vaults-inheritance',
    title: 'Vaults & Inheritance',
    level: 'Advanced',
    icon: Layers,
    summary: [
      'Time-locks, emergency paths, and decaying multisig policies',
      'Operational playbooks for recovery and key compromise',
      'Inheritance planning with Shamir, multisig, or Miniscript policies',
    ],
    milestones: ['Draft an inheritance policy doc', 'Test a recovery drill end-to-end'],
    children: ['protocol-dev'],
  },
  {
    id: 'protocol-dev',
    title: 'Protocol & Builder Track',
    level: 'Expert',
    icon: Trophy,
    summary: [
      'Script, Taproot, key-path vs. script-path spends; annex and control blocks',
      'BIP process, mempool/relay policy vs. consensus rules',
      'Miniscript, covenants research (OP_CTV/OP_VAULT), fee markets',
    ],
    milestones: ['Write and spend a Taproot script', 'Contribute review to a BIP or PR'],
    children: [],
  },
];

function RoadmapCard({ step, isOpen, onToggle }) {
  const Icon = step.icon;

  return (
    <div className={`${styles.card} ${isOpen ? styles.cardOpen : ''}`}>
      <button className={styles.cardHeader} onClick={() => onToggle(step.id)} aria-expanded={isOpen}>
        <div className={styles.iconWrap}>
          <Icon size={18} />
        </div>
        <div className={styles.headerText}>
          <span className={styles.cardTitle}>{step.title}</span>
          <span className={styles.level}>{step.level}</span>
        </div>
        <ChevronDown size={16} className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={styles.cardBody}
      >
        <div className={styles.section}>
          <p className={styles.sectionLabel}>What to learn</p>
          <ul>
            {step.summary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Milestones</p>
          <div className={styles.milestones}>
            {step.milestones.map((item) => (
              <span key={item} className={styles.milestone}>{item}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function RoadmapPage() {
  const [openIds, setOpenIds] = useState([]);

  const nodesByLevel = useMemo(() => {
    return levelsOrder.map((level) => ({
      level,
      nodes: roadmapNodes.filter((n) => n.level === level),
    }));
  }, []);

  const isAllOpen = useMemo(() => openIds.length === roadmapNodes.length, [openIds]);

  const toggleCard = (id) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleAll = () => {
    setOpenIds(isAllOpen ? [] : roadmapNodes.map((step) => step.id));
  };

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.kicker}>Guided Path</p>
        <h1 className={styles.title}>Bitcoin Roadmap</h1>
        <p className={styles.subtitle}>
          Move from curious beginner to confident expert with a structured, visual learning path.
          Each node reveals what to master and milestones to check off.
        </p>
        <div className={styles.controls}>
          <button className={styles.controlButton} onClick={toggleAll}>
            {isAllOpen ? 'Collapse all' : 'Expand all'}
          </button>
        </div>
      </header>

      <section className={styles.roadmap} aria-label="Bitcoin learning roadmap">
        <div className={styles.stack}>
          {nodesByLevel.map(({ level, nodes }) => (
            <div key={level} className={styles.levelSection}>
              <div className={styles.levelHeader}>{level}</div>
              <div className={styles.levelBody}>
                {nodes.map((node) => (
                  <RoadmapCard
                    key={node.id}
                    step={node}
                    isOpen={openIds.includes(node.id)}
                    onToggle={toggleCard}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RoadmapPage;
