import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Lock, Unlock, Eye, TrendingDown, Zap } from 'lucide-react';
import { Card, Badge } from '../../common';
import styles from './ScriptTypeExplorer.module.css';

const scriptTypes = [
  {
    id: 'p2pkh',
    name: 'P2PKH',
    fullName: 'Pay to Public Key Hash',
    description: 'The original Bitcoin script type. Simple but produces larger transactions.',
    addressPrefix: '1',
    lockingScript: [
      { op: 'OP_DUP', type: 'opcode' },
      { op: 'OP_HASH160', type: 'opcode' },
      { op: '<PubKeyHash>', type: 'data' },
      { op: 'OP_EQUALVERIFY', type: 'opcode' },
      { op: 'OP_CHECKSIG', type: 'opcode' }
    ],
    unlockingScript: [
      { op: '<Signature>', type: 'data' },
      { op: '<PublicKey>', type: 'data' }
    ],
    witnessData: null,
    efficiency: 'Low',
    privacy: 'Medium',
    features: ['Simple', 'Legacy']
  },
  {
    id: 'p2sh',
    name: 'P2SH',
    fullName: 'Pay to Script Hash',
    description: 'Allows complex scripts to be hidden behind a hash. Enables multisig and other advanced features.',
    addressPrefix: '3',
    lockingScript: [
      { op: 'OP_HASH160', type: 'opcode' },
      { op: '<ScriptHash>', type: 'data' },
      { op: 'OP_EQUAL', type: 'opcode' }
    ],
    unlockingScript: [
      { op: '<RedeemScript>', type: 'data' },
      { op: '<Signatures>', type: 'data' }
    ],
    witnessData: null,
    efficiency: 'Medium',
    privacy: 'Medium',
    features: ['Multisig', 'Complex Scripts']
  },
  {
    id: 'p2wpkh',
    name: 'P2WPKH',
    fullName: 'Pay to Witness Public Key Hash',
    description: 'SegWit script with witness data separated. Lower fees and better efficiency.',
    addressPrefix: 'bc1',
    lockingScript: [
      { op: 'OP_0', type: 'opcode' },
      { op: '<20-byte-hash>', type: 'data' }
    ],
    unlockingScript: [
      { op: '(empty)', type: 'empty' }
    ],
    witnessData: [
      { op: '<Signature>', type: 'data' },
      { op: '<PublicKey>', type: 'data' }
    ],
    efficiency: 'High',
    privacy: 'Medium',
    features: ['SegWit', 'Lower Fees']
  },
  {
    id: 'p2wsh',
    name: 'P2WSH',
    fullName: 'Pay to Witness Script Hash',
    description: 'SegWit version of P2SH. Supports complex scripts with witness data separated.',
    addressPrefix: 'bc1',
    lockingScript: [
      { op: 'OP_0', type: 'opcode' },
      { op: '<32-byte-hash>', type: 'data' }
    ],
    unlockingScript: [
      { op: '(empty)', type: 'empty' }
    ],
    witnessData: [
      { op: '<WitnessScript>', type: 'data' },
      { op: '<Signatures>', type: 'data' }
    ],
    efficiency: 'High',
    privacy: 'Medium',
    features: ['SegWit', 'Complex Scripts']
  },
  {
    id: 'p2tr',
    name: 'P2TR',
    fullName: 'Pay to Taproot',
    description: 'The newest script type. All transactions look identical on-chain, providing better privacy.',
    addressPrefix: 'bc1p',
    lockingScript: [
      { op: 'OP_1', type: 'opcode' },
      { op: '<32-byte-hash>', type: 'data' }
    ],
    unlockingScript: [
      { op: '(empty)', type: 'empty' }
    ],
    witnessData: [
      { op: '<SchnorrSignature>', type: 'data' }
    ],
    efficiency: 'Highest',
    privacy: 'High',
    features: ['Taproot', 'Privacy', 'Efficiency']
  }
];

export function ScriptTypeExplorer() {
  const [selectedType, setSelectedType] = useState('p2pkh');
  
  const currentType = scriptTypes.find(t => t.id === selectedType);

  return (
    <div className={styles.container}>
      <Card variant="elevated" padding="large">
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <div className={styles.iconWrapper}>
              <Code size={24} />
            </div>
            <div>
              <h3 className={styles.title}>Script Type Explorer</h3>
              <p className={styles.subtitle}>
                Compare different Bitcoin script types and their characteristics
              </p>
            </div>
          </div>
        </div>

        {/* Type Selector */}
        <div className={styles.typeSelector}>
          {scriptTypes.map(type => (
            <button
              key={type.id}
              className={`${styles.typeButton} ${selectedType === type.id ? styles.selected : ''}`}
              onClick={() => setSelectedType(type.id)}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* Selected Type Info */}
        <motion.div
          key={selectedType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.typeInfo}
        >
          <div className={styles.typeHeader}>
            <div>
              <h4 className={styles.typeName}>{currentType.fullName}</h4>
              <p className={styles.typeDescription}>{currentType.description}</p>
            </div>
            <div className={styles.typeBadges}>
              <Badge variant="outline" size="small">
                Address: {currentType.addressPrefix}...
              </Badge>
            </div>
          </div>

          {/* Characteristics */}
          <div className={styles.characteristics}>
            <div className={styles.charItem}>
              <TrendingDown size={16} />
              <span>Efficiency:</span>
              <Badge 
                variant={currentType.efficiency === 'Highest' || currentType.efficiency === 'High' ? 'success' : 'warning'}
                size="small"
              >
                {currentType.efficiency}
              </Badge>
            </div>
            <div className={styles.charItem}>
              <Eye size={16} />
              <span>Privacy:</span>
              <Badge 
                variant={currentType.privacy === 'High' ? 'success' : 'secondary'}
                size="small"
              >
                {currentType.privacy}
              </Badge>
            </div>
          </div>

          {/* Features */}
          <div className={styles.features}>
            {currentType.features.map((feature, i) => (
              <Badge key={i} variant="secondary" size="small">
                {feature}
              </Badge>
            ))}
          </div>

          {/* Script Display */}
          <div className={styles.scriptDisplay}>
            <div className={styles.scriptSection}>
              <div className={styles.scriptHeader}>
                <Lock size={16} />
                <span>Locking Script</span>
              </div>
              <div className={styles.scriptCode}>
                {currentType.lockingScript.map((item, i) => (
                  <span
                    key={i}
                    className={`${styles.scriptOp} ${styles[item.type]}`}
                  >
                    {item.op}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.plusSign}>+</div>

            <div className={styles.scriptSection}>
              <div className={styles.scriptHeader}>
                <Unlock size={16} />
                <span>Unlocking Script</span>
              </div>
              <div className={styles.scriptCode}>
                {currentType.unlockingScript.map((item, i) => (
                  <span
                    key={i}
                    className={`${styles.scriptOp} ${styles[item.type]}`}
                  >
                    {item.op}
                  </span>
                ))}
              </div>
            </div>

            {currentType.witnessData && (
              <>
                <div className={styles.plusSign}>+</div>
                <div className={styles.scriptSection}>
                  <div className={styles.scriptHeader}>
                    <Zap size={16} />
                    <span>Witness Data</span>
                    <Badge variant="success" size="small">SegWit</Badge>
                  </div>
                  <div className={styles.scriptCode}>
                    {currentType.witnessData.map((item, i) => (
                      <span
                        key={i}
                        className={`${styles.scriptOp} ${styles[item.type]}`}
                      >
                        {item.op}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </Card>
    </div>
  );
}

export default ScriptTypeExplorer;
