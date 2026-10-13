'use client';

import { motion, Variants } from 'framer-motion';
import React from 'react';

export const FadeUp = ({ children, delay = 0, y = 80 }: { children: React.ReactNode, delay?: number, y?: number }) => (
  <motion.div
    initial={{ opacity: 0, y, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, type: "spring", bounce: 0.3 }}
  >
    {children}
  </motion.div>
);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, type: "spring", bounce: 0.4 }
  }
};

export const StaggerContainer = ({ children, className, id, style }: { children: React.ReactNode, className?: string, id?: string, style?: React.CSSProperties }) => (
  <motion.div
    id={id}
    className={className}
    style={style}
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-50px" }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
  <motion.div variants={itemVariants} className={className} style={style}>
    {children}
  </motion.div>
);
