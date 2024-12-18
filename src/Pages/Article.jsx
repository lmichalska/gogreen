import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint =
    "https://gogreen-69200-default-rtdb.europe-west1.firebasedatabase.app/articles.json";

  // Fetch the specific article by ID
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const articleData = Object.keys(data).find((key) => key === articleId);

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
  }, [articleId]);

  if (loading)
    return <p role="status" aria-live="polite">Loading article...</p>;

  if (error) return <p role="alert">{error}</p>;

  if (!article) return <p role="alert">Article not found!</p>;

  return (
    <main aria-labelledby="article-title">
      <div className="info-section">
        <header>
          <h1 id="article-title">{article["main-title"]}</h1>
        </header>
        <section aria-labelledby="introduction-heading">
          <h2 id="introduction-heading">Introduction</h2>
          <p>{article.introduction}</p>
        </section>
        {article.key_benefits && (
          <section aria-labelledby="benefits-heading">
            <h2 id="benefits-heading">Key Benefits</h2>
            <ul>
              {article.key_benefits.map((benefit, index) => (
                <li key={index}>
                  <strong>{benefit.title}:</strong> {benefit.description}
                </li>
              ))}
            </ul>
          </section>
        )}
        {article.tips_for_recycling && (
          <section aria-labelledby="tips-heading">
            <h2 id="tips-heading">Tips for Recycling</h2>
            <ul>
              {article.tips_for_recycling.map((tip, index) => (
                <li key={index}>
                  <strong>{tip.tip}:</strong> {tip.description}
                </li>
              ))}
            </ul>
          </section>
        )}

        {article.challenges && (
          <section aria-labelledby="challenges-heading">
            <h2 id="challenges-heading">Challenges</h2>
            <ul>
              {article.challenges.map((challenge, index) => (
                <li key={index}>
                  <strong>{challenge.challenge}:</strong> {challenge.description}
                </li>
              ))}
            </ul>
          </section>
        )}
        <section aria-labelledby="conclusion-heading">
          <p>{article.conclusion}</p>
        </section>
      </div>
    </main>
  );
};

export default ArticlePage;