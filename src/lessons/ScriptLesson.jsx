import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Lock, 
  Unlock,
  Layers,
  Clock,
  Sparkles,
  FileCode,
  Key,
  Shield
} from 'lucide-react';
import { LessonLayout } from '../components/layout';
import { Card, Accordion, ResourceLinkCard } from '../components/common';
import { 
  ScriptExecutionDemo, 
  ScriptTypeExplorer, 
  OpCodeReference,
  TimeLockDemo
} from '../components/lessons/script';
import styles from './Lessons.module.css';

const sections = [
  { id: 'intro', title: 'Introduction' },
  { id: 'execution', title: 'Script Execution' },
  { id: 'types', title: 'Script Types' },
  { id: 'opcodes', title: 'OP Codes' },
  { id: 'timelocks', title: 'Time Locks' }
];

export function ScriptLesson() {
  const [currentSection, setCurrentSection] = useState(0);

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return <IntroSection />;
      case 1:
        return <ExecutionSection />;
      case 2:
        return <TypesSection />;
      case 3:
        return <OpcodesSection />;
      case 4:
        return <TimeLocksSection />;
      default:
        return <IntroSection />;
    }
  };

  return (
    <LessonLayout
      lessonId="script"
      title="Bitcoin Script"
      description="Learn how Bitcoin's scripting language controls how coins can be spent"
      icon={Code}
      sections={sections}
      currentSection={currentSection}
      onSectionChange={setCurrentSection}
      prevLesson={{ path: '/lessons/transactions', title: 'Transactions' }}
      nextLesson={{ path: '/lessons/utxo-management', title: 'UTXO Management' }}
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
          <Code size={48} />
        </div>
        <h2 className={styles.heroTitle}>What is Bitcoin Script?</h2>
        <p className={styles.heroText}>
          Bitcoin Script is a simple programming language that defines how coins can be spent. 
          Every transaction uses scripts to lock and unlock Bitcoin, like a digital lock and key system.
        </p>
      </div>

      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Lock size={24} />
          </div>
          <h3>Locking Scripts</h3>
          <p>
            Also called ScriptPubKey, these define the conditions for spending coins. 
            They're stored on the blockchain with each UTXO.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Unlock size={24} />
          </div>
          <h3>Unlocking Scripts</h3>
          <p>
            Also called ScriptSig, these provide the proof needed to satisfy the locking script. 
            You create these when spending Bitcoin.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <Layers size={24} />
          </div>
          <h3>Stack-Based Execution</h3>
          <p>
            Bitcoin Script uses a stack-based language. Operations push and pop values 
            from a stack, making it simple and secure.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <FileCode size={24} />
          </div>
          <h3>Not Turing-Complete</h3>
          <p>
            Bitcoin Script intentionally lacks loops and complex control flow. This prevents 
            infinite execution and keeps validation fast and predictable.
          </p>
        </Card>
      </div>

      <Accordion title="Analogy: Digital Lock and Key" defaultOpen>
        <p>
          Think of a Bitcoin transaction like a safe deposit box. The <strong>locking script</strong> is 
          like the lock on the box—it defines what's needed to open it (e.g., "requires key #123").
        </p>
        <p>
          When you want to spend Bitcoin, you provide an <strong>unlocking script</strong>—like inserting 
          the correct key. The Bitcoin network checks if your key matches the lock.
        </p>
        <p>
          If the scripts execute successfully and leave a TRUE value on the stack, the transaction 
          is valid. If not, it's rejected—just like a wrong key won't open a lock.
        </p>
      </Accordion>

      <div className={styles.factBox}>
        <h4>Script Facts</h4>
        <div className={styles.factGrid}>
          <div className={styles.fact}>
            <span className={styles.factValue}>10,000 bytes</span>
            <span className={styles.factLabel}>Max script size</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factValue}>~200</span>
            <span className={styles.factLabel}>OP codes available</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factValue}>Stack-based</span>
            <span className={styles.factLabel}>Execution model</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ExecutionSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>How Scripts Execute</h2>
      <p className={styles.sectionText}>
        When you spend Bitcoin, your unlocking script is combined with the locking script and executed 
        step-by-step. The script operates on a stack, pushing and popping values as it runs. If the 
        final result is TRUE (non-zero), your transaction is valid.
      </p>

      <ScriptExecutionDemo />

      <div className={styles.keyPoints}>
        <h3>Key Concepts</h3>
        <ul>
          <li>
            <strong>Stack Operations:</strong> Scripts push values onto a stack and operations consume 
            values from the stack. Think of it like a stack of plates—you add to the top and remove from the top.
          </li>
          <li>
            <strong>Script Validation:</strong> The unlocking script runs first, then the locking script. 
            They must execute successfully together.
          </li>
          <li>
            <strong>Success Condition:</strong> After execution, the stack must contain a TRUE value 
            (any non-zero number) for the transaction to be valid.
          </li>
          <li>
            <strong>Failure:</strong> If the script fails at any point (invalid signature, wrong hash, etc.), 
            the entire transaction is rejected.
          </li>
        </ul>
      </div>
    </motion.div>
  );
}

function TypesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Common Script Types</h2>
      <p className={styles.sectionText}>
        Over Bitcoin's history, different script types have been developed for different use cases. 
        Each type has different tradeoffs in terms of fees, privacy, and features. Understanding these 
        helps you choose the right address type for your needs.
      </p>

      <ScriptTypeExplorer />

      <div className={styles.keyPoints}>
        <h3>Script Type Evolution</h3>
        <ul>
          <li>
            <strong>P2PKH (Legacy):</strong> The original script type. Simple but larger transactions. 
            Addresses start with "1".
          </li>
          <li>
            <strong>P2SH:</strong> Allows complex scripts to be hidden behind a hash. Enables multisig 
            and other advanced features. Addresses start with "3".
          </li>
          <li>
            <strong>P2WPKH/P2WSH (SegWit):</strong> Separates witness data, reducing transaction size 
            and fees. Addresses start with "bc1" (native SegWit).
          </li>
          <li>
            <strong>P2TR (Taproot):</strong> The newest script type, offering better privacy and 
            efficiency. All Taproot transactions look the same on-chain, regardless of complexity.
          </li>
        </ul>
      </div>
    </motion.div>
  );
}

function OpcodesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Understanding OP Codes</h2>
      <p className={styles.sectionText}>
        OP codes (operation codes) are the building blocks of Bitcoin Script. Each OP code performs 
        a specific operation, like duplicating a value, hashing data, or verifying signatures. 
        Understanding common OP codes helps you understand how Bitcoin transactions work.
      </p>

      <OpCodeReference />

      <Accordion 
        title="Deep Dive: Signature Verification" 
        variant="deepdive"
        icon={<Shield size={16} />}
      >
        <p>
          The most important OP code for basic transactions is <code>OP_CHECKSIG</code>. This verifies 
          that a signature was created with the private key corresponding to a given public key.
        </p>
        <p>
          When you sign a transaction, you're creating a cryptographic signature that proves you know 
          the private key without revealing it. The signature is specific to that exact transaction—if 
          any part changes, the signature becomes invalid.
        </p>
        <p>
          <code>OP_CHECKSIG</code> takes a signature and public key from the stack, verifies the signature 
          against the transaction data, and pushes TRUE or FALSE back onto the stack.
        </p>
      </Accordion>
    </motion.div>
  );
}

function TimeLocksSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Time Locks & Conditional Spending</h2>
      <p className={styles.sectionText}>
        Bitcoin Script supports time-locked transactions, allowing you to create coins that can only be 
        spent after a certain time or block height. This enables powerful use cases like HODL wallets, 
        payment channels, and escrow services.
      </p>

      <TimeLockDemo />

      <div className={styles.keyPoints}>
        <h3>Time Lock Types</h3>
        <ul>
          <li>
            <strong>Absolute Time Locks (OP_CHECKLOCKTIMEVERIFY):</strong> Locks coins until a specific 
            timestamp or block height. Useful for HODL wallets or scheduled payments.
          </li>
          <li>
            <strong>Relative Time Locks (OP_CHECKSEQUENCEVERIFY):</strong> Locks coins for a relative 
            period after confirmation. Used in Lightning Network payment channels and other advanced protocols.
          </li>
          <li>
            <strong>Combined Locks:</strong> You can combine time locks with other conditions, like 
            requiring both a time lock AND a signature.
          </li>
        </ul>
      </div>

      <Accordion 
        title="Use Cases for Time Locks" 
        variant="deepdive"
        icon={<Clock size={16} />}
      >
        <p><strong>HODL Wallets:</strong> Lock your Bitcoin for a set period to prevent impulsive spending.</p>
        <p><strong>Payment Channels:</strong> Lightning Network uses relative time locks to ensure channel 
        security and enable dispute resolution.</p>
        <p><strong>Escrow Services:</strong> Lock funds until certain conditions are met or a timeout occurs.</p>
        <p><strong>Inheritance Planning:</strong> Create time-locked transactions that activate after your death.</p>
      </Accordion>
    </motion.div>
  );
}

export default ScriptLesson;
