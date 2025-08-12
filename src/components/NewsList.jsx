import React, { useEffect, useState } from "react";
import "./NewsList.css";

export default function NewsList({ searchTerm }) {
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

  return (
    <div className="news-container">
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <div className="news-card" key={index}>
            <img
              src={article.urlToImage || "https://via.placeholder.com/300x200?text=No+Image"}
              alt={article.title}
              className="news-image"
            />
            <div className="news-content">
              <div className="news-title">{article.title}</div>
              <div className="news-description">{article.description || "No description available."}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-news">No news found.</div>
      )}
    </div>
  );
}
