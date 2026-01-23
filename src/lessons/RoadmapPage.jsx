import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Zap, 
  Shield, 
  Key, 
  Box, 
  Wallet,
  Coins,
  Lock, 
  Pickaxe,
  ExternalLink,
  GitBranch,
  Compass,
  Send,
  ShoppingCart,
  Monitor,
  Layers,
  Users,
  Heart,
  Play
} from 'lucide-react';
import styles from './RoadmapPage.module.css';

// =============================================================================
// ROADMAP DATA - Restructured Tree with BTCSessions Videos
// =============================================================================

const roadmapTree = {
  'why-bitcoin': {
    id: 'why-bitcoin',
    title: 'Why Bitcoin?',
    icon: Coins,
    summary: 'Before diving into tools, understand the problem Bitcoin solves. Bitcoin is the first truly scarce digital asset—capped at 21 million coins forever. It operates without banks, governments, or intermediaries. It cannot be censored, confiscated, or inflated away. This is money that no one controls but everyone can verify.',
    prerequisites: [],
    children: ['first-wallet'],
    actionableSteps: [
      {
        text: 'Read the Bitcoin Whitepaper abstract and conclusion',
        resource: { type: 'external', url: 'https://bitcoin.org/bitcoin.pdf', label: 'Bitcoin Whitepaper' }
      },
      {
        text: 'Watch "But How Does Bitcoin Actually Work?" to understand the mechanics',
        resource: { type: 'youtube', url: 'https://www.youtube.com/watch?v=bBC-nXj3Ng4', label: '3Blue1Brown' }
      },
      {
        text: 'Understand why 21 million is a hard cap that cannot be changed',
        resource: null
      },
      {
        text: 'Learn what "proof of work" means and why energy expenditure matters',
        resource: { type: 'external', url: 'https://nakamotoinstitute.org/', label: 'Nakamoto Institute' }
      },
      {
        text: 'Explain to someone why Bitcoin is different from banks and payment apps',
        resource: null
      }
    ]
  },
  'first-wallet': {
    id: 'first-wallet',
    title: 'Your First Wallet',
    icon: Wallet,
    summary: '"Not your keys, not your coins." A Bitcoin wallet generates and stores the private keys that control your funds. When you write down your seed phrase (12 or 24 words), you are backing up your keys. Lose that phrase, lose your bitcoin. Keep it secret, keep it safe—never store it digitally.',
    prerequisites: ['why-bitcoin'],
    children: ['buying-bitcoin', 'sending-receiving'],
    actionableSteps: [
      {
        text: 'Install BlueWallet on your phone (iOS or Android)',
        resource: { type: 'external', url: 'https://bluewallet.io/', label: 'BlueWallet' }
      },
      {
        text: 'Watch the full first wallet tutorial',
        resource: { type: 'youtube', url: 'https://www.youtube.com/watch?v=c8ytiynbnpk', label: 'BTC Sessions' }
      },
      {
        text: 'Generate a new wallet and write down your 12-word seed phrase on paper',
        resource: null
      },
      {
        text: 'Store your seed phrase somewhere secure—not on your phone, not in the cloud',
        resource: null
      },
      {
        text: 'Delete the wallet and restore it from your seed phrase to verify your backup works',
        resource: null
      }
    ]
  },
  'buying-bitcoin': {
    id: 'buying-bitcoin',
    title: 'Buying Bitcoin',
    icon: ShoppingCart,
    summary: 'There are many ways to acquire bitcoin. Exchanges are convenient but require identity verification (KYC), which creates privacy risks and links your identity to your holdings. Some services let you buy directly to your own wallet. Peer-to-peer options exist for those who prioritize privacy.',
    prerequisites: ['first-wallet'],
    children: ['sparrow-wallet'],
    actionableSteps: [
      {
        text: 'Watch the Bitcoin Well tutorial for direct-to-wallet purchases',
        resource: { type: 'youtube', url: 'https://www.youtube.com/watch?v=MvxhJFhTwF4', label: 'BTC Sessions' }
      },
      {
        text: 'Set up an account with a Bitcoin-only exchange or service',
        resource: { type: 'external', url: 'https://bitcoinwell.com/', label: 'Bitcoin Well' }
      },
      {
        text: 'Make your first small purchase and withdraw to your own wallet immediately',
        resource: null
      },
      {
        text: 'Understand the difference between custodial and non-custodial',
        resource: null
      },
      {
        text: 'Research peer-to-peer options for future non-KYC purchases',
        resource: { type: 'external', url: 'https://hodlhodl.com/', label: 'Hodl Hodl' }
      }
    ]
  },
  'sending-receiving': {
    id: 'sending-receiving',
    title: 'Sending & Receiving',
    icon: Send,
    summary: 'Bitcoin transactions are irreversible broadcasts to a global network. When you send bitcoin, you sign a message with your private key authorizing the transfer. Transactions wait in the mempool until miners include them in a block. Fees determine priority—higher fees mean faster confirmation.',
    prerequisites: ['first-wallet'],
    children: ['sparrow-wallet'],
    actionableSteps: [
      {
        text: 'Learn the basics of sending and receiving with Sparrow',
        resource: { type: 'youtube', url: 'https://www.youtube.com/watch?v=_EVDtos8ZgI', label: 'BTC Sessions' }
      },
      {
        text: 'Generate a receive address and receive a small amount of bitcoin',
        resource: null
      },
      {
        text: 'Look up your transaction on a block explorer using the TXID',
        resource: { type: 'external', url: 'https://mempool.space/', label: 'Mempool.space' }
      },
      {
        text: 'Send a transaction to another address you control',
        resource: null
      },
      {
        text: 'Observe how fee rates affect confirmation time',
        resource: null
      },
      {
        text: 'Understand address types: Legacy (1...), SegWit (bc1q...), Taproot (bc1p...)',
        resource: null
      }
    ]
  },
  'sparrow-wallet': {
    id: 'sparrow-wallet',
    title: 'Sparrow Wallet',
    icon: Monitor,
    summary: 'Sparrow is the most powerful desktop Bitcoin wallet available. It gives you complete visibility into your transactions, UTXOs, and fees. It connects to your own node, supports hardware wallets, enables coin control, and handles multisig. If you are serious about self-custody, Sparrow is essential.',
    prerequisites: ['buying-bitcoin', 'sending-receiving'],
    children: ['hardware-wallets'],
    actionableSteps: [
      {
        text: 'Download and verify Sparrow Wallet',
        resource: { type: 'external', url: 'https://sparrowwallet.com/', label: 'Sparrow Wallet' }
      },
      {
        text: 'Watch the complete Sparrow Wallet tutorial',
        resource: { type: 'youtube', url: 'https://www.youtube.com/watch?v=yJpvfRl03Tw', label: 'BTC Sessions' }
      },
      {
        text: 'Create a new hot wallet in Sparrow and receive a small amount',
        resource: null
      },
      {
        text: 'Explore the transaction view—inputs, outputs, fees, change',
        resource: null
      },
      {
        text: 'Practice creating and broadcasting a transaction',
        resource: null
      },
      {
        text: 'Learn to verify software downloads using PGP signatures',
        resource: null
      }
    ]
  },
  'hardware-wallets': {
    id: 'hardware-wallets',
    title: 'Hardware Wallets',
    icon: Lock,
    summary: 'A hardware wallet (signing device) keeps your private keys offline, isolated from internet-connected computers that could be compromised. You sign transactions on the device itself—malware on your computer cannot steal your keys. For any significant amount of bitcoin, hardware wallets are non-negotiable.',
    prerequisites: ['sparrow-wallet'],
    children: ['running-node', 'coin-control', 'lightning'],
    actionableSteps: [
      {
        text: 'Watch the Coldcard Q beginner tutorial',
        resource: { type: 'youtube', url: 'https://www.youtube.com/watch?v=985bAPKUAV4', label: 'BTC Sessions' }
      },
      {
        text: 'Purchase a hardware wallet directly from the manufacturer—never secondhand',
        resource: { type: 'external', url: 'https://store.coinkite.com/', label: 'Coinkite Store' }
      },
      {
        text: 'Initialize the device and update its firmware',
        resource: null
      },
      {
        text: 'Generate a new seed on the device and back it up on paper or metal',
        resource: null
      },
      {
        text: 'Connect it to Sparrow Wallet and send a small test transaction',
        resource: null
      },
      {
        text: 'Consider a metal seed backup for fire and water resistance',
        resource: { type: 'external', url: 'https://jlopp.github.io/metal-bitcoin-storage-reviews/', label: 'Metal Backup Reviews' }
      }
    ]
  },
  'running-node': {
    id: 'running-node',
    title: 'Running a Node',
    icon: Box,
    summary: 'When you run a full node, you validate every transaction and block yourself. No third party can lie to you about your balance or the state of the network. You enforce the rules. Connecting your wallet to your own node also protects your privacy—you are not leaking your addresses to someone else\'s server.',
    prerequisites: ['hardware-wallets'],
    children: ['mining'],
    actionableSteps: [
      {
        text: 'Watch the Bitcoin Knots tutorial for Desktop, Umbrel, and Start9',
        resource: { type: 'youtube', url: 'https://www.youtube.com/watch?v=zT4NuAaH3EM', label: 'BTC Sessions' }
      },
      {
        text: 'Choose your setup: Bitcoin Core on desktop, or a plug-and-play node',
        resource: { type: 'external', url: 'https://start9.com/', label: 'Start9' }
      },
      {
        text: 'Install and sync the blockchain (this takes time and disk space)',
        resource: null
      },
      {
        text: 'Connect Sparrow Wallet to your own node',
        resource: null
      },
      {
        text: 'Verify a transaction using your node instead of a third-party explorer',
        resource: null
      },
      {
        text: 'Understand the difference between a full node and a pruned node',
        resource: null
      }
    ]
  },
  'coin-control': {
    id: 'coin-control',
    title: 'Coin Control',
    icon: Layers,
    summary: 'Bitcoin uses UTXOs (Unspent Transaction Outputs)—discrete chunks of value. When you spend, you select which UTXOs to use as inputs. Coin control means choosing these inputs deliberately. Label every UTXO with its source. Avoid merging coins from different contexts, as this links them together on-chain forever.',
    prerequisites: ['hardware-wallets'],
    children: ['privacy-coinjoin'],
    actionableSteps: [
      {
        text: 'Watch the UTXO management section of the Sparrow tutorial',
        resource: { type: 'youtube', url: 'https://www.youtube.com/watch?v=yJpvfRl03Tw&t=4354s', label: 'BTC Sessions' }
      },
      {
        text: 'Open the UTXOs tab in Sparrow and review your unspent outputs',
        resource: null
      },
      {
        text: 'Label every UTXO with its source (exchange name, P2P, gift, etc.)',
        resource: null
      },
      {
        text: 'Practice manually selecting specific UTXOs when creating a transaction',
        resource: null
      },
      {
        text: 'Understand why consolidating UTXOs has privacy implications',
        resource: null
      },
      {
        text: 'Learn about dust and why small UTXOs can become unspendable',
        resource: null
      }
    ]
  },
  'lightning': {
    id: 'lightning',
    title: 'Lightning Network',
    icon: Zap,
    summary: 'Lightning is a layer-2 protocol for instant, low-fee Bitcoin payments. It works by opening payment channels that can route thousands of transactions before settling on-chain. For everyday spending, Lightning is fast and cheap. Self-custodial Lightning wallets give you control without running a full node.',
    prerequisites: ['hardware-wallets'],
    children: ['multisig'],
    actionableSteps: [
      {
        text: 'Watch the complete Phoenix Wallet tutorial',
        resource: { type: 'youtube', url: 'https://www.youtube.com/watch?v=TpwnoPUyumA', label: 'BTC Sessions' }
      },
      {
        text: 'Install Phoenix Wallet on your phone',
        resource: { type: 'external', url: 'https://phoenix.acinq.co/', label: 'Phoenix Wallet' }
      },
      {
        text: 'Fund your Lightning wallet with a small amount',
        resource: null
      },
      {
        text: 'Make a Lightning payment (tip a creator, buy something)',
        resource: { type: 'external', url: 'https://stacker.news/', label: 'Stacker News' }
      },
      {
        text: 'Understand the difference between on-chain and Lightning transactions',
        resource: null
      },
      {
        text: 'Learn about inbound liquidity and why receiving can require setup',
        resource: null
      }
    ]
  },
  'privacy-coinjoin': {
    id: 'privacy-coinjoin',
    title: 'Privacy & CoinJoin',
    icon: Shield,
    summary: 'The Bitcoin blockchain is public. Every transaction is visible forever. Privacy requires active effort: never reuse addresses, label and segregate your UTXOs, acquire bitcoin without KYC when possible. CoinJoin is a technique where multiple users combine their transactions, breaking the chain of ownership.',
    prerequisites: ['coin-control'],
    children: ['multisig'],
    actionableSteps: [
      {
        text: 'Watch the Wasabi Wallet CoinJoin tutorial',
        resource: { type: 'youtube', url: 'https://www.youtube.com/watch?v=52pSd3I1nac', label: 'BTC Sessions' }
      },
      {
        text: 'Download and set up Wasabi Wallet',
        resource: { type: 'external', url: 'https://wasabiwallet.io/', label: 'Wasabi Wallet' }
      },
      {
        text: 'Never reuse a Bitcoin address—generate a new one for each receive',
        resource: null
      },
      {
        text: 'Understand how CoinJoin breaks transaction graph analysis',
        resource: null
      },
      {
        text: 'Research peer-to-peer exchanges for acquiring non-KYC bitcoin',
        resource: { type: 'external', url: 'https://bisq.network/', label: 'Bisq Network' }
      },
      {
        text: 'Learn about PayJoin and other privacy-enhancing techniques',
        resource: null
      }
    ]
  },
  'mining': {
    id: 'mining',
    title: 'Home Mining',
    icon: Pickaxe,
    summary: 'Mining secures the Bitcoin network through proof-of-work. While industrial mining dominates, home mining contributes to decentralization and helps you understand the protocol deeply. Small miners like Bitaxe let you participate in securing the network and potentially win block rewards through lottery mining.',
    prerequisites: ['running-node'],
    children: ['multisig'],
    actionableSteps: [
      {
        text: 'Watch the Bitaxe home mining tutorial',
        resource: { type: 'youtube', url: 'https://www.youtube.com/watch?v=QAwSXZ3L7Pc', label: 'BTC Sessions' }
      },
      {
        text: 'Understand how mining difficulty adjusts every 2016 blocks',
        resource: { type: 'external', url: 'https://mempool.space/mining', label: 'Mining Dashboard' }
      },
      {
        text: 'Learn the difference between solo mining and pool mining',
        resource: null
      },
      {
        text: 'Consider purchasing a Bitaxe for educational purposes',
        resource: { type: 'external', url: 'https://bitaxe.org/', label: 'Bitaxe' }
      },
      {
        text: 'Set up your miner with your own node using Datum Gateway',
        resource: null
      },
      {
        text: 'Join a pool like Ocean that supports decentralization',
        resource: { type: 'external', url: 'https://ocean.xyz/', label: 'Ocean Mining' }
      }
    ]
  },
  'multisig': {
    id: 'multisig',
    title: 'Multisig',
    icon: Users,
    summary: 'Multisig (multi-signature) requires multiple keys to authorize a transaction. A 2-of-3 setup means any 2 of 3 keys can spend—you can lose one key and still access your funds, but a thief needs to compromise multiple locations. This eliminates single points of failure for significant holdings.',
    prerequisites: ['lightning', 'privacy-coinjoin', 'mining'],
    children: ['inheritance'],
    actionableSteps: [
      {
        text: 'Watch the complete Nunchuk multisig guide',
        resource: { type: 'youtube', url: 'https://www.youtube.com/watch?v=gV4bAjX_ivA', label: 'BTC Sessions' }
      },
      {
        text: 'Understand different configurations: 2-of-3, 3-of-5, etc.',
        resource: null
      },
      {
        text: 'Set up a 2-of-3 multisig wallet on testnet first',
        resource: { type: 'external', url: 'https://nunchuk.io/', label: 'Nunchuk' }
      },
      {
        text: 'Use hardware wallets from different manufacturers for key diversity',
        resource: null
      },
      {
        text: 'Store keys in geographically separate, secure locations',
        resource: null
      },
      {
        text: 'Practice spending from your multisig to ensure you understand the process',
        resource: null
      }
    ]
  },
  'inheritance': {
    id: 'inheritance',
    title: 'Inheritance',
    icon: Heart,
    summary: 'Bitcoin does not care about death certificates or probate courts. If your heirs cannot access your keys, your bitcoin is lost forever. Inheritance planning requires balancing security (protecting from theft) with accessibility (ensuring heirs can recover). This is one of the most important and overlooked aspects of self-custody.',
    prerequisites: ['multisig'],
    children: [],
    actionableSteps: [
      {
        text: 'Watch the Nunchuk Honey Badger inheritance tutorial',
        resource: { type: 'youtube', url: 'https://www.youtube.com/watch?v=kizqvBY4zPE', label: 'BTC Sessions' }
      },
      {
        text: 'Document your wallet setup (without including private keys)',
        resource: null
      },
      {
        text: 'Create a letter of instruction for your heirs explaining what they need',
        resource: null
      },
      {
        text: 'Consider a collaborative custody service with built-in inheritance',
        resource: { type: 'external', url: 'https://nunchuk.io/', label: 'Nunchuk Honey Badger' }
      },
      {
        text: 'Test your inheritance plan—can a trusted person actually recover funds?',
        resource: null
      },
      {
        text: 'Review and update your plan annually as your setup evolves',
        resource: null
      }
    ]
  }
};

