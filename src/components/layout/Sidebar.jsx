import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight,
  ChevronDown,
  Library,
  MessageSquareMore,
} from 'lucide-react';
import { lessonSections } from '../../data/lessonSearch';
import styles from './Sidebar.module.css';

export function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const activeSectionId = lessonSections.find((section) =>
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
            {lessonSections.map((section) => {
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
              <span className={styles.navTitle}>Book a Free Call</span>
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
