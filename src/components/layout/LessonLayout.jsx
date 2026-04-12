import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common';
import styles from './LessonLayout.module.css';

export function LessonLayout({ 
  children, 
  lessonId,
  title,
  description,
  icon: Icon,
  sections = [],
  currentSection = 0,
  onSectionChange,
  nextLesson,
  prevLesson
}) {
  const navigate = useNavigate();
  const tabsRef = useRef(null);
  const [tabsOverflow, setTabsOverflow] = useState({ left: false, right: false });

  // Scroll to top when section changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSection]);

  useEffect(() => {
    const updateTabsOverflow = () => {
      const tabs = tabsRef.current;

      if (!tabs) {
        setTabsOverflow({ left: false, right: false });
        return;
      }

      const { scrollLeft, clientWidth, scrollWidth } = tabs;
      const maxScrollLeft = scrollWidth - clientWidth;

      setTabsOverflow({
        left: scrollLeft > 4,
        right: maxScrollLeft - scrollLeft > 4
      });
    };

    updateTabsOverflow();

    const tabs = tabsRef.current;
    if (!tabs) {
      return undefined;
    }

    tabs.addEventListener('scroll', updateTabsOverflow, { passive: true });
    window.addEventListener('resize', updateTabsOverflow);

    return () => {
      tabs.removeEventListener('scroll', updateTabsOverflow);
      window.removeEventListener('resize', updateTabsOverflow);
    };
  }, [sections.length, currentSection]);

  const handlePrevious = () => {
    if (currentSection > 0) {
      onSectionChange(currentSection - 1);
    } else if (prevLesson) {
      navigate(prevLesson.path);
    }
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      onSectionChange(currentSection + 1);
    } else if (nextLesson) {
      navigate(nextLesson.path);
    } else {
      // Last section of last lesson - go to Resources
      navigate('/resources');
    }
  };

  return (
    <div className={styles.layout}>
      {/* Lesson Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            {Icon && (
              <div className={styles.headerIcon}>
                <Icon size={24} />
              </div>
            )}
            <div>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.description}>{description}</p>
            </div>
          </div>
        </div>
        
        {/* Section tabs */}
        {sections.length > 1 && (
          <div className={styles.tabsShell}>
            <div ref={tabsRef} className={styles.tabs}>
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  className={`${styles.tab} ${index === currentSection ? styles.active : ''}`}
                  onClick={() => onSectionChange(index)}
                >
                  <span className={styles.tabNumber}>{index + 1}</span>
                  <span className={styles.tabTitle}>{section.title}</span>
                </button>
              ))}
            </div>

            {tabsOverflow.left && (
              <div className={`${styles.tabsOverflowIndicator} ${styles.left}`} aria-hidden="true">
                <div className={styles.tabsFade} />
                <ArrowLeft size={14} className={styles.tabsOverflowIcon} />
              </div>
            )}

            {tabsOverflow.right && (
              <div className={`${styles.tabsOverflowIndicator} ${styles.right}`} aria-hidden="true">
                <div className={styles.tabsFade} />
                <ArrowRight size={14} className={styles.tabsOverflowIcon} />
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <motion.main
        className={styles.main}
        key={currentSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>

      {/* Navigation Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerCenter}>
          <span className={styles.sectionIndicator}>
            Section {currentSection + 1} of {sections.length}
          </span>
        </div>
        
        <div className={styles.footerButtons}>
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentSection === 0 && !prevLesson}
            icon={<ArrowLeft size={18} />}
          >
            {currentSection === 0 && prevLesson ? `Prev: ${prevLesson.title}` : 'Previous'}
          </Button>
          
          <Button
            variant="primary"
            onClick={handleNext}
            icon={<ArrowRight size={18} />}
            iconPosition="right"
          >
            {currentSection === sections.length - 1 ? (
              nextLesson ? `Next: ${nextLesson.title}` : 'Go to Resources'
            ) : (
              'Continue'
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
}

export default LessonLayout;
