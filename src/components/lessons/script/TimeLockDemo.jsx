import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, TrendingUp, Lock, Unlock } from 'lucide-react';
import { Card, Badge } from '../../common';
import styles from './TimeLockDemo.module.css';

const timeLockTypes = [
  {
    id: 'absolute',
    name: 'Absolute Time Lock',
    opcode: 'OP_CHECKLOCKTIMEVERIFY',
    description: 'Locks coins until a specific timestamp or block height',
    example: {
      scenario: 'HODL Wallet',
      lockTime: '2025-12-31',
      blockHeight: 900000,
      explanation: 'Coins cannot be spent until December 31, 2025 or block 900,000, whichever comes first'
    },
    useCases: ['HODL wallets', 'Scheduled payments', 'Inheritance planning']
  },
  {
    id: 'relative',
    name: 'Relative Time Lock',
    opcode: 'OP_CHECKSEQUENCEVERIFY',
    description: 'Locks coins for a relative period after confirmation',
    example: {
      scenario: 'Lightning Channel',
      relativeTime: '144 blocks (~1 day)',
      explanation: 'After the transaction is confirmed, coins are locked for 144 blocks (approximately 1 day)'
    },
    useCases: ['Lightning Network', 'Payment channels', 'Dispute resolution']
  }
];

export function TimeLockDemo() {
  const [selectedType, setSelectedType] = useState('absolute');
  const [isLocked, setIsLocked] = useState(true);

  const currentType = timeLockTypes.find(t => t.id === selectedType);

  return (
    <div className={styles.container}>
      <Card variant="elevated" padding="large">
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <div className={styles.iconWrapper}>
              <Clock size={24} />
            </div>
            <div>
              <h3 className={styles.title}>Time Lock Demo</h3>
              <p className={styles.subtitle}>
                Understand how time-locked transactions work
              </p>
            </div>
          </div>
        </div>

        {/* Type Selector */}
        <div className={styles.typeSelector}>
          {timeLockTypes.map(type => (
            <button
              key={type.id}
              className={`${styles.typeButton} ${selectedType === type.id ? styles.selected : ''}`}
              onClick={() => {
                setSelectedType(type.id);
                setIsLocked(true);
              }}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* Type Info */}
        <motion.div
          key={selectedType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.typeInfo}
        >
          <div className={styles.typeHeader}>
            <div>
              <h4 className={styles.typeName}>{currentType.name}</h4>
              <p className={styles.typeDescription}>{currentType.description}</p>
            </div>
            <Badge variant="outline" size="small">
              {currentType.opcode}
            </Badge>
          </div>

          {/* Example Scenario */}
          <div className={styles.scenario}>
            <div className={styles.scenarioHeader}>
              <Calendar size={16} />
              <span>Example: {currentType.example.scenario}</span>
            </div>
            <div className={styles.scenarioContent}>
              {currentType.id === 'absolute' ? (
                <div className={styles.scenarioDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Lock Until Date:</span>
                    <span className={styles.detailValue}>{currentType.example.lockTime}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Or Block Height:</span>
                    <span className={styles.detailValue}>{currentType.example.blockHeight.toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <div className={styles.scenarioDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Relative Lock Time:</span>
                    <span className={styles.detailValue}>{currentType.example.relativeTime}</span>
                  </div>
                </div>
              )}
              <p className={styles.scenarioExplanation}>{currentType.example.explanation}</p>
            </div>
          </div>

          {/* Lock Status */}
          <div className={styles.lockStatus}>
            <div className={styles.statusHeader}>
              <span>Current Status</span>
              <button
                className={styles.toggleButton}
                onClick={() => setIsLocked(!isLocked)}
              >
                {isLocked ? 'Unlock' : 'Lock'}
              </button>
            </div>
            <div className={`${styles.statusIndicator} ${isLocked ? styles.locked : styles.unlocked}`}>
              {isLocked ? (
                <>
                  <Lock size={20} />
                  <div>
                    <div className={styles.statusTitle}>Locked</div>
                    <div className={styles.statusText}>
                      {currentType.id === 'absolute' 
                        ? 'Cannot be spent until lock time expires'
                        : 'Cannot be spent until relative lock time passes'}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Unlock size={20} />
                  <div>
                    <div className={styles.statusTitle}>Unlocked</div>
                    <div className={styles.statusText}>
                      Transaction can now be spent
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Use Cases */}
          <div className={styles.useCases}>
            <div className={styles.useCasesHeader}>
              <TrendingUp size={16} />
              <span>Common Use Cases</span>
            </div>
            <div className={styles.useCasesList}>
              {currentType.useCases.map((useCase, i) => (
                <Badge key={i} variant="secondary" size="small">
                  {useCase}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>
      </Card>
    </div>
  );
}

export default TimeLockDemo;
