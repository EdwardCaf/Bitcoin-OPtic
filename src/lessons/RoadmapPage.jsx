import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Bitcoin,
  Shield,
  EyeOff,
  Server,
  Zap,
  ChevronRight,
  Play,
  FileText,
  Wrench,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Compass,
} from 'lucide-react';
import styles from './RoadmapPage.module.css';

const STUDY_GUIDES = [
  {
    id: 'fundamentals',
    title: 'Bitcoin Fundamentals',
    icon: Bitcoin,
    description: 'Understand what Bitcoin is, how transactions work, and how blocks are assembled. This is the foundation everything else builds on.',
    difficulty: 'Beginner',
    estimatedTime: '2-3 hours',
    lessons: [
      { title: 'What is Bitcoin?', path: '/lessons/what-is-bitcoin', description: 'The basics of Bitcoin as a decentralized digital currency' },
      { title: 'Transactions', path: '/lessons/transactions', description: 'How value moves on the Bitcoin network' },
      { title: 'Blocks', path: '/lessons/blocks', description: 'How transactions are batched and confirmed' },
    ],
    resources: [
      { title: 'Bitcoin Whitepaper', url: 'https://bitcoin.org/bitcoin.pdf', type: 'article', author: 'Satoshi Nakamoto' },
      { title: 'But How Does Bitcoin Actually Work?', url: 'https://www.youtube.com/watch?v=bBC-nXj3Ng4', type: 'video', author: '3Blue1Brown' },
      { title: 'Mempool.space', url: 'https://mempool.space/', type: 'tool', author: 'Mempool' },
      { title: 'Nakamoto Institute', url: 'https://nakamotoinstitute.org/', type: 'article', author: 'Nakamoto Institute' },
    ],
    suggestedOrder: 'Start with the "What is Bitcoin?" lesson, then watch the 3Blue1Brown video for a visual explanation. Move on to Transactions and Blocks to understand how the network operates. Use Mempool.space to observe real transactions in real time.',
  },
  {
    id: 'wallets-custody',
    title: 'Wallets & Self-Custody',
    icon: Shield,
    description: 'Learn how wallets work, how to secure your keys, and how multi-signature setups eliminate single points of failure.',
    difficulty: 'Beginner → Intermediate',
    estimatedTime: '3-4 hours',
    lessons: [
      { title: 'Wallets', path: '/lessons/wallets', description: 'How Bitcoin wallets generate and manage keys' },
      { title: 'Multi-Signature', path: '/lessons/multisig', description: 'Require multiple keys to authorize transactions' },
    ],
    resources: [
      { title: 'Sparrow Wallet', url: 'https://sparrowwallet.com/', type: 'tool', author: 'Craig Raw' },
      { title: 'Coldcard', url: 'https://store.coinkite.com/', type: 'tool', author: 'Coinkite' },
      { title: 'Nunchuk', url: 'https://nunchuk.io/', type: 'tool', author: 'Nunchuk' },
      { title: 'Your First Bitcoin Wallet', url: 'https://www.youtube.com/watch?v=c8ytiynbnpk', type: 'video', author: 'BTC Sessions' },
      { title: 'Metal Backup Reviews', url: 'https://jlopp.github.io/metal-bitcoin-storage-reviews/', type: 'article', author: 'Jameson Lopp' },
    ],
    suggestedOrder: 'Begin with the Wallets lesson to understand key management, then explore Sparrow Wallet on desktop. Once comfortable, look into hardware wallets (Coldcard) and multi-signature setups (Nunchuk) for serious holdings.',
  },
  {
    id: 'privacy-utxo',
    title: 'Privacy & UTXO Management',
    icon: EyeOff,
    description: 'The Bitcoin blockchain is public. Learn how to manage your UTXOs deliberately and use privacy-enhancing techniques.',
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hours',
    lessons: [
      { title: 'Privacy', path: '/lessons/privacy', description: 'Techniques for maintaining financial privacy on-chain' },
      { title: 'UTXO Management', path: '/lessons/utxo-management', description: 'Deliberate coin selection and labeling strategies' },
    ],
    resources: [
      { title: 'Wasabi Wallet', url: 'https://wasabiwallet.io/', type: 'tool', author: 'zkSNACKs' },
      { title: 'Coin Control in Sparrow', url: 'https://www.youtube.com/watch?v=yJpvfRl03Tw&t=4354s', type: 'video', author: 'BTC Sessions' },
      { title: 'CoinJoin Explained', url: 'https://www.youtube.com/watch?v=52pSd3I1nac', type: 'video', author: 'BTC Sessions' },
    ],
    suggestedOrder: 'Start with the Privacy lesson to understand the threat model, then learn UTXO Management for practical coin control. Watch the Sparrow coin control tutorial and explore Wasabi for CoinJoin.',
  },
  {
    id: 'mining-infrastructure',
    title: 'Mining & Network Infrastructure',
    icon: Server,
    description: 'Understand how mining secures the network, how blocks propagate, and how to run your own node for full sovereignty.',
    difficulty: 'Intermediate',
    estimatedTime: '3-4 hours',
    lessons: [
      { title: 'Mining', path: '/lessons/mining', description: 'Proof-of-work and the block reward mechanism' },
      { title: 'Blocks', path: '/lessons/blocks', description: 'Block structure, headers, and the chain' },
      { title: 'Network', path: '/lessons/network', description: 'Peer-to-peer propagation and node types' },
    ],
    resources: [
      { title: 'Start9', url: 'https://start9.com/', type: 'tool', author: 'Start9' },
      { title: 'Umbrel', url: 'https://umbrel.com/', type: 'tool', author: 'Umbrel' },
      { title: 'Bitcoin Core', url: 'https://bitcoincore.org/', type: 'tool', author: 'Bitcoin Core Contributors' },
      { title: 'Bitaxe', url: 'https://bitaxe.org/', type: 'tool', author: 'Bitaxe' },
      { title: 'Ocean Mining', url: 'https://ocean.xyz/', type: 'tool', author: 'Ocean' },
    ],
    suggestedOrder: 'Start with the Mining lesson and Blocks to understand proof-of-work. Then read about the Network to see how nodes communicate. Consider running your own node with Start9 or Umbrel, and explore home mining with Bitaxe.',
  },
  {
    id: 'layer2-scaling',
    title: 'Layer 2 & Scaling',
    icon: Zap,
    description: 'Explore how Lightning, Liquid, and eCash extend Bitcoin with faster payments, confidential transactions, and privacy-preserving tokens.',
    difficulty: 'Advanced',
    estimatedTime: '3-5 hours',
    lessons: [
      { title: 'Lightning', path: '/lessons/lightning', description: 'Instant, low-fee payments via payment channels' },
      { title: 'Liquid', path: '/lessons/liquid', description: 'Federated sidechain for confidential transactions' },
      { title: 'eCash', path: '/lessons/ecash', description: 'Chaumian mints for private, custodial tokens' },
    ],
    resources: [
      { title: 'Phoenix Wallet', url: 'https://phoenix.acinq.co/', type: 'tool', author: 'ACINQ' },
      { title: 'Blockstream', url: 'https://blockstream.com/', type: 'tool', author: 'Blockstream' },
      { title: 'Fedi', url: 'https://www.fedi.xyz/', type: 'tool', author: 'Fedi' },
      { title: 'Cashu.me', url: 'https://cashu.me/', type: 'tool', author: 'Cashu' },
      { title: 'Phoenix Wallet Tutorial', url: 'https://www.youtube.com/watch?v=TpwnoPUyumA', type: 'video', author: 'BTC Sessions' },
    ],
    suggestedOrder: 'Start with the Lightning lesson and try Phoenix Wallet for hands-on experience. Then explore Liquid via Blockstream for confidential transactions. Finally, learn about eCash mints with Cashu.me and Fedi for federated custody.',
  },
];

