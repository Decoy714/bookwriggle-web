export const metadata = {
  title: "Privacy Policy — BookWriggle",
  description: "BookWriggle privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream">
      <nav className="border-b border-warm-border px-6 h-16 flex items-center">
        <a href="/" className="font-[var(--font-playfair)] text-warm-text text-xl font-black tracking-tight hover:opacity-80 transition-opacity">
          🐛 BookWriggle
        </a>
      </nav>

      <article className="max-w-2xl mx-auto px-6 py-16 prose prose-stone">
        <h1 className="font-[var(--font-playfair)] text-4xl font-black text-warm-text mb-2">Privacy Policy</h1>
        <p className="text-warm-muted text-sm mb-12">Last updated: 1 June 2025</p>

        <Section title="1. Who We Are">
          <p>
            BookWriggle (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a book discovery app. This Privacy Policy
            explains what personal data we collect, how we use it, and your rights.
          </p>
        </Section>

        <Section title="2. Data We Collect">
          <h3>Account Data</h3>
          <p>When you register, we collect your email address, display name, and password
          (stored as a secure hash by Firebase — we never see it in plain text).</p>

          <h3>Profile Data</h3>
          <p>Avatar / profile image selection and username (if set).</p>

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
          <p>We use Firebase for user authentication, database storage, and crash analytics. Firebase may process data on servers in the United States and other countries. <a href="https://firebase.google.com/support/privacy" className="text-amber hover:underline">Firebase privacy policy →</a></p>

          <h3>Amazon Associates</h3>
          <p>When you tap &quot;Buy on Amazon&quot;, you are taken to Amazon&apos;s website via an affiliate link. We earn a small commission if you make a purchase. We do not share your personal data with Amazon. <a href="https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ" className="text-amber hover:underline">Amazon privacy policy →</a></p>

          <h3>Google Books API</h3>
          <p>Book metadata is fetched from the Google Books API. We do not send any personal data to Google Books. <a href="https://policies.google.com/privacy" className="text-amber hover:underline">Google privacy policy →</a></p>
        </Section>

        <Section title="5. Data Retention">
          <p>Your account data is kept for as long as your account exists. Deleted messages are removed immediately. If you delete your account, your data is deleted within 30 days.</p>
        </Section>

        <Section title="6. Your Rights">
          <p>Depending on where you live, you may have the right to access, correct, or delete your personal data, object to certain processing, or receive a portable copy of your data. To exercise any of these rights, contact us at the email below.</p>
        </Section>

        <Section title="7. Children">
          <p>BookWriggle is not directed at children under 13. We do not knowingly collect personal data from children under 13. If you believe a child has provided us with personal data, please contact us and we will delete it.</p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>We may update this policy from time to time. We will notify you of significant changes via the app. The &quot;Last updated&quot; date at the top of this page will always reflect the most recent revision.</p>
        </Section>

        <Section title="9. Contact">
          <p>For any privacy questions or requests, please contact us at: <a href="mailto:tracksuitgoth@gmail.com" className="text-amber hover:underline">tracksuitgoth@gmail.com</a></p>
        </Section>
      </article>

      <footer className="border-t border-warm-border px-6 py-8 text-center">
        <p className="text-warm-muted/60 text-xs">© {new Date().getFullYear()} BookWriggle. All rights reserved.</p>
      </footer>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-warm-text mb-4 pb-2 border-b border-warm-border">
        {title}
      </h2>
      <div className="text-warm-secondary leading-relaxed space-y-3 [&_h3]:font-semibold [&_h3]:text-warm-text [&_h3]:mt-5 [&_h3]:mb-1 [&_table]:w-full [&_table]:text-sm [&_th]:text-left [&_th]:pb-2 [&_th]:text-warm-text [&_td]:py-1.5 [&_td]:border-t [&_td]:border-warm-border">
        {children}
      </div>
    </section>
  );
}