// Tree traversal order for rendering
const treeOrder = [
  { id: 'why-bitcoin', level: 0, column: 1 },
  { id: 'first-wallet', level: 1, column: 1 },
  // Branching level
  { id: 'buying-bitcoin', level: 2, column: 0 },
  { id: 'sending-receiving', level: 2, column: 2 },
  // Converging
  { id: 'sparrow-wallet', level: 3, column: 1 },
  { id: 'hardware-wallets', level: 4, column: 1 },
  // Three branches
  { id: 'running-node', level: 5, column: 0 },
  { id: 'coin-control', level: 5, column: 1 },
  { id: 'lightning', level: 5, column: 2 },
  // Sub-branches
  { id: 'mining', level: 6, column: 0 },
  { id: 'privacy-coinjoin', level: 6, column: 1 },
  // Converging to multisig
  { id: 'multisig', level: 7, column: 1 },
  { id: 'inheritance', level: 8, column: 1 },
];

// Group nodes by level for rendering
const getLevelGroups = () => {
  const groups = {};
  treeOrder.forEach(item => {
    if (!groups[item.level]) groups[item.level] = [];
    groups[item.level].push(item);
  });
  return Object.entries(groups).map(([level, items]) => ({
    level: parseInt(level),
    items: items.sort((a, b) => a.column - b.column)
  }));
};

