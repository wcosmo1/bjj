"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/techniques", label: "Guide", icon: "☰" },
  { href: "/coach", label: "Coach", icon: "◉" },
  { href: "/progress", label: "Log", icon: "✎" },
  { href: "/curriculum", label: "Plan", icon: "▣" },
  { href: "/profile", label: "You", icon: "☺" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-800 bg-slate-950/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-0.5">
        {LINKS.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <li key={link.href} className="flex-1">
              <Link
                href={link.href}
                className={`flex min-h-[64px] flex-col items-center justify-center gap-0.5 px-0.5 text-[10px] font-medium transition ${
                  active
                    ? "text-lime-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="text-base leading-none" aria-hidden>
                  {link.icon}
                </span>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
