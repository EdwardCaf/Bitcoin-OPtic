import { useState, useEffect, useCallback } from 'react';

// API endpoints (in priority order)
const APIS = [
  { url: 'https://blockstream.info/api/blocks/tip/height', name: 'Blockstream' },
  { url: 'https://mempool.space/api/blocks/tip/height', name: 'Mempool' }
];

// TEST MODE: Set to true to simulate new blocks every 10 seconds (for testing animation)
const TEST_MODE = false;

export function useBlockHeight(refreshInterval = 30000) {
  const [blockHeight, setBlockHeight] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlockHeight = useCallback(async () => {
    if (typeof document !== 'undefined' && document.visibilityState !== 'visible') {
      return;
    }

    // TEST MODE: Simulate incrementing blocks
    if (TEST_MODE) {
      setBlockHeight(prev => (prev || 930188) + 1);
      setError(null);
      setIsLoading(false);
      return;
    }

    // Try each API in order until one succeeds
    for (const api of APIS) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      try {
        const response = await fetch(api.url, {
          method: 'GET',
          headers: {
            'Accept': 'text/plain'
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const height = await response.text();
        const parsedHeight = parseInt(height.trim(), 10);

        if (isNaN(parsedHeight)) {
          throw new Error('Invalid block height received');
        }

        setBlockHeight(parsedHeight);
        setError(null);
        setIsLoading(false);
        return; // Success! Exit the loop

      } catch (err) {
        if (err?.name === 'AbortError') {
          console.warn(`Timed out fetching from ${api.name}`);
        } else {
          console.warn(`Failed to fetch from ${api.name}:`, err.message);
        }
        // Continue to next API
      } finally {
        clearTimeout(timeoutId);
      }
    }

    // If all APIs failed
    setError('Unable to fetch block height');
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let idleCallbackId;

    const scheduleInitialFetch = () => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        idleCallbackId = window.requestIdleCallback(() => {
          fetchBlockHeight();
        }, { timeout: 1200 });
        return;
      }

      idleCallbackId = window.setTimeout(() => {
        fetchBlockHeight();
      }, 250);
    };

    scheduleInitialFetch();

    // Set up interval for periodic updates
    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState !== 'visible') {
        return;
      }

      fetchBlockHeight();
    }, refreshInterval);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchBlockHeight();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup interval/listeners on unmount
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallbackId);
      } else {
        clearTimeout(idleCallbackId);
      }
    };
  }, [refreshInterval, fetchBlockHeight]);

  return { blockHeight, isLoading, error };
}
