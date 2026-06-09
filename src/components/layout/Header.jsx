import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Menu, X, MessageSquareMore, Sun, Moon, Search } from 'lucide-react';
import { useBlockHeight } from '../../hooks/useBlockHeight';
import { searchLessons } from '../../data/lessonSearch';
import styles from './Header.module.css';

export function Header({ sidebarOpen, onToggleSidebar, theme, onToggleTheme }) {
  const { blockHeight, isLoading, error } = useBlockHeight(10000);
  const navigate = useNavigate();
  const [isNewBlock, setIsNewBlock] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const prevBlockHeight = useRef(null);
  const statusRef = useRef(null);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const desktopSearchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const searchResults = searchLessons(query);
  const isMobileViewport = typeof window !== 'undefined' && window.innerWidth <= 640;

  // Detect when block height changes
  useEffect(() => {
    if (blockHeight && prevBlockHeight.current !== null && blockHeight > prevBlockHeight.current) {
      // New block detected! Trigger animation
      setIsNewBlock(true);
      
      // Remove animation class after it completes (3 seconds)
      const timeout = setTimeout(() => {
        setIsNewBlock(false);
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
    
    prevBlockHeight.current = blockHeight;
  }, [blockHeight]);

  // Determine status display
  const getStatusContent = () => {
    if (isLoading && !blockHeight) {
      return {
        text: 'Testnet Mode',
        dotClass: styles.statusDotYellow
      };
    }
    
    if (error && !blockHeight) {
      return {
        text: 'Testnet Mode',
        dotClass: styles.statusDotYellow
      };
    }
    
    return {
      text: `Block ${blockHeight.toLocaleString()}`,
      dotClass: styles.statusDot
    };
  };

  const { text, dotClass } = getStatusContent();

  // Handle click on status indicator (mobile only)
  const handleStatusClick = () => {
    // Only toggle modal on mobile (when status text is hidden)
    if (window.innerWidth <= 640) {
      setShowBlockModal(prev => !prev);
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    const activeInput = window.innerWidth <= 640 ? mobileSearchInputRef.current : desktopSearchInputRef.current;
    activeInput?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setShowBlockModal(false);
      }

      const clickedInsideDesktopSearch = desktopSearchRef.current?.contains(event.target);
      const clickedInsideMobileSearch = mobileSearchRef.current?.contains(event.target);

      if (!clickedInsideDesktopSearch && !clickedInsideMobileSearch) {
        setIsSearchOpen(false);
        setShowSearchResults(false);
      }
    };

    if (isSearchOpen || showBlockModal || showSearchResults) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearchOpen, showBlockModal, showSearchResults]);

  const handleSearchChange = (event) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    setShowSearchResults(nextQuery.trim().length >= 2);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => {
      const next = !prev;

      if (!next) {
        setShowSearchResults(false);
      }

      return next;
    });
  };

  const handleSearchSelect = (path) => {
    setQuery('');
    setIsSearchOpen(false);
    setShowSearchResults(false);
    navigate(path);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Escape') {
      if (!query) {
        setIsSearchOpen(false);
      }

      setShowSearchResults(false);
      return;
    }

    if (event.key === 'Enter' && searchResults.length > 0) {
      event.preventDefault();
      handleSearchSelect(searchResults[0].path);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.left}>
          <button 
            className={styles.menuButton}
            onClick={onToggleSidebar}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link to="/" className={styles.logoLink}>
            <motion.div 
              className={styles.logo}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className={styles.logoIcon}>
                <Eye size={28} />
              </div>
              <div className={styles.logoText}>
                <span className={styles.logoTitle}>The Bitcoin <span className={styles.logoOrange}>OP</span>tic</span>
                <span className={styles.logoSubtitle}>See Bitcoin Clearly</span>
              </div>
            </motion.div>
          </Link>
        </div>
        
        <div className={styles.right}>
          <div ref={desktopSearchRef} className={styles.searchWrap}>
            {isMobileViewport ? (
              <button
                type="button"
                className={`${styles.searchToggle} ${isSearchOpen ? styles.mobileSearchToggleHidden : ''}`}
                onClick={handleSearchToggle}
                aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                aria-expanded={isSearchOpen}
              >
                <Search size={16} />
              </button>
            ) : (
              <AnimatePresence initial={false} mode="wait">
                {!isSearchOpen ? (
                <motion.button
                  key="search-toggle"
                  type="button"
                  className={styles.searchToggle}
                  onClick={handleSearchToggle}
                  aria-label="Open search"
                  aria-expanded="false"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                >
                  <Search size={16} />
                </motion.button>
                ) : (
                  <motion.div
                    key="search-panel"
                    className={styles.searchPanel}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'min(216px, 26vw)' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <label className={styles.searchField}>
                      <Search size={15} className={styles.searchIcon} />
                      <input
                        ref={desktopSearchInputRef}
                        autoFocus
                        type="search"
                        value={query}
                        onChange={handleSearchChange}
                        onFocus={() => {
                          if (query.trim().length >= 2) {
                            setShowSearchResults(true);
                          }
                        }}
                        onKeyDown={handleSearchKeyDown}
                        className={styles.searchInput}
                        placeholder="Search lessons"
                        aria-label="Search lessons"
                      />
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            <AnimatePresence>
              {showSearchResults && (
                <motion.div
                  className={`${styles.searchResults} ${styles.desktopSearchResults}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                >
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <button
                        key={result.id}
                        type="button"
                        className={styles.searchResult}
                        onClick={() => handleSearchSelect(result.path)}
                      >
                        <span className={styles.searchResultTitle}>
                          {result.type === 'section' ? `${result.subtitle} - ${result.title}` : result.title}
                        </span>
                        <span className={styles.searchResultMeta}>
                          {result.type === 'section' ? `Section match in ${result.description}` : result.subtitle}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className={styles.searchEmpty}>No lessons found.</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            className={styles.themeToggle}
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            <span className={styles.themeToggleText}>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
          <Link to="/support" className={styles.supportButton}>
            <MessageSquareMore size={18} />
            <span className={styles.supportText}>Schedule a Call</span>
          </Link>
          <div 
            ref={statusRef}
            className={`${styles.status} ${isNewBlock ? styles.statusNewBlock : ''}`}
            onClick={handleStatusClick}
          >
            <span className={dotClass} />
            <span className={styles.statusText}>{text}</span>
            
            <AnimatePresence>
              {showBlockModal && (
                <motion.div
                  className={styles.blockModal}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className={styles.blockModalLabel}>Current Block</span>
                  <span className={styles.blockModalValue}>{text}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isSearchOpen && (
          <motion.div
            ref={mobileSearchRef}
            layout
            className={styles.mobileSearchRow}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -22 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            <label className={styles.mobileSearchField}>
              <Search size={15} className={styles.searchIcon} />
              <input
                ref={mobileSearchInputRef}
                type="search"
                value={query}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (query.trim().length >= 2) {
                    setShowSearchResults(true);
                  }
                }}
                onKeyDown={handleSearchKeyDown}
                className={styles.searchInput}
                placeholder="Search lessons"
                aria-label="Search lessons"
              />
            </label>

            <AnimatePresence>
              {showSearchResults && (
                <motion.div
                  className={`${styles.searchResults} ${styles.mobileSearchResults}`}
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.13, ease: 'easeOut' }}
                >
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <button
                        key={result.id}
                        type="button"
                        className={styles.searchResult}
                        onClick={() => handleSearchSelect(result.path)}
                      >
                        <span className={styles.searchResultTitle}>
                          {result.type === 'section' ? `${result.subtitle} - ${result.title}` : result.title}
                        </span>
                        <span className={styles.searchResultMeta}>
                          {result.type === 'section' ? `Section match in ${result.description}` : result.subtitle}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className={styles.searchEmpty}>No lessons found.</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
