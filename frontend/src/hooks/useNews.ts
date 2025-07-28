import { useState, useEffect, useMemo } from 'react';
import { api, Article } from '../utils/api';
import { useApi } from './useApi';

export const useNews = (category?: string) => {
  const apiCall = useMemo(() => {
    return category && category !== 'all'
      ? () => api.getArticlesByCategory(category)
      : () => api.getAllArticles();
  }, [category]);

  return useApi<Article[]>(apiCall, [category]);
};

export const useSearchNews = (articles: Article[], searchTerm: string) => {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredArticles(articles);
      return;
    }

    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.some(paragraph => 
        paragraph.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setFilteredArticles(filtered);
  }, [articles, searchTerm]);

  return filteredArticles;
};