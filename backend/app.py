import os
import json
from flask import Flask, jsonify, abort
from flask_cors import CORS  # ✅ Import CORS

app = Flask(__name__)
CORS(app)  # ✅ Enable CORS for all routes

# Path to data folder inside backend
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

# Category to JSON filename mapping
CATEGORIES = {
    "nation": "azernews_nation.json",
    "analysis": "azernews_analysis.json",
    "armenian-aggression": "azernews_aggression_full.json",
    "armenian-azerbaijan-conflict": "azernews_conflict.json",
    "world": "azernews_world.json",
    "culture": "azernews_culture.json"
}

# Load all articles on startup into memory
articles_by_category = {}

for category, filename in CATEGORIES.items():
    file_path = os.path.join(DATA_DIR, filename)
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            try:
                articles_by_category[category] = json.load(f)
            except json.JSONDecodeError:
                articles_by_category[category] = []
    else:
        articles_by_category[category] = []

# Get articles from a specific category
@app.route("/api/articles/<category>")
def get_articles_by_category(category):
    category = category.lower()
    if category not in CATEGORIES:
        abort(404, description=f"No data found for category: {category}")

    file_path = os.path.join(DATA_DIR, CATEGORIES[category])
    if not os.path.exists(file_path):
        abort(404, description="File not found")

    with open(file_path, "r", encoding="utf-8") as f:
        articles = json.load(f)
    return jsonify(articles)

# Get all categories' articles
@app.route("/api/articles")
def get_all_articles():
    return jsonify(articles_by_category)

# API health check
@app.route("/")
def index():
    return jsonify({
        "message": "✅ Azernews API is running",
        "routes": [
            "/api/articles",
            "/api/articles/<category>",
        ],
        "categories": list(CATEGORIES.keys())
    })

if __name__ == "__main__":
    app.run(debug=True)
