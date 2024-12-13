import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ArticlePage = () => {
  const { articleId } = useParams(); // Get the article ID from URL params
  const [article, setArticle] = useState(null); // State to store the article data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const endpoint = "https://gogreen-69200-default-rtdb.europe-west1.firebasedatabase.app/articles.json"; // Firebase endpoint

  // Fetch article from Firebase by ID
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();

        // Find the article by ID (use articleId from params)
        const articleData = Object.keys(data).find(key => key === articleId);
        
        if (articleData) {
          setArticle({ id: articleData, ...data[articleData] });
        } else {
          setError("Article not found.");
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load article.");
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]); // Run when articleId changes

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>{error}</p>;
  if (!article) return <p>Article not found!</p>;

  return (
    <div className="article">
      <h1>{article["main-title"]}</h1>
      <p>{article.introduction}</p>
      <h3>Key Benefits:</h3>
      <ul>
        {article.key_benefits && article.key_benefits.map((benefit, index) => (
          <li key={index}>
            <strong>{benefit.title}:</strong> {benefit.description}
          </li>
        ))}
      </ul>
      <h3>Tips for Recycling:</h3>
      <ul>
        {article.tips_for_recycling && article.tips_for_recycling.map((tip, index) => (
          <li key={index}>
            <strong>{tip.tip}:</strong> {tip.description}
          </li>
        ))}
      </ul>
      <h3>Challenges:</h3>
      <ul>
        {article.challenges && article.challenges.map((challenge, index) => (
          <li key={index}>
            <strong>{challenge.challenge}:</strong> {challenge.description}
          </li>
        ))}
      </ul>
      <h3>Conclusion:</h3>
      <p>{article.conclusion}</p>
    </div>
  );
};

export default ArticlePage;
