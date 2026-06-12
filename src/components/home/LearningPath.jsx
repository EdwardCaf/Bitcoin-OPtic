import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Badge } from "../common";
import styles from "./LearningPath.module.css";

const LEARNING_TREE = {
  foundation: [
    {
      id: "what-is-bitcoin",
      title: "What is Bitcoin?",
      path: "/lessons/what-is-bitcoin",
      level: 1,
      description:
        "A plain-English primer on why Bitcoin exists and how it works.",
      difficulty: "Beginner",
      topics: ["Why Bitcoin", "21M Cap", "Self-Custody"],
    },
    {
      id: "wallets",
      title: "Wallets & Addresses",
      path: "/lessons/wallets",
      level: 1,
      description:
        "Understand how Bitcoin wallets work, from private keys to address types.",
      difficulty: "Beginner",
      topics: ["Private Keys", "Address Types", "HD Wallets"],
    },
    {
      id: "backups",
      title: "Backups & Recovery",
      path: "/lessons/backups",
      level: 1,
      description:
        "Build a practical plan for seed backups, passphrases, and inheritance.",
      difficulty: "Beginner",
      topics: ["Seed Backups", "Passphrases", "Inheritance"],
    },
    {
      id: "transactions",
      title: "Transactions",
      path: "/lessons/transactions",
      level: 1,
      description:
        "Learn how Bitcoin moves from one wallet to another through inputs, outputs, and fees.",
      difficulty: "Beginner",
      topics: ["UTXOs", "Inputs & Outputs", "Transaction Fees"],
    },
  ],
  core: [
    {
      id: "utxo-management",
      title: "UTXO Management",
      path: "/lessons/utxo-management",
      level: 2,
      description:
        "Master the art of managing your Bitcoin UTXOs for optimal fees and privacy.",
      difficulty: "Intermediate",
      topics: ["Consolidation", "Coin Selection", "Fee Optimization"],
    },
    {
      id: "multisig",
      title: "Multi-Signature",
      path: "/lessons/multisig",
      level: 2,
      description:
        "Learn how multi-signature wallets enhance Bitcoin security with multiple keys.",
      difficulty: "Intermediate",
      topics: ["M-of-N Setup", "Key Management", "Security"],
    },
    {
      id: "privacy",
      title: "Privacy",
      path: "/lessons/privacy",
      level: 2,
      description:
        "Explore Bitcoin privacy - how transactions can be traced and how to protect yourself.",
      difficulty: "Intermediate",
      topics: ["Address Reuse", "Chain Analysis", "CoinJoin"],
    },
  ],
  protocol: [
    {
      id: "blocks",
      title: "Blocks & Blockchain",
      path: "/lessons/blocks",
      level: 3,
      description:
        "Understand how blocks are structured and chained together to form an immutable ledger.",
      difficulty: "Intermediate",
      topics: ["Block Structure", "Chain of Hashes", "Immutability"],
    },
    {
      id: "mining",
      title: "Mining",
      path: "/lessons/mining",
      level: 3,
      description:
        "Discover how miners secure the network and create new Bitcoin through proof-of-work.",
      difficulty: "Intermediate",
      topics: ["Hashing", "Proof of Work", "Difficulty Adjustment"],
    },
    {
      id: "network",
      title: "Network & Nodes",
      path: "/lessons/network",
      level: 3,
      description:
        "Explore how Bitcoin's peer-to-peer network operates and reaches consensus.",
      difficulty: "Intermediate",
      topics: ["Node Types", "Consensus Rules", "Forks"],
    },
    {
      id: "running-a-node",
      title: "Running a Node",
      path: "/lessons/running-a-node",
      level: 3,
      description:
        "Learn why and how to run your own Bitcoin node for self-verification.",
      difficulty: "Intermediate",
      topics: ["Full Nodes", "Self Verification", "Bitcoin Core"],
    },
  ],
  advanced: [
    {
      id: "lightning",
      title: "Lightning Network",
      path: "/lessons/lightning",
      level: 4,
      description:
        "Learn how Lightning enables instant, low-fee Bitcoin payments through payment channels.",
      difficulty: "Advanced",
      topics: ["Payment Channels", "Routing", "Invoices"],
    },
    {
      id: "liquid",
      title: "Liquid Network",
      path: "/lessons/liquid",
      level: 4,
      description:
        "Explore Bitcoin's federated sidechain for fast settlement and confidential transactions.",
      difficulty: "Advanced",
      topics: ["Peg-In/Out", "Confidential TX", "Trade-offs"],
    },
    {
      id: "ecash",
      title: "eCash (Cashu & Fedimint)",
      path: "/lessons/ecash",
      level: 4,
      description:
        "Learn how Chaumian ecash enables near-perfect privacy with Bitcoin-backed tokens.",
      difficulty: "Advanced",
      topics: ["Cashu Mints", "Privacy", "Federated Custody"],
    },
  ],
};

const LEARNING_SECTIONS = [
  {
    title: "Foundation",
    lessons: LEARNING_TREE.foundation,
  },
  {
    title: "Core Concepts",
    lessons: LEARNING_TREE.core,
  },
  {
    title: "Protocol",
    lessons: LEARNING_TREE.protocol,
  },
  {
    title: "Layer 2 / Sidechains",
    lessons: LEARNING_TREE.advanced,
  },
];

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Beginner":
      return "success";
    case "Intermediate":
      return "warning";
    case "Advanced":
      return "error";
    default:
      return "secondary";
  }
};

function LessonNode({ lesson, index, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "160px" }}
      transition={{ delay, duration: 0.12, ease: "easeOut" }}
      className={styles.nodeWrapper}
    >
      <Link to={lesson.path} className={styles.node}>
        <span className={styles.stepNumber}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className={styles.nodeContent}>
          <span className={styles.nodeTitle}>{lesson.title}</span>
          <div className={styles.nodeTopics}>
            {lesson.topics.map((topic) => (
              <span key={topic} className={styles.topic}>
                {topic}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.nodeFooter}>
          <Badge
            variant={getDifficultyColor(lesson.difficulty)}
            size="small"
            className={styles.difficultyBadge}
          >
            {lesson.difficulty}
          </Badge>
          <ChevronRight size={14} className={styles.nodeArrow} />
        </div>
      </Link>
    </motion.div>
  );
}

export function LearningPath() {
  let lessonIndex = 0;

  return (
    <section id="learning-path" className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Learning Path</h2>
        <p className={styles.subtitle}>My recommendations</p>
      </div>

      <div className={styles.tree}>
        {LEARNING_SECTIONS.map((section) => (
          <div key={section.title} className={styles.level}>
            <div className={styles.levelLabel}>
              <h3 className={styles.levelTitle}>{section.title}</h3>
            </div>
            <div className={styles.nodeContainer}>
              {section.lessons.map((lesson) => {
                const currentIndex = lessonIndex;
                lessonIndex += 1;

                return (
                  <LessonNode
                    key={lesson.id}
                    lesson={lesson}
                    index={currentIndex}
                    delay={currentIndex * 0.01}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LearningPath;
