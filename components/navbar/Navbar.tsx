import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <br />
      <div className="navbar-container">
        <nav className={`navbar ${isOpen ? "show" : ""}`}>
          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div
            className={`menu ${isOpen ? "show" : ""}`}
            onClick={() => setIsOpen(false)} // Csak zárásra
          >
            <Link href="/">Film Gallery</Link>
            <Link href="/news">News</Link>
            <Link href="/characters">Characters</Link>
          </div>
        </nav>
      </div>
    </>
  );
}
