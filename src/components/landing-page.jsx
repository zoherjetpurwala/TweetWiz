import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import Header from "./Header";
import TweetForm from "./TweetForm";
import TweetList from "./TweetList";
import Footer from "./Footer";
import { useUser } from "../hooks/useUser";
import { Button } from "./ui/button";
import { RiTwitterXLine } from "react-icons/ri";

export function LandingPageComponent() {
  const { user, loading: userLoading } = useUser();
  const [tweets, setTweets] = useState([]);
  const [generatedTweets, setGeneratedTweets] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setTweets([
      {
        id: 1,
        content:
          "Just learned about the power of AI in content creation. Mind = blown! 🤯 #AI #ContentCreation",
        author: "TechEnthusiast",
        authorName: "Zoher Jetpurwala",
        image: "https://avatar.iran.liara.run/public/25",
      },
      {
        id: 2,
        content: "Yeeeeeaeaeaaeaaaaaaaaaaaah!!!! ☕️🌅 #MorningVibes",
        author: "yeaaaaaaahh",
        authorName: "Puneet SuperStar",
        image: "https://avatar.iran.liara.run/public/26",
      },
      {
        id: 3,
        content:
          "New study shows that regular exercise can improve cognitive function. Time to hit the gym! 💪🧠 #HealthyLiving",
        author: "FitnessGuru",
        authorName: "Rohit Sarode",
        image: "https://avatar.iran.liara.run/public/27",
      },
    ]);
  }, []);

  const handleGenerateTweets = async (prompt) => {
    setIsGenerating(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/generate-tweets",
        {
          params: { prompt },
          withCredentials: true,
        }
      );
      setGeneratedTweets(response.data);
    } catch (error) {
      console.error("Error generating tweets:", error);
    } finally {
      setIsGenerating(false);
    }
  };

    const handleSignIn = () => {
      window.location.href = "http://localhost:8080/auth/twitter";
    };

  return (
    <motion.div
      className="min-h-screen flex flex-col text-white"
      animate={{
        background: [
          "linear-gradient(to bottom right, #012345, #004169)",
          "linear-gradient(to bottom right, #3b0056, #456789)",
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <Header user={user} userLoading={userLoading} />
      <main className="flex-grow w-full items-center px-4 sm:px-6 lg:px-8 py-8">
        {user ? (
          <>
            <TweetForm
              onSubmit={handleGenerateTweets}
              isGenerating={isGenerating}
            />
            <TweetList
              tweets={generatedTweets}
              isLoading={isGenerating}
              user={user}
            />
          </>
        ) : (
          <div>
            <motion.div
              className="text-5xl font-bold flex flex-col justify-center items-center text-center pt-16"
              initial={{ opacity: 0, filter: "blur(10px)", y: 0 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: -15 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="md:text-7xl text-5xl font-extrabold text-center mb-5 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                AI-Powered <span className="text-blue-400">Tweets</span>,
                Instantly
              </h1>

              <p className="text-center md:text-xl text-sm text-slate-400">
                Elevate your Twitter game with AI-generated tweets tailored to
                you.
              </p>
              <Button
                onClick={handleSignIn}
                variant="outline"
                size="lg"
                className="rounded-lg flex items-center mt-7 mb-16 bg-blue-300 bg-opacity-20 hover:bg-opacity-30 text-white border-blue-200 gap-2"
              >
                <RiTwitterXLine className="w-4 h-4" />
                Get Started
              </Button>
            </motion.div>
            <motion.div
              className="lg:w-3/4 2xl:w-2/4 mx-auto flex flex-wrap justify-center gap-6 pb-16"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1 }}
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
                      index === 2
                        ? "w-full lg:w-full mx-auto"
                        : "w-full md:w-[48%] lg:w-[48%]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img src={tweet.image} alt="" width={36} height={36} />
                      <div className="flex flex-col">
                        <span className="text-blue-200 font-semibold">
                          {tweet.authorName}
                        </span>
                        <span className="text-gray-400 text-sm">
                          @{tweet.author}
                        </span>
                      </div>
                    </div>
                    <p className="text-white">{tweet.content}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </main>
      <Footer />
    </motion.div>
  );
}
