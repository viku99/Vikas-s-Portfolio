<<<<<<< HEAD

// 🏠 Home Page
// This is the main landing page of the portfolio.
// It features a full-screen, cinematic hero section designed to make a strong first impression.

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';

function HomePage() {
  const title = "VIKAS";
  const subtitle = "Motion Designer & VFX Storyteller.";

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.08,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <AnimatedPage>
      <div className="relative flex items-center justify-center min-h-screen text-center px-4 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(https://picsum.photos/seed/homepage/1920/1080)` }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h1
            className="text-6xl md:text-9xl font-black uppercase text-white tracking-tighter"
            variants={sentence}
            initial="hidden"
            animate="visible"
          >
            {title.split("").map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter}>
                {char}
=======
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
// Fix: Add Variants to framer-motion import
import { motion, Variants } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ArrowIcon from '../components/icons/ArrowIcon';
import { useContent } from '../hooks/useContent';
import { usePreloader } from '../hooks/usePreloader';
import { Project } from '../types';

const title = "VIKAS";
const titleContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

// Fix: Explicitly type letterVariants as Variants to satisfy framer-motion's expected types for cubic-bezier easing.
const letterVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1,
    },
  },
};

const HomePage: React.FC = () => {
  const { content } = useContent();

  // Extract all media URLs to be preloaded for the portfolio page
  const portfolioMediaUrls = useMemo(() => {
    if (!content?.projects) return [];

    const urls = new Set<string>();

    content.projects.forEach((project: Project) => {
      if (project.thumbnail) urls.add(project.thumbnail);
      if (project.thumbnailVideo) urls.add(project.thumbnailVideo);
      if (project.heroMedia?.src) urls.add(project.heroMedia.src);
      if (project.gallery) {
        project.gallery.forEach(url => urls.add(url));
      }
    });

    return Array.from(urls);
  }, [content]);

  // Start preloading the assets for a smoother portfolio experience
  usePreloader(portfolioMediaUrls);
  
  return (
    <AnimatedPage type="fade">
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Designer's desk with a laptop, notebook, and camera"
          className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center text-white p-4">
          <motion.h1
            className="font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter uppercase"
            variants={titleContainerVariants}
            initial="initial"
            animate="animate"
          >
            {title.split("").map((letter, index) => (
              <motion.span key={index} className="inline-block" variants={letterVariants}>
                {letter}
>>>>>>> 606c5bb6d5a6d2dceebad08e1b00065ff1f8b8ee
              </motion.span>
            ))}
          </motion.h1>

<<<<<<< HEAD
          <motion.h2
            className="text-lg md:text-2xl font-light text-neutral-300 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {subtitle}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-12"
          >
            <Link
              to="/portfolio"
              className="group block px-6 py-3 border border-white text-white uppercase text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              View Portfolio <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
=======
          <motion.p 
            className="text-neutral-300 text-lg md:text-xl tracking-widest uppercase mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Motion Designer & VFX Storyteller
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <Link
              to="/portfolio"
              className="group inline-flex items-center justify-center mt-12 px-8 py-3 border border-white text-white uppercase text-sm tracking-widest transition-colors duration-300 hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-white"
            >
              View Portfolio
              <motion.div
                className="ml-2"
              >
                 <ArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.div>
>>>>>>> 606c5bb6d5a6d2dceebad08e1b00065ff1f8b8ee
            </Link>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default HomePage;