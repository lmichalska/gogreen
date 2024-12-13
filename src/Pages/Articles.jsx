import React, { useState } from "react";
import { Link } from "react-router-dom";
import articlesData from "../articles.json"; // Import the JSON data

const ArticlesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the articles based on the search query
  const filteredArticles = articlesData.articles.filter((article) =>
    article["main-title"].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setSearchQuery("")}>Clear</button>
      </div>
      
      <h1>Articles on Recycling</h1>
      
      {/* Display filtered articles */}
      <div className="articles-list">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <div key={index} className="article-item">
              <Link to={`/article/${index}`}>
                <h2>{article["main-title"]}</h2>
              </Link>
              <p>{article.introduction}</p>
            </div>
          ))
        ) : (
          <p>No articles found</p>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
