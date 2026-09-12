"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading,   setIsLoading]   = useState(false);
  const [formError,   setFormError]   = useState('');
  const [formData,    setFormData]    = useState({ name: '', email: '', queryType: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.queryType || !formData.message.trim()) {
      setFormError('Please fill in all fields before submitting.');
      return;
    }

    setIsLoading(true);
    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Submission failed. Please try again.');
      setIsSubmitted(true);
    } catch (err) {
      setFormError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, rotateY: -3 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.4, ease: "easeOut" } }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      viewport={{ once: true, margin: "-30px" }}
      style={{ 
        perspective: '1400px', 
        transformStyle: 'preserve-3d',
        background: 'rgba(9,9,9,0.76)',
        backdropFilter: 'blur(48px)',
        WebkitBackdropFilter: 'blur(48px)',
        boxShadow: [
          'inset 0 1px 0 rgba(255,255,255,0.08)',
          'inset 0 0 0 1px rgba(255,255,255,0.04)',
          '0 4px 6px rgba(0,0,0,0.3)',
          '0 16px 40px rgba(0,0,0,0.5)',
          '0 50px 100px rgba(0,0,0,0.8)',
        ].join(', '),
      }}
      className="group/card relative w-full rounded-[16px] p-5 sm:p-8 md:p-10 transition-transform duration-500"
    >
      <div
        className="absolute inset-x-0 top-0 h-[1px] rounded-t-[16px] pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.1) 100%)' }}
      />
      <div
        className="absolute left-0 top-[8%] bottom-[8%] w-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.07), transparent)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[70px] rounded-b-[16px] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(2,2,2,0.6), transparent)' }}
      />
      <div
        className="absolute inset-0 rounded-[16px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 60px rgba(193,18,31,0.04)' }}
      />

      {/* Card Header */}
      <div className="mb-6 relative z-10">
        <h3 className="type-heading-lg text-white mb-2.5">
          Take the{' '}
          <span
            className="text-primary-container italic font-light"
            style={{ filter: 'drop-shadow(0 0 10px rgba(193,18,31,0.3))' }}
          >
            Stage
          </span>
          .
        </h3>
        <p className="type-body-md text-text-muted/70 max-w-[360px]">
          Tell us about your performance, event, workshop, or creative collaboration. We'd love to help bring your artistic vision to life.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col gap-3 relative z-10"
            onSubmit={handleSubmit}
          >
            {[
              { type: 'text',  icon: 'person', placeholder: 'Your Name',  name: 'name'  },
              { type: 'email', icon: 'mail',   placeholder: 'Your Email', name: 'email' },
            ].map(({ type, icon, placeholder, name }) => (
              <div key={name} className="relative group/field">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span
                    className="material-symbols-outlined text-text-muted/30 group-focus-within/field:text-primary-container transition-colors duration-300"
                    style={{ fontSize: '16px' }}
                  >
                    {icon}
                  </span>
                </div>
                <input
                  type={type}
                  name={name}
                  required
                  disabled={isLoading}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full rounded-xl pl-10 pr-4 py-3 type-body-md text-on-surface placeholder:text-text-muted/30 focus:outline-none transition-all duration-400 disabled:opacity-50"
                  style={{
                    background: 'rgba(6,6,6,0.7)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)',
                  }}
                  onFocus={e => {
                    e.currentTarget.style.border = '1px solid rgba(193,18,31,0.4)';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(193,18,31,0.08), inset 0 1px 3px rgba(0,0,0,0.4)';
                    e.currentTarget.style.background = 'rgba(10,10,10,0.85)';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.05)';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.4)';
                    e.currentTarget.style.background = 'rgba(6,6,6,0.7)';
                  }}
                />
              </div>
            ))}

            {/* Inquiry Type */}
            <div className="relative group/field">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-muted/30 group-focus-within/field:text-primary-container transition-colors duration-300" style={{ fontSize: '16px' }}>chat_bubble</span>
              </div>
              <select
                name="queryType"
                required
                disabled={isLoading}
                value={formData.queryType}
                onChange={handleChange}
                className="w-full rounded-xl pl-10 pr-9 py-3 type-body-md text-on-surface appearance-none cursor-pointer focus:outline-none transition-all duration-400 disabled:opacity-50"
                style={{
                  background: 'rgba(6,6,6,0.7)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)',
                }}
                onFocus={e => {
                  e.currentTarget.style.border = '1px solid rgba(193,18,31,0.4)';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(193,18,31,0.08), inset 0 1px 3px rgba(0,0,0,0.4)';
                  e.currentTarget.style.background = 'rgba(10,10,10,0.85)';
                }}
                onBlur={e => {
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.05)';
                  e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.4)';
                  e.currentTarget.style.background = 'rgba(6,6,6,0.7)';
                }}
              >
                <option value="" disabled className="text-text-muted/30 bg-[#0a0a0a]">Type of Inquiry</option>
                <option value="General Enquiry"     className="bg-[#0a0a0a]">General Enquiry</option>
                <option value="Performance Booking" className="bg-[#0a0a0a]">Performance Booking</option>
                <option value="Press & Media"        className="bg-[#0a0a0a]">Press &amp; Media</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-muted/35" style={{ fontSize: '18px' }}>expand_more</span>
              </div>
            </div>

            {/* Message textarea */}
            <div className="relative group/field">
              <div className="absolute top-0 left-0 pl-3.5 pt-3 flex items-start pointer-events-none">
                <span className="material-symbols-outlined text-text-muted/30 group-focus-within/field:text-primary-container transition-colors duration-300" style={{ fontSize: '16px' }}>edit</span>
              </div>
              <textarea
                name="message"
                placeholder="Share your vision…"
                required
                rows={3}
                disabled={isLoading}
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-xl pl-10 pr-4 py-3 type-body-md text-on-surface placeholder:text-text-muted/30 focus:outline-none resize-none transition-all duration-400 disabled:opacity-50"
                style={{
                  background: 'rgba(6,6,6,0.7)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)',
                }}
                onFocus={e => {
                  e.currentTarget.style.border = '1px solid rgba(193,18,31,0.4)';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(193,18,31,0.08), inset 0 1px 3px rgba(0,0,0,0.4)';
                  e.currentTarget.style.background = 'rgba(10,10,10,0.85)';
                }}
                onBlur={e => {
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.05)';
                  e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.4)';
                  e.currentTarget.style.background = 'rgba(6,6,6,0.7)';
                }}
              />
            </div>

            {/* Error message */}
            {formError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="type-body-sm text-red-400/90 text-center leading-snug"
              >
                {formError}
              </motion.p>
            )}

            {/* Premium, low-weight button */}
            <motion.button
              whileHover={!isLoading ? { scale: 1.005 } : {}}
              whileTap={!isLoading ? { scale: 0.985 } : {}}
              type="submit"
              disabled={isLoading}
              className="group/btn relative mt-3 w-full rounded-xl py-3.5 flex justify-center items-center gap-2 overflow-hidden transition-all duration-500 text-white disabled:cursor-not-allowed"
              style={{
                background: isLoading ? 'rgba(175, 22, 33, 0.4)' : 'rgba(175, 22, 33, 0.12)',
                border: '1px solid rgba(175, 22, 33, 0.25)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={e => {
                if (isLoading) return;
                e.currentTarget.style.background = 'rgba(175, 22, 33, 0.85)';
                e.currentTarget.style.border = '1px solid rgba(175, 22, 33, 0.9)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(175, 22, 33, 0.25), 0 0 0 1px rgba(175, 22, 33, 0.1)';
              }}
              onMouseLeave={e => {
                if (isLoading) return;
                e.currentTarget.style.background = 'rgba(175, 22, 33, 0.12)';
                e.currentTarget.style.border = '1px solid rgba(175, 22, 33, 0.25)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
              }}
            >
              {!isLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-120%] group-hover/btn:translate-x-[120%] transition-transform duration-[1000ms] ease-in-out" />
              )}
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin opacity-70" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                  </svg>
                  <span className="type-button relative z-10 opacity-70">SENDING…</span>
                </>
              ) : (
                <>
                  <span className="type-button relative z-10 opacity-80 group-hover/btn:opacity-100 transition-opacity duration-300">SEND MESSAGE</span>
                  <span className="material-symbols-outlined text-[15px] relative z-10 transition-all duration-400 group-hover/btn:translate-x-[4px] group-hover/btn:-translate-y-[3px] opacity-60 group-hover/btn:opacity-100">
                    arrow_outward
                  </span>
                </>
              )}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="success-state"
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="py-14 flex flex-col items-center justify-center text-center relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 170, damping: 13, delay: 0.2 }}
              className="w-14 h-14 rounded-full bg-primary-container/10 border border-primary-container/30 flex items-center justify-center mb-5 shadow-[0_0_28px_rgba(193,18,31,0.22)]"
            >
              <span className="material-symbols-outlined text-primary-container text-2xl">check</span>
            </motion.div>
            <h4 className="type-heading-lg text-white mb-2">Message Sent Successfully</h4>
            <p className="type-body-sm text-text-muted/70 max-w-[240px]">
              Thank you for reaching out.<br />Our team will get back to you shortly.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
