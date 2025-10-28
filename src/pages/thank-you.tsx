import { useEffect } from "react";
import { useLocation } from "wouter";
import { CheckCircle, FileCheck, Calendar, DollarSign, Share2, Mail, Phone } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ThemeToggle } from "@/components/ThemeToggle";
import footerFlag from "@assets/us-flag-footer.svg";

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
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 flex flex-col">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
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
              Share this study with other small business owners in your network.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:?subject=${encodeURIComponent('US Small Business Study')}&body=${encodeURIComponent('I thought you might be interested in this research study for US small business owners.\n\nYou can earn $20 for a 5-minute survey or $150 for a 60-minute interview by sharing your experience managing a business.\n\nLearn more: ' + window.location.origin)}`}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#00152a] text-[#00152a] px-4 py-2.5 text-sm font-bold hover:bg-[#00152a] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00152a] focus-visible:ring-offset-2"
                data-testid="button-share-email"
              >
                <Mail className="w-5 h-5" />
                Share via Email
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent('Check out this US small business research study - $20 for a 5-min survey or $150 for a 60-min interview: ' + window.location.origin)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-[#00152a] text-[#00152a] px-4 py-2.5 text-sm font-bold hover:bg-[#00152a] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00152a] focus-visible:ring-offset-2"
                data-testid="button-share-whatsapp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-7 h-7" fill="currentColor">
                  <path d="M66.23,55.84l-5.92-4.33c-0.9-0.66-2-0.92-3.1-0.75c-1.1,0.17-2.06,0.76-2.72,1.66l-1.83,2.51   c-0.02,0.03-0.04,0.06-0.06,0.09c-0.28,0.04-1.76,0.07-5.3-2.75l-0.38-0.27c-3.7-2.46-4.12-3.87-4.17-4.16   c0.02-0.03,0.05-0.06,0.07-0.09l1.83-2.51c1.35-1.85,0.95-4.46-0.91-5.82l-6.03-4.4c-1.85-1.36-4.46-0.95-5.82,0.91l-1.85,2.54   c-1.79,2.46-2.26,5.69-1.25,8.64c1.47,4.27,5.16,8.78,11,13.42c0.1,0.12,0.22,0.22,0.35,0.32c0.14,0.1,0.29,0.2,0.43,0.3   c0.14,0.11,0.28,0.21,0.42,0.32c0.13,0.1,0.27,0.18,0.41,0.24c6.2,4.14,11.62,6.29,16.14,6.38c0.06,0,0.13,0,0.19,0   c2.95,0,5.77-1.45,7.55-3.9l1.85-2.54c0.66-0.9,0.92-2,0.75-3.1C67.72,57.46,67.13,56.49,66.23,55.84z M63.91,59.3l-1.85,2.54   c-1.06,1.45-2.76,2.28-4.43,2.25c-2.7-0.06-7.42-1.18-14.68-6.17c-6.97-5.4-9.48-9.55-10.36-12.1c-0.58-1.69-0.32-3.6,0.69-4.98   l1.85-2.54c0.05-0.07,0.15-0.09,0.23-0.04l6.03,4.4c0.07,0.05,0.09,0.16,0.04,0.23l-1.75,2.39c-0.53,0.58-1,1.56-0.92,2.81   c0.16,2.31,2.1,4.68,5.88,7.19l0.23,0.17c3.61,2.88,6.46,4.01,8.71,3.46c1.21-0.3,2-1.05,2.39-1.73l1.75-2.39   c0.05-0.06,0.17-0.08,0.23-0.04l5.93,4.33C63.94,59.11,63.95,59.23,63.91,59.3z"/>
                  <path d="M48.4,18.01c-18.13,0-32.89,14.75-32.89,32.89c0,7.64,2.65,15,7.48,20.88l-5.55,10.81c-0.37,0.71-0.27,1.57,0.24,2.19   c0.39,0.46,0.95,0.72,1.54,0.72c0.19,0,0.38-0.03,0.57-0.08l15.15-4.5c4.24,1.91,8.76,2.87,13.45,2.87   c18.13,0,32.89-14.75,32.89-32.89S66.53,18.01,48.4,18.01z M48.4,79.78c-4.35,0-8.54-0.94-12.43-2.81   c-0.45-0.21-0.96-0.25-1.43-0.11l-11.39,3.39l4.02-7.84c0.38-0.74,0.26-1.63-0.29-2.25c-4.75-5.3-7.37-12.15-7.37-19.26   c0-15.93,12.96-28.89,28.89-28.89S77.28,34.97,77.28,50.9S64.33,79.78,48.4,79.78z"/>
                </svg>
                Share via WhatsApp
              </a>

              <a
                href={`sms:?&body=${encodeURIComponent('Check out this US small business research study - $20 for a 5-min survey or $150 for a 60-min interview: ' + window.location.origin)}`}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#00152a] text-[#00152a] px-4 py-2.5 text-sm font-bold hover:bg-[#00152a] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00152a] focus-visible:ring-offset-2"
                data-testid="button-share-sms"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-5 h-5" fill="currentColor">
                  <path d="m82.512 10.762h-65.023c-4.1289 0-7.4883 3.3594-7.4883 7.4883v39.609c0 4.1289 3.3594 7.4883 7.4883 7.4883h8.1406l1.3594 21.629c0.058594 1.0195 0.76953 1.8906 1.7617 2.1719 0.21875 0.058593 0.42969 0.089843 0.64844 0.089843 0.78125 0 1.5195-0.37891 1.9805-1.0312l15.898-22.859h35.238c4.1289 0 7.4883-3.3594 7.4883-7.4883l0.007813-39.609c-0.011719-4.1289-3.3711-7.4883-7.5-7.4883zm2.668 47.098c0 1.4688-1.1992 2.6719-2.6719 2.6719h-36.5c-0.78906 0-1.5312 0.39062-1.9805 1.0312l-12.668 18.219-1.0703-16.988c-0.078124-1.2695-1.1289-2.2617-2.3984-2.2617h-10.398c-1.4688 0-2.6719-1.1992-2.6719-2.6719v-39.609c0-1.4688 1.1992-2.6719 2.6719-2.6719h65.031c1.4688 0 2.6719 1.1992 2.6719 2.6719l-0.003906 39.609z"/>
                  <path d="m71.66 23.941h-43.41c-1.3281 0-2.4102 1.0781-2.4102 2.4102 0 1.3281 1.0781 2.4102 2.4102 2.4102h43.41c1.3281 0 2.4102-1.0781 2.4102-2.4102 0-1.3398-1.082-2.4102-2.4102-2.4102z"/>
                  <path d="m71.66 36.121h-43.41c-1.3281 0-2.4102 1.0781-2.4102 2.4102 0 1.3281 1.0781 2.4102 2.4102 2.4102h43.41c1.3281 0 2.4102-1.0781 2.4102-2.4102s-1.082-2.4102-2.4102-2.4102z"/>
                  <path d="m60.871 48.301h-32.621c-1.3281 0-2.4102 1.0781-2.4102 2.4102 0 1.3281 1.0781 2.4102 2.4102 2.4102h32.621c1.3281 0 2.4102-1.0781 2.4102-2.4102 0-1.332-1.082-2.4102-2.4102-2.4102z"/>
                </svg>
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
              className="inline-flex items-center gap-1.5 rounded-md bg-[#00152a] text-white px-6 py-3 text-base font-bold hover:bg-[#000d1a] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#00152a]"
              data-testid="button-back-home"
            >
              Return to the Home Page
            </button>
          </div>
        </div>
        </div>
      </div>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-[#F5F1E8] dark:bg-neutral-800">
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
