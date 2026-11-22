import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container empty-state not-found">
      <p className="kicker">404</p>
      <h1>העמוד לא נמצא</h1>
      <p>ייתכן שהכתבה הוסרה או שהכתובת השתנתה.</p>
      <Link className="read-more" href="/">חזרה לעמוד הראשי ←</Link>
    </main>
  );
}
