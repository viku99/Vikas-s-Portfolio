<<<<<<< HEAD
// 🧭 Navigation Header
// This component is the site's main navigation.
// It renders as a fixed vertical bar on the left (on desktop) or a top bar (on mobile),
// ensuring it's always accessible.

import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', name: 'Home' },
  { path: '/portfolio', name: 'Portfolio' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
];

function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black bg-opacity-50 backdrop-blur-sm md:w-20 md:h-full md:bg-transparent md:backdrop-blur-none">
      <div className="flex justify-center md:flex-col md:h-full md:items-center p-2 md:py-8">
        <NavLink to="/" className="text-2xl font-black text-white mb-0 md:mb-16 hidden md:block">V.</NavLink>
        <nav className="w-full">
          <ul className="flex justify-around items-center md:flex-col md:space-y-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-xs font-bold uppercase tracking-widest transition-colors duration-300 md:[writing-mode:vertical-rl] md:rotate-180 ${
                      isActive ? 'text-white' : 'text-neutral-500 hover:text-white'
                    }`
                  }
                >
                  <motion.span
                     className="block p-2 md:py-4"
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.95 }}
                  >
                      {item.name}
                  </motion.span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
=======
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// Removed 'Home' link as the 'V' logo links to the homepage, saving space on mobile.
const navLinks = [
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

// Simplified NavItem component, as it's now only used for the main header.
const NavItem: React.FC<{ path: string; label: string; layoutId: string }> = ({ path, label, layoutId }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        // Responsive font size for better fit on small screens
        `relative uppercase tracking-widest transition-colors duration-300 text-xs md:text-sm ${
          isActive ? 'text-white' : 'text-neutral-500 hover:text-white'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {isActive && (
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-px bg-brand-accent"
              layoutId={layoutId}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
          )}
        </>
      )}
    </NavLink>
  );
};

const Header: React.FC = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

  // The header no longer needs state or handlers for a mobile menu.
  return (
    <header className={`fixed top-0 left-0 w-full p-4 z-50 transition-colors duration-300 ${!isHomePage ? 'bg-brand-dark/80 backdrop-blur-sm' : 'bg-transparent'}`}>
        <div className="max-w-screen-xl mx-auto px-2 md:px-8 flex justify-between items-center">
            <NavLink to="/" className="text-white font-black text-2xl tracking-tighter">V</NavLink>
            
            {/* The navigation is now always visible with responsive spacing. */}
            <nav className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
                {navLinks.map(link => <NavItem key={link.path} {...link} layoutId="header-nav-indicator" />)}
            </nav>
            {/* The hamburger menu button and the full-screen mobile menu have been completely removed. */}
        </div>
>>>>>>> 606c5bb6d5a6d2dceebad08e1b00065ff1f8b8ee
    </header>
  );
};

export default Header;