// src/components/NewsList.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import "./NewsList.css"; // CSS file

export default function NewsList({ searchTerm, filters, preferences }) {
  const [articles, setArticles] = useState([]);
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = `https://newsapi.org/v2/everything?q=${searchTerm || "news"}&apiKey=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, [searchTerm]);

  const filteredArticles = articles.filter((article) => {
    // Categories
    const categoryKeys = Object.keys(preferences.categories || {}).filter(
      (key) => preferences.categories[key]
    );
    const categoryMatch =
      categoryKeys.length === 0 ||
      categoryKeys.some(
        (cat) =>
          article.title?.toLowerCase().includes(cat.toLowerCase()) ||
          article.description?.toLowerCase().includes(cat.toLowerCase())
      );

    // Authors
    const authorKeys = Object.keys(preferences.authors || {}).filter(
      (key) => preferences.authors[key]
    );
    const authorMatch =
      authorKeys.length === 0 ||
      authorKeys.some(
        (auth) =>
          article.author?.toLowerCase().includes(auth.toLowerCase())
      );

    return categoryMatch && authorMatch;
  });

  return (
    <Box className="cards-container">
      {filteredArticles.length > 0 ? (
        filteredArticles.map((article, index) => (
          <Card key={index} className="news-card">
            {article.urlToImage && (
              <CardMedia
                component="img"
                image={article.urlToImage}
                alt={article.title}
                className="news-image"
              />
            )}
            <CardContent>
              <Typography className="news-title">{article.title}</Typography>
              <Typography className="news-description">
                {article.description}
              </Typography>
              <Typography className="news-meta">
                {article.author || "Unknown"} — {article.source?.name}
              </Typography>
              <Typography className="news-meta">
                {new Date(article.publishedAt).toLocaleDateString()}
              </Typography>
              {article.url && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-link"
                >
                  Read More
                </a>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h6" sx={{ m: 2 }}>
          No results found.
        </Typography>
      )}
    </Box>
  );
}
