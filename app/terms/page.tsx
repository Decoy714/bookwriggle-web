import Image from "next/image";

export const metadata = {
  title: "Terms of Service — Wriggle",
  description: "Wriggle terms of service — the rules for using the app.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: "#0D0A08", color: "#F0EDE8" }}>

      {/* Nav */}
      <nav className="border-b px-6 h-16 flex items-center" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image src="/notextlogo.png" alt="Wriggle" width={32} height={32} className="rounded-full" />
          <span className="font-[var(--font-playfair)] text-white text-xl font-black tracking-tight">Wriggle</span>
        </a>
      </nav>

      {/* Content */}
      <article className="max-w-2xl mx-auto px-6 py-16 flex-1 w-full">
        <h1 className="font-[var(--font-playfair)] text-4xl font-black text-white mb-2">Terms of Service</h1>
        <p className="text-sm mb-12" style={{ color: "rgba(255,255,255,0.4)" }}>Last updated: 16 June 2026</p>

        <Section title="1. Acceptance of These Terms">
          <p>By creating an account or using Wriggle (the &quot;app&quot;), you agree to these Terms of Service. If you do not agree, please do not use the app.</p>
        </Section>

        <Section title="2. Eligibility">
          <p>You must be at least 13 years old to use Wriggle. By using the app you confirm that you meet this requirement.</p>
        </Section>

        <Section title="3. Your Account">
          <p>You are responsible for keeping your password secure and for all activity under your account. You agree to provide accurate information and to verify your email address when asked. You may delete your account at any time from within the app; doing so removes your account data as described in our Privacy Policy.</p>
        </Section>

        <Section title="4. Acceptable Use">
          <p>When using Wriggle, you agree <strong>not</strong> to:</p>
          <ul>
            <li>Post content that is unlawful, hateful, harassing, defamatory, sexually explicit involving minors, or that infringes someone else&apos;s rights.</li>
            <li>Impersonate another person or misrepresent your affiliation with anyone.</li>
            <li>Spam, scrape, reverse-engineer, overload, or attempt to gain unauthorised access to the app or its systems.</li>
            <li>Use the app to harass, threaten, or harm other users.</li>
          </ul>
          <p>We may remove content or suspend accounts that breach these rules.</p>
        </Section>

        <Section title="5. Your Content">
          <p><strong>You own what you post.</strong> Reviews, ratings, comments, messages, and book-club content you create remain yours. By posting content, you grant Wriggle a non-exclusive, worldwide, royalty-free licence to host, display, and share that content within the app for the purpose of operating the service. You are responsible for the content you post and confirm you have the right to share it. We may remove content that breaches these Terms or that we are legally required to remove.</p>
        </Section>

        <Section title="6. Book Links and Amazon Associates">
          <p>Wriggle is a participant in the Amazon Associates Programme. When you tap &quot;Buy on Amazon&quot;, you are taken to Amazon via an affiliate link, and we may earn a small commission on qualifying purchases at no extra cost to you. We are not responsible for Amazon&apos;s products, prices, or services.</p>
        </Section>

        <Section title="7. Third-Party Content">
          <p>Book details (titles, descriptions, covers, and ratings) are sourced from third parties such as the Google Books API and Open Library. We do not guarantee the accuracy, completeness, or availability of this information.</p>
        </Section>

        <Section title="8. Our Intellectual Property">
          <p>The Wriggle name, logo, design, and software are owned by us and protected by intellectual-property laws. You may not copy, modify, or distribute them without our permission.</p>
        </Section>

        <Section title="9. Suspension and Termination">
          <p>We may suspend or terminate your access if you breach these Terms or use the app in a way that harms other users or the service. You may stop using Wriggle and delete your account at any time.</p>
        </Section>

        <Section title="10. Disclaimers">
          <p>Wriggle is provided &quot;as is&quot; and &quot;as available&quot;, without warranties of any kind. We do not guarantee that the app will be uninterrupted, error-free, or that recommendations will suit your taste.</p>
        </Section>

        <Section title="11. Limitation of Liability">
          <p>To the fullest extent permitted by law, Wriggle is not liable for any indirect, incidental, or consequential damages arising from your use of the app. Nothing in these Terms limits liability that cannot be limited under applicable law.</p>
        </Section>

        <Section title="12. Changes to These Terms">
          <p>We may update these Terms from time to time. We will notify you of significant changes via the app. The &quot;Last updated&quot; date above will always reflect the most recent revision. Continued use after a change means you accept the updated Terms.</p>
        </Section>

        <Section title="13. Governing Law">
          <p>These Terms are governed by the laws of England and Wales, without regard to conflict-of-law rules.</p>
        </Section>

        <Section title="14. Contact">
          <p>For any questions about these Terms: <a href="mailto:tracksuitgoth@gmail.com">tracksuitgoth@gmail.com</a></p>
        </Section>
      </article>

      {/* Footer */}
      <footer className="border-t px-6 py-8 text-center" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>© {new Date().getFullYear()} Wriggle. All rights reserved.</p>
      </footer>

    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="font-[var(--font-playfair)] text-2xl font-bold text-white mb-4 pb-2"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        {title}
      </h2>
      <div
        className="leading-relaxed space-y-3 text-sm
          [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-5 [&_h3]:mb-1
          [&_a]:underline [&_a]:decoration-[#E8547A]
          [&_strong]:text-white
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1
          [&_table]:w-full [&_table]:text-sm
          [&_th]:text-left [&_th]:pb-2 [&_th]:text-white
          [&_td]:py-1.5 [&_td]:border-t"
        style={{
          color: "rgba(255,255,255,0.6)",
          // @ts-ignore
          "--tw-border-opacity": 1,
        }}
      >
        {children}
      </div>
    </section>
  );
}
