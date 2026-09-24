import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-6" style={{ background: "#f9f8f6", color: "#1f1e1b" }}>
      <p className="font-dm uppercase" style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "rgba(31,30,27,0.7)" }}>404</p>
      <h1 className="font-cormorant font-light" style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", lineHeight: 1.1, margin: "1rem 0" }}>
        This page doesn&apos;t exist.
      </h1>
      <p className="font-dm" style={{ fontSize: "0.85rem", color: "rgba(31,30,27,0.7)" }}>
        Nothing lives at <code>{location.pathname}</code>.
      </p>
      <Link to="/" className="font-dm font-medium rounded-full" style={{ marginTop: "2rem", padding: "0.8rem 1.6rem", background: "#1f1e1b", color: "#ffffff", fontSize: "0.8rem" }}>
        Back to the portfolio
      </Link>
    </main>
  );
}
