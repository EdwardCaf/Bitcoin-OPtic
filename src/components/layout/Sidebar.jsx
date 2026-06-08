import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet,
  Archive,
  ArrowLeftRight,
  Coins,
  EyeOff,
  Key,
  Pickaxe, 
  Blocks, 
  Network,
  Zap,
  Droplets,
  CircleDollarSign,
  Bitcoin,
  ChevronRight,
  ChevronDown,
  Library,
  MessageSquareMore,
} from 'lucide-react';
import styles from './Sidebar.module.css';

const sections = [
  {
    id: 'fundamentals',
    title: 'Self-Custody',
    lessons: [
      { id: 'what-is-bitcoin', title: 'What is Bitcoin?', icon: Bitcoin, path: '/lessons/what-is-bitcoin' },
      { id: 'wallets', title: 'Wallets', icon: Wallet, path: '/lessons/wallets' },
      { id: 'backups', title: 'Backups', icon: Archive, path: '/lessons/backups' },
      { id: 'transactions', title: 'Transactions', icon: ArrowLeftRight, path: '/lessons/transactions' },
    ]
  },
  {
    id: 'advanced-custody',
    title: 'Advanced Custody',
    lessons: [
      { id: 'utxo-management', title: 'UTXO Management', icon: Coins, path: '/lessons/utxo-management' },
      { id: 'privacy', title: 'Privacy', icon: EyeOff, path: '/lessons/privacy' },
      { id: 'multisig', title: 'Multi-Signature', icon: Key, path: '/lessons/multisig' },
    ]
  },
  {
    id: 'protocol',
    title: 'Protocol',
    lessons: [
      { id: 'mining', title: 'Mining', icon: Pickaxe, path: '/lessons/mining' },
      { id: 'blocks', title: 'Blocks', icon: Blocks, path: '/lessons/blocks' },
      { id: 'network', title: 'Network', icon: Network, path: '/lessons/network' },
    ]
  },
  {
    id: 'layer2',
    title: 'Scaling',
    lessons: [
      { id: 'lightning', title: 'Lightning', icon: Zap, path: '/lessons/lightning' },
      { id: 'liquid', title: 'Liquid', icon: Droplets, path: '/lessons/liquid' },
      { id: 'ecash', title: 'eCash', icon: CircleDollarSign, path: '/lessons/ecash' },
    ]
  },
];

export function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const activeSectionId = sections.find((section) =>
    section.lessons.some((lesson) => lesson.path === location.pathname)
  )?.id;
  const [expandedSections, setExpandedSections] = useState(() =>
    activeSectionId ? { [activeSectionId]: true } : { fundamentals: true }
  );

  useEffect(() => {
    if (!activeSectionId) return;

    setExpandedSections((prev) => ({
      ...prev,
      [activeSectionId]: true,
    }));
  }, [activeSectionId]);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
        initial={false}
      >
        <div className={styles.content}>
          <div className={styles.lessonList}>
            {sections.map((section) => {
              const isExpanded = !!expandedSections[section.id];
              const isActiveGroup = section.id === activeSectionId;

              return (
                <div key={section.id} className={styles.section}>
                  <button
                    type="button"
                    className={`${styles.groupHeader} ${isActiveGroup ? styles.activeGroupHeader : ''}`}
                    onClick={() => toggleSection(section.id)}
                    aria-expanded={isExpanded}
                  >
                    <span className={styles.groupTitle}>{section.title}</span>
                    <ChevronDown
                      size={14}
                      className={`${styles.groupChevron} ${isExpanded ? styles.groupChevronOpen : ''}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.nav
                        className={styles.nav}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      >
                        {section.lessons.map((lesson) => {
                          const Icon = lesson.icon;

                          return (
                            <NavLink
                              key={lesson.id}
                              to={lesson.path}
                              className={({ isActive }) => `
                                ${styles.navItem}
                                ${isActive ? styles.active : ''}
                              `}
                              onClick={() => {
                                if (window.innerWidth < 1024) {
                                  onClose();
                                }
                              }}
                            >
                              <div className={styles.navIcon}>
                                <Icon size={18} />
                              </div>
                              <span className={styles.navTitle}>{lesson.title}</span>
                              <ChevronRight size={14} className={styles.navArrow} />
                            </NavLink>
                          );
                        })}
                      </motion.nav>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className={styles.quickLinks}>
            <NavLink
              to="/resources"
              className={({ isActive }) => `
                ${styles.resourcesLink}
                ${isActive ? styles.active : ''}
              `}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  onClose();
                }
              }}
            >
              <div className={styles.navIcon}>
                <Library size={18} />
              </div>
              <span className={styles.navTitle}>Resources</span>
              <ChevronRight size={14} className={styles.navArrow} />
            </NavLink>

            <NavLink
              to="/support"
              className={({ isActive }) => `
                ${styles.supportLink}
                ${isActive ? styles.active : ''}
              `}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  onClose();
                }
              }}
            >
              <div className={styles.navIcon}>
                <MessageSquareMore size={18} />
              </div>
              <span className={styles.navTitle}>Schedule a Call</span>
              <ChevronRight size={14} className={styles.navArrow} />
            </NavLink>

            <div className={styles.footer}>
              <p className={styles.footerText}>
                All visuals are for educational purposes.
                Nothing stated is finanical advice.
              </p>
              <p className={styles.footerText}>
                Created by Edward Cafarella
              </p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export default Sidebar;
