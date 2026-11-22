"use client";

import { useState } from "react";

export default function ArticleActions() {
  const [message, setMessage] = useState("");

  async function shareArticle() {
    const url = window.location.href;
    const title = document.title;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setMessage("הקישור הועתק");
      } else {
        setMessage("אפשר להעתיק את כתובת העמוד משורת הכתובת");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") setMessage("לא ניתן לשתף כרגע");
    }
  }

  return (
    <div className="article-actions" aria-label="פעולות לכתבה">
      <button type="button" onClick={shareArticle}>שתף כתבה</button>
      <button type="button" onClick={() => window.print()}>הדפס כתבה</button>
      {message && <span role="status" className="action-status">{message}</span>}
    </div>
  );
}
