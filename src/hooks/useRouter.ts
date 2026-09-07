import { useEffect, useState, useCallback } from 'react';

export type Route = { path: string; hash: string };

function parseHash(): Route {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [path, hash] = raw.split('#');
  return { path: path || '/', hash: hash || '' };
}

export function navigate(to: string) {
  if (to.startsWith('/#')) {
    const target = to.slice(1);
    if (window.location.pathname === '/' || window.location.hash.replace(/^#/, '').split('#')[0] === '/') {
      window.location.hash = target;
    } else {
      window.location.hash = target;
    }
    return;
  }
  window.location.hash = to;
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(parseHash());

  useEffect(() => {
    const onHash = () => {
      const r = parseHash();
      setRoute(r);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = useCallback((to: string) => {
    navigate(to);
  }, []);

  return { route, go };
}
