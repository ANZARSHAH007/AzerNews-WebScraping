import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, ExternalLink } from 'lucide-react';
import { Article } from '../../utils/api';
import { formatDate, truncateText, getImageWithFallback, calculateReadingTime } from '../../utils/helpers';

interface NewsCardProps {
  article: Article;
  onClick: () => void;
  showCategory?: boolean;
  category?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onClick,
  showCategory = false,
  category
}) => {
  const readingTime = calculateReadingTime(article.content);
  const previewText = article.content.length > 0 
    ? truncateText(article.content[0], 120)
    : 'No preview available';

  return (
    <motion.article
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform-gpu perspective-1000 group"
      whileHover={{
        scale: 1.02,
        rotateX: -2,
        rotateY: 3,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
      }}
      whileTap={{
        scale: 0.98,
        rotateX: 1,
        rotateY: -1
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25
      }}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={getImageWithFallback(article.thumbnail)}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Tag */}
        {showCategory && category && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-lg">
              {category}
            </span>
          </div>
        )}
        
        {/* Reading Time */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
            <Clock size={12} />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* External Link Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute bottom-3 right-3 text-white"
        >
          <ExternalLink size={20} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {article.title}
        </h3>

        {/* Preview */}
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
          {previewText}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          {/* Author */}
          <div className="flex items-center space-x-2">
            <img
              src={getImageWithFallback(article.author_img)}
              alt={article.author}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
              }}
            />
            <span className="font-medium">{article.author}</span>
          </div>

          {/* Date */}
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{formatDate(article.publish_date).split(' at ')[0]}</span>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <motion.div
        className="absolute inset-0 border-2 border-blue-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.article>
  );
};

export default NewsCard;