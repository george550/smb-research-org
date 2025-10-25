import { useEffect } from "react";
import { Clock, MessageCircle, DollarSign, Quote, ArrowRight, Share2, Mail, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Testimonial } from "@shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@assets/logo.png";
import bridgeImage from "@assets/chris-brignola-392-sf bridge_1760564475188.jpg";
import bayAreaMap from "@assets/subregions-san-francisco-bay-area-600nw-2474886153_1760574932010.jpg";
import bayAreaMapDark from "@assets/bayAreaMapDark.png";
import businessCollage from "@assets/folks_1760579151233.jpg";
import rewardImage from "@assets/ChatGPT Image Oct 15, 2025, 06_29_43 PM_1760578275715.png";
import owner1 from "@assets/stock_images/professional_small_b_4def1d56.jpg";
import owner2 from "@assets/stock_images/professional_small_b_eb8b2508.jpg";
import owner3 from "@assets/stock_images/professional_small_b_c4fcf51f.jpg";

export default function Home() {
  const { data: testimonials, isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-neutral-900/80 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="relative">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
            <a
              href="#top"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AA0000] focus-visible:ring-offset-2 rounded-lg"
              data-testid="link-home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img src={logo} alt="Bay Area Small Business Study logo" className="h-10 w-10 rounded-full object-cover" data-testid="img-logo" />
              <span className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                Bay Area Small Business Study
              </span>
            </a>
            <nav className="hidden md:flex gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              <a href="#why" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AA0000] focus-visible:ring-offset-2 rounded px-1" data-testid="link-why" onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('why');
                if (element) {
                  const offsetTop = element.offsetTop - 40;
                  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
              }}>Why</a>
              <a href="#about" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AA0000] focus-visible:ring-offset-2 rounded px-1" data-testid="link-what" onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('about');
                if (element) {
                  const offsetTop = element.offsetTop - 40;
                  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
              }}>What</a>
              <a href="#who" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AA0000] focus-visible:ring-offset-2 rounded px-1" data-testid="link-who" onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('who');
                if (element) {
                  const offsetTop = element.offsetTop - 40;
                  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
              }}>Who</a>
              <a href="#faq" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AA0000] focus-visible:ring-offset-2 rounded px-1" data-testid="link-faq" onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('faq');
                if (element) {
                  const offsetTop = element.offsetTop - 40;
                  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
              }}>FAQ</a>
            </nav>
            <div className="flex gap-2 items-center">
              <a
                href="/survey"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#FF4800] text-white px-4 py-2.5 text-sm font-bold shadow-lg hover:bg-[#E04000] hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF4800]"
                data-testid="button-survey-header"
              >
                <span className="hidden md:inline">Take 5-min Survey</span>
                <span className="md:hidden">Survey</span>
              </a>
              <a
                href="/join"
                className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#FF4800] text-[#FF4800] px-4 py-2.5 text-sm font-bold hover:bg-[#FF4800] hover:text-white hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4800] focus-visible:ring-offset-2"
                data-testid="button-join-header"
              >
                <span className="hidden md:inline">Schedule 60-min Zoom</span>
                <span className="md:hidden">Zoom</span>
              </a>
              <div className="hidden lg:block">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bridgeImage}
            alt="Golden Gate Bridge spanning San Francisco Bay at sunset, symbolizing Bay Area business connections"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>
          {/* Photo Credit */}
          <div className="absolute bottom-2 right-2 text-white/40 text-xs">
            Photo: Chris Brignola
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-16 pb-10 md:pb-16">
          <div className="grid md:grid-cols-[4fr_1fr] gap-8 items-center">
            {/* Left Column - Main Content */}
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }} data-testid="text-hero-title">
                A local, community-first research initiative for Bay Area small businesses
              </h1>
              <p className="mt-4 text-white/90 md:text-lg" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)' }} data-testid="text-hero-description">
                We're talking with owners and managers about how they run their businesses — managing finances and cash flow,
                handling marketing and their website, running day-to-day operations. No selling. Just listening and learning.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {/* Primary CTA - Survey */}
                <a
                  href="/survey"
                  className="flex flex-col items-center justify-center rounded-xl bg-[#FF4800] text-white px-8 py-4 hover:bg-[#E04000] hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF4800]"
                  style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)' }}
                  data-testid="button-survey-hero"
                >
                  <span className="text-lg font-bold">Fill out 5-minute Survey</span>
                  <span className="text-sm mt-1 opacity-90">Quick $20 Amazon/Zelle Reward</span>
                </a>

                {/* Secondary CTA - Study */}
                <a
                  href="/join"
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-white/40 bg-white/10 backdrop-blur-sm text-white px-8 py-4 hover:bg-white/20 hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                  style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)' }}
                  data-testid="button-join-hero"
                >
                  <span className="text-lg font-bold">Schedule 60-minute Zoom</span>
                  <span className="text-sm mt-1 opacity-90">$150 compensation</span>
                </a>
              </div>
              <p className="mt-5 text-sm text-white/80 text-center sm:text-left" data-testid="text-hero-details">
                Quick survey or in-depth interview · $20 or $150 compensation · Confidential & Bay Area focused
              </p>
            </div>
            
            {/* Right Column - Voucher Image (Hidden) */}
            <div className="hidden">
              <img
                src={rewardImage}
                alt="$150 compensation - Amazon gift card, Venmo, or Zelle"
                className="w-[300px] h-auto rounded-xl shadow-lg"
                data-testid="img-reward-hero"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="border-t border-neutral-200 dark:border-neutral-800 bg-[#B3995D]/10 dark:bg-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-14">
          {/* Full-width centered title */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-neutral-900 dark:text-neutral-100" data-testid="text-why-title">
            Why we're doing this
          </h2>

          {/* Two-column layout below */}
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left Column - Paragraphs */}
            <div className="space-y-6">
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed" data-testid="text-why-paragraph-1">
                Running a small business here isn't easy. Between managing finances, keeping up with marketing, maintaining your website,
                handling operations, and everything else — it can feel like you're juggling ten jobs at once.
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed" data-testid="text-why-paragraph-2">
                We're mapping how Bay Area small businesses actually run day-to-day — what works, what breaks, and what improvements would genuinely help.
                This is independent research, not a product pitch.
              </p>
            </div>

            {/* Right Column - Bullet Points */}
            <ul className="space-y-4 text-neutral-900 dark:text-neutral-100">
              {[
                { t: "Honest conversations", d: "Quick surveys or one-on-one chats focused on your existing process — tools, routines, workarounds, and pain points." },
                { t: "Local focus", d: "Centering Bay Area businesses across SF, East Bay, Peninsula, South Bay, North Bay." },
                { t: "Respect for your time", d: "Choose 5 minutes ($20) or 60 minutes ($150). Remote or optional in-person for interviews." },
              ].map((item, idx) => (
                <li key={item.t} className="flex gap-3" data-testid={`list-item-why-${idx}`}>
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{item.t}</p>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">{item.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-neutral-900 dark:text-neutral-100" data-testid="text-what-title">What participation involves</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { Icon: Clock, title: "Flexible options", desc: "Choose a quick 5-minute survey or in-depth 60-minute interview (remote or in-person)." },
              { Icon: MessageCircle, title: "Share your story", desc: "Tell us about your business day-to-day — tools, challenges, and what works for you." },
              { Icon: DollarSign, title: "$20 or $150", desc: "Get compensated for your time via Amazon gift card, Venmo, or Zelle." },
            ].map((c, idx) => (
              <div key={c.title} className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 shadow-xl shadow-slate-200 dark:shadow-none" data-testid={`card-what-${idx}`}>
                <c.Icon className="w-8 h-8 text-[#FF4800]" />
                <h3 className="mt-3 font-semibold text-neutral-900 dark:text-neutral-100">{c.title}</h3>
                <p className="mt-2 text-neutral-500 dark:text-neutral-400 text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="who" className="border-t border-neutral-200 dark:border-neutral-800 bg-[#B3995D]/10 dark:bg-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-neutral-900 dark:text-neutral-100" data-testid="text-who-title">Who we'd love to hear from</h2>

          <div className="mt-10 grid md:grid-cols-[1fr_auto] gap-10 items-start">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-neutral-700 dark:text-neutral-200 font-bold">
                  Roles of people who we would love to speak to:
                </p>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed" data-testid="text-who-description">
                  Owners, general managers, or ops leads at small businesses (ideally 2–100 employees) who handle
                  day-to-day operations — finances, marketing, website management, or running the business.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-neutral-700 dark:text-neutral-200 font-bold" data-testid="text-who-counties">
                  We work with businesses from:
                </p>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  San Francisco, Marin, Sonoma, Napa, Contra Costa, Alameda, San Mateo, Santa Clara, and Solano Counties.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-neutral-700 dark:text-neutral-200 font-bold">
                  Types of businesses we work with:
                </p>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Restaurants & cafés, Retail & boutiques, Health & wellness, Trades & construction, Professional services, Creative & tech, Nonprofits, Manufacturing and more.
                </p>
              </div>
            </div>
            
            {/* Right Column - Map Image (70% size) */}
            <div className="hidden md:block">
              <img
                src={bayAreaMap}
                alt="Map of Bay Area subregions including San Francisco, East Bay, Peninsula, South Bay, and North Bay, covering San Francisco, Marin, Sonoma, Napa, Contra Costa, Alameda, San Mateo, Santa Clara, and Solano Counties"
                className="w-[345px] h-auto rounded-xl border border-neutral-200 shadow-lg dark:hidden"
                data-testid="img-bay-area-map"
              />
              <img
                src={bayAreaMapDark}
                alt="Map of Bay Area subregions including San Francisco, East Bay, Peninsula, South Bay, and North Bay, covering San Francisco, Marin, Sonoma, Napa, Contra Costa, Alameda, San Mateo, Santa Clara, and Solano Counties"
                className="w-[345px] h-auto rounded-xl hidden dark:block"
                data-testid="img-bay-area-map-dark"
              />
            </div>
          </div>

          {/* Mobile Map - Full Width */}
          <div className="md:hidden mt-6">
            <img
              src={bayAreaMap}
              alt="Map of Bay Area subregions including San Francisco, East Bay, Peninsula, South Bay, and North Bay, covering San Francisco, Marin, Sonoma, Napa, Contra Costa, Alameda, San Mateo, Santa Clara, and Solano Counties"
              className="w-full h-auto rounded-xl border border-neutral-200 shadow-lg dark:hidden"
              data-testid="img-bay-area-map-mobile"
            />
            <img
              src={bayAreaMapDark}
              alt="Map of Bay Area subregions including San Francisco, East Bay, Peninsula, South Bay, and North Bay, covering San Francisco, Marin, Sonoma, Napa, Contra Costa, Alameda, San Mateo, Santa Clara, and Solano Counties"
              className="w-full h-auto rounded-xl hidden dark:block"
              data-testid="img-bay-area-map-mobile-dark"
            />
          </div>
        </div>
      </section>


      <section id="join" className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-neutral-900 dark:text-neutral-100" data-testid="text-join-title">Join the study</h2>

          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-center max-w-3xl mx-auto mb-10" data-testid="text-join-description">
            Choose your participation level: take a quick 5-minute survey or schedule a 60-minute interview.
            Both options are confidential and help us understand Bay Area small businesses better.
          </p>

          {/* Three-column layout */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-start">
            {/* Left Column - Business Owners Collage */}
            <div className="flex justify-center">
              <img
                src={businessCollage}
                alt="Diverse group of Bay Area small business owners from various industries including retail, restaurants, and services"
                className="w-full max-w-[400px] h-auto rounded-xl border border-neutral-200 dark:border-0 shadow-lg dark:shadow-none"
                data-testid="img-business-collage"
              />
            </div>

            {/* Right Column - Two options side by side */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Survey Option */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Quick Survey</h3>
                <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>5 minutes online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Fill out at your convenience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>$20 Amazon/Zelle reward</span>
                  </div>
                </div>

                <a
                  href="/survey"
                  className="flex flex-col items-center justify-center rounded-xl bg-[#FF4800] text-white px-8 py-4 w-full hover:bg-[#E04000] hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4800] focus-visible:ring-offset-2"
                  data-testid="button-survey-join-section"
                >
                  <span className="text-lg font-bold">Fill out 5-minute Survey</span>
                  <span className="text-sm mt-1 opacity-90">Quick $20 Amazon/Zelle Reward</span>
                </a>
              </div>

              {/* Interview Option */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">In-Depth Interview</h3>
                <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>60-minute conversation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Remote or in-person</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>$150 thank-you after interview</span>
                  </div>
                </div>

                <a
                  href="/join"
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-[#FF4800] text-[#FF4800] px-8 py-4 w-full hover:bg-[#FF4800] hover:text-white hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4800] focus-visible:ring-offset-2"
                  data-testid="button-join-section"
                >
                  <span className="text-lg font-bold">Schedule 60-minute Zoom</span>
                  <span className="text-sm mt-1 opacity-90">$150 compensation</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {testimonials && testimonials.length > 0 && (
        <section className="border-t border-neutral-200 dark:border-neutral-800 bg-[#B3995D]/10 dark:bg-neutral-800">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-neutral-900 dark:text-neutral-100" data-testid="text-testimonials-title">
              What other business owners are saying
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, idx) => {
                const ownerPhotos = [owner1, owner2, owner3];
                const ownerPhoto = ownerPhotos[idx % ownerPhotos.length];
                const initials = testimonial.name.split(' ').map(n => n[0]).join('');

                return (
                  <div
                    key={testimonial.id}
                    className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 space-y-4"
                    data-testid={`card-testimonial-${idx}`}
                  >
                    <Quote className="w-8 h-8 text-red-600/30" data-testid={`icon-quote-${idx}`} />
                    <p className="text-neutral-900 dark:text-neutral-100 leading-relaxed" data-testid={`text-quote-${idx}`}>
                      "{testimonial.quote}"
                    </p>
                    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 flex items-center gap-3">
                      <Avatar className="h-12 w-12" data-testid={`avatar-owner-${idx}`}>
                        <AvatarImage src={ownerPhoto} alt={testimonial.name} />
                        <AvatarFallback className="bg-red-600 text-white">{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-neutral-900 dark:text-neutral-100" data-testid={`text-name-${idx}`}>
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400" data-testid={`text-business-type-${idx}`}>
                          {testimonial.businessType}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section id="faq" className="border-t border-neutral-200 dark:border-neutral-800 bg-[#B3995D]/10 dark:bg-neutral-900">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-neutral-900 dark:text-neutral-100" data-testid="text-faq-title">Frequently asked questions</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              {
                q: "What are my participation options?",
                a: "You can choose between a quick 5-minute survey ($20 reward via Amazon gift card or Zelle) or a 60-minute interview ($150 via Amazon gift card, Venmo, or Zelle). Both help us understand Bay Area small businesses.",
              },
              {
                q: "Who's eligible to participate?",
                a: "Bay Area small business owners, managers, or ops leads who handle day-to-day business operations (finances, marketing, website, operations). Ideally businesses with 2–100 employees.",
              },
              {
                q: "How and when do I get paid?",
                a: "For the 5-minute survey, you'll receive $20 within 1-2 business days after completion. For the 60-minute interview, you'll receive $150 within 1-2 business days after your session. Payment via Amazon gift card, Venmo, or Zelle — your choice.",
              },
              {
                q: "Is my information kept confidential?",
                a: "Yes. All responses and conversations are completely confidential. We share research findings in aggregate only, with no names, business names, or identifying details.",
              },
              {
                q: "What will the interview cover?",
                a: "For the 60-minute interview, we'll discuss your real day-to-day workflows: how you manage finances and cash flow, handle marketing and your website, run operations, and what tools or processes you use. The 5-minute survey covers similar topics but in a quicker, written format.",
              },
              {
                q: "Do I need to prepare anything?",
                a: "No prep needed! For the survey, just have 5 minutes to answer questions. For the interview, just come ready to share honest thoughts about how you run your business day-to-day.",
              },
              {
                q: "Can I do both the survey and the interview?",
                a: "Yes! You're welcome to complete the survey and also schedule an interview if you'd like to participate in both.",
              },
              {
                q: "How long after I sign up will I hear back?",
                a: "For the survey, you'll receive your $20 reward within 1-2 business days. For interviews, we typically reach out within 3-5 business days to schedule. Feel free to follow up if you don't hear from us!",
              },
            ].map((f, idx) => (
              <div key={f.q} className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6" data-testid={`card-faq-${idx}`}>
                <p className="font-semibold text-neutral-900 dark:text-white">{f.q}</p>
                <p className="mt-2 text-neutral-600 dark:text-neutral-200 text-sm">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-neutral-900 dark:text-neutral-100" data-testid="text-share-title">
            Know someone who would be a good fit?
          </h2>
          <p className="text-center text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
            Share this study with other Bay Area business owners in your network.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/?text=${encodeURIComponent('Check out this Bay Area small business research study - $20 for a 5-min survey or $150 for a 60-min interview: ' + window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border-2 border-[#25D366] text-[#25D366] px-6 py-3 font-semibold hover:bg-[#25D366] hover:text-white transition-all duration-200"
              data-testid="button-share-whatsapp"
            >
              <Share2 className="w-5 h-5" />
              Share via WhatsApp
            </a>

            <a
              href={`mailto:?subject=${encodeURIComponent('Bay Area Small Business Study')}&body=${encodeURIComponent('I thought you might be interested in this research study for Bay Area small business owners.\n\nYou can earn $20 for a 5-minute survey or $150 for a 60-minute interview by sharing your experience managing a business.\n\nLearn more: ' + window.location.href)}`}
              className="flex items-center gap-2 rounded-lg border-2 border-[#FF4800] text-[#FF4800] px-6 py-3 font-semibold hover:bg-[#FF4800] hover:text-white transition-all duration-200"
              data-testid="button-share-email"
            >
              <Mail className="w-5 h-5" />
              Share via Email
            </a>

            <a
              href={`sms:?&body=${encodeURIComponent('Check out this Bay Area business study - $20 for a 5-min survey or $150 for a 60-min interview: ' + window.location.href)}`}
              className="flex items-center gap-2 rounded-lg border-2 border-[#FF4800] text-[#FF4800] px-6 py-3 font-semibold hover:bg-[#FF4800] hover:text-white transition-all duration-200"
              data-testid="button-share-sms"
            >
              <Phone className="w-5 h-5" />
              Share via Text
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-[#B3995D]/10 dark:bg-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-center text-sm text-neutral-400 dark:text-neutral-500" data-testid="text-footer">
            Bay Area Small Business Study · Independent Research Initiative
          </p>
          <p className="text-center text-sm text-neutral-400 dark:text-neutral-500 mt-2">
            <a href="/privacy" className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
