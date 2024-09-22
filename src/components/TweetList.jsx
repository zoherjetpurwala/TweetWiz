import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TweetList = ({ tweets, isLoading, user }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <motion.div
    className="lg:w-3/4 2xl:w-2/4 mx-auto flex flex-wrap justify-center gap-6 pb-16"
    initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <AnimatePresence>
        {tweets.map((tweet, index) => (
          <motion.div
            key={tweet.id}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-white flex flex-col gap-4 bg-opacity-10 backdrop-filter border border-blue-200 rounded-lg shadow-lg p-5 hover:shadow-2xl transform transition-all duration-300 ${
              index === 4
                ? "w-full lg:w-full mx-auto"
                : "w-full md:w-[48%] lg:w-[48%]"
            }`}
            
          >
            <div className="flex items-center gap-2">
              <img src={user.image} alt="" width={36} height={36} className="rounded-full" />
              <div className="flex flex-col">
                <span className="text-blue-200 font-semibold">{user.name}</span>
                <span className="text-gray-400 text-sm">@{user.username}</span>
              </div>
            </div>
            <p className="text-white">{tweet.tweet}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TweetList;