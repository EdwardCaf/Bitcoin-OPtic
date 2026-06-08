import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header, Sidebar } from './components/layout';
import { HomePage } from './lessons/HomePage';
import { useLocalStorage } from './hooks/useLocalStorage';
import './styles/globals.css';
import styles from './App.module.css';

// Lazy load lesson components for code splitting
const WhatIsBitcoinLesson = lazy(() => import('./lessons/WhatIsBitcoinLesson'));
const WalletsLesson = lazy(() => import('./lessons/WalletsLesson'));
const BackupsLesson = lazy(() => import('./lessons/BackupsLesson'));
const TransactionsLesson = lazy(() => import('./lessons/TransactionsLesson'));
const UTXOManagementLesson = lazy(() => import('./lessons/UTXOManagementLesson'));
const PrivacyLesson = lazy(() => import('./lessons/PrivacyLesson'));
const MultisigLesson = lazy(() => import('./lessons/MultisigLesson'));
const MiningLesson = lazy(() => import('./lessons/MiningLesson'));
const BlocksLesson = lazy(() => import('./lessons/BlocksLesson'));
const NetworkLesson = lazy(() => import('./lessons/NetworkLesson'));
const LightningLesson = lazy(() => import('./lessons/LightningLesson'));
const LiquidLesson = lazy(() => import('./lessons/LiquidLesson'));
const EcashLesson = lazy(() => import('./lessons/EcashLesson'));
const ResourcesPage = lazy(() => import('./lessons/ResourcesPage'));
const SupportPage = lazy(() => import('./lessons/SupportPage'));
const NewsletterPage = lazy(() => import('./lessons/NewsletterPage'));

// Minimal loading spinner for Suspense fallback
function LoadingSpinner() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner} />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppLayout({ children, theme, onToggleTheme }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const hideSidebar = pathname === '/newsletter';

  return (
    <div className={styles.app}>
      <ScrollToTop />
      <Header 
        sidebarOpen={sidebarOpen} 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
      {!hideSidebar && (
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
      )}
      <main className={`${styles.main} ${hideSidebar ? styles.mainCentered : ''}`}>
        {children}
      </main>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  useEffect(() => {
    const normalizedTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = normalizedTheme;
    document.documentElement.style.colorScheme = normalizedTheme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <BrowserRouter>
      <AppLayout theme={theme} onToggleTheme={toggleTheme}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
            <Route path="/lessons/what-is-bitcoin" element={<WhatIsBitcoinLesson />} />
            <Route path="/lessons/wallets" element={<WalletsLesson />} />
            <Route path="/lessons/backups" element={<BackupsLesson />} />
            <Route path="/lessons/transactions" element={<TransactionsLesson />} />
            <Route path="/lessons/utxo-management" element={<UTXOManagementLesson />} />
            <Route path="/lessons/privacy" element={<PrivacyLesson />} />
            <Route path="/lessons/multisig" element={<MultisigLesson />} />
            <Route path="/lessons/mining" element={<MiningLesson />} />
            <Route path="/lessons/blocks" element={<BlocksLesson />} />
            <Route path="/lessons/network" element={<NetworkLesson />} />
            <Route path="/lessons/lightning" element={<LightningLesson />} />
            <Route path="/lessons/liquid" element={<LiquidLesson />} />
            <Route path="/lessons/ecash" element={<EcashLesson />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
