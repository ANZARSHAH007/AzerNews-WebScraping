import axios from 'axios';
import { mockArticles, mockCategorizedArticles } from './mockData';

// Use .env value or fallback to localhost:5000
const API_BASE_URL =  'http://127.0.0.1:5000';

// Toggle mock data mode
const USE_MOCK_DATA = false;

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add response interceptor for error logging
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export interface Article {
  title: string;
  link: string;
  thumbnail: string;
  author: string;
  author_img: string;
  publish_date: string;
  content: string[];
}

export interface ApiResponse {
  articles?: Article[];
  error?: string;
}

export const api = {
  getAllArticles: async (): Promise<Article[]> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockArticles;
    }

    try {
      const response = await apiClient.get<Article[]>('/api/articles');
      return response.data;
    } catch (error) {
      console.error('Error fetching all articles:', error);
      throw error;
    }
  },

  getArticlesByCategory: async (category: string): Promise<Article[]> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockCategorizedArticles[category as keyof typeof mockCategorizedArticles] || [];
    }

    try {
      const response = await apiClient.get<Article[]>(`/api/articles/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching articles for category ${category}:`, error);
      throw error;
    }
  },

  healthCheck: async (): Promise<boolean> => {
    if (USE_MOCK_DATA) {
      return true;
    }

    try {
      await apiClient.get('/');
      return true;
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  },
};

export const CATEGORIES = [
  { id: 'all', name: 'All News', color: 'bg-blue-600' },
  { id: 'nation', name: 'Nation', color: 'bg-red-600' },
  { id: 'analysis', name: 'Analysis', color: 'bg-purple-600' },
  { id: 'armenian-aggression', name: 'Armenian Aggression', color: 'bg-orange-600' },
  { id: 'armenian-azerbaijan-conflict', name: 'Armenia-Azerbaijan', color: 'bg-yellow-600' },
  { id: 'world', name: 'World', color: 'bg-green-600' },
  { id: 'culture', name: 'Culture', color: 'bg-pink-600' },
];
