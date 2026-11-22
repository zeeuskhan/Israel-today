import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  hrefForPage: (page: number) => string;
};

export default function Pagination({ currentPage, totalPages, hrefForPage }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <nav className="pagination" aria-label="ניווט בין עמודים">
      {currentPage > 1 ? <Link href={hrefForPage(currentPage - 1)} rel="prev">הקודם</Link> : <span aria-disabled="true">הקודם</span>}
      <div>{pages.map((page) => page === currentPage
        ? <span key={page} aria-current="page" className="current">{page}</span>
        : <Link key={page} href={hrefForPage(page)}>{page}</Link>)}</div>
      {currentPage < totalPages ? <Link href={hrefForPage(currentPage + 1)} rel="next">הבא</Link> : <span aria-disabled="true">הבא</span>}
    </nav>
  );
}
