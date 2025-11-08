import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import PlayIcon from './icons/PlayIcon';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// A high-quality, smooth ease-out curve for all hover animations.
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(error => {
        // This specific error "AbortError" is expected when a user quickly hovers
        // on and off a video, interrupting the play promise. We can safely ignore it.
        if (error.name !== 'AbortError') {
            console.error("Video play failed:", error);
        }
      });
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered]);

  return (
    <motion.div 
        variants={itemVariants} 
        className={`relative block overflow-hidden ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/project/${project.id}`} className="block w-full h-full">
        {/* Smoother, more subtle image scale animation */}
        <motion.img
          src={project.thumbnail}
          alt={`${project.title} thumbnail`}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.03 : 1 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          loading="lazy"
        />

        {/* Video fades in with the same smooth curve */}
        {project.thumbnailVideo && (
          <motion.video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            loop
            muted
            playsInline
            preload="metadata"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.6, ease: smoothEase }}
          >
            <source src={project.thumbnailVideo} type="video/mp4" />
          </motion.video>
        )}
        
        {/* Enhanced gradient overlay ensures text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        {/* Overlay darkens smoothly on hover */}
        <motion.div 
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: isHovered ? 0.4 : 0.2 }}
          transition={{ duration: 0.5, ease: smoothEase }}
        />
        
        {/* Centered Play Icon on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <PlayIcon className="w-16 h-16 text-white/80" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Always-Visible Text Info */}
        <div className="absolute bottom-0 left-0 p-6 text-white w-full">
          <div className="flex justify-between items-baseline">
            <p className="text-neutral-300 uppercase text-sm tracking-widest">{project.category}</p>
            <p className="text-neutral-400 text-sm">{project.year}</p>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight mt-1">{project.title}</h3>
        </div>
      </Link>
       {/* Refined Glow Effect controlled entirely by Framer Motion */}
      <motion.div
        className="absolute inset-0 pointer-events-none ring-2 ring-brand-accent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.4, ease: smoothEase }}
      />
    </motion.div>
  );
};

export default ProjectCard;