import { useEffect, useRef, useState } from 'react';

const MAILERLITE_SCRIPT_SRC = 'https://assets.mailerlite.com/js/universal.js';
const MAILERLITE_SCRIPT_ID = 'mailerlite-universal-script';
const MAILERLITE_ACCOUNT_ID = '2111034';

function initializeMailerLiteAccount() {
  if (typeof window === 'undefined') return;
  if (window.__mlAccountInitialized) return;
  if (typeof window.ml !== 'function') return;

  window.ml('account', MAILERLITE_ACCOUNT_ID);
  window.__mlAccountInitialized = true;
}

function ensureMailerLiteScript() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.resolve();
  }

  if (window.__mlScriptPromise) {
    return window.__mlScriptPromise;
  }

  if (typeof window.ml === 'function') {
    initializeMailerLiteAccount();
    window.__mlScriptPromise = Promise.resolve();
    return window.__mlScriptPromise;
  }

  window.ml =
    window.ml ||
    function mlStub() {
      (window.ml.q = window.ml.q || []).push(arguments);
    };

  window.__mlScriptPromise = new Promise((resolve, reject) => {
    let script = document.getElementById(MAILERLITE_SCRIPT_ID);

    if (!script) {
      script = document.createElement('script');
      script.id = MAILERLITE_SCRIPT_ID;
      script.async = true;
      script.src = MAILERLITE_SCRIPT_SRC;
      document.head.appendChild(script);
    }

    script.addEventListener('load', () => {
      initializeMailerLiteAccount();
      resolve();
    });

    script.addEventListener('error', () => {
      reject(new Error('Failed to load MailerLite script.'));
    });
  });

  return window.__mlScriptPromise;
}

export function useMailerLiteOnVisible(options = {}) {
  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const rootMargin = options.rootMargin || '250px 0px';

  useEffect(() => {
    const target = targetRef.current;
    if (!target || isVisible) return;

    const preloadDistance = Number.parseInt(rootMargin, 10) || 0;
    const rect = target.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top <= viewportHeight + preloadDistance && rect.bottom >= -preloadDistance) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  useEffect(() => {
    if (!isVisible) return;
    ensureMailerLiteScript().catch(() => {});
  }, [isVisible]);

  return { targetRef, isVisible };
}
