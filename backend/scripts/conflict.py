import os
import requests
import json
from bs4 import BeautifulSoup

BASE_URL = "https://www.azernews.az"

def extract_image_from_style(style_str):
    if "url('" in style_str:
        return style_str.split("url('")[1].split("')")[0]
    return None

def find_conflict_section(soup):
    """Find section with header 'Armenian-Azerbaijani conflict'"""
    all_sections = soup.find_all("div", class_="col-12")
    for section in all_sections:
        header = section.find("h2")
        if header and header.text.strip().lower() == "armenian-azerbaijani conflict":
            return section
    return None

def get_conflict_articles():
    response = requests.get(BASE_URL)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    conflict_section = find_conflict_section(soup)
    if not conflict_section:
        print("❌ No 'Armenian-Azerbaijani conflict' section found.")
        return []

    articles = []

    # 1. Featured (large) article
    large_article = conflict_section.select_one("div.index-block-custom")
    if large_article:
        link_tag = large_article.find("a", class_="news-item large")
        img_tag = link_tag.find("img") if link_tag else None
        title_tag = large_article.find("h3")
        excerpt_tag = large_article.find("p")

        if link_tag and title_tag and img_tag:
            link = link_tag["href"]
            if not link.startswith("http"):
                link = BASE_URL + link

            articles.append({
                "title": title_tag.text.strip(),
                "link": link,
                "thumbnail": img_tag["src"],
                "summary": excerpt_tag.text.strip() if excerpt_tag else None
            })

    # 2. Right column articles
    list_items = conflict_section.select("div.col-md-6 ul.list-unstyled li")
    for item in list_items:
        link_tag = item.find("a", class_="news-item-sm")
        if not link_tag:
            continue

        title = link_tag.find("h4").text.strip() if link_tag.find("h4") else None
        link = link_tag["href"]
        if not link.startswith("http"):
            link = BASE_URL + link

        thumb_div = link_tag.find("div", class_="bg-thumb")
        style = thumb_div.get("style", "") if thumb_div else ""
        thumbnail = extract_image_from_style(style)

        articles.append({
            "title": title,
            "link": link,
            "thumbnail": thumbnail
        })

    return articles

def extract_article_details(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        author = None
        author_img = None
        publish_date = None
        full_content = []

        author_section = soup.find('div', class_='author')
        if author_section:
            author_tag = author_section.find('h6')
            author = author_tag.text.strip() if author_tag else None
            img_tag = author_section.find("img")
            author_img = img_tag["src"] if img_tag else None

        date_tag = soup.find('span', class_='me-3')
        if date_tag:
            publish_date = date_tag.text.strip()

        content_div = soup.find("div", class_="article-content")
        if content_div:
            paragraphs = content_div.find_all("p")
            full_content = [p.text.strip() for p in paragraphs if p.text.strip()]

        return {
            "author": author,
            "author_img": author_img,
            "publish_date": publish_date,
            "content": full_content
        }
    except Exception as e:
        print(f"❌ Error extracting from {url}: {e}")
        return {}

def scrape_conflict_articles():
    base_articles = get_conflict_articles()
    enriched = []
    for article in base_articles:
        print(f"🔍 Scraping: {article['title']}")
        details = extract_article_details(article["link"])
        article.update(details)
        enriched.append(article)
    return enriched

if __name__ == "__main__":
    print("🚀 Starting scraper for Conflict section...")
    data = scrape_conflict_articles()

    # Save to ../data/azernews_conflict.json
    data_dir = os.path.join("..", "data")
    os.makedirs(data_dir, exist_ok=True)

    file_path = os.path.join(data_dir, "azernews_conflict.json")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    print(f"✅ Conflict articles saved to '{file_path}'")
