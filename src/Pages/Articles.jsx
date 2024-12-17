import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ArticlesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const endpoint =
    "https://gogreen-69200-default-rtdb.europe-west1.firebasedatabase.app/articles.json";

  // Fetch articles from Firebase
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();

        const articleArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setArticles(articleArray);
        setLoading(false);
      } catch (err) {
        setError("Failed to load articles.");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter articles based on the search query
  const filteredArticles = articles.filter((article) =>
    article["main-title"].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    setSearchPerformed(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchPerformed(false);
  };

  return (
    <main>
      <h1>Articles on Recycling</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for articles..."
          value={searchQuery}
          onChange={handleSearchChange}
          aria-label="Search for articles"
        />
        <button
          onClick={searchPerformed ? () => setSearchQuery("") : handleSearch}
          aria-label={searchPerformed ? "Clear search input" : "Perform search"}
        >
          {searchPerformed ? "Clear" : "Search"}
        </button>
      </div>
      {loading && (
        <p role="status" aria-live="polite">
          Loading articles...
        </p>
      )}
      {error && <p role="alert">{error}</p>}

      <div className="articles-list">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article.id} className="article-item">
              <Link
                to={`/article/${article.id}`}
                aria-label={`Read more about ${article["main-title"]}`}
              >
                <h2>{article["main-title"]}</h2>
              </Link>
              <p>{article.introduction}</p>
            </div>
          ))
        ) : (
          <p>No articles found</p>
        )}
      </div>
      </main>
  );
};

export default ArticlesPage;