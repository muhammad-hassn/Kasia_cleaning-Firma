import { useEffect } from 'react';
import { PAGE_META } from '@/data/content';

export function usePageMeta(path: string) {
  useEffect(() => {
    const meta = PAGE_META[path] || PAGE_META['/'];
    document.title = meta.title;
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute('content', meta.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);
  }, [path]);
}
