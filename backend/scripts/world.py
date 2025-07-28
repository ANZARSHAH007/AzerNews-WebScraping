import os
import requests
import json
from bs4 import BeautifulSoup

BASE_URL = "https://www.azernews.az"

def extract_image_from_style(style_str):
    if "url('" in style_str:
        return style_str.split("url('")[1].split("')")[0]
    return None

def find_world_section(soup):
    all_sections = soup.find_all("div", class_="col-md-6")
    for section in all_sections:
        header = section.find("h2")
        if header and header.text.strip().lower() == "world":
            return section
    return None

def get_world_articles():
    response = requests.get(BASE_URL)
    soup = BeautifulSoup(response.text, 'html.parser')

    section = find_world_section(soup)
    if not section:
        print("❌ No 'World' section found.")
        return []

    articles = []

    # 1. Main article
    main_link = section.find("a", class_="news-item mb-3")
    if main_link:
        img_tag = main_link.find("img")
        title_tag = section.find("h3")
        excerpt_tag = section.find("p")
        if title_tag and img_tag:
            link = main_link["href"]
            if not link.startswith("http"):
                link = BASE_URL + link
            articles.append({
                "title": title_tag.text.strip(),
                "link": link,
                "thumbnail": img_tag["src"],
                "summary": excerpt_tag.text.strip() if excerpt_tag else None
            })

    # 2. List articles
    list_items = section.select("ul.list-unstyled li")
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
            name_tag = author_section.find("h6")
            author = name_tag.text.strip() if name_tag else None
            img_tag = author_section.find("img")
            author_img = img_tag["src"] if img_tag else None

        date_tag = soup.find("span", class_="me-3")
        publish_date = date_tag.text.strip() if date_tag else None

        content = soup.find("div", class_="article-content")
        if content:
            paragraphs = content.find_all("p")
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

def scrape_world_articles():
    base_articles = get_world_articles()
    enriched = []
    for article in base_articles:
        print(f"🔍 Scraping: {article['title']}")
        details = extract_article_details(article["link"])
        article.update(details)
        enriched.append(article)
    return enriched

if __name__ == "__main__":
    print("🚀 Starting scraper for World section...")
    data = scrape_world_articles()

    # Save to ../data/azernews_world.json
    data_dir = os.path.join("..", "data")
    os.makedirs(data_dir, exist_ok=True)

    file_path = os.path.join(data_dir, "azernews_world.json")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    print(f"✅ World articles saved to '{file_path}'")
