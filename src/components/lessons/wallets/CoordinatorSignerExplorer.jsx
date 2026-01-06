import { 
  Laptop,
  HardDrive,
  ArrowRight,
  Shield,
  Eye,
  PenTool,
  Send,
  Usb,
  CreditCard,
  QrCode,
  Wifi,
  Radio,
  Check,
  X,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Card, Accordion } from '../../common';
import styles from './CoordinatorSignerExplorer.module.css';

const coordinatorFeatures = {
  does: [
    'Connects to the Bitcoin network',
    'Watches the blockchain for your transactions',
    'Shows your balance and transaction history',
    'Builds unsigned transactions (PSBTs)',
    'Broadcasts signed transactions to the network'
  ],
  doesNot: [
    'Store your private keys',
    'Sign transactions',
    'Access your funds without the signer'
  ],
  examples: ['Sparrow', 'Nunchuk', 'Specter', 'Electrum']
};

const signerFeatures = {
  does: [
    'Stores your private keys securely',
    'Signs transactions when you approve them',
    'Displays transaction details for verification',
    'Works completely offline'
  ],
  doesNot: [
    'Connect to the internet',
    'Know your total balance',
    'Broadcast transactions',
    'Track your transaction history'
  ],
  examples: ['Coldcard', 'Trezor', 'Ledger', 'Jade']
};

const communicationMethods = [
  {
    name: 'QR Codes',
    icon: QrCode,
    description: 'Scan codes with camera, no physical connection needed',
    airGapped: true,
    securityLevel: 'highest',
    securityNote: 'Fully air-gapped. Data transferred visually.'
  },
  {
    name: 'SD Card',
    icon: CreditCard,
    description: 'Transfer files via memory card, completely offline',
    airGapped: true,
    securityLevel: 'highest',
    securityNote: 'Fully air-gapped. No electronic connection.'
  },
  {
    name: 'NFC',
    icon: Radio,
    description: 'Tap to transfer, quick, short-range wireless',
    airGapped: true,
    securityLevel: 'high',
    securityNote: 'Air-gapped. Very short range limits attack surface.'
  },
  {
    name: 'USB Cable',
    icon: Usb,
    description: 'Direct cable connection, convenient but less isolated',
    airGapped: false,
    securityLevel: 'lower',
    securityNote: 'Direct connection to potentially compromised computer.'
  },
  {
    name: 'Bluetooth',
    icon: Wifi,
    description: 'Wireless connection, convenient but has larger attack surface',
    airGapped: false,
    securityLevel: 'lower',
    securityNote: 'Wireless protocol with known vulnerabilities.'
  }
];

