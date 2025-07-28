import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Globe, TrendingUp } from 'lucide-react';
import Button3D from '../common/Button3D';

interface HeroSectionProps {
  onExplore?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  return (
    <section className="relative min-h-[70vh] bg-gradient-to-br from-blue-50 via-white to-red-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-32 right-20 w-24 h-24 bg-red-200 rounded-full opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-20 h-20 bg-yellow-200 rounded-full opacity-20"
          animate={{
            y: [0, -15, 0],
            x: [0, 15, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
              >
                Breaking News & Analysis
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                Stay <span className="text-blue-600">Informed</span> with 
                <span className="block text-red-600">AzerNews</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-600 leading-relaxed max-w-lg"
              >
                Your premier destination for comprehensive news coverage from Azerbaijan and beyond. 
                Get the latest updates on nation, world events, culture, and in-depth analysis.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button3D
                variant="primary"
                size="lg"
                onClick={onExplore}
                className="flex items-center justify-center space-x-2"
              >
                <span>Explore News</span>
                <ChevronRight size={20} />
              </Button3D>
              
              <Button3D
                variant="secondary"
                size="lg"
                className="flex items-center justify-center space-x-2"
              >
                <TrendingUp size={20} />
                <span>Trending Topics</span>
              </Button3D>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Live Updates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">1000+</div>
                <div className="text-sm text-gray-600">Daily Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">6</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center"
          >
            <div className="relative">
              {/* Floating Newspaper */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotateY: [0, 10, 0],
                  rotateX: [0, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <div className="w-80 h-96 bg-white rounded-lg shadow-2xl transform-gpu perspective-1000">
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-red-600 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded w-full"></div>
                      <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                      <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                    </div>
                    <div className="h-32 bg-gradient-to-r from-blue-100 to-red-100 rounded"></div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Globe Animation */}
              <motion.div
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-10 -right-10 text-blue-300 opacity-30"
              >
                <Globe size={120} />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <TrendingUp className="text-white" size={24} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;