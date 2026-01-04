import { useState } from 'react';
import { motion } from 'framer-motion';
import { LessonLayout } from '../components/layout';
import { Card, Accordion, Badge } from '../components/common';
import {
  Bitcoin,
  Globe2,
  ShieldCheck,
  LockKeyhole,
  Sparkles,
  Wifi,
  Coins,
  Key,
  Send,
  ArrowLeftRight,
  ChevronRight,
  Check,
  X,
  TrendingUp,
  Infinity
} from 'lucide-react';
import styles from './Lessons.module.css';

// Quick, subtle fade-in animation
const quickFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 }
};

const sections = [
  { id: 'intro', title: 'Introduction' },
  { id: 'understanding', title: 'Understanding Bitcoin' },
  { id: 'properties', title: 'Key Properties' },
  { id: 'start', title: 'Getting Started' }
];

export function WhatIsBitcoinLesson() {
  const [currentSection, setCurrentSection] = useState(0);

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return <IntroSection />;
      case 1:
        return <UnderstandingBitcoinSection />;
      case 2:
        return <PropertiesSection />;
      case 3:
        return <GettingStartedSection />;
      default:
        return <IntroSection />;
    }
  };

  return (
    <LessonLayout
      lessonId="what-is-bitcoin"
      title="What is Bitcoin?"
      description="A plain-English overview of Bitcoin and why it exists"
      icon={Bitcoin}
      sections={sections}
      currentSection={currentSection}
      onSectionChange={setCurrentSection}
      nextLesson={{ path: '/lessons/wallets', title: 'Wallets & Addresses' }}
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
          <Bitcoin size={48} />
        </div>
        <h2 className={styles.heroTitle}>Digital money you actually control</h2>
        <p className={styles.heroText}>
          Bitcoin is a form of digital money that lives on the internet. There is no company, bank, or
          government running it. The rules are programmatically set in code, and anyone can use it.
        </p>
      </div>

      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Globe2 size={24} />
          </div>
          <h3>Open to everyone</h3>
          <p>
            If you have the internet, you can use Bitcoin. No permission or account required.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <LockKeyhole size={24} />
          </div>
          <h3>Self-custody</h3>
          <p>
            You hold your own keys, like owning cash or precious metals. No one can freeze or take it.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <ShieldCheck size={24} />
          </div>
          <h3>Sound money</h3>
          <p>
            The total supply is capped at 21 million. No one can print more, so it cannot be inflated away.
          </p>
        </Card>
      </div>
    </motion.div>
  );
}

function UnderstandingBitcoinSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Understanding Bitcoin</h2>
      <p className={styles.sectionText}>
        Bitcoin was created so anyone can hold and send value without asking permission. It is money
        that cannot be easily censored, inflated, or shut down. This matters most to people who need
        reliable savings and payments in a world of fragile banks and unstable currencies.
      </p>

      {/* Two-column layout: Why it matters + How it works */}
      <div className={styles.twoColumnSection}>
        <div className={styles.columnCard}>
          <div className={styles.columnHeader}>
            <div className={styles.columnIcon}>
              <Sparkles size={20} />
            </div>
            <h3>Why it matters</h3>
          </div>
          <ul className={styles.columnList}>
            <li>
              <strong>Fixed supply:</strong> Only 21 million will ever exist, protecting your savings from inflation
            </li>
            <li>
              <strong>Borderless:</strong> Send value anywhere like an email, no waiting for bank wires
            </li>
            <li>
              <strong>Permissionless:</strong> No bank account or ID required to participate
            </li>
          </ul>
        </div>

        <div className={styles.columnCard}>
          <div className={styles.columnHeader}>
            <div className={styles.columnIcon}>
              <ArrowLeftRight size={20} />
            </div>
            <h3>How it works</h3>
          </div>
          <ul className={styles.columnList}>
            <li>
              <strong>Shared ledger:</strong> Thousands of computers maintain the same transaction list
            </li>
            <li>
              <strong>Cryptographic keys:</strong> Your private key proves ownership and authorizes spending
            </li>
            <li>
              <strong>Consensus rules:</strong> The network automatically rejects invalid transactions
            </li>
          </ul>
        </div>
      </div>

      {/* Transaction flow visualization */}
      <div className={styles.flowSection}>
        <h3 className={styles.flowTitle}>From send to confirmed</h3>
        <div className={styles.flowSteps}>
          <div className={styles.flowStep}>
            <div className={styles.flowStepIcon}>
              <Key size={20} />
            </div>
            <span className={styles.flowStepLabel}>You sign</span>
            <span className={styles.flowStepDesc}>Private key authorizes</span>
          </div>
          <div className={styles.flowArrow}>
            <ChevronRight size={20} />
          </div>
          <div className={styles.flowStep}>
            <div className={styles.flowStepIcon}>
              <Globe2 size={20} />
            </div>
            <span className={styles.flowStepLabel}>Network verifies</span>
            <span className={styles.flowStepDesc}>Nodes check the rules</span>
          </div>
          <div className={styles.flowArrow}>
            <ChevronRight size={20} />
          </div>
          <div className={styles.flowStep}>
            <div className={styles.flowStepIcon}>
              <ShieldCheck size={20} />
            </div>
            <span className={styles.flowStepLabel}>Miners confirm</span>
            <span className={styles.flowStepDesc}>Added to a block</span>
          </div>
        </div>
      </div>

      <div className={styles.factBox}>
        <h4>Quick facts</h4>
        <div className={styles.factGrid}>
          <div className={styles.fact}>
            <span className={styles.factValue}>10 min</span>
            <span className={styles.factLabel}>Avg. block time</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factValue}>21M</span>
            <span className={styles.factLabel}>Max supply</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factValue}>~15k</span>
            <span className={styles.factLabel}>Nodes worldwide</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Supply Comparison Visual Component
