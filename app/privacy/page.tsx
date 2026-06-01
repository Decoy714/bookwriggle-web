import Image from "next/image";

export const metadata = {
  title: "Privacy Policy — Wriggle",
  description: "Wriggle privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
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
        <h1 className="font-[var(--font-playfair)] text-4xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-sm mb-12" style={{ color: "rgba(255,255,255,0.4)" }}>Last updated: 1 June 2025</p>

        <Section title="1. Who We Are">
          <p>Wriggle (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a free book discovery app. This Privacy Policy explains what personal data we collect, how we use it, and your rights.</p>
        </Section>

        <Section title="2. Data We Collect">
          <h3>Account Data</h3>
          <p>When you register, we collect your email address, display name, and password (stored as a secure hash by Firebase — we never see it in plain text).</p>
          <h3>Profile Data</h3>
          <p>Avatar selection and username (if set).</p>
          <h3>Reading Activity</h3>
          <p>Books you have liked or saved, books you have marked as read, and your genre and rating preferences.</p>
          <h3>User-Generated Content</h3>
          <p>Book reviews and ratings, comments and replies, and direct messages sent between users.</p>
          <h3>Technical Data</h3>
          <p>Device type and operating system, and app usage analytics (crash reports, performance data) collected automatically by Firebase.</p>
        </Section>

        <Section title="3. How We Use Your Data">
          <table>
            <thead>
              <tr><th>Purpose</th><th>Legal Basis</th></tr>
            </thead>
            <tbody>
              <tr><td>Providing the app and your account</td><td>Contract</td></tr>
              <tr><td>Showing personalised book recommendations</td><td>Legitimate interest</td></tr>
              <tr><td>Displaying your reviews and comments to other users</td><td>Consent</td></tr>
              <tr><td>Sending messages from other users</td><td>Contract</td></tr>
              <tr><td>Improving app stability and performance</td><td>Legitimate interest</td></tr>
            </tbody>
          </table>
          <p>We do <strong>not</strong> sell your data to any third party. We do <strong>not</strong> use your data for targeted advertising.</p>
        </Section>

        <Section title="4. Third-Party Services">
          <h3>Firebase (Google LLC)</h3>
          <p>We use Firebase for user authentication, database storage, and crash analytics. Firebase may process data on servers in the United States and other countries. <a href="https://firebase.google.com/support/privacy">Firebase privacy policy →</a></p>
          <h3>Amazon Associates</h3>
          <p>When you tap &quot;Buy on Amazon&quot;, you are taken to Amazon&apos;s website via an affiliate link. We earn a small commission if you make a purchase. We do not share your personal data with Amazon. <a href="https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ">Amazon privacy policy →</a></p>
          <h3>Google Books API</h3>
          <p>Book metadata is fetched from the Google Books API. We do not send any personal data to Google Books. <a href="https://policies.google.com/privacy">Google privacy policy →</a></p>
        </Section>

        <Section title="5. Data Retention">
          <p>Your account data is kept for as long as your account exists. Deleted messages are removed immediately. If you delete your account, your data is deleted within 30 days.</p>
        </Section>

        <Section title="6. Your Rights">
          <p>Depending on where you live, you may have the right to access, correct, or delete your personal data, object to certain processing, or receive a portable copy of your data. Contact us at the email below to exercise any of these rights.</p>
        </Section>

        <Section title="7. Children">
          <p>Wriggle is not directed at children under 13. We do not knowingly collect personal data from children under 13. If you believe a child has provided us with personal data, please contact us and we will delete it.</p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>We may update this policy from time to time. We will notify you of significant changes via the app. The &quot;Last updated&quot; date at the top of this page will always reflect the most recent revision.</p>
        </Section>

        <Section title="9. Contact">
          <p>For any privacy questions or requests: <a href="mailto:tracksuitgoth@gmail.com">tracksuitgoth@gmail.com</a></p>
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
