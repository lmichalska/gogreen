import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ArticlesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]); // State to store articles
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  const endpoint = "https://gogreen-69200-default-rtdb.europe-west1.firebasedatabase.app/articles.json"; // Firebase endpoint

  // Fetch articles from Firebase
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        
        // If data is an object, convert it to an array for easier handling
        const articleArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));

        setArticles(articleArray); // Set the articles state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Failed to load articles."); // Set error state if fetch fails
        setLoading(false);
      }
    };

    fetchArticles();
  }, []); // Run once when the component mounts

  // Filter articles based on the search query
  const filteredArticles = articles.filter((article) =>
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

      {loading && <p>Loading articles...</p>}
      {error && <p>{error}</p>}

      {/* Display filtered articles */}
      <div className="articles-list">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <div key={article.id} className="article-item">
              <Link to={`/article/${article.id}`}>
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