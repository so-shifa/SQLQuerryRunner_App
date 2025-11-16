// src/components/QueryRunner.jsx
import React, { useState, useContext, useEffect } from "react";
import "../styles/QueryRunner.css";
import { AuthContext } from "../contexts/AuthContext";

export default function QueryRunner({ toggleTheme, darkMode }) {
  const { user } = useContext(AuthContext);

  const [query, setQuery] = useState("");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState([]);

  // Load history from backend when page loads
  useEffect(() => {
    async function loadHistory() {
      if (!user || !user.username) return;
      try {
        const res = await fetch(
          `http://localhost:5000/history?username=${encodeURIComponent(
            user.username
          )}`
        );
        const data = await res.json();
        if (data.status === "success") {
          setHistory(data.history.map((h) => h.query));
        }
      } catch {}
    }
    loadHistory();
  }, [user]);

  const runQuery = async () => {
    if (!query.trim()) return;
    setRunning(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/execute-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, username: user?.username }),
      });

      const data = await res.json();

      if (data.status === "error") {
        setError(data.message);
      } else {
        setResult(data);
      }

      // Refresh backend history
      if (user?.username) {
        try {
          const resHistory = await fetch(
            `http://localhost:5000/history?username=${encodeURIComponent(
              user.username
            )}`
          );
          const dataHistory = await resHistory.json();
          if (dataHistory.status === "success") {
            setHistory(dataHistory.history.map((h) => h.query));
          }
        } catch {}
      }
    } catch (err) {
      setError("Backend not reachable");
    }

    setRunning(false);
  };

  return (
    <div className="query-runner-root">
      <div className="query-top">
        <div className="tabs-inline">
          <button className="small-tab">Info</button>
          <button className="small-tab">Tips</button>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>

      <textarea
        className="editor-textarea"
        placeholder="Write your SQL query here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="editor-actions">
        <button className="run-primary" onClick={runQuery} disabled={running}>
          {running ? "Running..." : "▶ Run SQL"}
        </button>

        <div className="history-wrapper">
          <button
            className="run-primary alt"
            onClick={() => setHistoryOpen(!historyOpen)}
          >
            ⏳ History
          </button>

          {historyOpen && (
            <div className="history-dropdown">
              {history.length === 0 ? (
                <div className="history-empty">No history</div>
              ) : (
                history.map((h, i) => (
                  <div
                    key={i}
                    className="history-item"
                    onClick={() => setQuery(h)}
                  >
                    {h}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="output-area">
        {error && <p style={{ color: "red" }}>{error}</p>}

        {result?.rows && (
          <table className="output-table">
            <thead>
              <tr>
                {result.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, idx) => (
                <tr key={idx}>
                  {result.columns.map((col) => (
                    <td key={col}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {result?.message && !result.rows && (
          <p style={{ color: "green" }}>
            {result.message} (Rows affected: {result.rows_affected})
          </p>
        )}
      </div>
    </div>
  );
}
