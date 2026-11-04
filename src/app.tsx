import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { HomePage } from '@/modules/home/home-page';
import { HeaderControls } from '@/shared/layout/header-controls';
import { ScrollToTop } from '@/shared/layout/scroll-to-top';

const BlogIndexPage = lazy(() => import('@/modules/blog/blog-index-page').then((m) => ({ default: m.BlogIndexPage })));
const BlogPostPage = lazy(() => import('@/modules/blog/blog-post-page').then((m) => ({ default: m.BlogPostPage })));
const NotFoundPage = lazy(() => import('@/modules/not-found/not-found-page').then((m) => ({ default: m.NotFoundPage })));

export function App() {
  return (
    <>
      <ScrollToTop />
      <HeaderControls />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
