import logo from "@assets/logo.png";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-neutral-900/80 bg-white dark:bg-neutral-900 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Bay Area Small Business Study logo" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 hidden md:block">
              Bay Area Small Business Study
            </span>
          </a>
          <a
            href="/"
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-14">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
          Privacy Policy
        </h1>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Overview</h2>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              The Bay Area Small Business Study ("we," "us," or "our") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
              visit our website or participate in our research study.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Information We Collect</h2>

            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 mt-6">Personal Information</h3>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-2">
              When you apply to participate in our research study, we collect:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-300 space-y-2 mt-0">
              <li>Your name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Business name and location</li>
              <li>Role and responsibilities in your business</li>
              <li>Information about your business operations, tools, and practices</li>
            </ul>

            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 mt-6">Automatically Collected Information</h3>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-2">
              When you visit our website, we automatically collect certain information through cookies and similar technologies:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-300 space-y-2 mt-0">
              <li>IP address and browser type</li>
              <li>Pages visited and time spent on the site</li>
              <li>Referring website or search terms</li>
              <li>Device information (type, operating system)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">How We Use Your Information</h2>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-2">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-300 space-y-2 mt-0">
              <li>Screen and select participants for our research study</li>
              <li>Schedule and conduct research interviews</li>
              <li>Process compensation payments</li>
              <li>Analyze research findings (in aggregate, anonymized form only)</li>
              <li>Improve our website and recruitment process</li>
              <li>Communicate with you about your participation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Confidentiality & Research Data</h2>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-2">
              <strong>Your participation is confidential.</strong> When we share research findings:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-300 space-y-2 mt-0">
              <li>We never include your name, business name, or any identifying details</li>
              <li>All insights are shared in aggregate or anonymized form only</li>
              <li>Interview recordings (if any) are for research purposes only and not shared publicly</li>
              <li>Your contact information is never sold or shared with third parties for marketing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Third-Party Services</h2>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-2">
              We use the following third-party services to operate our website and research program:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-300 space-y-2 mt-0">
              <li><strong>Google Analytics:</strong> For website analytics and visitor insights</li>
              <li><strong>Google Ads:</strong> For measuring advertising campaign effectiveness</li>
              <li><strong>Apollo.io:</strong> For visitor tracking and identification</li>
              <li><strong>Airtable:</strong> For securely storing participant applications</li>
              <li><strong>Vercel:</strong> For hosting our website</li>
            </ul>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mt-4">
              These services may collect information as described in their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Cookies & Tracking Technologies</h2>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-2">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-300 space-y-2 mt-0">
              <li>Remember your preferences</li>
              <li>Understand how visitors use our website</li>
              <li>Measure the effectiveness of our advertising campaigns</li>
              <li>Improve website performance and user experience</li>
            </ul>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mt-4">
              You can control cookies through your browser settings, though some features may not work properly if cookies are disabled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Data Security</h2>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              We implement reasonable security measures to protect your information from unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we
              cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Your Rights</h2>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-2">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-300 space-y-2 mt-0">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to research obligations)</li>
              <li>Withdraw from the study at any time</li>
              <li>Opt out of future communications</li>
            </ul>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mt-4">
              To exercise these rights, please contact us using the information below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Children's Privacy</h2>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Our website and research study are not intended for individuals under 18 years of age.
              We do not knowingly collect information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Changes to This Policy</h2>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              We may update this Privacy Policy from time to time. The "Last updated" date at the top of this
              page indicates when the policy was last revised. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Contact Us</h2>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or how we handle your information, please contact us:
            </p>
            <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6">
              <p className="text-neutral-900 dark:text-neutral-100 font-semibold mb-2">Bay Area Small Business Study</p>
              <p className="text-neutral-600 dark:text-neutral-300">Website: <a href="https://www.smb-research.org" className="text-[#AA0000] dark:text-[#FF4800] hover:underline">www.smb-research.org</a></p>
            </div>
          </section>
        </div>
      </div>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-[#B3995D]/10 dark:bg-neutral-900 mt-20">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-center text-sm text-neutral-400">
            Bay Area Small Business Study · Independent Research Initiative
          </p>
        </div>
      </footer>
    </div>
  );
}