function SupplyComparisonVisual() {
  return (
    <motion.div className={styles.supplyBars} {...quickFade}>
      {/* Bitcoin */}
      <div className={styles.supplyItem}>
        <span className={styles.supplyLabel}>Bitcoin</span>
        <div className={styles.supplyBarContainer}>
          <div 
            className={`${styles.supplyBarFill} ${styles.bitcoin}`} 
            style={{ width: '93%' }}
          />
        </div>
        <div className={`${styles.supplyIndicator} ${styles.fixed}`}>
          <Check size={12} /> 21M fixed
        </div>
      </div>
      
      {/* Gold */}
      <div className={styles.supplyItem}>
        <span className={styles.supplyLabel}>Gold</span>
        <div className={styles.supplyBarContainer}>
          <div 
            className={`${styles.supplyBarFill} ${styles.gold}`} 
            style={{ width: '100%' }}
          />
        </div>
        <div className={`${styles.supplyIndicator} ${styles.growing}`}>
          <TrendingUp size={12} /> +1.5%/yr
        </div>
      </div>
      
      {/* USD */}
      <div className={styles.supplyItem}>
        <span className={styles.supplyLabel}>USD</span>
        <div className={styles.supplyBarContainer}>
          <div 
            className={`${styles.supplyBarFill} ${styles.usd}`} 
            style={{ width: '100%' }}
          />
        </div>
        <div className={`${styles.supplyIndicator} ${styles.unlimited}`}>
          <Infinity size={12} /> unlimited
        </div>
      </div>
    </motion.div>
  );
}

