import { useEffect } from "react";
import { useLocation } from "wouter";
import { CheckCircle, FileCheck, Calendar, DollarSign, Share2, Mail, Phone } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function ThankYou() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Track page view analytics
    const trackPageView = async () => {
      try {
        const sessionId = new URLSearchParams(window.location.search).get('session_id') || 
                          `thankyou-${Date.now()}`;
        
        await apiRequest("POST", "/api/analytics/track", {
          eventType: "thank_you_page_view",
          eventData: {
            referrer: document.referrer,
            userAgent: navigator.userAgent,
          },
          sessionId,
        });
      } catch (error) {
        console.error("Failed to track thank you page view:", error);
      }
    };

    trackPageView();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400/60 via-indigo-400/30 to-transparent" />
          <CheckCircle className="w-20 h-20 mx-auto text-[#B3995D] mb-6" data-testid="icon-success" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold" data-testid="text-title">
            Thank You for Your Interest!
          </h1>
          <p className="text-xl text-slate-700 dark:text-neutral-300" data-testid="text-subtitle">
            We've received your application to participate in our research study.
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-6 border-t border-neutral-200 dark:border-neutral-800 pt-8">
            <h3 className="text-xl md:text-2xl font-bold text-center" data-testid="text-share-title">
              Know someone who would be a good fit?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-center max-w-xl mx-auto">
              Share this study with other Bay Area business owners in your network.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent('Check out this Bay Area small business research study - $20 for a 5-min survey or $150 for a 60-min interview: ' + window.location.origin)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border-2 border-[#25D366] dark:border-[#20A858] text-[#25D366] dark:text-[#25D366] px-5 py-2.5 text-sm font-semibold hover:bg-[#25D366] hover:text-white dark:hover:text-white transition-all duration-200"
                data-testid="button-share-whatsapp"
              >
                <Share2 className="w-4 h-4" />
                Share via WhatsApp
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent('Bay Area Small Business Study')}&body=${encodeURIComponent('I thought you might be interested in this research study for Bay Area small business owners.\n\nYou can earn $20 for a 5-minute survey or $150 for a 60-minute interview by sharing your experience managing a business.\n\nLearn more: ' + window.location.origin)}`}
                className="flex items-center gap-2 rounded-lg border-2 border-[#FF4800] dark:border-[#FF6B40] text-[#FF4800] dark:text-[#FF6B40] px-5 py-2.5 text-sm font-semibold hover:bg-[#FF4800] hover:text-white dark:hover:text-white transition-all duration-200"
                data-testid="button-share-email"
              >
                <Mail className="w-4 h-4" />
                Share via Email
              </a>

              <a
                href={`sms:?&body=${encodeURIComponent('Check out this Bay Area business study - $20 for a 5-min survey or $150 for a 60-min interview: ' + window.location.origin)}`}
                className="flex items-center gap-2 rounded-lg border-2 border-[#FF4800] dark:border-[#FF6B40] text-[#FF4800] dark:text-[#FF6B40] px-5 py-2.5 text-sm font-semibold hover:bg-[#FF4800] hover:text-white dark:hover:text-white transition-all duration-200"
                data-testid="button-share-sms"
              >
                <Phone className="w-4 h-4" />
                Share via Text
              </a>
            </div>
          </div>

          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 space-y-4">
            <p className="text-neutral-500 dark:text-neutral-400 text-sm" data-testid="text-contact-info">
              Questions? Feel free to reach out to us at{" "}
              <a
                href="mailto:george@smb-research.org"
                className="text-slate-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 underline"
                data-testid="link-contact-email"
              >
                george@smb-research.org
              </a>
            </p>

            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center rounded-2xl bg-[#FF4800] px-8 py-4 font-bold text-white hover:bg-[#E04000] transition-all shadow-lg hover:shadow-xl"
              data-testid="button-back-home"
            >
              Return to the Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
