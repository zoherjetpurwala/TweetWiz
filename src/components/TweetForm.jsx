import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send } from 'lucide-react';

const TweetForm = ({ onSubmit, isGenerating }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(prompt);
    setPrompt('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Enter a prompt for your tweet..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow mr-4 bg-white bg-opacity-20 text-white placeholder-gray-300 border-white"
        />
        <Button
          type="submit"
          className="flex items-center bg-white text-purple-600 hover:bg-opacity-90"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" /> Generate
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
};

export default TweetForm;