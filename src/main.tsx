import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { I18nProvider } from '@/shared/i18n/context';

import { App } from './app';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <I18nProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </I18nProvider>,
);
