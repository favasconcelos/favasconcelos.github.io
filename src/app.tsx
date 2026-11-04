import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { Content } from '@/components/content';
import { HeaderControls } from '@/components/header-controls';
import { ScrollToTop } from '@/components/scroll-to-top';

const BlogIndexPage = lazy(() => import('@/pages/blog-index-page').then((m) => ({ default: m.BlogIndexPage })));
const BlogPostPage = lazy(() => import('@/pages/blog-post-page').then((m) => ({ default: m.BlogPostPage })));
const NotFoundPage = lazy(() => import('@/pages/not-found-page').then((m) => ({ default: m.NotFoundPage })));

export function App() {
  return (
    <>
      <ScrollToTop />
      <HeaderControls />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
