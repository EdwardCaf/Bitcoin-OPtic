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
  ArrowLeftRight
} from 'lucide-react';
import styles from './Lessons.module.css';

const sections = [
  { id: 'intro', title: 'Introduction' },
  { id: 'why', title: 'Why It Matters' },
  { id: 'how', title: 'How It Works' },
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
        return <WhySection />;
      case 2:
        return <HowSection />;
      case 3:
        return <PropertiesSection />;
      case 4:
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

function WhySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Why Bitcoin exists</h2>
      <p className={styles.sectionText}>
        Bitcoin was created so anyone can hold and send value without asking permission. It is money
        that cannot be easily censored, inflated, or shut down. This matters most to people who need
        reliable savings and payments in a world of fragile banks and unstable currencies.
      </p>

      <div className={styles.conceptGridTwo}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Sparkles size={24} />
          </div>
          <h3>21 million cap</h3>
          <p>Fixed supply makes Bitcoin scarce, like digital gold. Scarcity protects your savings from debasement.</p>
        </Card>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Wifi size={24} />
          </div>
          <h3>Borderless payments</h3>
          <p>Send value online like an email. No waiting hours or days for bank wires.</p>
        </Card>
      </div>

      <Accordion title="Analogy: The open cash box" defaultOpen>
        <p>
          Imagine a giant public cash box on the internet. Everyone can see inside the box and the rules
          that govern it. Nobody can sneak extra bills inside, and nobody can lock you out if you
          follow the rules. That is Bitcoin: predictable, transparent, and open to all.
        </p>
      </Accordion>
    </motion.div>
  );
}

function HowSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>How Bitcoin works (simple view)</h2>
      <p className={styles.sectionText}>
        Bitcoin is a shared list of transactions (a ledger) that lives on thousands of computers.
        These computers agree on the same list by following clear rules called consensus. When you
        send Bitcoin, the network checks the rules, records it, and everyone updates their copy.
      </p>

      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Key size={24} />
          </div>
          <h3>Your keys sign</h3>
          <p>Your private key is like a signature that proves the coins are yours to spend.</p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <ArrowLeftRight size={24} />
          </div>
          <h3>Network verifies</h3>
          <p>Nodes check every transaction against the rules. Invalid moves are rejected.</p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <ShieldCheck size={24} />
          </div>
          <h3>Miners secure</h3>
          <p>Miners bundle transactions into blocks and add them to the chain.</p>
        </Card>
      </div>

      <div className={styles.factBox}>
        <h4>Quick facts</h4>
        <div className={styles.factGrid}>
          <div className={styles.fact}>
            <span className={styles.factValue}>10 minutes</span>
            <span className={styles.factLabel}>Avg. block time</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factValue}>~15k</span>
            <span className={styles.factLabel}>Nodes worldwide</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factValue}>Open code</span>
            <span className={styles.factLabel}>Anyone can review</span>
          </div>
        </div>
      </div>
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

      <div className={styles.conceptGridTwo}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Coins size={24} />
          </div>
          <h3>Scarce & sound</h3>
          <p>
            Hard cap of 21 million makes Bitcoin's supply predictable and resistant to inflation. No central
            party can dilute it.
          </p>
        </Card>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Globe2 size={24} />
          </div>
          <h3>Permissionless</h3>
          <p>Anyone can join, build, or leave at any time. The rules are transparent and public.</p>
        </Card>
      </div>

      <div className={styles.conceptGridTwo}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <ShieldCheck size={24} />
          </div>
          <h3>Censorship resistant</h3>
          <p>
            Transactions follow rules enforced by math and code, not human approvals. If you follow the rules, the
            network processes your transaction.
          </p>
        </Card>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <LockKeyhole size={24} />
          </div>
          <h3>Decntralized</h3>
          <p>
            The Bitcoin network is made up of thousands of nodes, all across the world and 
            protected by a powerful network of computers (miners).
          </p>
        </Card>
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