const resourceTypeIcon = {
  video: Play,
  article: FileText,
  tool: Wrench,
};

const resourceTypeLabel = {
  video: 'Video',
  article: 'Article',
  tool: 'Tool',
};

function ChapterBlock({ guide, index, isOpen, onToggle }) {
  const Icon = guide.icon;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const chapterNum = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      ref={ref}
      className={`${styles.chapter} ${isOpen ? styles.chapterOpen : ''}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Chapter number & progress line */}
      <div className={styles.chapterTrack}>
        <div className={styles.chapterNumber}>{chapterNum}</div>
        {index < STUDY_GUIDES.length - 1 && <div className={styles.trackLine} />}
      </div>

      {/* Main content area */}
      <div className={styles.chapterContent}>
        <button
          className={styles.chapterHeader}
          onClick={() => onToggle(guide.id)}
          aria-expanded={isOpen}
        >
          <div className={styles.chapterMeta}>
            <span className={styles.difficultyTag}>{guide.difficulty}</span>
            <span className={styles.timeMeta}>{guide.estimatedTime}</span>
          </div>
          <div className={styles.chapterTitleRow}>
            <div className={`${styles.chapterIcon} ${isOpen ? styles.chapterIconActive : ''}`}>
              <Icon size={20} />
            </div>
            <h2 className={styles.chapterTitle}>{guide.title}</h2>
            <ChevronRight
              size={18}
              className={`${styles.expandIcon} ${isOpen ? styles.expandIconOpen : ''}`}
            />
          </div>
          <p className={styles.chapterDescription}>{guide.description}</p>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className={styles.chapterBodyWrapper}
            >
              <div className={styles.chapterBody}>
                {/* Two-column layout: Lessons + Resources */}
                <div className={styles.contentGrid}>
                  {/* Lessons Column */}
                  <div className={styles.lessonsColumn}>
                    <div className={styles.columnHeader}>
                      <BookOpen size={14} />
                      <span>Lessons</span>
                    </div>
                    <div className={styles.lessonsList}>
                      {guide.lessons.map((lesson, i) => (
                        <Link
                          key={lesson.path}
                          to={lesson.path}
                          className={styles.lessonItem}
                        >
                          <div className={styles.lessonNumber}>{i + 1}</div>
                          <div className={styles.lessonContent}>
                            <span className={styles.lessonTitle}>{lesson.title}</span>
                            <span className={styles.lessonDesc}>{lesson.description}</span>
                          </div>
                          <ArrowRight size={14} className={styles.lessonArrow} />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Resources Column */}
                  <div className={styles.resourcesColumn}>
                    <div className={styles.columnHeader}>
                      <ExternalLink size={14} />
                      <span>Resources</span>
                    </div>
                    <div className={styles.resourcesList}>
                      {guide.resources.map((resource) => {
                        const TypeIcon = resourceTypeIcon[resource.type] || FileText;
                        return (
                          <a
                            key={resource.url}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.resourceItem} ${styles[`resource_${resource.type}`]}`}
                          >
                            <div className={styles.resourceIconBox}>
                              <TypeIcon size={13} />
                            </div>
                            <div className={styles.resourceContent}>
                              <span className={styles.resourceTitle}>{resource.title}</span>
                              <span className={styles.resourceMeta}>
                                {resource.author} · {resourceTypeLabel[resource.type]}
                              </span>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Suggested Approach */}
                {guide.suggestedOrder && (
                  <div className={styles.suggestedBlock}>
                    <div className={styles.suggestedHeader}>
                      <Compass size={14} />
                      <span>Suggested Path</span>
                    </div>
                    <p className={styles.suggestedText}>{guide.suggestedOrder}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function RoadmapPage() {
  const [openIds, setOpenIds] = useState([]);

  const toggleCard = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.page}>
      {/* Hero */}
      <header className={styles.hero}>
        <motion.div
          className={styles.heroInner}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.heroLabel}>
            <BookOpen size={14} />
            <span>Learning Path</span>
          </div>
          <h1 className={styles.heroTitle}>Study Guides</h1>
          <p className={styles.heroSubtitle}>
            Curated chapters that combine interactive lessons with hand-picked resources.
            Follow the path from fundamentals to advanced topics.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>5</span>
              <span className={styles.statLabel}>Chapters</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>13</span>
              <span className={styles.statLabel}>Lessons</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>22</span>
              <span className={styles.statLabel}>Resources</span>
            </div>
          </div>
        </motion.div>
        <div className={styles.heroGlow} />
      </header>

      {/* Chapter List */}
      <div className={styles.chaptersContainer}>
        {STUDY_GUIDES.map((guide, index) => (
          <ChapterBlock
            key={guide.id}
            guide={guide}
            index={index}
            isOpen={openIds.includes(guide.id)}
            onToggle={toggleCard}
          />
        ))}
      </div>
    </div>
  );
}

export default RoadmapPage;
