import footerFlag from "@assets/us-flag-footer.svg";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-neutral-900/80 bg-white dark:bg-neutral-900 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-10 w-10 flex-shrink-0">
              <style type="text/css">{`.st0{fill:none;stroke:#006fcf;stroke-width:3;stroke-miterlimit:10;}`}</style>
              <path fill="#006fcf" d="M90.9,33.1c0,0.3,0,0.7,0,1c-0.7,0.7-1.5,1.3-2.2,2c-0.5,0.5-1.2,0.8-1.4,1.4c-0.3,0.6-0.2,1.3-0.2,2c0,0.6,0.9,1.3,1.5,1.1  c-0.1-0.2-0.2-0.3-0.4-0.6c0.8,0.6,0.8,0.7,0.2,1.1c-0.2,0.1-0.7,0.1-0.8,0.2c-0.5,0.9-1.5,0.8-2.2,1.3c-0.5,0.3-1.1,0.7-1.5,1.1  c-0.2,0.2-0.4,0.7-0.3,0.9c0.7,1.3,0.1,2.2-0.5,3.1c-0.4-0.2-0.6-0.3-0.9-0.4c-0.1,0-0.1,0.1-0.2,0.1c1.9,1.4,0.6,2.8,0.3,4.2  c-0.1,0-0.2,0-0.3,0c0-0.6,0-1.3,0-1.9c-0.1,0-0.1,0-0.2,0c0,0.1-0.1,0.2-0.1,0.4c-0.2-0.3-0.3-0.4-0.5-0.7C81,49.7,80.9,49.9,81,50  c0.1,0.5,0.3,1.1,0.4,1.6c0.1,0.2,0.2,0.4,0.3,0.5c0.9,0.3,0.9,1.2,1.3,1.8c0.4,0.8,0.2,1.2-0.6,1.6c-0.2,0.1-0.3,0.4-0.5,0.6  c0.3,0.1,0.5,0.1,0.8,0.2c-0.4,0.3-0.6,0.6-0.9,0.7c-1.3,0.4-1.6,2.1-2.9,2.5c-0.1,0-0.2,0.3-0.2,0.4c-0.1,1-0.9,1.6-1.5,2.2  c-0.8,0.8-1.4,1.7-1.5,2.9c0,1.2,0.3,2.3,0.9,3.3c0.5,0.8,1.1,1.5,1.5,2.4c0.7,1.5,1.5,2.9,1.3,4.7c-0.1,0.9-0.3,1.5-1.3,2  c0.4-0.4,0.6-0.6,0.9-0.9l-0.1-0.1c-0.3,0.1-0.6,0.2-0.9,0.3c-0.3-0.4-0.6-0.9-0.9-1.2c-0.5-0.5-1.2-0.7-1.6-1.3  c-0.8-1.1-1.7-2.2-1.5-3.8c0.1-0.3-0.2-0.7-0.4-1c-0.4-0.4-0.9-0.7-1.4-1.1c-0.5-0.4-1-0.7-1.6,0c-0.4,0.4-0.9,0.7-1.6,0.3  c-0.5-0.4-1.2-0.7-1.8-0.7c-0.7-0.1-1.5,0.1-2.3,0.2c-0.1-0.2-0.2-0.4-0.2-0.4c-0.6,0.2-0.9,0.4-1.4,0.4C62.7,68,62,68,61.6,68.9  c0.3-0.1,0.5-0.2,0.7-0.3c0.1,0,0.1,0.1,0.2,0.1c-0.1,0.3-0.3,0.6-0.5,1c0.2,0.1,0.4,0.2,0.6,0.2c0.2,0.1,0.3,0.2,0.6,0.3  c-0.6,0.4-0.6,0.4-1.7-0.3c-0.1,0.3-0.3,0.5-0.5,0.9c-0.1-0.3-0.1-0.4-0.2-0.6C60,71,59.4,70.9,58.9,70c-0.2-0.3-0.7-0.4-1.1-0.6  c0,0.1-0.1,0.1-0.1,0.2c0.2,0.1,0.3,0.2,0.5,0.2c-0.8,0.1-1.6-0.1-2.3-0.1c-0.8,0-1.7,0.1-2.4,0.5C52,71,50.7,72.1,49.2,73  c-0.5,0.3-0.7,0.6-0.7,1.2c0,1,0,1.9,0,3c-0.7-0.2-1.4-0.4-2.1-0.7c-1-0.4-1.6-1.1-1.6-2.2c0-0.2-0.2-0.4-0.3-0.6  c-0.5-0.8-1.2-1.4-1.5-2.4c-0.3-1.1-1.2-1.8-2.4-2.1c-0.7-0.2-1.1,0-1.4,0.6c-0.2,0.3-0.4,0.6-0.6,1c-0.6-0.3-1.1-0.6-1.6-0.8  c-0.6-0.3-1-0.8-1-1.5c-0.1-1.8-2-2.3-2.7-3.7c0,0-0.1,0-0.2,0c-0.8-0.1-1.7-0.2-2.5-0.3c-0.1,0.3-0.2,0.6-0.3,0.9  c-0.9-0.1-1.7-0.3-2.6-0.3c-3-0.3-5.3-2.3-7.7-3.7c-0.4-0.2-0.8-0.5-1.2-0.5c-0.7-0.1-1.5-0.2-2.2-0.3c-0.2-0.1-0.5-0.4-0.6-0.6  c-0.1-0.9-0.3-1.7-1.3-2.1c-0.1,0-0.1-0.2-0.2-0.2c-0.8-0.8-1.4-1.7-2.5-2c-0.5-0.1-0.5-0.3-0.5-0.7c0-0.6-0.1-1.1-0.2-1.7  c-0.1-0.4-0.4-0.8-0.6-1.1c-0.3-0.6-0.5-1.1,0-1.5c-0.2-0.6-0.4-1.1-0.6-1.7c-0.2-0.8-0.1-1.6-0.5-2.3c-0.5-0.8-0.6-1.6-0.3-2.5  c0.1-0.4,0.2-1-0.4-1.2c0-0.1,0-0.2,0-0.3c0.7-1,1.5-2.1,1.2-3.5c-0.1-0.5,0.1-1.1,0.3-1.6c0.8-1.9,1.8-3.7,2.5-5.6  c0.3-0.8,0.2-1.8,0.3-2.7c0-0.6,0-1.2,0-1.9c1,0.3,1.6,1.4,2.7,0.8c0,0.2,0.1,0.3,0.1,0.5c0.1,0,0.1,0,0.2,0  c-0.1-0.6-0.2-1.1-0.3-1.7c0.1,0,0.2,0,0.3,0c0.9,0.3,1.8,0.5,2.7,0.8c10.4,2.6,20.9,4.2,31.7,4.1c0.6,0,1.2,0.1,1.3-1  c0.2,0.4,0.4,0.5,0.4,0.7c0,0.6,0.3,0.9,0.9,0.9c0.9,0.1,1.7,0.3,2.6,0.5c0.4,0.1,0.9,0.4,1.3,0.4c0.7,0.1,1.4,0,2.2,0  c0,0.1,0.1,0.2,0.1,0.4c-1.4,0.3-2.4,1.2-3.1,2.5c0.6-0.2,1-0.4,1.5-0.6c0,0.2,0,0.4,0,0.6c1.7,0.2,2.5-1.5,4-1.8  c-0.2,0.3-0.4,0.6-0.6,0.9c0.4,0.2,0.9,0.2,1,0.4c0.5,0.7,1,0.4,1.6,0.2c0.6-0.2,1.2-0.4,1.9-0.7c0.1,1.2,0.8,0.4,1.3,0.5  c0.1,0.3,0.2,0.7,0.3,1c-2.1,0.2-4.4,0.1-5,3.1c0.3-0.5,0.6-0.8,0.9-1.2c-0.2,1.3-0.4,2.4-0.6,3.7c-0.1,1.3,0.1,2.5,1.1,3.4  c1.2-0.7,1.6-2.2,0.9-3.4c-0.1-0.2-0.3-0.4-0.3-0.7c-0.2-1.7,0.8-3,1.8-4.2c0.1-0.1,0.5-0.1,0.7-0.1c0.3,0,0.5,0.2,0.8,0.3  c1.1,0.4,1.5,2,0.7,2.9c-0.1,0.2-0.1,0.4-0.2,0.6c0.1,0,0.2,0.1,0.3,0.1c0.2-0.2,0.3-0.5,0.5-0.7c0.1-0.1,0.4-0.3,0.6-0.2  c0.5,0.2,1.1,2.3,0.8,2.8c-0.4,0.6-0.7,1.1-1,1.7c0.9,0.4,1.5,0.7,2.3,0.1c0.8-0.6,1.8-1.1,2.6-1.7c0.7-0.6,1.7-1.1,0.8-2.4  c0.7-0.1,1.2-0.2,1.7-0.3c0.6-0.1,1.2-0.2,1.8-0.5c0.2-0.1,0.5-0.8,0.4-0.9c-0.5-0.6-0.1-0.9,0.3-1.3c0.2-0.2,0.3-0.4,0.4-0.6  c0.3-0.6,0.7-0.8,1.4-1c1.4-0.3,2.9-0.4,4.1-1.5c0.6-0.6,0.9-1.2,0.8-1.8c-0.1-1.1,0.2-2.1,0.6-3c0.4,0,0.7,0,0.9-0.1  c0.6-0.3,1.1-0.2,1.3,0.5c0.2,0.6,0.3,1.2,0.5,1.7C89.6,32.4,90,33,90.9,33.1z"/>
              <circle className="st0" cx="50" cy="50" r="48.1"/>
            </svg>
            <span className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 hidden md:block">
              US Small Business Study
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
              The US Small Business Study ("we," "us," or "our") is committed to protecting your privacy.
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
              <p className="text-neutral-900 dark:text-neutral-100 font-semibold mb-2">US Small Business Study</p>
              <p className="text-neutral-600 dark:text-neutral-300">Website: <a href="https://www.smb-research.org" className="text-[#AA0000] dark:text-[#FF4800] hover:underline">www.smb-research.org</a></p>
            </div>
          </section>
        </div>
      </div>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-[#F5F1E8] dark:bg-neutral-800 mt-20">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col items-center gap-4">
            <img src={footerFlag} alt="US Flag" className="h-12 w-12 object-contain" />
            <p className="text-center text-sm text-neutral-400 dark:text-neutral-500" data-testid="text-footer">
              US Small Business Research Study · Independent Research Initiative
            </p>
            <p className="text-center text-sm text-neutral-400 dark:text-neutral-500">
              <a href="/privacy" className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
