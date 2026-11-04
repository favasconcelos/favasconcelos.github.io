import { useEffect } from 'react';

const SITE_URL = 'https://avasconcelos.com';

type PageMeta = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
};

type MetaTarget = { selector: string; create: () => HTMLMetaElement };

function metaByName(name: string): MetaTarget {
  return {
    selector: `meta[name="${name}"]`,
    create: () => Object.assign(document.createElement('meta'), { name }),
  };
}

function metaByProperty(property: string): MetaTarget {
  return {
    selector: `meta[property="${property}"]`,
    create: () => {
      const el = document.createElement('meta');
      el.setAttribute('property', property);
      return el;
    },
  };
}

/** Sets a meta tag's content and returns a function that restores the previous value. */
function setMeta({ selector, create }: MetaTarget, content: string): () => void {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  const el = existing ?? create();
  const previous = existing?.content;

  el.content = content;
  if (!existing) document.head.append(el);

  return () => {
    if (existing && previous !== undefined) existing.content = previous;
    else el.remove();
  };
}

/**
 * Updates the document title and SEO/social meta tags for the current route,
 * restoring the `index.html` defaults on unmount.
 */
export function usePageMeta({ title, description, path, type = 'website' }: PageMeta): void {
  useEffect(() => {
    const previousTitle = document.title;
    const url = `${SITE_URL}${path}`;
    document.title = title;

    const restores = [
      setMeta(metaByName('description'), description),
      setMeta(metaByProperty('og:title'), title),
      setMeta(metaByProperty('og:description'), description),
      setMeta(metaByProperty('og:type'), type),
      setMeta(metaByProperty('og:url'), url),
      setMeta(metaByName('twitter:title'), title),
      setMeta(metaByName('twitter:description'), description),
    ];

    return () => {
      document.title = previousTitle;
      for (const restore of restores) restore();
    };
  }, [title, description, path, type]);
}
