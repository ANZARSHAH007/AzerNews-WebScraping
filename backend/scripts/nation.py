import os
import json
import requests
from bs4 import BeautifulSoup

BASE_URL = "https://www.azernews.az"

def extract_image_from_style(style_str):
    """Extract image URL from style="background-image: url(...)"."""
    if "url('" in style_str:
        return style_str.split("url('")[1].split("')")[0]
    return None

def find_nation_section(soup):
    """Locate the main Nation section block."""
    all_sections = soup.find_all("div", class_="col-12")
    for section in all_sections:
        header = section.find("h2")
        if header and header.text.strip().lower() == "nation":
            return section
    return None

def get_nation_articles():
    """Extract basic article data from the Nation section."""
    response = requests.get(BASE_URL)
    soup = BeautifulSoup(response.text, 'html.parser')
    nation_section = find_nation_section(soup)
    if not nation_section:
        print("⚠️ Nation section not found.")
        return []

    articles = []

    # 1. Featured (left) article
    large_news = nation_section.select_one("div.index-block-custom")
    if large_news:
        link_tag = large_news.find("a", class_="news-item large")
        img_tag = link_tag.find("img") if link_tag else None
        title_tag = large_news.find("h3")
        excerpt_tag = large_news.find("p")

        if link_tag and img_tag and title_tag:
            articles.append({
                "title": title_tag.text.strip(),
                "link": BASE_URL + link_tag['href'] if not link_tag['href'].startswith('http') else link_tag['href'],
                "thumbnail": img_tag['src'],
                "summary": excerpt_tag.text.strip() if excerpt_tag else None
            })

    # 2. List of smaller articles (right side)
    list_items = nation_section.select("div.col-md-6 ul.list-unstyled li")
    for item in list_items:
        link_tag = item.find("a", class_="news-item-sm")
        if not link_tag:
            continue

        title_tag = link_tag.find("h4")
        thumb_div = link_tag.find("div", class_="bg-thumb")
        style = thumb_div.get("style", "") if thumb_div else ""

        articles.append({
            "title": title_tag.text.strip() if title_tag else None,
            "link": BASE_URL + link_tag['href'] if not link_tag['href'].startswith('http') else link_tag['href'],
            "thumbnail": extract_image_from_style(style),
        })

    return articles

def extract_article_details(url):
    """Fetch detailed info from the article page."""
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        author_section = soup.find('div', class_='author')
        author = author_section.find('h6').text.strip() if author_section else None
        author_img = author_section.find('img')['src'] if author_section and author_section.find('img') else None

        date_span = soup.find('span', class_='me-3')
        publish_date = date_span.text.strip() if date_span else None

        article_content = soup.find('div', class_='article-content')
        paragraphs = article_content.find_all('p') if article_content else []

        full_content = [p.text.strip() for p in paragraphs if p.text.strip()]

        return {
            "author": author,
            "author_img": author_img,
            "publish_date": publish_date,
            "content": full_content
        }
    except Exception as e:
        print(f"❌ Error fetching article details: {e}")
        return {}

def scrape_nation_news():
    """Main function to combine basic and detailed article data."""
    basic_articles = get_nation_articles()
    enriched = []

    for article in basic_articles:
        print(f"🔍 Scraping: {article['title']}")
        details = extract_article_details(article['link'])
        article.update(details)
        enriched.append(article)

    return enriched

if __name__ == "__main__":
    print("🚀 Starting scraper for Nation news...")
    news_data = scrape_nation_news()

    # Define correct data path relative to this script (../data/)
    data_dir = os.path.join("..", "data")
    os.makedirs(data_dir, exist_ok=True)  # Create folder if not exists

    file_path = os.path.join(data_dir, "azernews_nation.json")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(news_data, f, indent=4, ensure_ascii=False)

    print(f"✅ Nation news saved to '{file_path}'")
