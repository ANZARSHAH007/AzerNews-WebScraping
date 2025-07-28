Web Scrapping -AzerNews

This project involves building a complete pipeline to scrape news articles from the Azernews website, categorize the content, and display it through a modern web interface.
The process begins by using Python to scrape news articles from Azernews. Relevant information such as the article title, publication date, content, category, and URL is extracted and saved into structured JSON files. Each category (e.g., Politics, Economy, Sports) has its own JSON file, stored in a data/ directory.
A Flask backend is implemented to serve this data via RESTful API endpoints, with CORS enabled to allow interaction with the frontend. The backend reads from the JSON files and returns data according to the requested category.
The frontend is built using React, which fetches and displays the news articles by category. Users can browse different categories and read individual articles. The frontend communicates with the backend using HTTP requests to fetch the categorized data.
This project demonstrates a full-stack approach to data scraping, processing, API development, and user-facing presentation.
