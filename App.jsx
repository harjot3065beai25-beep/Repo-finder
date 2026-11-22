import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch GitHub repositories
  async function handleSubmit(e) {
    e.preventDefault();

    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setRepos([]);

    try {
      const response = await fetch(
        `https://api.github.com/users/${username.trim()}/repos`
      );

      if (!response.ok) {
        throw new Error("GitHub user not found!");
      }

      const data = await response.json();

      setRepos(data);

      if (data.length === 0) {
        setError("No repositories found!");
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">

      <h1>GitHub Repository Finder</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Github username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <button type="submit">
          Search
        </button>

      </form>

      {loading && <p>Loading repositories...</p>}

      {error && <p className="error">{error}</p>}

      <div className="repo-list">

        {repos.map((repo) => (

          <div className="repo-card" key={repo.id}>

            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {repo.name}
            </a>

            <p>{repo.description || "No description available."}</p>

            <small>
              ⭐ {repo.stargazers_count} Stars
            </small>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;