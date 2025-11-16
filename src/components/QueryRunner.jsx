// src/components/QueryRunner.jsx
import React, { useEffect, useState } from "react";
import "../styles/QueryRunner.css";

export default function QueryRunner({ toggleTheme, darkMode }) {
  const [query, setQuery] = useState("");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState([]);
  const [showOutput, setShowOutput] = useState(false);

  // history
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sqlrunner_history") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    // small sample default results hidden until run
    setResult([]);
  }, []);

  const runQuery = async () => {
    if (!query.trim()) return;
    setRunning(true);
    setShowOutput(false);

    // simulate backend delay
    setTimeout(() => {
      // For demo, we set mock result regardless of query
      const mock = [
        { first_name: "John", age: 31 },
        { first_name: "Robert", age: 22 },
        { first_name: "David", age: 22 },
      ];
      setResult(mock);
      setShowOutput(true);
      setRunning(false);

      // save to history (most recent first, max 30)
      const prev = [query, ...history].filter(Boolean).slice(0, 30);
      setHistory(prev);
      localStorage.setItem("sqlrunner_history", JSON.stringify(prev));
      setHistoryOpen(false);
    }, 700);
  };

  const onSelectHistory = (q) => {
    setQuery(q);
    setHistoryOpen(false);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("sqlrunner_history");
  };

  return (
    <div className="query-runner-root">
      {/* top controls */}
      <div className="query-top">
        <div className="tabs-inline">
          <button className="small-tab">Info</button>
          <button className="small-tab">Tips</button>
        </div>

        <div className="top-right">
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      {/* SQL editor */}
      <textarea
        className="editor-textarea"
        placeholder="Write your SQL query here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* actions: Run + History */}
      <div className="editor-actions">
        <button className="run-primary" onClick={runQuery} disabled={running}>
          {running ? "Running..." : "▶ Run SQL"}
        </button>

        <div className="history-wrapper">
          <button
            className="run-primary alt"
            onClick={() => setHistoryOpen((s) => !s)}
            title="Show query history"
          >
            ⏳ History
          </button>

          {historyOpen && (
            <div className="history-dropdown">
              {history.length === 0 ? (
                <div className="history-empty">No previous queries</div>
              ) : (
                <>
                  <div className="history-list">
                    {history.map((h, i) => (
                      <div
                        key={i}
                        className="history-item"
                        onClick={() => onSelectHistory(h)}
                      >
                        {h.length > 120 ? h.slice(0, 120) + "..." : h}
                      </div>
                    ))}
                  </div>
                  <div className="history-actions">
                    <button onClick={clearHistory}>Clear</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* output (only show when showOutput true) */}
      {showOutput && (
        <div className="output-area">
          <table className="output-table">
            <thead>
              <tr>
                <th>first_name</th>
                <th>age</th>
              </tr>
            </thead>
            <tbody>
              {result.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.first_name}</td>
                  <td>{r.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
