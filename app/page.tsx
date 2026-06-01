"use client";

import { useState } from "react";

const FORMSPREE_ID = "mzdwljdr";

type FormStatus = "idle" | "loading" | "success" | "error";

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="w-12 h-12 rounded-full bg-amber flex items-center justify-center text-white text-xl font-bold">✓</div>
        <p className="font-bold text-lg text-warm-text">You&apos;re on the list!</p>
        <p className="text-warm-secondary text-sm">We&apos;ll email you the moment BookWriggle launches.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <div className="flex gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 border border-warm-border bg-white text-warm-text placeholder:text-warm-muted rounded-2xl px-5 py-3 text-base focus:outline-none focus:border-amber transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email.trim()}
          className="bg-amber hover:bg-amber-light disabled:opacity-50 text-white font-bold rounded-2xl px-6 py-3 text-sm transition-colors shrink-0"
        >
          {status === "loading" ? "..." : "Notify me"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-red-500 text-xs mt-3">Something went wrong — please try again.</p>
      )}
    </form>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-cream flex flex-col">

      {/* Nav */}
      <nav className="border-b border-warm-border px-6 h-16 flex items-center">
        <span className="font-[var(--font-playfair)] text-warm-text text-xl font-black tracking-tight">
          🐛 BookWriggle
        </span>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 gap-8">
        <div className="inline-flex items-center gap-2 border border-warm-border rounded-full px-4 py-1.5 text-sm text-warm-muted">
          <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
          Coming soon · iOS & Android · Free
        </div>

        <h1 className="font-[var(--font-playfair)] text-5xl md:text-6xl text-warm-text leading-tight max-w-2xl">
          Discover books<br />you&apos;ll actually love.
        </h1>

        <p className="text-warm-secondary text-lg md:text-xl leading-relaxed max-w-xl">
          BookWriggle is a free book discovery app. Scroll through a personalised
          feed of books based on your taste, save the ones that catch your eye, and
          buy on Amazon Kindle in one tap — completely free, no subscription ever.
        </p>

        <div className="flex flex-col items-center gap-3 w-full">
          <p className="text-warm-text font-semibold">Get notified when we launch</p>
          <WaitlistForm />
          <p className="text-warm-muted text-xs">No spam. One email when we go live.</p>
        </div>
      </section>

      {/* How Amazon fits in */}
      <section className="bg-warm-surface border-t border-warm-border px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-[var(--font-playfair)] text-2xl text-warm-text mb-4">
            Free forever — here&apos;s how
          </h2>
          <p className="text-warm-secondary leading-relaxed">
            When you find a book you love and tap <strong className="text-warm-text">Buy on Kindle</strong>,
            we link you directly to Amazon. If you buy, we earn a small affiliate
            commission from Amazon at <strong className="text-warm-text">no extra cost to you</strong>.
            That&apos;s our entire business model — we only make money when we find
            you a book you genuinely want to read.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-warm-border px-6 py-10">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-warm-muted text-xs text-center leading-relaxed">
            BookWriggle is a participant in the Amazon Services LLC Associates
            Programme, an affiliate advertising programme designed to provide a
            means for sites to earn advertising fees by advertising and linking to
            Amazon. Amazon Associate tag: <span className="font-medium">bookwriggle-21</span>.
          </p>
          <div className="flex justify-center gap-8 text-warm-muted text-sm">
            <a href="/privacy" className="hover:text-warm-text transition-colors">Privacy Policy</a>
            <a href="mailto:tracksuitgoth@gmail.com" className="hover:text-warm-text transition-colors">Contact</a>
          </div>
          <p className="text-warm-muted/60 text-xs text-center">
            © {new Date().getFullYear()} BookWriggle. All rights reserved.
          </p>
        </div>
      </footer>

    </main>
  );
}