export function CoordinatorSignerExplorer() {
  return (
    <div className={styles.container}>
      {/* Key Insight Box */}
      <div className={styles.insightBox}>
        <div className={styles.insightIcon}>
          <Info size={24} />
        </div>
        <div className={styles.insightContent}>
          <h4 className={styles.insightTitle}>The Key Insight</h4>
          <p className={styles.insightText}>
            Your wallet software (like Sparrow) doesn't store your Bitcoin <em>or</em> your keys,
            it just watches the blockchain and helps you build transactions. Your hardware wallet 
            (like Coldcard) stores your keys and signs transactions, but never connects to the internet.
          </p>
        </div>
      </div>

      {/* Role Comparison Cards */}
      <Card variant="elevated" padding="large">
        <h3 className={styles.sectionTitle}>Two Different Jobs</h3>
        <p className={styles.sectionSubtitle}>
          Understanding the separation between coordinator software and signing devices is key to Bitcoin security.
        </p>

        <div className={styles.rolesGrid}>
          {/* Coordinator Card */}
          <div className={styles.roleCard}>
            <div className={styles.roleHeader}>
              <div className={`${styles.roleIcon} ${styles.coordinatorIcon}`}>
                <Laptop size={28} />
              </div>
              <div>
                <h4 className={styles.roleName}>Coordinator Software</h4>
                <p className={styles.roleTagline}>The "eyes" and "messenger"</p>
              </div>
            </div>

            <div className={styles.roleSection}>
              <h5 className={styles.roleSectionTitle}>
                <Check size={16} className={styles.checkIcon} />
                What it does:
              </h5>
              <ul className={styles.roleList}>
                {coordinatorFeatures.does.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.roleSection}>
              <h5 className={styles.roleSectionTitle}>
                <X size={16} className={styles.xIcon} />
                What it does NOT do:
              </h5>
              <ul className={styles.roleListNegative}>
                {coordinatorFeatures.doesNot.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.examplesRow}>
              <span className={styles.examplesLabel}>Examples:</span>
              <div className={styles.exampleTags}>
                {coordinatorFeatures.examples.map((example) => (
                  <span key={example} className={styles.exampleTag}>{example}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Signer Card */}
          <div className={styles.roleCard}>
            <div className={styles.roleHeader}>
              <div className={`${styles.roleIcon} ${styles.signerIcon}`}>
                <HardDrive size={28} />
              </div>
              <div>
                <h4 className={styles.roleName}>Hardware Signer</h4>
                <p className={styles.roleTagline}>The "vault" and "pen"</p>
              </div>
            </div>

            <div className={styles.roleSection}>
              <h5 className={styles.roleSectionTitle}>
                <Check size={16} className={styles.checkIcon} />
                What it does:
              </h5>
              <ul className={styles.roleList}>
                {signerFeatures.does.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.roleSection}>
              <h5 className={styles.roleSectionTitle}>
                <X size={16} className={styles.xIcon} />
                What it does NOT do:
              </h5>
              <ul className={styles.roleListNegative}>
                {signerFeatures.doesNot.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.examplesRow}>
              <span className={styles.examplesLabel}>Examples:</span>
              <div className={styles.exampleTags}>
                {signerFeatures.examples.map((example) => (
                  <span key={example} className={styles.exampleTag}>{example}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Transaction Workflow Diagram */}
      <Card variant="elevated" padding="large">
        <h3 className={styles.sectionTitle}>How They Work Together</h3>
        <p className={styles.sectionSubtitle}>
          When you send Bitcoin, the coordinator and signer work as a team. Here's the step-by-step flow:
        </p>

        <div className={styles.workflowContainer}>
          {/* Step 1: Coordinator creates TX */}
          <div className={styles.workflowStep}>
            <div className={`${styles.stepBox} ${styles.coordinatorBox}`}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepIcon}>
                <Laptop size={32} />
              </div>
              <h5 className={styles.stepTitle}>Coordinator Software</h5>
              <div className={styles.stepActions}>
                <p>You click "Send"</p>
                <p>Software creates unsigned transaction</p>
              </div>
            </div>
            <div className={styles.stepLabel}>
              <Eye size={16} />
              <span>"I want to send 0.01 BTC to this address..."</span>
            </div>
          </div>

          {/* Arrow 1 */}
          <div className={styles.workflowArrow}>
            <div className={styles.arrowLine}></div>
            <ArrowRight size={20} className={styles.arrowIcon} />
            <span className={styles.arrowLabel}>PSBT</span>
          </div>

          {/* Step 2: Signer signs */}
          <div className={styles.workflowStep}>
            <div className={`${styles.stepBox} ${styles.signerBox}`}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepIcon}>
                <HardDrive size={32} />
              </div>
              <h5 className={styles.stepTitle}>Hardware Signer</h5>
              <div className={styles.stepActions}>
                <p>Displays transaction details</p>
                <p>You verify & approve</p>
                <p>Device signs with private key</p>
              </div>
            </div>
            <div className={styles.stepLabel}>
              <PenTool size={16} />
              <span>"Here's my signature"</span>
            </div>
          </div>

          {/* Arrow 2 */}
          <div className={styles.workflowArrow}>
            <div className={styles.arrowLine}></div>
            <ArrowRight size={20} className={styles.arrowIcon} />
            <span className={styles.arrowLabel}>Signed TX</span>
          </div>

          {/* Step 3: Coordinator broadcasts */}
          <div className={styles.workflowStep}>
            <div className={`${styles.stepBox} ${styles.coordinatorBox}`}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepIcon}>
                <Laptop size={32} />
              </div>
              <h5 className={styles.stepTitle}>Coordinator Software</h5>
              <div className={styles.stepActions}>
                <p>Receives signed transaction</p>
                <p>Broadcasts to Bitcoin network</p>
              </div>
            </div>
            <div className={styles.stepLabel}>
              <Send size={16} />
              <span>"Transaction sent!"</span>
            </div>
          </div>
        </div>

        {/* PSBT Simple Note */}
        <div className={styles.psbtNote}>
          <strong>What's a PSBT?</strong> It stands for "Partially Signed Bitcoin Transaction",
          think of it as an unsigned check. The coordinator fills in all the details, 
          but leaves the signature blank for the hardware signer to complete.
        </div>
      </Card>

      {/* Communication Methods */}
      <Card variant="elevated" padding="large">
        <h3 className={styles.sectionTitle}>How They Communicate</h3>
        <p className={styles.sectionSubtitle}>
          The coordinator and signer need to exchange transaction data. There are several ways to do this, 
          each with varying levels of security.
        </p>

        {/* Air-gapped highlight */}
        <div className={styles.airGappedHighlight}>
          <Shield size={20} />
          <div>
            <strong>Air-gapped is ideal.</strong> Methods that don't require a direct connection 
            to your computer are the most secure, because malware can't reach your signing device.
          </div>
        </div>

        <div className={styles.methodsGrid}>
          {communicationMethods.map((method) => (
            <div 
              key={method.name} 
              className={`${styles.methodCard} ${method.airGapped ? styles.airGapped : styles.connected}`}
            >
              <div className={styles.methodHeader}>
                <div className={`${styles.methodIcon} ${method.airGapped ? styles.airGappedIcon : styles.connectedIcon}`}>
                  <method.icon size={24} />
                </div>
                <div className={styles.methodInfo}>
                  <h5 className={styles.methodName}>{method.name}</h5>
                  {method.airGapped ? (
                    <span className={styles.airGappedBadge}>Air-gapped</span>
                  ) : (
                    <span className={styles.connectedBadge}>Direct connection</span>
                  )}
                </div>
              </div>
              <p className={styles.methodDescription}>{method.description}</p>
              <div className={styles.securityIndicator}>
                <div className={styles.securityLabel}>Security:</div>
                <div className={`${styles.securityLevel} ${styles[method.securityLevel]}`}>
                  {method.securityLevel === 'highest' && (
                    <>
                      <span className={styles.securityDot}></span>
                      <span className={styles.securityDot}></span>
                      <span className={styles.securityDot}></span>
                      <span>Highest</span>
                    </>
                  )}
                  {method.securityLevel === 'high' && (
                    <>
                      <span className={styles.securityDot}></span>
                      <span className={styles.securityDot}></span>
                      <span className={`${styles.securityDot} ${styles.empty}`}></span>
                      <span>High</span>
                    </>
                  )}
                  {method.securityLevel === 'medium' && (
                    <>
                      <span className={styles.securityDot}></span>
                      <span className={`${styles.securityDot} ${styles.empty}`}></span>
                      <span className={`${styles.securityDot} ${styles.empty}`}></span>
                      <span>Medium</span>
                    </>
                  )}
                  {method.securityLevel === 'lower' && (
                    <>
                      <span className={`${styles.securityDot} ${styles.warning}`}></span>
                      <span className={`${styles.securityDot} ${styles.empty}`}></span>
                      <span className={`${styles.securityDot} ${styles.empty}`}></span>
                      <span>Lower</span>
                    </>
                  )}
                </div>
              </div>
              <p className={styles.securityNote}>{method.securityNote}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Why This Matters */}
      <div className={styles.whyMattersBox}>
        <div className={styles.whyMattersIcon}>
          <Shield size={24} />
        </div>
        <div className={styles.whyMattersContent}>
          <h4 className={styles.whyMattersTitle}>Why This Separation Matters</h4>
          <p className={styles.whyMattersText}>
            By keeping your keys on a dedicated device that never touches the internet, you're protected 
            from malware, hacks, and phishing attacks. Even if your computer is completely compromised, 
            attackers can't steal your Bitcoin because they don't have access to your signing device.
          </p>
          <p className={styles.whyMattersText}>
            <strong>This is the power of hardware wallets:</strong> they separate what's convenient 
            (viewing your balance, building transactions) from what must be secure (your private keys).
          </p>
        </div>
      </div>

      {/* Deep Dive Accordion */}
      <Accordion
        title="Common Misconceptions"
        variant="deepdive"
        icon={<AlertTriangle size={16} />}
      >
        <p><strong>"My Sparrow wallet has my Bitcoin"</strong></p>
        <p>
          Incorrect. Sparrow is a coordinator, meaning it shows your balance by watching the blockchain, 
          but your Bitcoin is secured by your hardware wallet's private keys. If you lose your 
          Sparrow data, you can restore everything with your hardware wallet.
        </p>

        <p><strong>"I need to keep my hardware wallet connected"</strong></p>
        <p>
          Nope! Your hardware wallet only needs to be connected when you're signing a transaction. 
          The rest of the time, your coordinator software can display your balance and receive payments 
          without the hardware wallet being present.
        </p>

        <p><strong>"USB is just as secure as QR codes"</strong></p>
        <p>
          Not exactly. While USB hardware wallets are still very secure, a USB connection creates 
          a direct electronic path between your computer and signing device. Air-gapped methods 
          (QR, SD card, NFC) eliminate this path entirely, providing an extra layer of protection 
          against sophisticated attackers.
        </p>
      </Accordion>
    </div>
  );
}

export default CoordinatorSignerExplorer;
