import React, { useEffect, useState } from "react";
import "./NewsList.css";

export default function NewsList({ searchTerm, preferences, filters }) {
  const [articles, setArticles] = useState([]);
  const API_KEY = "6dcaa47a29ba4c45acd1ce8cc8706a41";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const query = searchTerm?.trim() || "technology";
        const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, [searchTerm]);

  const filteredArticles = articles.filter((article) => {
    // --- Category filter ---
    const selectedCategories = Object.keys(filters?.categories || {}).filter(
      (key) => filters.categories[key]
    );
    let categoryMatch = true;
    if (selectedCategories.length > 0) {
      categoryMatch = selectedCategories.some((cat) =>
        (article.title + article.description)
          .toLowerCase()
          .includes(cat.toLowerCase())
      );
    }

    // --- Author filter (Preferences) ---
    const selectedAuthors = Object.keys(preferences?.authors || {}).filter(
      (key) => preferences.authors[key]
    );
    let authorMatch = true;
    if (selectedAuthors.length > 0) {
      authorMatch = article.author && selectedAuthors.includes(article.author);
    }

    // --- Source filter ---
    const selectedSources = Object.keys(filters?.sources || {}).filter(
      (key) => filters.sources[key]
    );
    let sourceMatch = true;
    if (selectedSources.length > 0) {
      sourceMatch =
        article.source?.name &&
        selectedSources.includes(article.source.name);
    }

    // --- Date filter ---
    let dateMatch = true;
    if (filters.fromDate) {
      dateMatch = new Date(article.publishedAt) >= new Date(filters.fromDate);
    }
    if (dateMatch && filters.toDate) {
      dateMatch = new Date(article.publishedAt) <= new Date(filters.toDate);
    }

    return categoryMatch && authorMatch && sourceMatch && dateMatch;
  });

  return (
    <div className="news-container">
      {filteredArticles.length > 0 ? (
        filteredArticles.map((article, index) => (
          <div className="news-card" key={index}>
            <img
              src={
                article.urlToImage ||
                "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={article.title}
              className="news-image"
            />
            <div className="news-content">
              <div className="news-title">{article.title}</div>
              <div className="news-description">
                {article.description || "No description available."}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-news">No news found.</div>
      )}
    </div>
  );
}
