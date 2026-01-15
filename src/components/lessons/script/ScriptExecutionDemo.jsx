import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Check, Layers } from 'lucide-react';
import { Card, Button, Badge } from '../../common';
import styles from './ScriptExecutionDemo.module.css';

const executionSteps = [
  {
    step: 0,
    description: 'Start: Unlocking script pushes signature and public key onto stack',
    stack: ['<Signature>', '<PublicKey>'],
    currentOp: null
  },
  {
    step: 1,
    description: 'OP_DUP: Duplicate the public key on top of stack',
    stack: ['<Signature>', '<PublicKey>', '<PublicKey>'],
    currentOp: 'OP_DUP'
  },
  {
    step: 2,
    description: 'OP_HASH160: Hash the duplicated public key',
    stack: ['<Signature>', '<PublicKey>', '<Hash>'],
    currentOp: 'OP_HASH160'
  },
  {
    step: 3,
    description: 'Push expected hash from locking script',
    stack: ['<Signature>', '<PublicKey>', '<Hash>', '<ExpectedHash>'],
    currentOp: 'Push <PubKeyHash>'
  },
  {
    step: 4,
    description: 'OP_EQUALVERIFY: Verify hashes match, remove both if equal',
    stack: ['<Signature>', '<PublicKey>'],
    currentOp: 'OP_EQUALVERIFY'
  },
  {
    step: 5,
    description: 'OP_CHECKSIG: Verify signature matches public key and transaction',
    stack: ['TRUE'],
    currentOp: 'OP_CHECKSIG'
  }
];

export function ScriptExecutionDemo() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const runExecution = async () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    for (let i = 1; i < executionSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentStep(i);
    }
    
    setIsPlaying(false);
  };

  const reset = () => {
    setCurrentStep(-1);
    setIsPlaying(false);
  };

  const stepForward = () => {
    if (currentStep < executionSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentExecution = currentStep >= 0 ? executionSteps[currentStep] : null;

  return (
    <div className={styles.container}>
      <Card variant="elevated" padding="large">
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <div className={styles.iconWrapper}>
              <Layers size={24} />
            </div>
            <div>
              <h3 className={styles.title}>Script Execution Demo</h3>
              <p className={styles.subtitle}>
                Watch how a P2PKH script executes step-by-step
              </p>
            </div>
          </div>
        </div>

        {/* Script Preview */}
        <div className={styles.scriptPreview}>
          <div className={styles.scriptPart}>
            <span className={styles.scriptLabel}>Unlocking:</span>
            <code className={styles.scriptCode}>&lt;Signature&gt; &lt;PublicKey&gt;</code>
          </div>
          <span className={styles.plus}>+</span>
          <div className={styles.scriptPart}>
            <span className={styles.scriptLabel}>Locking:</span>
            <code className={styles.scriptCode}>
              OP_DUP OP_HASH160 &lt;PubKeyHash&gt; OP_EQUALVERIFY OP_CHECKSIG
            </code>
          </div>
        </div>

        {/* Execution Controls */}
        <div className={styles.controls}>
          <div className={styles.controlButtons}>
            <Button
              variant="primary"
              size="small"
              icon={<Play size={14} />}
              onClick={runExecution}
              disabled={isPlaying}
            >
              Run Script
            </Button>
            <Button
              variant="ghost"
              size="small"
              icon={<RotateCcw size={14} />}
              onClick={reset}
            >
              Reset
            </Button>
            <Button
              variant="ghost"
              size="small"
              onClick={stepBackward}
              disabled={currentStep <= 0}
            >
              ← Step
            </Button>
            <Button
              variant="ghost"
              size="small"
              onClick={stepForward}
              disabled={currentStep >= executionSteps.length - 1}
            >
              Step →
            </Button>
          </div>
          {currentStep >= 0 && (
            <Badge variant="outline" size="small">
              Step {currentStep + 1} of {executionSteps.length}
            </Badge>
          )}
        </div>

        {/* Execution Visualization */}
        <div className={styles.executionArea}>
          <AnimatePresence mode="wait">
            {currentExecution ? (
              <motion.div
                key={currentStep}
                className={styles.executionState}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className={styles.stepDescription}>
                  {currentExecution.description}
                </div>
                
                {currentExecution.currentOp && (
                  <div className={styles.currentOp}>
                    <Badge variant="primary" size="small">
                      Executing: {currentExecution.currentOp}
                    </Badge>
                  </div>
                )}

                <div className={styles.stackVisualization}>
                  <div className={styles.stackLabel}>
                    <Layers size={16} />
                    <span>Stack (top to bottom)</span>
                  </div>
                  <div className={styles.stackItems}>
                    {currentExecution.stack.map((item, index) => (
                      <motion.div
                        key={index}
                        className={`${styles.stackItem} ${item === 'TRUE' ? styles.success : ''}`}
                        initial={{ scale: 0, y: -10 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {currentStep === executionSteps.length - 1 && (
                  <motion.div
                    className={styles.successMessage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Check size={20} />
                    <span>Transaction Valid! Script executed successfully.</span>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <div className={styles.placeholder}>
                <p>Click "Run Script" to see step-by-step execution</p>
                <p className={styles.placeholderHint}>
                  Or use the step buttons to navigate manually
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}

export default ScriptExecutionDemo;
