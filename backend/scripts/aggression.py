import os
import requests
import json
from bs4 import BeautifulSoup

BASE_URL = "https://www.azernews.az"

def extract_image_from_style(style_str):
    if "url('" in style_str:
        return style_str.split("url('")[1].split("')")[0]
    return None

def find_aggression_section(soup):
    all_sections = soup.find_all("div", class_="col-md-6")
    for section in all_sections:
        header = section.find("h2")
        if header and header.text.strip().lower() == "armenian aggression":
            return section
    return None

def get_aggression_articles():
    response = requests.get(BASE_URL)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    section = find_aggression_section(soup)
    if not section:
        print("❌ No 'Armenian Aggression' section found.")
        return []

    articles = []

    # 1. Main article
    main_link = section.find("a", class_="news-item mb-3")
    if main_link:
        img_tag = main_link.find("img")
        title_tag = section.find("h3")
        if title_tag and img_tag:
            link = main_link["href"]
            if not link.startswith("http"):
                link = BASE_URL + link
            articles.append({
                "title": title_tag.text.strip(),
                "link": link,
                "thumbnail": img_tag["src"]
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

        style_div = link_tag.find("div", class_="bg-thumb")
        style = style_div.get("style", "") if style_div else ""
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
        if date_tag:
            publish_date = date_tag.text.strip()

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
        print(f"❌ Error processing {url}: {e}")
        return {}

def scrape_aggression_articles():
    articles = get_aggression_articles()
    full_data = []
    for article in articles:
        print(f"🔍 Scraping: {article['title']}")
        details = extract_article_details(article["link"])
        article.update(details)
        full_data.append(article)
    return full_data

if __name__ == "__main__":
    print("🚀 Starting scraper for Armenian Aggression articles...")
    data = scrape_aggression_articles()

    # Define ../data directory path
    data_dir = os.path.join("..", "data")
    os.makedirs(data_dir, exist_ok=True)

    # Save JSON inside backend/data/
    output_path = os.path.join(data_dir, "azernews_aggression_full.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print(f"✅ Armenian Aggression articles saved to '{output_path}'")
