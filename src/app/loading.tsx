'use client';
import { motion } from "framer-motion";
import { ThemeProvider } from "@/src/app/components/ThemeProvider";
const LoadingPage = () => {


  return (
    <ThemeProvider attribute={'class'} defaultTheme="system" enableSystem disableTransitionOnChange>
    <div className="flex h-screen max-h-full items-center justify-center">
      <div className="relative h-32 w-32">
        {/* Outer spinning container */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        >
            {/* Circle 1 */}
            <div className="absolute top-0 h-8 w-8 rounded-full bg-gray-400"></div>
            {/* Circle 2 */}
            <div className="absolute bottom-0 h-8 w-8 rounded-full bg-gray-600"></div>
            {/* Circle 3 */}
            <div className="absolute left-0 h-8 w-8 rounded-full bg-white border border-gray-500"></div>
            {/* Circle 4 */}
            <div className="absolute right-0 h-8 w-8 rounded-full bg-black"></div>

        </motion.div>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default LoadingPage;
