import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Wand2Icon, SparklesIcon } from "lucide-react";

const TweetForm = ({ onSubmit, isGenerating }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt);
    setPrompt("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-sm:w-full max-w-7xl mx-auto mb-12 p-4 bg-gray-900/40 rounded-2xl shadow-lg backdrop-blur-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex w-full gap-4">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Type your tweet idea..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full pl-14 pr-4 py-3 bg-white/20 text-white placeholder:text-white border-none rounded-xl focus-visible:ring-0"
          />
          <SparklesIcon className="absolute left-4 top-1/2 transform -translate-y-1/2" />
        </div>
        <Button
          type="submit"
          className="flex justify-center items-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-xl shadow-lg hover:opacity-90"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <div className="flex items-center space-x-2">
              <span>Generating...</span>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Wand2Icon className="md:mr-2 h-4 w-4" />
              <h1 className="max-sm:hidden">Generate</h1>
            </div>
          )}
        </Button>
      </div>
    </motion.form>
  );
};

export default TweetForm;
