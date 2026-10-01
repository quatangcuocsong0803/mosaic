"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Navbar.module.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tests", href: "/test" },
  { label: "Discover", href: "/discover" },
  { label: "Discussion", href: "/discussion" },
  { label: "Knowledge", href: "/knowledge" },
  { label: "Statistics", href: "/statistics" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className={styles.header}>
      <nav
        className={styles.nav}
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          className={styles.brand}
          onClick={closeMenu}
        >
          MOSAIC
        </Link>

        <div className={styles.desktopNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${
                isActive(item.href)
                  ? styles.navLinkActive
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.desktopActions}>
          <Link
            href="/login"
            className={styles.signIn}
          >
            Sign in
          </Link>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={
            open ? "Close navigation" : "Open navigation"
          }
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div
        className={`${styles.mobilePanel} ${
          open ? styles.mobilePanelOpen : ""
        }`}
      >
        <div className={styles.mobileNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileLink} ${
                isActive(item.href)
                  ? styles.mobileLinkActive
                  : ""
              }`}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}

          <div className={styles.mobileDivider} />

          <Link
            href="/login"
            className={styles.mobileSignIn}
            onClick={closeMenu}
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}
