<<<<<<< HEAD
// 👤 About Page
// This page provides a personal introduction.
// It includes a short bio, a list of technical skills/tools, and an image.

import React, { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useEditor } from '../components/EditorProvider';
import Editable from '../components/Editable';
import { Testimonial } from '../types';
import AddTestimonialModal from '../components/AddTestimonialModal';


// --- Icons for Edit Mode ---
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>
);
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);
const AddIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
);
const ReorderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-neutral-500 cursor-grab active:cursor-grabbing">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
    </svg>
);


function AboutPage() {
  const { siteContent, isEditMode, updateSiteContent } = useEditor();
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  if (!siteContent) return null;

  const handleDeleteTestimonial = (id: string) => {
      if (window.confirm("Are you sure you want to delete this testimonial?")) {
          updateSiteContent(draft => {
              draft.testimonials = draft.testimonials.filter(t => t.id !== id);
          });
      }
  };
  
  const handleReorderTestimonials = (newOrder: Testimonial[]) => {
      updateSiteContent(draft => {
          draft.testimonials = newOrder;
      });
  }

  const SkillsList = () => (
    <div className="flex flex-wrap gap-2">
      <Editable
        path="about.skills"
        render={(skills: string[]) => (
          skills.map((skill, index) => (
            <motion.span
              key={skill}
              className="bg-neutral-800 text-neutral-300 px-3 py-1 text-sm font-medium rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
            >
              {skill}
            </motion.span>
          ))
        )}
        multiline
        label="Edit Skills (comma separated)"
      />
    </div>
  );
  
  return (
    <>
    <AnimatedPage>
      <div className="min-h-screen p-4 md:p-8 pt-24 md:pt-8 text-white">
        <div className="container mx-auto max-w-5xl">
          {/* --- Profile Section --- */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-16 items-center mb-24">
            <motion.div
              className="md:col-span-2 group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative aspect-square overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(https://picsum.photos/seed/about-me/800/800)` }}
                />
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                I'm Vikas.
              </h1>

              <Editable
                  path="about.bio"
                  as="p"
                  className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-8"
                  multiline
              />
              
              <h2 className="text-2xl font-bold uppercase tracking-wider mb-4">Skills & Tools</h2>
              <SkillsList />
            </motion.div>
          </div>

          {/* --- Testimonials Section --- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex justify-center items-center gap-4 mb-12">
                <h2 className="text-4xl font-bold uppercase tracking-wider text-center">
                    What Others Say
                </h2>
                {isEditMode && (
                    <motion.button
                        onClick={() => setEditingTestimonial({} as Testimonial)}
                        className="flex items-center px-4 py-2 text-sm font-bold text-black bg-white rounded-md hover:bg-neutral-200 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <AddIcon /> Add
                    </motion.button>
                )}
            </div>
            
            {siteContent.testimonials.length > 0 ? (
                <Reorder.Group axis="y" values={siteContent.testimonials} onReorder={handleReorderTestimonials} className="space-y-8">
                  {siteContent.testimonials.map((testimonial, index) => (
                    <Reorder.Item key={testimonial.id} value={testimonial}>
                    <motion.div
                      className="bg-neutral-900 p-6 rounded-lg flex flex-col relative group"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6 }}
                    >
                      {isEditMode && (
                          <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-500" onClick={() => setEditingTestimonial(testimonial)}><EditIcon /></button>
                              <button className="p-1.5 bg-red-600 rounded-full text-white hover:bg-red-500" onClick={() => handleDeleteTestimonial(testimonial.id)}><DeleteIcon /></button>
                              <div className="p-1.5"><ReorderIcon /></div>
                          </div>
                      )}
                      <Editable path={`testimonials[${index}].quote`} as="p" className="text-neutral-300 italic flex-grow mb-6" multiline />
                      <div className="flex items-center">
                        <Editable 
                          path={`testimonials[${index}].image`} 
                          type="media"
                          render={src => <img src={src} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 object-cover" />} 
                        />
                        <div>
                          <Editable path={`testimonials[${index}].name`} as="p" className="font-bold text-white" />
                          <Editable path={`testimonials[${index}].title`} as="p" className="text-sm text-neutral-500" />
                        </div>
                      </div>
                    </motion.div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
            ) : (
               <p className="text-center text-neutral-500">No testimonials yet. Add one in Edit Mode!</p>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
    <AnimatePresence>
        {editingTestimonial && (
            <AddTestimonialModal
                testimonial={editingTestimonial}
                onClose={() => setEditingTestimonial(null)}
            />
        )}
    </AnimatePresence>
    </>
=======
import React from 'react';
import { motion, Variants } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useContent } from '../hooks/useContent';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' },
  },
};

const AboutPage: React.FC = () => {
  const { content, loading, error, refetch } = useContent();

  if (loading) {
    return (
      <AnimatedPage type="fade">
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </AnimatedPage>
    );
  }

  if (error || !content) {
    return (
      <AnimatedPage type="fade">
        <ErrorDisplay
          title="Failed to Load Page Content"
          message={error?.message || "Content could not be found."}
          onRetry={refetch}
        />
      </AnimatedPage>
    );
  }
  
  const { about, skills, testimonials } = content;

  return (
    <AnimatedPage type="fade">
      <>
        <motion.h1 
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          The Visual Architect
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          >
            <p className="text-neutral-300 leading-relaxed text-lg">{about.bio}</p>
          </motion.div>
          <motion.div
            className="lg:col-span-2 w-full h-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
          >
            <img src={about.imageUrl} alt="Vikas" className="object-cover w-full" loading="lazy" />
          </motion.div>
        </div>

        <div className="my-24">
          <motion.h2 
            className="text-3xl font-bold uppercase tracking-wider mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            Core Skills
          </motion.h2>
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-neutral-800 text-neutral-300 px-5 py-2 text-sm font-medium"
                variants={itemVariants}
              >
                {skill.name}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="my-24">
          <motion.h2 
            className="text-3xl font-bold uppercase tracking-wider mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            What Others Say
          </motion.h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-neutral-900/50 p-8 relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute top-0 left-0 -translate-x-3 -translate-y-3 text-7xl text-brand-accent font-black opacity-20">”</div>
                <p className="text-neutral-200 italic text-xl leading-relaxed">"{testimonial.quote}"</p>
                <div className="text-right mt-6">
                  <p className="text-white font-bold">- {testimonial.author}</p>
                  <p className="text-neutral-400 text-sm">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </>
    </AnimatedPage>
>>>>>>> 606c5bb6d5a6d2dceebad08e1b00065ff1f8b8ee
  );
};

export default AboutPage;