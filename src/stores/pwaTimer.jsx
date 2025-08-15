// src/stores/pwaTimer.js
import { useState, useEffect } from 'react';

export function usePwaTimer() {
  const [postponeTimestamp, setPostponeTimestamp] = useState(() => {
    const saved = localStorage.getItem('postponeTimestamp');
    return saved ? Number(saved) : null;
  });

  const postponeNow = () => {
    const now = Date.now();
    localStorage.setItem('postponeTimestamp', now);
    setPostponeTimestamp(now);
  };

  const canShowAgain = (() => {
    if (!postponeTimestamp) return true;
    const now = Date.now();
    const diffInMs = now - postponeTimestamp;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours >= 24;
  })();

  return {
    postponeTimestamp,
    postponeNow,
    canShowAgain,
  };
}
