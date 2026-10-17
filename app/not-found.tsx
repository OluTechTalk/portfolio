import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page wrap">
      <header className="page-head">
        <p className="meta-line mono">
          <span>Error 404</span>
        </p>
        <h1 className="display page-title">Not found</h1>
        <p className="lede">
          This page doesn&apos;t exist, or it hasn&apos;t shipped yet.
        </p>
        <div className="btn-row">
          <Link href="/" className="btn btn-solid">
            Back to home
          </Link>
          <Link href="/log" className="btn">
            Read the build log
          </Link>
        </div>
      </header>
    </main>
  );
}
