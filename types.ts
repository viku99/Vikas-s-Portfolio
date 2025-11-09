<<<<<<< HEAD
// 🏷️ Type Definitions
// This file contains TypeScript interfaces for all editable data in the app.
// It defines a single, unified `SiteContent` type to act as the source of truth.

=======
import React from 'react';

// Fix: Define and export interfaces to be used across the application. This resolves all type-related errors.
>>>>>>> 606c5bb6d5a6d2dceebad08e1b00065ff1f8b8ee
export interface Project {
  id: string;
  title: string;
  category: string;
<<<<<<< HEAD
  year: string;
  tools: string[];
  thumbnail?: string; // Thumbnail is optional, as video can be primary
  video?: string; // Simplified to a single URL for direct links or embeds
  description: string;
  images: string[];
}

export interface Testimonial {
  id:string;
  quote: string;
  name: string;
  title: string;
  image: string;
}

export interface AboutContent {
  bio: string;
  skills: string[];
}

export interface SiteContent {
  projects: Project[];
  testimonials: Testimonial[];
  about: AboutContent;
=======
  thumbnail: string;
  thumbnailVideo: string;
  heroMedia: {
    type: 'image' | 'video' | 'youtube';
    src: string;
  };
  client: string;
  year: number;
  tools: string[];
  description: string;
  gallery?: string[];
}

export interface Skill {
  name: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export interface About {
  bio: string;
  imageUrl: string;
}

export interface SocialLink {
  name: string;
  // Using React.ReactNode allows us to pass icon components directly
  icon?: React.ReactNode; 
  href: string;
}

export interface Content {
  lastUpdated: string;
  about: About;
  skills: Skill[];
  testimonials: Testimonial[];
  projects: Project[];
  socialLinks: SocialLink[];
>>>>>>> 606c5bb6d5a6d2dceebad08e1b00065ff1f8b8ee
}