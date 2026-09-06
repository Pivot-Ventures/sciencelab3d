"use client";

import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg-primary)]">
      <div className="text-center max-w-md">
        <div
          className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
          style={{ background: "var(--easi-green)" }}
        >
          Φ
        </div>
        <h1 className="text-5xl font-black text-[var(--easi-green)] mb-2">404</h1>
        <h2 className="text-xl font-bold text-[var(--ink)] mb-2">Experiment not found</h2>
        <p className="text-[var(--ink-2)] text-sm mb-8">
          This experiment isn&apos;t available in the EASI Physics lab.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white text-sm"
            style={{ background: "var(--easi-green)" }}
          >
            <Home size={16} /> Back to Lab
          </Link>
          <Link
            href="/#experiments"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border border-[var(--border)] bg-white text-[var(--ink)]"
          >
            <ArrowLeft size={16} /> Browse
          </Link>
        </div>
      </div>
    </div>
  );
}
