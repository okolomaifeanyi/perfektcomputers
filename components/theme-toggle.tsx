"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const THEME_CHANGE_EVENT = "themechange";

function getSnapshot(): Theme {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// The server (and the pre-hydration client render) can't read
// localStorage/matchMedia, so both must agree on the same placeholder
// value or React flags a hydration mismatch. The blocking script in
// layout.tsx has already set the real theme on <html> by paint time -
// this only controls which icon the toggle itself starts on, and
// useSyncExternalStore corrects it to the real value right after mount.
function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  function toggleTheme() {
    const next: Theme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-gold/10 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/60"
    >
      <Sun
        className={`h-4.5 w-4.5 transition-all duration-300 ${isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`}
        strokeWidth={1.5}
      />
      <Moon
        className={`absolute h-4.5 w-4.5 transition-all duration-300 ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"}`}
        strokeWidth={1.5}
      />
    </button>
  );
}
