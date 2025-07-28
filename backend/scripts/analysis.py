import os
import requests
import json
from bs4 import BeautifulSoup

BASE_URL = "https://www.azernews.az"

def extract_image_from_style(style_str):
    if "url('" in style_str:
        return style_str.split("url('")[1].split("')")[0]
    return None

def find_analysis_section(soup):
    """Find section where <h2>Analysis</h2> is present"""
    all_sections = soup.find_all("div", class_="col-12")
    for section in all_sections:
        header = section.find("h2")
        if header and header.text.strip().lower() == "analysis":
            return section
    return None

def get_analysis_articles():
    response = requests.get(BASE_URL)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    analysis_section = find_analysis_section(soup)
    if not analysis_section:
        print("❌ No 'Analysis' section found.")
        return []

    articles = []
    items = analysis_section.select("div.col-md-6 ul.list-unstyled li")

    for item in items:
        link_tag = item.find("a", class_="news-item-sm")
        if not link_tag:
            continue

        title = link_tag.find("h4").text.strip() if link_tag.find("h4") else None
        link = link_tag["href"]
        if not link.startswith("http"):
            link = BASE_URL + link

        thumb_div = link_tag.find("div", class_="bg-thumb")
        style_attr = thumb_div.get("style", "") if thumb_div else ""
        thumbnail = extract_image_from_style(style_attr)

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

        author_block = soup.find("div", class_="author")
        if author_block:
            author_tag = author_block.find("h6")
            author = author_tag.text.strip() if author_tag else None
            img_tag = author_block.find("img")
            author_img = img_tag["src"] if img_tag else None

        date_tag = soup.find("span", class_="me-3")
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

def scrape_analysis():
    basic_articles = get_analysis_articles()
    enriched_articles = []

    for article in basic_articles:
        print(f"🔍 Scraping: {article['title']}")
        details = extract_article_details(article["link"])
        article.update(details)
        enriched_articles.append(article)

    return enriched_articles

if __name__ == "__main__":
    print("🚀 Starting scraper for Analysis articles...")
    data = scrape_analysis()

    # Define ../data directory path
    data_dir = os.path.join("..", "data")
    os.makedirs(data_dir, exist_ok=True)

    # Save JSON inside backend/data/
    output_path = os.path.join(data_dir, "azernews_analysis.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print(f"✅ Analysis articles saved to '{output_path}'")

