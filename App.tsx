<<<<<<< HEAD
//  Root Application Component
// This file orchestrates the entire application.
// It sets up routing, the main layout, and the global EditorProvider
// which powers the in-page, real-time content editing functionality.

import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ContactPage from './pages/ContactPage';
import Chatbot from './components/Chatbot';
import ScrollToTop from './components/ScrollToTop';

import { EditorProvider, useEditor } from './components/EditorProvider';
import EditorToolbar from './components/EditorToolbar';
import LoginModal from './components/LoginModal';
import MediaUploadModal from './components/MediaUploadModal';

// --- Error Boundary (remains unchanged) ---
// ... (previous ErrorBoundary code is correct and can be kept)
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-5xl font-black uppercase mb-4">Something went wrong.</h1>
          <p className="text-xl text-neutral-300 mb-8">
            An unexpected error occurred. Please try again or return to the homepage.
          </p>
          <motion.a
            href="/"
            className="group inline-block mt-8 px-6 py-3 border border-white text-white uppercase text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Return to Home <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
          </motion.a>
        </div>
      );
    }
    return this.props.children;
  }
}


// --- Main App Wrapper ---
function App() {
  return (
    <HashRouter>
      <EditorProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-black text-white antialiased">
          <Header />
          <main className="pl-0 md:pl-20">
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
          </main>
          <Chatbot />
          <EditorToolbar />
          <LoginModal />
          <MediaUploadModal />
        </div>
      </EditorProvider>
=======
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Sidebar from './components/Sidebar';
import PageLayout from './components/PageLayout';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop';
import MobileNav from './components/MobileNav';

// A wrapper to apply the standard page layout to interior pages
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <PageLayout>{children}</PageLayout>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Main />
>>>>>>> 606c5bb6d5a6d2dceebad08e1b00065ff1f8b8ee
    </HashRouter>
  );
};

<<<<<<< HEAD
// --- Animated Routes ---
function AppRoutes() {
    const location = useLocation();
    const { isLoading, siteContent } = useEditor();

    // The entire app is in a loading state until the initial content is fetched.
    if (isLoading || !siteContent) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-neutral-500"></div>
            </div>
        );
    }

    // AnimatePresence enables the cool page transitions.
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Private/Editor pages are removed in favor of the global overlay */}
            </Routes>
        </AnimatePresence>
    );
=======
const Main: React.FC = () => {
  const location = useLocation();

  return (
    <div className="bg-brand-dark text-neutral-300">
      <div className="flex min-h-screen group">
        <Sidebar />
        <ScrollToTop />
        <main className="w-full flex-grow transition-all duration-300 ease-in-out pl-0 md:pl-10 group-hover:md:pl-20 pb-16 md:pb-0">
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio" element={<LayoutWrapper><PortfolioPage /></LayoutWrapper>} />
              <Route path="/project/:id" element={<LayoutWrapper><ProjectDetailPage /></LayoutWrapper>} />
              <Route path="/about" element={<LayoutWrapper><AboutPage /></LayoutWrapper>} />
              <Route path="/contact" element={<LayoutWrapper><ContactPage /></LayoutWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
      <MobileNav />
    </div>
  );
>>>>>>> 606c5bb6d5a6d2dceebad08e1b00065ff1f8b8ee
}

export default App;