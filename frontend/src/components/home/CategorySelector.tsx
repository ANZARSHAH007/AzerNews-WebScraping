import React from 'react';
import { motion, Variants } from 'framer-motion';
import { CATEGORIES } from '../../utils/api';

interface CategorySelectorProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

// ✅ Properly typed variants using Framer Motion's Variants type
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore News <span className="text-blue-600">Categories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive coverage of news topics that matter most to you.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4"
        >
          {CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="flex justify-center"
            >
              <motion.button
                onClick={() => onCategoryChange(category.id)}
                className={`
                  relative w-full max-w-[200px] p-4 rounded-xl border-2 transition-all duration-300
                  transform-gpu perspective-1000 group
                  ${selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }
                `}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: -2,
                  boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.1)',
                }}
                whileTap={{
                  scale: 0.95,
                  rotateY: -2,
                  rotateX: 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 17,
                }}
              >
                {/* Category Color Indicator */}
                <div
                  className={`w-8 h-8 rounded-full mx-auto mb-3 ${category.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                />

                <h3
                  className={`
                    font-semibold text-sm transition-colors
                    ${selectedCategory === category.id
                      ? 'text-blue-700'
                      : 'text-gray-700 group-hover:text-gray-900'}
                  `}
                >
                  {category.name}
                </h3>

                {/* Active Indicator */}
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-blue-500 opacity-5 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.05 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Category Info */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            Showing news from:{' '}
            <span className="font-semibold text-blue-600">
              {CATEGORIES.find((cat) => cat.id === selectedCategory)?.name || 'All News'}
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySelector;
