import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './lib/theme';
import { I18nProvider } from './lib/i18n';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CatalogPage from './pages/CatalogPage';
import DownloadsPage from './pages/DownloadsPage';
import DealersPage from './pages/DealersPage';
import SupportPage from './pages/SupportPage';
import ContactsPage from './pages/ContactsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/downloads" element={<DownloadsPage />} />
              <Route path="/dealers" element={<DealersPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </I18nProvider>
    </ThemeProvider>
  );
}
