import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, User, Calendar, Share2, ArrowLeft, ExternalLink } from 'lucide-react';
import { formatDate, getImageWithFallback, calculateReadingTime } from '../utils/helpers';
import { Article } from '../utils/api';
import Button3D from '../components/common/Button3D';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const article = location.state?.article as Article;

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Article Not Found
            </h3>
            <p className="text-gray-600 mb-4">
              The article you're looking for could not be found.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(article.content);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.content[0]?.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Article URL copied to clipboard!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4 text-sm">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-gray-500" />
              <li>
                <span className="font-medium text-gray-900 line-clamp-1">
                  {article.title.substring(0, 50)}...
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to News</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
            {/* Author & Date */}
            <div className="flex items-center space-x-4">
              <img
                src={getImageWithFallback(article.author_img)}
                alt={article.author}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
                }}
              />
              <div>
                <div className="flex items-center space-x-2 text-gray-900">
                  <User size={16} />
                  <span className="font-semibold">{article.author}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 text-sm mt-1">
                  <Calendar size={14} />
                  <span>{formatDate(article.publish_date)}</span>
                </div>
              </div>
            </div>

            {/* Reading Time & Actions */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock size={16} />
                <span className="text-sm">{readingTime} min read</span>
              </div>
              
              <Button3D
                variant="accent"
                size="sm"
                onClick={handleShare}
                className="flex items-center space-x-2"
              >
                <Share2 size={16} />
                <span>Share</span>
              </Button3D>
            </div>
          </div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-xl shadow-lg"
          >
            <img
              src={getImageWithFallback(article.thumbnail)}
              alt={article.title}
              className="w-full h-64 md:h-80 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </motion.div>
        </motion.header>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="prose prose-lg max-w-none">
            {article.content.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                className="mb-6 text-gray-700 leading-relaxed text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* External Link */}
          {article.link && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                <span>Read original article</span>
                <ExternalLink size={16} />
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Article Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Enjoyed this article?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button3D
              variant="primary"
              onClick={handleShare}
              className="flex items-center justify-center space-x-2"
            >
              <Share2 size={16} />
              <span>Share Article</span>
            </Button3D>
            
            <Link to="/">
              <Button3D
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Read More News
              </Button3D>
            </Link>
          </div>
        </motion.div>
      </article>
    </motion.div>
  );
};

export default NewsDetail;