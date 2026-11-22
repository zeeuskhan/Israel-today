"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Israel Today page error:", error);
  }, [error]);

  return (
    <main className="container empty-state not-found">
      <h1>אירעה שגיאה בטעינת העמוד</h1>
      <p>אפשר לנסות לטעון מחדש. אם הבעיה נמשכת, חזרו לעמוד הראשי.</p>
      <div className="article-actions">
        <button type="button" onClick={() => reset()}>נסה שוב</button>
        <a className="read-more" href="/">לעמוד הראשי ←</a>
      </div>
    </main>
  );
}
