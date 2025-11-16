// src/pages/MainPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import QueryRunner from "../components/QueryRunner";
import RightPanel from "../components/RightPanel";
import "../styles/MainPage.css";

export default function MainPage() {
  const { user, logout } = useContext(AuthContext);

  // panel state
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  // theme state
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode((s) => !s);

  // apply dark class to body so CSS that uses body.dark works
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    // cleanup not necessary here
  }, [darkMode]);

  return (
    <div className="main-page">
      {/* NAVBAR */}
      <header className="header glass">
        <div className="header-left">
          <div className="brand">SQLRunner</div>
        </div>

        <div className="header-right">
          <span className="welcome">Hello, {user?.username || "Guest"}</span>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT (position:relative so collapse buttons can be absolutely placed) */}
      <div className="layout-wrap">
        {/* LEFT PANEL */}
        <aside className={`left-col glass ${leftOpen ? "open" : "closed"}`}>
          <Sidebar />
        </aside>

        {/* left collapse handle placed between left and middle */}
        <button
          className={`collapse-handle left-handle ${
            leftOpen ? "" : "collapsed"
          }`}
          onClick={() => setLeftOpen((v) => !v)}
          aria-label="Toggle left panel"
        >
          {leftOpen ? "<" : ">"}
        </button>

        {/* MIDDLE PANEL */}
        <main
          className={`middle-col glass ${!leftOpen ? "expand-left" : ""} ${
            !rightOpen ? "expand-right" : ""
          }`}
        >
          <QueryRunner
            toggleTheme={toggleTheme}
            darkMode={darkMode}
            leftOpen={leftOpen}
            rightOpen={rightOpen}
          />
        </main>

        {/* right collapse handle placed between middle and right */}
        <button
          className={`collapse-handle right-handle ${
            rightOpen ? "" : "collapsed"
          }`}
          onClick={() => setRightOpen((v) => !v)}
          aria-label="Toggle right panel"
        >
          {rightOpen ? ">" : "<"}
        </button>

        {/* RIGHT PANEL */}
        <aside className={`right-col glass ${rightOpen ? "open" : "closed"}`}>
          <RightPanel />
        </aside>
      </div>
    </div>
  );
}
