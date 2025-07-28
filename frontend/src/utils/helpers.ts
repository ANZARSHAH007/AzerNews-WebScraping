export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const formatDate = (dateString: string): string => {
  try {
    // Parse the custom date format from the API
    const parts = dateString.split(' ');
    if (parts.length >= 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      const time = parts[3];
      
      return `${day} ${month} ${year} at ${time}`;
    }
    return dateString;
  } catch (error) {
    return dateString;
  }
};

export const generateArticleId = (article: { title: string; link: string }): string => {
  // Create a unique ID from title and link
  return btoa(encodeURIComponent(article.title + article.link))
    .replace(/[^a-zA-Z0-9]/g, '')
    .substring(0, 16);
};

export const getImageWithFallback = (imageSrc: string): string => {
  // Return placeholder if image is missing
  if (!imageSrc || imageSrc.trim() === '') {
    return 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
  }
  return imageSrc;
};

export const calculateReadingTime = (content: string[]): number => {
  const wordsPerMinute = 200;
  const totalWords = content.join(' ').split(' ').length;
  return Math.ceil(totalWords / wordsPerMinute);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};