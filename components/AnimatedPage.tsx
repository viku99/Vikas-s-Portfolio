<<<<<<< HEAD
// ✨ Page Animation Wrapper
// This is a higher-order component that wraps each page.
// It uses Framer Motion to apply page transitions. It now uses a cinematic
// "split panel" animation for the portfolio section and a faster, simpler
// fade animation for all other pages to improve UX.

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// --- Cinematic Transition Variants (for Portfolio) ---
const panelVariants: Variants = {
  initial: { scaleY: 1 },
  animate: { scaleY: 0, transition: { duration: 0.5, ease: [0.87, 0, 0.13, 1] } },
  exit: { scaleY: 1, transition: { duration: 0.5, ease: [0.87, 0, 0.13, 1] } },
};

const cinematicContentVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25, delay: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// --- Simple Fade Transition Variants (for other pages) ---
const fadeVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' } },
    exit: { opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
};

interface AnimatedPageProps {
    children: React.ReactNode;
}

function AnimatedPage({ children }: AnimatedPageProps) {
  const location = useLocation();
  // Use the more dramatic transition for the portfolio gallery and project detail pages.
  const useCinematicTransition = location.pathname.startsWith('/portfolio');

  if (useCinematicTransition) {
    return (
      <>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={cinematicContentVariants}
        >
          {children}
        </motion.div>

        {/* Top transition panel */}
        <motion.div
          className="fixed top-0 left-0 w-full h-1/2 bg-neutral-900 z-[100] origin-bottom"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={panelVariants}
        />
        
        {/* Bottom transition panel */}
        <motion.div
          className="fixed bottom-0 left-0 w-full h-1/2 bg-neutral-900 z-[100] origin-top"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={panelVariants}
        />
      </>
    );
  }

  // Default: use a simple fade transition for all other pages
  return (
    <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeVariants}
    >
        {children}
    </motion.div>
  );
};

export default AnimatedPage;
=======
import React from 'react';
import { motion, Variants } from 'framer-motion';

type AnimationType = 'cinematic' | 'fade' | 'none';

interface AnimatedPageProps {
  children: React.ReactNode;
  type?: AnimationType;
}

// A high-quality, smooth ease-out curve that gives animations a natural and satisfying "settling" effect.
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// A powerful, energetic ease for the dramatic cinematic bars effect.
const powerEase: [number, number, number, number] = [0.83, 0, 0.17, 1];

// A more satisfying 'fade' transition that adds a subtle slide for direction and depth.
const slideFadeVariants: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smoothEase } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.4, ease: 'easeIn' } },
};

// Content animation for the cinematic transition. It scales and fades into view
// in sync with the cinematic bars opening.
const cinematicContentVariants: Variants = {
    initial: { opacity: 0, scale: 0.97 },
    animate: { 
        opacity: 1, 
        scale: 1,
        transition: { 
            duration: 0.8, 
            ease: smoothEase, 
            delay: 0.7 // Delay to match the start of the bars opening.
        } 
    },
    exit: { 
        opacity: 0,
        transition: { 
            duration: 0.4, 
            ease: 'easeIn'
        } 
    },
};

const CinematicTransition: React.FC = () => {
    return (
        <>
            {/* New: A subtle white overlay that flashes during the transition to provide contrast for the black bars. */}
            <motion.div
                className="fixed inset-0 bg-white/10 z-40 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut', delay: 0.9 } }}
                exit={{ opacity: 1, transition: { duration: 0.4, ease: 'easeIn' } }}
            />
            <motion.div
                className="fixed top-0 left-0 w-full bg-brand-dark z-50"
                initial={{height: '50vh', top: 0}}
                animate={{height: 0, transition: {duration: 0.7, ease: powerEase, delay: 0.7}}}
                exit={{height: '50vh', transition: {duration: 0.7, ease: powerEase}}}
            />
            <motion.div
                className="fixed bottom-0 left-0 w-full bg-brand-dark z-50"
                initial={{height: '50vh', bottom: 0}}
                animate={{height: 0, transition: {duration: 0.7, ease: powerEase, delay: 0.7}}}
                exit={{height: '50vh', transition: {duration: 0.7, ease: powerEase}}}
            />
        </>
    )
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children, type = 'fade' }) => {
  if (type === 'none') return <>{children}</>;
  
  // Fix: Corrected typo from 'slideFadevariants' to 'slideFadeVariants'.
  const variants = type === 'cinematic' ? cinematicContentVariants : slideFadeVariants;

  return (
    <>
      {type === 'cinematic' && <CinematicTransition />}
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </>
  );
};

export default AnimatedPage;
>>>>>>> 606c5bb6d5a6d2dceebad08e1b00065ff1f8b8ee
