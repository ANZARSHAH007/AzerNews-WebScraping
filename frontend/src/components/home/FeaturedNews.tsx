import React from 'react';
import { motion } from 'framer-motion';
import { Article } from '../../utils/api';
import NewsCard from './NewsCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { generateArticleId } from '../../utils/helpers';

interface FeaturedNewsProps {
  articles: Article[] | null;
  loading: boolean;
  error: string | null;
  selectedCategory: string;
}

const FeaturedNews: React.FC<FeaturedNewsProps> = ({
  articles,
  loading,
  error,
  selectedCategory
}) => {
  const navigate = useNavigate();

  const handleNewsClick = (article: Article) => {
    const articleId = generateArticleId(article);
    navigate(`/news/${articleId}`, { state: { article } });
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading latest news...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Unable to Load News
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const safeArticles: Article[] = Array.isArray(articles) ? articles : [];

  if (safeArticles.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No News Available
              </h3>
              <p className="text-gray-600">
                No articles found for the selected category. Please try another category or check back later.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest <span className="text-blue-600">News</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the most recent stories from our newsroom
          </p>
          <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold mb-4">
                Featured Story
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {safeArticles[0].title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {safeArticles[0].content?.[0]?.substring(0, 200) || 'No preview available'}...
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={safeArticles[0].author_img || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'}
                  alt={safeArticles[0].author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{safeArticles[0].author}</p>
                  <p className="text-sm text-gray-500">
                    {safeArticles[0].publish_date.split(' ').slice(0, 3).join(' ')}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNewsClick(safeArticles[0])}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Read Full Story
              </motion.button>
            </div>
            <div className="order-1 lg:order-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <img
                  src={safeArticles[0].thumbnail || 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg'}
                  alt={safeArticles[0].title}
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* News Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {safeArticles.slice(1, 13).map((article, index) => (
            <motion.div
              key={`${article.title}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NewsCard
                article={article}
                onClick={() => handleNewsClick(article)}
                showCategory={selectedCategory === 'all'}
                category={selectedCategory !== 'all' ? selectedCategory : undefined}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        {safeArticles.length > 13 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors shadow-lg"
            >
              Load More Articles
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedNews;
