import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { LogIn, LogOut } from 'lucide-react';
import axios from 'axios';

const Header = ({ user, userLoading }) => {
  const handleSignIn = () => {
    window.location.href = "http://localhost:8080/auth/twitter";
  };

  const handleSignOut = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <nav className="bg-white bg-opacity-10 rounded-xl sm:m-5 m-3 backdrop-filter backdrop-blur-lg">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div
            className="flex-shrink-0 flex items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-blue-100 sm:text-3xl text-2xl font-bold">
              Tweet<span className="text-blue-400">Wiz</span>
            </span>
          </motion.div>
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {!userLoading && (
              user ? (
                <div className="flex items-center">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="ml-4 flex items-center rounded-lg bg-red-300 bg-opacity-20 hover:bg-opacity-30 text-white border-red-200"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleSignIn}
                  variant="outline"
                  size="sm"
                  className="flex items-center rounded-lg bg-blue-300 bg-opacity-20 hover:bg-opacity-30 text-white border-blue-200"
                >
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              )
            )}
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Header;