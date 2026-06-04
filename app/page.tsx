"use client";

import { useState } from "react";
import Image from "next/image";

const FORMSPREE_ID = "mzdwljdr";
const AMAZON_TAG = "bookwriggle05-21";

const FEATURED_BOOKS = [
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    asin: "0307588378",
    genre: "Thriller",
    description: "Nick Dunne's wife disappears on their anniversary. What follows is one of the most compulsive, twist-laden thrillers ever written. You will not see it coming.",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    asin: "0553103547",
    genre: "Science Fiction",
    description: "The greatest science fiction novel ever written. A sweeping tale of politics, religion, and survival on a desert planet that defined the genre and still towers above it.",
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    asin: "0747532699",
    genre: "Fantasy",
    description: "The book that turned a generation into readers. A letter, a giant, a castle full of magic — and one of the most beloved stories in the history of publishing.",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    asin: "0743273567",
    genre: "Classic Fiction",
    description: "Fitzgerald's portrait of the Jazz Age captures something permanent about ambition, longing, and the cost of chasing a dream that was never really there.",
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    asin: "0330513370",
    genre: "Comedy Sci-Fi",
    description: "Forty-two. The funniest, strangest, most quotable book in the galaxy. If you've never read it, stop everything — the universe is waiting.",
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    asin: "0618640150",
    genre: "Fantasy",
    description: "The foundation of modern fantasy. A journey from the Shire to the fires of Mount Doom that no other story has come close to matching in scale or heart.",
  },
];

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
      <div className="flex flex-col items-center gap-3 py-2">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold" style={{ backgroundColor: "#E8547A" }}>✓</div>
        <p className="font-bold text-lg text-white">You&apos;re on the list!</p>
        <p className="text-white/60 text-sm">We&apos;ll email you the moment Wriggle launches.</p>
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
          className="flex-1 border border-white/20 bg-white/10 text-white placeholder:text-white/40 rounded-2xl px-5 py-3 text-base focus:outline-none focus:border-[#E8547A] transition-colors backdrop-blur-sm"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email.trim()}
          className="disabled:opacity-50 text-white font-bold rounded-2xl px-6 py-3 text-sm transition-all shrink-0 hover:brightness-110"
          style={{ backgroundColor: "#E8547A" }}
        >
          {status === "loading" ? "..." : "Notify me"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-red-400 text-xs mt-3">Something went wrong — please try again.</p>
      )}
    </form>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: "#0D0A08" }}>

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 px-6 h-16 flex items-center justify-between backdrop-blur-md bg-black/30 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Image src="/notextlogo.png" alt="Wriggle" width={36} height={36} className="rounded-full" />
          <span className="font-[var(--font-playfair)] text-white text-xl font-black tracking-tight">Wriggle</span>
        </div>
        <a
          href="#waitlist"
          className="text-white font-semibold text-sm px-5 py-2 rounded-full transition-all hover:brightness-110"
          style={{ backgroundColor: "#E8547A" }}
        >
          Join Waitlist
        </a>
      </nav>

      {/* Hero — full screen bedroom background */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/busstop.png"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,10,8,1) 0%, rgba(13,10,8,0.65) 50%, rgba(13,10,8,0.3) 100%)" }} />
        </div>

        {/* Content */}
        <div className="relative flex flex-col items-center max-w-xl">
          <Image src="/finallylogo.png" alt="Wriggle" width={378} height={378} className="drop-shadow-2xl mb-3" />

          <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex items-center gap-2 border border-white/15 rounded-full px-4 py-1.5 text-sm text-white/60 bg-white/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#E8547A" }} />
            Coming soon · iOS & Android · Free
          </div>

          <h1 className="font-[var(--font-playfair)] text-5xl md:text-6xl text-white leading-tight">
            A place for<br />people who love books.
          </h1>

          <p className="text-white/65 text-lg leading-relaxed">
            Wriggle is a free app where book lovers connect. Get personal recommendations,
            chat with other readers, and build book clubs with your friends.
          </p>

          <div id="waitlist" className="flex flex-col items-center gap-3 w-full">
            <p className="text-white/80 font-semibold">Get notified when we launch</p>
            <WaitlistForm />
            <p className="text-white/35 text-xs">No spam. One email when we go live.</p>
          </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24" style={{ backgroundColor: "#0D0A08" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-center font-[var(--font-playfair)] text-3xl md:text-4xl text-white mb-16">
            Everything a bookworm needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "📖",
                title: "Personal recommendations",
                body: "Swipe through a feed of books picked just for you based on your taste and reading history.",
              },
              {
                icon: "💬",
                title: "Chat with readers",
                body: "Message other readers, share books you love, and talk about what you're reading right now.",
              },
              {
                icon: "🫂",
                title: "Book clubs",
                body: "Create a club with friends or join a public one. Build shared reading lists and track everyone's progress.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-7 border border-white/8 flex flex-col gap-4"
                style={{ backgroundColor: "#1A1208" }}
              >
                <span className="text-4xl">{f.icon}</span>
                <h3 className="font-[var(--font-playfair)] text-white text-xl font-bold">{f.title}</h3>
                <p className="text-white/55 leading-relaxed text-sm">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Books We Love */}
      <section className="px-6 py-24 border-t" style={{ backgroundColor: "#0D0A08", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-[var(--font-playfair)] text-3xl md:text-4xl text-white mb-3 text-center">Books worth reading</p>
          <p className="text-center text-white/50 text-sm mb-14 leading-relaxed">
            A handpicked selection from our team — the books that made us think, feel, and stay up far too late.
            All available on Amazon UK.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {FEATURED_BOOKS.map((book) => (
              <a
                key={book.asin}
                href={`https://www.amazon.co.uk/dp/${book.asin}?tag=${AMAZON_TAG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 transition-all duration-200"
                style={{ backgroundColor: "#1A1208" }}
              >
                <div className="w-full aspect-[2/3] overflow-hidden bg-white/5 flex items-center justify-center">
                  <img
                    src={`https://covers.openlibrary.org/b/isbn/${book.asin}-M.jpg`}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://images-na.ssl-images-amazon.com/images/P/${book.asin}.01.MZZZZZZZ.jpg`; }}
                  />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#E8547A" }}>{book.genre}</span>
                  <h3 className="font-[var(--font-playfair)] text-white font-bold text-lg leading-snug">{book.title}</h3>
                  <p className="text-white/50 text-xs font-medium">{book.author}</p>
                  <p className="text-white/60 text-sm leading-relaxed flex-1 mt-1">{book.description}</p>
                  <span className="mt-3 text-xs font-semibold text-white/40 group-hover:text-white/70 transition-colors">
                    View on Amazon →
                  </span>
                </div>
              </a>
            ))}
          </div>
          <p className="text-center text-white/25 text-xs mt-10 leading-relaxed">
            As an Amazon Associate, Wriggle earns from qualifying purchases. Prices and availability are subject to change.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-10" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "#0D0A08" }}>
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="flex justify-center">
            <Image src="/notextlogo.png" alt="Wriggle" width={40} height={40} className="rounded-full opacity-60" />
          </div>
          <div className="flex justify-center gap-8 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="mailto:tracksuitgoth@gmail.com" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-xs text-center leading-relaxed" style={{ color: "rgba(255,255,255,0.2)" }}>
            Wriggle is a participant in the Amazon Services LLC Associates Programme, an affiliate advertising programme
            designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.co.uk.
            Associate tag: {AMAZON_TAG}.
          </p>
          <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.15)" }}>
            © {new Date().getFullYear()} Wriggle. All rights reserved.
          </p>
        </div>
      </footer>

    </main>
  );
}
