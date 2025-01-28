'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeProvider } from "@/src/app/components/ThemeProvider";

const Custom404 = () => {
  return (
    <ThemeProvider attribute={'class'}  defaultTheme="system" enableSystem disableTransitionOnChange>
  {/* Animated Text */}
  <motion.h1
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-9xl font-bold"
  >
    404
  </motion.h1>
  <motion.h2
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="text-3xl font-semibold mt-4"
  >
    Oops! Page Not Found
  </motion.h2>
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.2 }}
    className="text-lg mt-4 text-center max-w-lg"
  >
    The page you are looking for doesnot exist. It might have been moved or deleted.
  </motion.p>

  {/* Back to Home Button */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.4 }}
    className="mt-8"
  >
    <Link
      href="/"
      className="px-6 py-3 bg-white text-black font-medium rounded-lg shadow-md hover:bg-gray-100 transition"
    >
      Go Back Home
    </Link>
  </motion.div>

  {/* Illustration */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.6 }}
    className="mt-10"
  >
    {/* <img
      src="/404-illustration.svg"
      alt="404 Illustration"
      className="w-64 h-64 object-contain"
    /> */}
  </motion.div>
</ThemeProvider>

  );
};

export default Custom404;


