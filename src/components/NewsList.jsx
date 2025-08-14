import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import "./NewsList.css";

export default function NewsList({ searchTerm, preferences }) {
  const [articles, setArticles] = useState([]);
  const [newsCount, setNewsCount] = useState(0);
  const [guardianCount, setGuardianCount] = useState(0);
  const [nytCount, setNytCount] = useState(0);

  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
  const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // API 1: NewsAPI
        const newsRes = await fetch(
          `https://newsapi.org/v2/everything?q=${searchTerm || "news"}&apiKey=${NEWS_API_KEY}`
        );
        const newsData = await newsRes.json();
        const newsArticles = newsData.articles || [];
        setNewsCount(newsArticles.length);

        // API 2: Guardian
        const guardianRes = await fetch(
          `https://content.guardianapis.com/search?q=${searchTerm || "news"}&api-key=${GUARDIAN_API_KEY}&show-fields=thumbnail,byline`
        );
        const guardianData = await guardianRes.json();
        const guardianArticles = (guardianData.response?.results || []).map((item) => ({
          title: item.webTitle,
          description: "",
          url: item.webUrl,
          author: item.fields?.byline || "Unknown",
          source: { name: "The Guardian" },
          publishedAt: item.webPublicationDate,
          urlToImage: item.fields?.thumbnail || null,
        }));
        setGuardianCount(guardianArticles.length);

        // API 3: NYTimes Top Stories
        const nytRes = await fetch(
          `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${NYT_API_KEY}`
        );
        const nytData = await nytRes.json();
        const nytArticles = (nytData.results || []).map((item) => ({
          title: item.title,
          description: item.abstract,
          url: item.url,
          author: item.byline || "Unknown",
          source: { name: "NYTimes" },
          publishedAt: item.published_date,
          urlToImage: item.multimedia?.[0]?.url || null,
        }));
        setNytCount(nytArticles.length);

        // Merge all articles
        setArticles([...newsArticles, ...guardianArticles, ...nytArticles]);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [searchTerm]);

  // Filter articles based on preferences
  const filteredArticles = articles.filter((article) => {
    const categoryKeys = Object.keys(preferences.categories || {}).filter(
      (key) => preferences.categories[key]
    );
    const authorKeys = Object.keys(preferences.authors || {}).filter(
      (key) => preferences.authors[key]
    );

    const categoryMatch =
      categoryKeys.length === 0 ||
      categoryKeys.some(
        (cat) =>
          article.title?.toLowerCase().includes(cat.toLowerCase()) ||
          article.description?.toLowerCase().includes(cat.toLowerCase())
      );

    const authorMatch =
      authorKeys.length === 0 ||
      authorKeys.some((auth) => article.author?.toLowerCase().includes(auth.toLowerCase()));

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
              <Typography className="news-description">{article.description}</Typography>
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
          News Fetching
        </Typography>
      )}
    </Box>
  );
}
