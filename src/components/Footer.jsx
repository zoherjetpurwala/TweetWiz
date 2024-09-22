import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col p-4 items-center">
          <motion.div
            className="text-center text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Made with ❤️ by @zoherjetpurwala
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;