"use client";

import { useState, useMemo, useEffect } from "react";
import {
  experiments,
  categories,
  visibleCategories,
  visibleExperiments,
  PHYSICS_FIRST,
} from "@/data/experiments";
import { Star, Search, X, ArrowRight } from "lucide-react";

/** Next basePath for static museum embed (raw <a> tags need this). */
const BASE = "/museum/physics";

function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  } catch {
    return [];
  }
}

function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <a href={`${BASE}/`} className="flex items-center gap-2.5 min-w-0">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white text-sm font-bold"
            style={{ background: "var(--easi-green)" }}
            aria-hidden
          >
            Φ
          </span>
          <div className="min-w-0">
            <div className="text-base font-bold text-[var(--ink)] leading-tight truncate">
              EASI Physics
            </div>
            <div className="text-[11px] text-[var(--ink-2)] leading-tight truncate">
              Interactive 3D lab · Science Museum
            </div>
          </div>
        </a>
        <div className="hidden sm:flex gap-1.5 flex-wrap justify-end">
          {visibleCategories.map((cat) => (
            <a
              key={cat.id}
              href="#experiments"
              className="px-3 py-1.5 rounded-full text-sm text-[var(--ink-2)] hover:text-[var(--easi-green-deep)] hover:bg-[var(--green-soft)] transition-colors"
            >
              {cat.icon} {cat.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

function CategoryBadge({
  category,
  active,
  onClick,
}: {
  category: (typeof categories)[0] | { id: string; name: string; icon: string; color?: string };
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-colors whitespace-nowrap ${
        active
          ? "bg-[var(--easi-green)] text-white shadow-sm"
          : "bg-white text-[var(--ink-2)] border border-[var(--border)] hover:border-[var(--easi-green)] hover:text-[var(--easi-green-deep)]"
      }`}
    >
      <span>{category.icon}</span>
      {category.name}
    </button>
  );
}

function ExperimentCard({
  exp,
  onToggleFavorite,
}: {
  exp: (typeof experiments)[0];
  onToggleFavorite: (id: string) => void;
}) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(exp.id));
  }, [exp.id]);

  const handleClickFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(exp.id);
    setFav((f) => !f);
  };

  return (
    <a
      href={`${BASE}/experiments/${exp.id}/`}
      className="group easi-card rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer block relative"
    >
      <div
        className="absolute top-0 left-4 right-4 h-[3px] rounded-b-full"
        style={{ background: "var(--easi-green)" }}
      />

      <button
        onClick={handleClickFavorite}
        className={`absolute top-3 right-3 p-2 rounded-lg transition-colors ${
          fav
            ? "text-[var(--signal)] bg-[var(--signal-soft)]"
            : "text-[var(--ink-3)] hover:text-[var(--signal)]"
        }`}
        title={fav ? "Remove from favorites" : "Add to favorites"}
        type="button"
      >
        <Star size={16} fill={fav ? "currentColor" : "none"} />
      </button>

      <div className="flex items-start justify-between mb-3 pr-8">
        <span className="text-3xl" aria-hidden>
          {exp.icon}
        </span>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-[var(--green-soft)] text-[var(--easi-green-deep)]">
          {exp.difficulty}
        </span>
      </div>
      <h3 className="text-base font-bold mb-1.5 text-[var(--ink)] group-hover:text-[var(--easi-green-deep)] transition-colors">
        {exp.title}
      </h3>
      <p className="text-sm text-[var(--ink-2)] mb-3 line-clamp-2">{exp.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {exp.topics.slice(0, 3).map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-secondary)] text-[var(--ink-3)]"
          >
            {t}
          </span>
        ))}
        {exp.topics.length > 3 && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-secondary)] text-[var(--ink-3)]">
            +{exp.topics.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--border)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-xs font-medium capitalize text-[var(--easi-green)]">
          {exp.category}
        </span>
        <span className="text-xs text-[var(--ink-2)] flex items-center gap-1">
          Open <ArrowRight size={12} />
        </span>
      </div>
    </a>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>(
    PHYSICS_FIRST ? "physics" : "all"
  );
  const [search, setSearch] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    // Museum embed: always light (ignore saved dark preference).
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    setFavoritesCount(getFavorites().length);
  }, []);

  const filtered = useMemo(() => {
    let result = visibleExperiments.filter((exp) => {
      const matchCat = activeCategory === "all" || exp.category === activeCategory;
      const matchSearch =
        search === "" ||
        exp.title.toLowerCase().includes(search.toLowerCase()) ||
        exp.description.toLowerCase().includes(search.toLowerCase()) ||
        exp.topics.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });

    if (showFavoritesOnly) {
      const favorites = getFavorites();
      result = result.filter((exp) => favorites.includes(exp.id));
    }

    return result;
  }, [activeCategory, search, showFavoritesOnly]);

  const handleToggleFavorite = (id: string) => {
    const favorites = getFavorites();
    if (favorites.includes(id)) {
      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites.filter((f) => f !== id))
      );
    } else {
      localStorage.setItem("favorites", JSON.stringify([...favorites, id]));
    }
    setFavoritesCount(getFavorites().length);
  };

  return (
    <main className="min-h-screen">
      <Header />

      <section id="experiments" className="max-w-7xl mx-auto px-4 pt-6 pb-12">
        <div className="mb-6">
          <p className="text-sm text-[var(--ink-2)] mb-5">
            Choose an experiment — control variables and watch the 3D simulation.
          </p>

          <div className="max-w-md mb-5 relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-3)]"
              size={18}
            />
            <input
              type="text"
              placeholder="Search experiments…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[var(--border)] text-[var(--ink)] placeholder-[var(--ink-3)] outline-none focus:ring-2 focus:ring-[var(--easi-green)]/30 focus:border-[var(--easi-green)] text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors"
                type="button"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {!PHYSICS_FIRST && (
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setShowFavoritesOnly(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
                  activeCategory === "all" && !showFavoritesOnly
                    ? "bg-[var(--easi-green)] text-white"
                    : "bg-white text-[var(--ink-2)] border border-[var(--border)]"
                }`}
                type="button"
              >
                <span>🔬</span>
                All
              </button>
            )}

            <button
              onClick={() => {
                setActiveCategory(PHYSICS_FIRST ? "physics" : "all");
                setShowFavoritesOnly((prev) => !prev);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
                showFavoritesOnly
                  ? "bg-[var(--signal)] text-white"
                  : "bg-white text-[var(--ink-2)] border border-[var(--border)]"
              }`}
              type="button"
            >
              <span>⭐</span>
              Favorites
              {favoritesCount > 0 && (
                <span className="ml-0.5 text-xs bg-black/10 px-1.5 py-0.5 rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>

            {visibleCategories.map((cat) => (
              <CategoryBadge
                key={cat.id}
                category={cat}
                active={activeCategory === cat.id && !showFavoritesOnly}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setShowFavoritesOnly(false);
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((exp) => (
            <ExperimentCard
              key={exp.id}
              exp={exp}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[var(--ink-3)] text-sm">
            {showFavoritesOnly
              ? "No favorites yet. Click the star on any experiment to save it."
              : "No experiments found. Try a different search."}
          </div>
        )}
      </section>

      <footer className="border-t border-[var(--border)] py-4 text-center text-[var(--ink-3)] text-xs">
        Based on ScienceLab 3D (MIT) · EASI Physics · Pivot Ventures
      </footer>
    </main>
  );
}