// Access Comparison Visual Component
function AccessComparisonVisual() {
  return (
    <motion.div className={styles.accessComparison} {...quickFade}>
      {/* Traditional Bank */}
      <div className={styles.accessFlow}>
        <span className={styles.accessFlowLabel}>Traditional Bank</span>
        <div className={styles.accessFlowSteps}>
          <span className={styles.accessStep}>ID docs</span>
          <ChevronRight size={14} className={styles.accessArrow} />
          <span className={styles.accessStep}>Application</span>
          <ChevronRight size={14} className={styles.accessArrow} />
          <span className={styles.accessStep}>Credit check</span>
          <ChevronRight size={14} className={styles.accessArrow} />
          <span className={styles.accessStep}>Wait 3-5 days</span>
          <ChevronRight size={14} className={styles.accessArrow} />
          <span className={`${styles.accessStep} ${styles.error}`}>
            <X size={12} /> Maybe denied
          </span>
        </div>
      </div>
      
      {/* Bitcoin */}
      <div className={styles.accessFlow}>
        <span className={styles.accessFlowLabel}>Bitcoin</span>
        <div className={styles.accessFlowSteps}>
          <span className={`${styles.accessStep} ${styles.highlight}`}>Download wallet</span>
          <ChevronRight size={14} className={styles.accessArrow} />
          <span className={`${styles.accessStep} ${styles.success}`}>
            <Check size={12} /> Ready
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Censorship Resistant Visual Component
function CensorshipResistantVisual() {
  return (
    <motion.div {...quickFade}>
      <svg className={styles.networkDiagram} viewBox="0 0 300 120" preserveAspectRatio="xMidYMid meet">
        {/* Connection paths */}
        {/* Top path - active */}
        <path d="M 40 60 Q 100 20 150 30 Q 200 40 260 60" className={`${styles.nodePath} ${styles.active}`} />
        {/* Middle path - blocked */}
        <path d="M 40 60 L 100 60 L 150 60" className={`${styles.nodePath} ${styles.blocked}`} />
        {/* Bottom path - active */}
        <path d="M 40 60 Q 100 100 150 90 Q 200 80 260 60" className={`${styles.nodePath} ${styles.active}`} />
        {/* Continuation from middle block */}
        <path d="M 150 60 L 200 60 L 260 60" className={`${styles.nodePath} ${styles.active}`} />
        
        {/* Sender node */}
        <circle cx="40" cy="60" r="16" className={`${styles.nodeCircle} ${styles.endpoint}`} />
        <text x="40" y="90" className={styles.nodeLabel}>You</text>
        
        {/* Top relay node */}
        <circle cx="150" cy="30" r="10" className={styles.nodeCircle} />
        
        {/* Middle blocked node */}
        <circle cx="150" cy="60" r="10" className={`${styles.nodeCircle} ${styles.blocked}`} />
        <line x1="144" y1="54" x2="156" y2="66" className={styles.blockedX} />
        <line x1="156" y1="54" x2="144" y2="66" className={styles.blockedX} />
        
        {/* Bottom relay node */}
        <circle cx="150" cy="90" r="10" className={styles.nodeCircle} />
        
        {/* Right relay node */}
        <circle cx="200" cy="60" r="10" className={styles.nodeCircle} />
        
        {/* Recipient node */}
        <circle cx="260" cy="60" r="16" className={`${styles.nodeCircle} ${styles.endpoint}`} />
        <text x="260" y="90" className={styles.nodeLabel}>Recipient</text>
      </svg>
    </motion.div>
  );
}

// World Map with Nodes Visual Component
function DecentralizedMapVisual() {
  // Simplified world map path (very basic continental outlines)
  const worldPath = `
    M 20,45 Q 25,35 35,38 L 45,35 Q 55,32 65,38 L 75,42 Q 80,48 75,55 L 65,58 Q 55,62 45,58 L 35,52 Q 25,48 20,45 Z
    M 85,35 Q 95,28 110,32 L 130,35 Q 145,38 155,45 L 160,55 Q 158,65 145,68 L 125,65 Q 105,62 95,55 L 88,48 Q 82,42 85,35 Z
    M 165,40 Q 180,32 200,35 L 220,38 Q 240,42 250,50 L 255,60 Q 252,72 235,75 L 210,72 Q 185,68 175,58 L 168,50 Q 162,45 165,40 Z
    M 75,70 Q 85,65 95,68 L 105,75 Q 110,82 105,88 L 90,90 Q 78,88 75,80 L 75,70 Z
    M 220,78 Q 235,75 250,80 L 260,88 Q 258,95 245,98 L 225,95 Q 215,90 220,78 Z
  `;
  
  // Node positions scattered across continents
  const nodes = [
    // North America
    { x: 35, y: 42 }, { x: 50, y: 38 }, { x: 60, y: 45 }, { x: 45, y: 50 },
    // Europe
    { x: 120, y: 38 }, { x: 135, y: 42 }, { x: 125, y: 50 }, { x: 145, y: 48 },
    // Asia
    { x: 185, y: 42 }, { x: 210, y: 45 }, { x: 230, y: 50 }, { x: 200, y: 55 }, { x: 245, y: 55 },
    // South America
    { x: 85, y: 75 }, { x: 95, y: 80 },
    // Australia
    { x: 235, y: 85 }, { x: 248, y: 88 },
    // Africa
    { x: 140, y: 60 }, { x: 150, y: 65 },
  ];

  return (
    <motion.div className={styles.worldMapContainer} {...quickFade}>
      <svg className={styles.worldMap} viewBox="0 0 280 110" preserveAspectRatio="xMidYMid meet">
        {/* Landmasses */}
        <path d={worldPath} className={styles.landmass} />
        
        {/* Node points */}
        {nodes.map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r="3"
            className={styles.nodePoint}
          />
        ))}
      </svg>
      <p className={styles.worldMapLabel}>
        <strong>~15,000+</strong> nodes worldwide, no central point of control
      </p>
    </motion.div>
  );
}

function PropertiesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>What makes Bitcoin special</h2>
      <p className={styles.sectionText}>
        These properties work together to make Bitcoin useful money for anyone, anywhere.
      </p>

      {/* Property 1: Scarce & Sound */}
      <div className={styles.propertyRow}>
        <div className={styles.propertyInfo}>
          <div className={styles.conceptIcon}>
            <Coins size={24} />
          </div>
          <h3>Scarce & sound</h3>
          <p>
            Hard cap of 21 million makes Bitcoin's supply predictable and resistant to inflation. No central party can dilute it.
          </p>
        </div>
        <div className={styles.propertyVisual}>
          <SupplyComparisonVisual />
        </div>
      </div>

      {/* Property 2: Permissionless */}
      <div className={styles.propertyRow}>
        <div className={styles.propertyInfo}>
          <div className={styles.conceptIcon}>
            <Globe2 size={24} />
          </div>
          <h3>Permissionless</h3>
          <p>
            Anyone can join, build, or leave at any time. No application, no approval, no waiting.
          </p>
        </div>
        <div className={styles.propertyVisual}>
          <AccessComparisonVisual />
        </div>
      </div>

      {/* Property 3: Censorship Resistant */}
      <div className={styles.propertyRow}>
        <div className={styles.propertyInfo}>
          <div className={styles.conceptIcon}>
            <ShieldCheck size={24} />
          </div>
          <h3>Censorship resistant</h3>
          <p>
            Transactions follow rules enforced by math, not human approvals. Even if some paths are blocked, your transaction finds a way.
          </p>
        </div>
        <div className={styles.propertyVisual}>
          <CensorshipResistantVisual />
        </div>
      </div>

      {/* Property 4: Decentralized */}
      <div className={styles.propertyRow}>
        <div className={styles.propertyInfo}>
          <div className={styles.conceptIcon}>
            <LockKeyhole size={24} />
          </div>
          <h3>Decentralized</h3>
          <p>
            The network is made up of thousands of independent nodes across the world. No single point of failure or control.
          </p>
        </div>
        <div className={styles.propertyVisual}>
          <DecentralizedMapVisual />
        </div>
      </div>

    </motion.div>
  );
}

function GettingStartedSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>How to start (beginner steps)</h2>
      <p className={styles.sectionText}>
        Keep it simple: learn the basics, use a trustworthy wallet, and practice with a tiny amount.
        You do not need to be technical.
      </p>

      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Wifi size={24} />
          </div>
          <h3>1) Install a wallet</h3>
          <p>
            Pick a beginner-friendly mobile wallet. Write down the 12 or 24-word recovery phrase
            privately.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Send size={24} />
          </div>
          <h3>2) Try a tiny send</h3>
          <p>
            Receive a small amount, then send a little to see how it works. Treat it like cash: move
            slowly and double-check addresses.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <ShieldCheck size={24} />
          </div>
          <h3>3) Level up security</h3>
          <p>
            When comfortable, learn hardware wallets and backups. The next lesson covers wallets in
            detail.
          </p>
        </Card>
      </div>

      <div className={styles.factBox}>
        <h4>Beginner checklist</h4>
        <div className={styles.factGrid}>
          <div className={styles.fact}>
            <span className={styles.factValue}>Write it</span>
            <span className={styles.factLabel}>Seed on paper</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factValue}>Test it</span>
            <span className={styles.factLabel}>Small amounts</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factValue}>No photos</span>
            <span className={styles.factLabel}>Keep it offline</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default WhatIsBitcoinLesson;
