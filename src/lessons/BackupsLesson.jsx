import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Archive,
  CheckCircle,
  FileKey,
  HeartHandshake,
  MapPin,
  MoveRight,
  ShieldCheck,
} from "lucide-react";
import { LessonLayout } from "../components/layout";
import { Accordion, Card, ResourceLinkCard } from "../components/common";
import {
  BackupLocationPlanner,
  InheritanceMultisigVisualizer,
  PassphraseWalletVisualizer,
  RecoveryScenarioExplorer,
} from "../components/lessons/backups";
import { useLessonSection } from "../hooks/useLessonSection";
import styles from "./Lessons.module.css";
import backupStyles from "./BackupsLesson.module.css";

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "seed-backups", title: "Seed Backups" },
  { id: "passphrases", title: "Passphrases" },
  { id: "multisig", title: "Multisig" },
  { id: "inheritance", title: "Inheritance" },
];

export function BackupsLesson() {
  const [currentSection, setCurrentSection] = useLessonSection(sections);

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return <IntroSection />;
      case 1:
        return <SeedBackupsSection />;
      case 2:
        return <PassphrasesSection />;
      case 3:
        return <MultisigSection />;
      case 4:
        return <InheritanceSection />;
      default:
        return <IntroSection />;
    }
  };

  return (
    <LessonLayout
      lessonId="backups"
      title="Backups, Recovery & Inheritance"
      description="Build a practical plan for protecting and recovering your Bitcoin keys"
      icon={Archive}
      sections={sections}
      currentSection={currentSection}
      onSectionChange={setCurrentSection}
      prevLesson={{ path: "/lessons/wallets", title: "Wallets & Addresses" }}
      nextLesson={{ path: "/lessons/transactions", title: "Transactions" }}
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
          <Archive size={48} />
        </div>
        <h2 className={styles.heroTitle}>
          Your device is replaceable. Your backup is not.
        </h2>
        <p className={styles.heroText}>
          A Bitcoin backup is the recovery path for the keys that control your
          funds. A good plan protects against loss, theft, accidents, memory
          gaps, and family confusion.
        </p>
      </div>

      <div className={styles.conceptGrid}>
        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <FileKey size={24} />
          </div>
          <h3>Seed phrase</h3>
          <p>
            The 12 or 24 words recreate your wallet. Anyone with those words can
            usually spend the funds.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <MapPin size={24} />
          </div>
          <h3>Location strategy</h3>
          <p>
            Copies in different secure locations protect you from fire, flood,
            theft, and accidental disposal.
          </p>
        </Card>

        <Card padding="large" hover>
          <div className={styles.conceptIcon}>
            <HeartHandshake size={24} />
          </div>
          <h3>Human recovery</h3>
          <p>
            Your plan should still work when you are stressed, unavailable, or
            helping an heir recover access.
          </p>
        </Card>
      </div>

      <RecoveryScenarioExplorer />
    </motion.div>
  );
}

function SeedBackupsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Seed Backups</h2>
      <p className={styles.sectionText}>
        Your seed phrase is the root secret for a single-signature wallet. Treat
        it like bearer cash: if someone gets it, they can take your Bitcoin; if
        every copy is destroyed, you may lose access forever. For meaningful
        long-term storage, paper is a temporary starting point; a properly made
        metal backup is the durable version you should plan around.
      </p>

      <BackupLocationPlanner />

      <div className={backupStyles.attentionListGrid}>
        <div className={backupStyles.attentionListCard}>
          <div className={backupStyles.attentionListHeader}>
            <div className={backupStyles.attentionListIcon}>
              <CheckCircle size={20} />
            </div>
            <h3>Good backup habits</h3>
          </div>
          <ul className={backupStyles.attentionList}>
            <li>
              <span className={backupStyles.attentionMarker}>01</span>
              <div>
                <strong>Start offline</strong>
                <span>
                  Write the seed by hand. Never take screenshots, cloud notes,
                  or password managers.
                </span>
              </div>
            </li>
            <li>
              <span className={backupStyles.attentionMarker}>02</span>
              <div>
                <strong>Use metal</strong>
                <span>
                  Paper is temporary. Stamp or engrave the final backup into
                  stainless steel or titanium.
                </span>
              </div>
            </li>
            <li>
              <span className={backupStyles.attentionMarker}>03</span>
              <div>
                <strong>Separate components</strong>
                <span>
                  Avoid keeping the device, seed, and instructions in one place.
                </span>
              </div>
            </li>
            <li>
              <span className={backupStyles.attentionMarker}>04</span>
              <div>
                <strong>Safety Deposit Boxes</strong>
                <span>
                  Never store plaintext seed words there. Use a hardware wallet
                  or Coldcard encrypted SD backup.
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div className={backupStyles.attentionListCard}>
          <div className={backupStyles.attentionListHeader}>
            <div className={backupStyles.attentionListIcon}>
              <ShieldCheck size={20} />
            </div>
            <h3>What to protect against</h3>
          </div>
          <ul className={backupStyles.attentionList}>
            <li>
              <span className={backupStyles.attentionMarker}>01</span>
              <div>
                <strong>Loss</strong>
                <span>
                  Moving, clutter, accidental disposal, or forgotten locations.
                </span>
              </div>
            </li>
            <li>
              <span className={backupStyles.attentionMarker}>02</span>
              <div>
                <strong>Theft</strong>
                <span>
                  Phishing attacks, digital hacks, home intruders, unencrypted
                  storage.
                </span>
              </div>
            </li>
            <li>
              <span className={backupStyles.attentionMarker}>03</span>
              <div>
                <strong>Fire and water</strong>
                <span>Paper fails easily; metal survives far better.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <Accordion
        title="Why metal backups matter"
        variant="deepdive"
        defaultOpen
      >
        <p>
          A paper seed is useful while setting up, but it should not be the
          final long-term backup for meaningful funds. Metal backups are
          designed to survive heat, water, crushing, and time better than paper.
          The goal is not just secrecy; it is recoverability years later.
        </p>
      </Accordion>

      <ResourceLinkCard section="metalBackups" title="Metal Backups" />

      <Accordion title="Should you split your seed words?" variant="deepdive">
        <p>
          Manually splitting seed words across locations often creates more ways
          to lose access. If you need distributed recovery, learn multisig or
          use a standard backup scheme rather than inventing your own.
        </p>
      </Accordion>
    </motion.div>
  );
}

function PassphrasesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Passphrases</h2>
      <p className={styles.sectionText}>
        A BIP39 passphrase acts like an extra secret on top of your seed. It can
        protect you if the seed is found, but it also creates a new lockout
        risk: the seed alone will not recover passphrase-protected funds.
      </p>

      <PassphraseWalletVisualizer />

      <div className={backupStyles.criticalWarning}>
        <div className={backupStyles.warningHeader}>
          <div className={backupStyles.warningIcon}>
            <AlertTriangle size={20} />
          </div>
          <h3>Passphrases are exact text</h3>
          <span className={backupStyles.severityBadge}>Critical</span>
        </div>
        <p>
          A passphrase can be almost anything: a word, sentence, symbol string,
          or long phrase. What matters is that it must be entered{" "}
          <strong>exactly</strong> the same way every time. Capital letters,
          lowercase letters, spaces, punctuation, spelling, and even an extra
          trailing space can all produce a different wallet.
        </p>
        <p>
          For example, <strong>horse33</strong> and <strong>Horse33</strong> are
          two different passphrases. If you use one, write it down carefully,
          preserve capitalization and spacing, and test recovery before relying
          on it.
        </p>
      </div>

      <Accordion title="Passphrase rule of thumb" defaultOpen>
        <p>
          Use a passphrase only when you have a written backup and a tested
          recovery process. Memorizing it alone is fragile because stress,
          injury, age, or death can make memory-based recovery fail.
        </p>
      </Accordion>
    </motion.div>
  );
}

function InheritanceSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Inheritance Planning</h2>
      <p className={styles.sectionText}>
        Inheritance planning is about making sure the right people can discover,
        understand, and recover your Bitcoin without giving them unilateral
        access today. The plan needs to be obvious enough for heirs to find, but
        not so concentrated that one envelope, person, or institution can spend
        alone.
      </p>

      <div className={backupStyles.inheritanceListGrid}>
        <div className={backupStyles.inheritanceListCard}>
          <div className={backupStyles.inheritanceListHeader}>
            <div className={backupStyles.inheritanceListIcon}>
              <HeartHandshake size={20} />
            </div>
            <h3>Heirs need context</h3>
          </div>
          <ul className={backupStyles.inheritanceList}>
            <li>
              <div>
                <strong>What exists</strong>
                <span>State that Bitcoin exists and name the wallet type.</span>
              </div>
            </li>
            <li>
              <div>
                <strong>Where to start</strong>
                <span>Point to documents, devices, or trusted helpers.</span>
              </div>
            </li>
            <li>
              <div>
                <strong>Who can help</strong>
                <span>
                  Identify a technically competent person or service before
                  heirs need them.
                </span>
              </div>
            </li>
            <li>
              <div>
                <strong>What not to do</strong>
                <span>
                  Warn against entering seed words into random websites.
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div className={backupStyles.inheritanceListCard}>
          <div className={backupStyles.inheritanceListHeader}>
            <div className={backupStyles.inheritanceListIcon}>
              <MapPin size={20} />
            </div>
            <h3>Avoid premature access</h3>
          </div>
          <ul className={backupStyles.inheritanceList}>
            <li>
              <div>
                <strong>Separate secrets</strong>
                <span>
                  Do not put every recovery component in one envelope or one
                  institution.
                </span>
              </div>
            </li>
            <li>
              <div>
                <strong>Use trusted roles</strong>
                <span>
                  Consider executor, attorney, spouse, or collaborative custody
                  support.
                </span>
              </div>
            </li>
            <li>
              <div>
                <strong>Use multisig when appropriate</strong>
                <span>
                  Larger balances often deserve multiple keys and a recovery
                  quorum.
                </span>
              </div>
            </li>
            <li>
              <div>
                <strong>Keep it current</strong>
                <span>
                  Update instructions when wallets, locations, or relationships
                  change.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function MultisigSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.section}
    >
      <h2 className={styles.sectionTitle}>Multisig Inheritance</h2>
      <p className={styles.sectionText}>
        Multisig is also useful for inheritance planning with your Bitcoin. In a
        2-of-3 setup you can spread control across multiple keys, locations, and
        beneficiaries.
      </p>

      <div className={backupStyles.multisigFeature}>
        <div className={backupStyles.multisigHeader}>
          <div className={backupStyles.multisigIcon}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3>Inheritance-ready multisig</h3>
            <p>
              Use multiple keys plus clear instructions when one seed phrase is
              too much single-point risk.
            </p>
          </div>
          <span className={backupStyles.multisigBadge}>2-of-3</span>
        </div>
        <div className={backupStyles.multisigPoints}>
          <div>
            <strong>No single holder can spend</strong>
            <span>One person or location is not enough.</span>
          </div>
          <div>
            <strong>One key can be lost</strong>
            <span>Two remaining keys can still recover funds.</span>
          </div>
          <div>
            <strong>Instructions still matter</strong>
            <span>
              Heirs need the coordinator, quorum, output descriptor, and
              helpers.
            </span>
          </div>
        </div>
        <Link
          to="/lessons/multisig"
          className={backupStyles.multisigLessonLink}
        >
          <span>
            Learn the full multisig model
            <small>Setup details, tradeoffs, and key management</small>
          </span>
          <MoveRight size={18} />
        </Link>
      </div>

      <InheritanceMultisigVisualizer />

      <div className={backupStyles.inheritanceListCard}>
        <div className={backupStyles.inheritanceListHeader}>
          <div className={backupStyles.inheritanceListIcon}>
            <CheckCircle size={20} />
          </div>
          <h3>What heirs need to recover multisig</h3>
        </div>
        <ul className={backupStyles.inheritanceList}>
          <li>
            <div>
              <strong>Quorum and key locations</strong>
              <span>
                Record the threshold, such as 2-of-3, and where each signing
                key or backup is stored.
              </span>
            </div>
          </li>
          <li>
            <div>
              <strong>Required unlock details</strong>
              <span>
                Include hardware wallets, seed backups, PINs, passphrases, or
                encrypted backup instructions needed to sign.
              </span>
            </div>
          </li>
          <li>
            <div>
              <strong>Wallet descriptor</strong>
              <span>
                Save the output descriptor or config export with xpubs,
                fingerprints, script type, and key origin data.
              </span>
            </div>
          </li>
          <li>
            <div>
              <strong>Derivation paths</strong>
              <span>
                Note the path, account, and address type for every cosigner.
              </span>
            </div>
          </li>
          <li>
            <div>
              <strong>Coordinator software</strong>
              <span>
                Name the wallet app, device models, and trusted helper or
                service heirs should contact.
              </span>
            </div>
          </li>
          <li>
            <div>
              <strong>Tested instructions</strong>
              <span>
                Keep a short recovery runbook and warn heirs not to enter seed
                words into random websites.
              </span>
            </div>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}

export default BackupsLesson;
