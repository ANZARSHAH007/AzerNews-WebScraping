import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import CategorySelector from '../components/home/CategorySelector';
import FeaturedNews from '../components/home/FeaturedNews';
import { useNews, useSearchNews } from '../hooks/useNews';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: articles, loading, error, refetch } = useNews(
    selectedCategory === 'all' ? undefined : selectedCategory
  );
  
  const filteredArticles = useSearchNews(articles || [], searchTerm);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm(''); // Clear search when changing category
  };

  const handleExploreClick = () => {
    // Scroll to category selector
    document.getElementById('categories')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section */}
      <HeroSection onExplore={handleExploreClick} />

      {/* Category Selector */}
      <div id="categories">
        <CategorySelector
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Featured News */}
      <FeaturedNews
        articles={filteredArticles}
        loading={loading}
        error={error}
        selectedCategory={selectedCategory}
      />

      {/* Search Results Info */}
      {searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border-t border-blue-200 py-4"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <p className="text-blue-800">
                Found <span className="font-bold">{filteredArticles.length}</span> articles
                for <span className="font-semibold">"{searchTerm}"</span>
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear search
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Home;