// =============================================================================
// TOPIC CARD COMPONENT
// =============================================================================

function TopicCard({ node, isOpen, onToggle }) {
  const Icon = node.icon;
  const prerequisites = node.prerequisites.map(id => roadmapTree[id]?.title).filter(Boolean);
  
  return (
    <div className={`${styles.card} ${isOpen ? styles.cardOpen : ''}`}>
      <button 
        className={styles.cardHeader} 
        onClick={() => onToggle(node.id)}
        aria-expanded={isOpen}
      >
        <div className={styles.headerMain}>
          <div className={styles.iconBox}>
            <Icon size={24} />
          </div>
          <div className={styles.headerContent}>
            <h3 className={styles.cardTitle}>{node.title}</h3>
            {!isOpen && (
              <p className={styles.cardSummaryPreview}>
                {node.summary.substring(0, 80)}...
              </p>
            )}
          </div>
        </div>
        <div className={styles.headerAction}>
          <ChevronDown 
            size={20} 
            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} 
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={styles.cardBodyWrapper}
          >
            <div className={styles.cardBody}>
              {/* Prerequisites */}
              {prerequisites.length > 0 && (
                <div className={styles.prerequisitesSection}>
                  <div className={styles.prerequisitesLabel}>
                    <GitBranch size={14} />
                    Builds on
                  </div>
                  <div className={styles.prerequisitesList}>
                    {prerequisites.map((prereq, idx) => (
                      <span key={idx} className={styles.prerequisiteChip}>
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Summary */}
              <p className={styles.fullSummary}>{node.summary}</p>
              
              {/* Actionable Steps */}
              <div className={styles.actionSection}>
                <h4 className={styles.sectionLabel}>
                  <Compass size={16} />
                  Actionable Steps
                </h4>
                <ul className={styles.stepsList}>
                  {node.actionableSteps.map((step, idx) => (
                    <li key={idx} className={styles.stepItem}>
                      <div className={styles.stepNumber}>{idx + 1}</div>
                      <div className={styles.stepContent}>
                        <span className={styles.stepText}>{step.text}</span>
                        {step.resource && (
                          <a 
                            href={step.resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`${styles.resourceLink} ${step.resource.type === 'youtube' ? styles.youtubeLink : ''}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {step.resource.type === 'youtube' ? (
                              <Play size={12} />
                            ) : (
                              <ExternalLink size={12} />
                            )}
                            {step.resource.label}
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sovereignty Reminder */}
              <div className={styles.sovereigntyNote}>
                <Key size={14} />
                <span>Verify everything. Trust no one. Your keys, your responsibility.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// TREE LEVEL COMPONENT - Renders a horizontal row of nodes
// =============================================================================

function TreeLevel({ levelData, openIds, onToggle, prevLevelData, isMobile }) {
  const { level, items } = levelData;
  const isBranching = items.length > 1;
  
  // Determine connector type
  const renderConnector = () => {
    if (level === 0 || isMobile) return null;
    
    if (!prevLevelData) return null;
    
    const prevItems = prevLevelData.items;
    
    // Converging: multiple previous nodes to fewer current
    if (prevItems.length > 1 && items.length === 1) {
      const prevCount = prevItems.length;
      return (
        <div className={styles.connectorWrapper}>
          <svg className={styles.connectorConverge} viewBox="0 0 300 50" preserveAspectRatio="none">
            {prevCount === 2 && (
              <>
                <path d="M 75 0 L 75 25 L 150 25 L 150 50" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path d="M 225 0 L 225 25 L 150 25" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              </>
            )}
            {prevCount === 3 && (
              <>
                <path d="M 50 0 L 50 25 L 150 25 L 150 50" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path d="M 150 0 L 150 50" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path d="M 250 0 L 250 25 L 150 25" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              </>
            )}
          </svg>
        </div>
      );
    }
    
    // Branching: single previous to multiple current
    if (prevItems.length === 1 && items.length > 1) {
      const currentCount = items.length;
      return (
        <div className={styles.connectorWrapper}>
          <svg className={styles.connectorBranch} viewBox="0 0 300 50" preserveAspectRatio="none">
            <path d="M 150 0 L 150 25" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
            {currentCount === 2 && (
              <>
                <path d="M 75 25 L 225 25" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path d="M 75 25 L 75 50" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path d="M 225 25 L 225 50" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              </>
            )}
            {currentCount === 3 && (
              <>
                <path d="M 50 25 L 250 25" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path d="M 50 25 L 50 50" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path d="M 150 25 L 150 50" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path d="M 250 25 L 250 50" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              </>
            )}
          </svg>
        </div>
      );
    }
    
    // Partial converge (e.g., 3 to 2)
    if (prevItems.length === 3 && items.length === 2) {
      return (
        <div className={styles.connectorWrapper}>
          <svg className={styles.connectorConverge} viewBox="0 0 300 50" preserveAspectRatio="none">
            <path d="M 50 0 L 50 25 L 100 25 L 100 50" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
            <path d="M 150 0 L 150 25 L 100 25" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
            <path d="M 250 0 L 250 25 L 200 25 L 200 50" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
          </svg>
        </div>
      );
    }
    
    // Same count - straight lines down
    if (prevItems.length === items.length) {
      if (items.length === 1) {
        return (
          <div className={styles.connectorWrapper}>
            <svg className={styles.connector} viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d="M 50 0 L 50 40" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
            </svg>
          </div>
        );
      }
      // Multiple parallel lines
      return (
        <div className={styles.connectorWrapper}>
          <svg className={styles.connectorBranch} viewBox="0 0 300 40" preserveAspectRatio="none">
            {items.length === 2 && (
              <>
                <path d="M 75 0 L 75 40" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path d="M 225 0 L 225 40" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              </>
            )}
            {items.length === 3 && (
              <>
                <path d="M 50 0 L 50 40" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path d="M 150 0 L 150 40" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path d="M 250 0 L 250 40" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              </>
            )}
          </svg>
        </div>
      );
    }
    
    // Default straight line
    return (
      <div className={styles.connectorWrapper}>
        <svg className={styles.connector} viewBox="0 0 100 40" preserveAspectRatio="none">
          <path d="M 50 0 L 50 40" stroke="var(--bitcoin-orange)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
        </svg>
      </div>
    );
  };
  
  return (
    <div className={styles.treeLevel}>
      {renderConnector()}
      <div className={`${styles.levelCards} ${isBranching ? styles.levelCardsBranching : ''}`}>
        {items.map(item => (
          <TopicCard
            key={item.id}
            node={roadmapTree[item.id]}
            isOpen={openIds.includes(item.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// MOBILE TIMELINE COMPONENT - Fallback for small screens
// =============================================================================

function MobileTimeline({ openIds, onToggle }) {
  const orderedNodes = treeOrder.map(item => roadmapTree[item.id]);
  
  return (
    <div className={styles.mobileTimeline}>
      {orderedNodes.map((node, index) => (
        <div key={node.id} className={styles.mobileTimelineItem}>
          <div className={styles.mobileTimelineMarker}>
            <div className={styles.mobileMarkerDot} />
            {index < orderedNodes.length - 1 && <div className={styles.mobileTimelineLine} />}
          </div>
          <TopicCard
            node={node}
            isOpen={openIds.includes(node.id)}
            onToggle={onToggle}
          />
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// MAIN ROADMAP PAGE COMPONENT
// =============================================================================

export function RoadmapPage() {
  const [openIds, setOpenIds] = useState(['why-bitcoin']);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleCard = (id) => {
    setOpenIds((prev) => 
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const expandAll = () => setOpenIds(Object.keys(roadmapTree));
  const collapseAll = () => setOpenIds([]);
  
  const levelGroups = getLevelGroups();

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Roadmap</h1>
          <p className={styles.subtitle}>
            A practical path to Bitcoin self-sovereignty. Each topic builds on what came before, 
            branching into specialized skills. Master the tools. Control your keys. Own your future.
          </p>
          <div className={styles.controls}>
            <button className={styles.controlBtn} onClick={expandAll}>
              Expand All
            </button>
            <button className={styles.controlBtn} onClick={collapseAll}>
              Collapse All
            </button>
          </div>
        </div>
      </header>

      <div className={styles.treeContainer}>
        {isMobile ? (
          <MobileTimeline openIds={openIds} onToggle={toggleCard} />
        ) : (
          <div className={styles.tree}>
            {levelGroups.map((levelData, idx) => (
              <TreeLevel
                key={levelData.level}
                levelData={levelData}
                openIds={openIds}
                onToggle={toggleCard}
                prevLevelData={idx > 0 ? levelGroups[idx - 1] : null}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className={styles.footerCta}>
        <div className={styles.footerContent}>
          <h3>Your Keys, Your Coins, Your Future</h3>
          <p>
            Take it one step at a time. Verify everything. Trust no one with your keys. 
            This is a marathon, not a sprint.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoadmapPage;
