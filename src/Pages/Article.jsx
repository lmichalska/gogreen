import React from 'react';
import { useParams } from 'react-router-dom';
import articlesData from '../articles.json'; // Import the JSON data

const ArticlePage = () => {
  const { articleId } = useParams(); // Get the article index from URL params
  const article = articlesData.articles[articleId]; // Access the specific article

  if (!article) {
    return <p>Article not found!</p>;
  }

  return (
    <div className="article">
      <h1>{article["main-title"]}</h1>
      <p>{article.introduction}</p>
      <h3>Key Benefits:</h3>
      <ul>
        {article.key_benefits.map((benefit, index) => (
          <li key={index}>
            <strong>{benefit.title}:</strong> {benefit.description}
          </li>
        ))}
      </ul>
      <h3>Tips for Recycling:</h3>
      <ul>
        {article.tips_for_recycling.map((tip, index) => (
          <li key={index}>
            <strong>{tip.tip}:</strong> {tip.description}
          </li>
        ))}
      </ul>
      <h3>Challenges:</h3>
      <ul>
        {article.challenges.map((challenge, index) => (
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
