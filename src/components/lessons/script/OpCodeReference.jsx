import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Code, Layers, Calculator, Shield, ArrowRight } from 'lucide-react';
import { Card, Badge } from '../../common';
import styles from './OpCodeReference.module.css';

const opCodeCategories = {
  stack: {
    name: 'Stack Operations',
    icon: Layers,
    color: 'var(--bitcoin-orange)',
    codes: [
      {
        name: 'OP_DUP',
        description: 'Duplicates the top stack item',
        example: {
          before: ['A'],
          after: ['A', 'A'],
          explanation: 'The top item is duplicated and pushed onto the stack'
        }
      },
      {
        name: 'OP_DROP',
        description: 'Removes the top stack item',
        example: {
          before: ['A', 'B'],
          after: ['A'],
          explanation: 'The top item (B) is removed from the stack'
        }
      },
      {
        name: 'OP_SWAP',
        description: 'Swaps the top two stack items',
        example: {
          before: ['A', 'B'],
          after: ['B', 'A'],
          explanation: 'The top two items exchange positions'
        }
      },
      {
        name: 'OP_2DUP',
        description: 'Duplicates the top two stack items',
        example: {
          before: ['A', 'B'],
          after: ['A', 'B', 'A', 'B'],
          explanation: 'Both top items are duplicated'
        }
      }
    ]
  },
  crypto: {
    name: 'Cryptographic Operations',
    icon: Shield,
    color: 'var(--success)',
    codes: [
      {
        name: 'OP_HASH160',
        description: 'SHA-256 hash, then RIPEMD-160 hash',
        example: {
          before: ['<PublicKey>'],
          after: ['<Hash>'],
          explanation: 'The public key is hashed twice to create a shorter hash'
        }
      },
      {
        name: 'OP_CHECKSIG',
        description: 'Verifies a signature against a public key',
        example: {
          before: ['<Signature>', '<PublicKey>'],
          after: ['TRUE'],
          explanation: 'Verifies the signature is valid for the transaction and public key'
        }
      },
      {
        name: 'OP_CHECKMULTISIG',
        description: 'Verifies multiple signatures (for multisig)',
        example: {
          before: ['<Sig1>', '<Sig2>', '<PubKey1>', '<PubKey2>', '<PubKey3>', '2', '3'],
          after: ['TRUE'],
          explanation: 'Checks if 2 out of 3 signatures are valid'
        }
      }
    ]
  },
  arithmetic: {
    name: 'Arithmetic Operations',
    icon: Calculator,
    color: 'var(--info)',
    codes: [
      {
        name: 'OP_ADD',
        description: 'Adds the top two stack items',
        example: {
          before: ['3', '5'],
          after: ['8'],
          explanation: '3 + 5 = 8'
        }
      },
      {
        name: 'OP_EQUAL',
        description: 'Checks if top two items are equal',
        example: {
          before: ['A', 'A'],
          after: ['TRUE'],
          explanation: 'Returns TRUE if both items are equal'
        }
      },
      {
        name: 'OP_EQUALVERIFY',
        description: 'Checks equality and removes both items if equal',
        example: {
          before: ['<Hash1>', '<Hash2>'],
          after: [],
          explanation: 'If hashes match, both are removed. Otherwise script fails.'
        }
      }
    ]
  }
};

export function OpCodeReference() {
  const [selectedCategory, setSelectedCategory] = useState('stack');
  const [selectedCode, setSelectedCode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = Object.entries(opCodeCategories);
  const currentCategory = opCodeCategories[selectedCategory];
  const CategoryIcon = currentCategory.icon;

  const filteredCodes = currentCategory.codes.filter(code =>
    code.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <Card variant="elevated" padding="large">
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <div className={styles.iconWrapper}>
              <Code size={24} />
            </div>
            <div>
              <h3 className={styles.title}>OP Code Reference</h3>
              <p className={styles.subtitle}>
                Explore common Bitcoin Script operation codes
              </p>
            </div>
          </div>
        </div>

        {/* Category Selector */}
        <div className={styles.categorySelector}>
          {categories.map(([key, category]) => {
            const Icon = category.icon;
            return (
              <button
                key={key}
                className={`${styles.categoryButton} ${selectedCategory === key ? styles.selected : ''}`}
                onClick={() => {
                  setSelectedCategory(key);
                  setSelectedCode(null);
                  setSearchTerm('');
                }}
                style={selectedCategory === key ? { borderColor: category.color } : {}}
              >
                <Icon size={16} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className={styles.searchContainer}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search OP codes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* OP Codes List */}
        <div className={styles.codesList}>
          {filteredCodes.map((code, index) => (
            <motion.div
              key={code.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                className={`${styles.codeButton} ${selectedCode === code.name ? styles.active : ''}`}
                onClick={() => setSelectedCode(selectedCode === code.name ? null : code.name)}
              >
                <div className={styles.codeHeader}>
                  <code className={styles.codeName}>{code.name}</code>
                  <Badge variant="outline" size="small">
                    {currentCategory.name}
                  </Badge>
                </div>
                <p className={styles.codeDescription}>{code.description}</p>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Example Visualization */}
        {selectedCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={styles.exampleSection}
          >
            {(() => {
              const code = currentCategory.codes.find(c => c.name === selectedCode);
              if (!code || !code.example) return null;

              return (
                <div className={styles.example}>
                  <h4 className={styles.exampleTitle}>Example: {code.name}</h4>
                  <p className={styles.exampleExplanation}>{code.example.explanation}</p>
                  
                  <div className={styles.stackExample}>
                    <div className={styles.stackBefore}>
                      <div className={styles.stackLabel}>Before</div>
                      <div className={styles.stackItems}>
                        {code.example.before.map((item, i) => (
                          <div key={i} className={styles.stackItem}>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <ArrowRight size={20} className={styles.arrow} />
                    
                    <div className={styles.stackAfter}>
                      <div className={styles.stackLabel}>After</div>
                      <div className={styles.stackItems}>
                        {code.example.after.map((item, i) => (
                          <div key={i} className={`${styles.stackItem} ${item === 'TRUE' ? styles.success : ''}`}>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </Card>
    </div>
  );
}

export default OpCodeReference;
