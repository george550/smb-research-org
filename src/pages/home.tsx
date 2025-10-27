import { useEffect } from "react";
import { Clock, MessageCircle, DollarSign, Quote, ArrowRight, Share2, Mail, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Testimonial } from "@shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@assets/us-flag.svg";
import footerFlag from "@assets/us-flag-footer.svg";
import headerImage from "@assets/header.jpg";
import amexDesktopImage from "@assets/amex-desktop.jpg";
import agencyImage from "@assets/agency.jpg";
import architectImage from "@assets/architect.jpg";
import boutiqueImage from "@assets/boutique.jpg";
import coffeeShopImage from "@assets/coffee shop.jpg";
import amexMapImage from "@assets/amex-map.png";
import constructionImage from "@assets/construction.jpg";
import legalImage from "@assets/legal.jpg";
import manufacturingImage from "@assets/manufacturing.jpg";
import salonImage from "@assets/salon.jpg";
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
          <div className="mx-auto max-w-6xl lg:max-w-none px-4 lg:pl-[50px] lg:pr-[50px] py-[0.47rem] flex items-center justify-between gap-4">
            <a
              href="#top"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AA0000] focus-visible:ring-offset-2 rounded-lg"
              data-testid="link-home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-[2.52rem] w-[2.52rem]" data-testid="img-logo">
                <style type="text/css">{`.st0{fill:none;stroke:#006fcf;stroke-width:3;stroke-miterlimit:10;}`}</style>
                <path fill="#006fcf" d="M90.9,33.1c0,0.3,0,0.7,0,1c-0.7,0.7-1.5,1.3-2.2,2c-0.5,0.5-1.2,0.8-1.4,1.4c-0.3,0.6-0.2,1.3-0.2,2c0,0.6,0.9,1.3,1.5,1.1  c-0.1-0.2-0.2-0.3-0.4-0.6c0.8,0.6,0.8,0.7,0.2,1.1c-0.2,0.1-0.7,0.1-0.8,0.2c-0.5,0.9-1.5,0.8-2.2,1.3c-0.5,0.3-1.1,0.7-1.5,1.1  c-0.2,0.2-0.4,0.7-0.3,0.9c0.7,1.3,0.1,2.2-0.5,3.1c-0.4-0.2-0.6-0.3-0.9-0.4c-0.1,0-0.1,0.1-0.2,0.1c1.9,1.4,0.6,2.8,0.3,4.2  c-0.1,0-0.2,0-0.3,0c0-0.6,0-1.3,0-1.9c-0.1,0-0.1,0-0.2,0c0,0.1-0.1,0.2-0.1,0.4c-0.2-0.3-0.3-0.4-0.5-0.7C81,49.7,80.9,49.9,81,50  c0.1,0.5,0.3,1.1,0.4,1.6c0.1,0.2,0.2,0.4,0.3,0.5c0.9,0.3,0.9,1.2,1.3,1.8c0.4,0.8,0.2,1.2-0.6,1.6c-0.2,0.1-0.3,0.4-0.5,0.6  c0.3,0.1,0.5,0.1,0.8,0.2c-0.4,0.3-0.6,0.6-0.9,0.7c-1.3,0.4-1.6,2.1-2.9,2.5c-0.1,0-0.2,0.3-0.2,0.4c-0.1,1-0.9,1.6-1.5,2.2  c-0.8,0.8-1.4,1.7-1.5,2.9c0,1.2,0.3,2.3,0.9,3.3c0.5,0.8,1.1,1.5,1.5,2.4c0.7,1.5,1.5,2.9,1.3,4.7c-0.1,0.9-0.3,1.5-1.3,2  c0.4-0.4,0.6-0.6,0.9-0.9l-0.1-0.1c-0.3,0.1-0.6,0.2-0.9,0.3c-0.3-0.4-0.6-0.9-0.9-1.2c-0.5-0.5-1.2-0.7-1.6-1.3  c-0.8-1.1-1.7-2.2-1.5-3.8c0.1-0.3-0.2-0.7-0.4-1c-0.4-0.4-0.9-0.7-1.4-1.1c-0.5-0.4-1-0.7-1.6,0c-0.4,0.4-0.9,0.7-1.6,0.3  c-0.5-0.4-1.2-0.7-1.8-0.7c-0.7-0.1-1.5,0.1-2.3,0.2c-0.1-0.2-0.2-0.4-0.2-0.4c-0.6,0.2-0.9,0.4-1.4,0.4C62.7,68,62,68,61.6,68.9  c0.3-0.1,0.5-0.2,0.7-0.3c0.1,0,0.1,0.1,0.2,0.1c-0.1,0.3-0.3,0.6-0.5,1c0.2,0.1,0.4,0.2,0.6,0.2c0.2,0.1,0.3,0.2,0.6,0.3  c-0.6,0.4-0.6,0.4-1.7-0.3c-0.1,0.3-0.3,0.5-0.5,0.9c-0.1-0.3-0.1-0.4-0.2-0.6C60,71,59.4,70.9,58.9,70c-0.2-0.3-0.7-0.4-1.1-0.6  c0,0.1-0.1,0.1-0.1,0.2c0.2,0.1,0.3,0.2,0.5,0.2c-0.8,0.1-1.6-0.1-2.3-0.1c-0.8,0-1.7,0.1-2.4,0.5C52,71,50.7,72.1,49.2,73  c-0.5,0.3-0.7,0.6-0.7,1.2c0,1,0,1.9,0,3c-0.7-0.2-1.4-0.4-2.1-0.7c-1-0.4-1.6-1.1-1.6-2.2c0-0.2-0.2-0.4-0.3-0.6  c-0.5-0.8-1.2-1.4-1.5-2.4c-0.3-1.1-1.2-1.8-2.4-2.1c-0.7-0.2-1.1,0-1.4,0.6c-0.2,0.3-0.4,0.6-0.6,1c-0.6-0.3-1.1-0.6-1.6-0.8  c-0.6-0.3-1-0.8-1-1.5c-0.1-1.8-2-2.3-2.7-3.7c0,0-0.1,0-0.2,0c-0.8-0.1-1.7-0.2-2.5-0.3c-0.1,0.3-0.2,0.6-0.3,0.9  c-0.9-0.1-1.7-0.3-2.6-0.3c-3-0.3-5.3-2.3-7.7-3.7c-0.4-0.2-0.8-0.5-1.2-0.5c-0.7-0.1-1.5-0.2-2.2-0.3c-0.2-0.1-0.5-0.4-0.6-0.6  c-0.1-0.9-0.3-1.7-1.3-2.1c-0.1,0-0.1-0.2-0.2-0.2c-0.8-0.8-1.4-1.7-2.5-2c-0.5-0.1-0.5-0.3-0.5-0.7c0-0.6-0.1-1.1-0.2-1.7  c-0.1-0.4-0.4-0.8-0.6-1.1c-0.3-0.6-0.5-1.1,0-1.5c-0.2-0.6-0.4-1.1-0.6-1.7c-0.2-0.8-0.1-1.6-0.5-2.3c-0.5-0.8-0.6-1.6-0.3-2.5  c0.1-0.4,0.2-1-0.4-1.2c0-0.1,0-0.2,0-0.3c0.7-1,1.5-2.1,1.2-3.5c-0.1-0.5,0.1-1.1,0.3-1.6c0.8-1.9,1.8-3.7,2.5-5.6  c0.3-0.8,0.2-1.8,0.3-2.7c0-0.6,0-1.2,0-1.9c1,0.3,1.6,1.4,2.7,0.8c0,0.2,0.1,0.3,0.1,0.5c0.1,0,0.1,0,0.2,0  c-0.1-0.6-0.2-1.1-0.3-1.7c0.1,0,0.2,0,0.3,0c0.9,0.3,1.8,0.5,2.7,0.8c10.4,2.6,20.9,4.2,31.7,4.1c0.6,0,1.2,0.1,1.3-1  c0.2,0.4,0.4,0.5,0.4,0.7c0,0.6,0.3,0.9,0.9,0.9c0.9,0.1,1.7,0.3,2.6,0.5c0.4,0.1,0.9,0.4,1.3,0.4c0.7,0.1,1.4,0,2.2,0  c0,0.1,0.1,0.2,0.1,0.4c-1.4,0.3-2.4,1.2-3.1,2.5c0.6-0.2,1-0.4,1.5-0.6c0,0.2,0,0.4,0,0.6c1.7,0.2,2.5-1.5,4-1.8  c-0.2,0.3-0.4,0.6-0.6,0.9c0.4,0.2,0.9,0.2,1,0.4c0.5,0.7,1,0.4,1.6,0.2c0.6-0.2,1.2-0.4,1.9-0.7c0.1,1.2,0.8,0.4,1.3,0.5  c0.1,0.3,0.2,0.7,0.3,1c-2.1,0.2-4.4,0.1-5,3.1c0.3-0.5,0.6-0.8,0.9-1.2c-0.2,1.3-0.4,2.4-0.6,3.7c-0.1,1.3,0.1,2.5,1.1,3.4  c1.2-0.7,1.6-2.2,0.9-3.4c-0.1-0.2-0.3-0.4-0.3-0.7c-0.2-1.7,0.8-3,1.8-4.2c0.1-0.1,0.5-0.1,0.7-0.1c0.3,0,0.5,0.2,0.8,0.3  c1.1,0.4,1.5,2,0.7,2.9c-0.1,0.2-0.1,0.4-0.2,0.6c0.1,0,0.2,0.1,0.3,0.1c0.2-0.2,0.3-0.5,0.5-0.7c0.1-0.1,0.4-0.3,0.6-0.2  c0.5,0.2,1.1,2.3,0.8,2.8c-0.4,0.6-0.7,1.1-1,1.7c0.9,0.4,1.5,0.7,2.3,0.1c0.8-0.6,1.8-1.1,2.6-1.7c0.7-0.6,1.7-1.1,0.8-2.4  c0.7-0.1,1.2-0.2,1.7-0.3c0.6-0.1,1.2-0.2,1.8-0.5c0.2-0.1,0.5-0.8,0.4-0.9c-0.5-0.6-0.1-0.9,0.3-1.3c0.2-0.2,0.3-0.4,0.4-0.6  c0.3-0.6,0.7-0.8,1.4-1c1.4-0.3,2.9-0.4,4.1-1.5c0.6-0.6,0.9-1.2,0.8-1.8c-0.1-1.1,0.2-2.1,0.6-3c0.4,0,0.7,0,0.9-0.1  c0.6-0.3,1.1-0.2,1.3,0.5c0.2,0.6,0.3,1.2,0.5,1.7C89.6,32.4,90,33,90.9,33.1z"/>
                <circle className="st0" cx="50" cy="50" r="48.1"/>
              </svg>
              <span className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                US Small Business Study
              </span>
            </a>
            <nav className="hidden md:flex gap-10 text-sm">
              <a href="#about" className="text-[#0056b3] hover:text-[#003d82] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AA0000] focus-visible:ring-offset-2 rounded px-1" data-testid="link-what" onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('about');
                if (element) {
                  const offsetTop = element.offsetTop - 40;
                  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
              }}>What</a>
              <a href="#who" className="text-[#0056b3] hover:text-[#003d82] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AA0000] focus-visible:ring-offset-2 rounded px-1" data-testid="link-who" onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('who');
                if (element) {
                  const offsetTop = element.offsetTop - 40;
                  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
              }}>Who</a>
              <a href="#faq" className="text-[#0056b3] hover:text-[#003d82] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AA0000] focus-visible:ring-offset-2 rounded px-1" data-testid="link-faq" onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('faq');
                if (element) {
                  const offsetTop = element.offsetTop - 40;
                  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
              }}>FAQ</a>
            </nav>
            <div className="flex gap-2 items-center lg:mr-0">
              <a
                href="/survey"
                className="inline-flex items-center gap-1.5 rounded-md bg-[#00152a] text-white px-4 py-2.5 text-sm font-bold hover:bg-[#000d1a] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#00152a]"
                data-testid="button-survey-header"
              >
                <span className="hidden md:inline">Take 5-min Survey</span>
                <span className="md:hidden">Survey</span>
              </a>
              <a
                href="/join"
                className="inline-flex items-center gap-1.5 rounded-md border border-[#00152a] text-[#00152a] px-4 py-2.5 text-sm font-bold hover:bg-[#00152a] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00152a] focus-visible:ring-offset-2"
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
        {/* Background Image - positioned to show faces in upper area */}
        <div className="absolute md:left-[50px] md:top-0 -top-[100px] left-0 w-full md:h-full h-auto z-0">
          <picture className="block w-full h-full">
            <source
              media="(max-width: 767px)"
              srcSet="https://www.americanexpress.com/content/dam/amex/en-us/benefits/shop-small/images/ShopSmall-NC-1-10062025-mob.jpg"
            />
            <source
              media="(min-width: 768px)"
              srcSet={amexDesktopImage}
            />
            <img
              src={amexDesktopImage}
              alt="Small business owner collaborating outdoors"
              className="block w-full md:h-full md:object-cover h-auto md:scale-110 scale-[1.20]"
              style={{transformOrigin: 'top center'}}
            />
          </picture>
        </div>

        {/* Curved Blue Overlay - AmEx Style with proper breakpoints */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Mobile: VERY pronounced rounded curve - big bubble effect */}
          <div className="md:hidden absolute inset-0">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <path d="M 0,50 Q 50,25 100,50 L 100,100 L 0,100 Z" fill="#006fcf" />
            </svg>
          </div>

          {/* Tablet: curved shape from left, wider coverage */}
          <div className="hidden md:block lg:hidden absolute inset-0">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <path d="M 0,0 L 0,100 L 65,100 Q 75,50 65,0 Z" fill="#006fcf" />
            </svg>
          </div>

          {/* Desktop: curved shape from left, narrower */}
          <div className="hidden lg:block absolute inset-0">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <path d="M 0,0 L 0,100 L 45,100 Q 55,50 45,0 Z" fill="#006fcf" />
            </svg>
          </div>
        </div>

        {/* Content - Different layouts per breakpoint */}
        <div className="relative z-20">
          {/* Mobile Layout - headline in curve area, content below */}
          <div className="md:hidden min-h-[590px] px-[8px] py-6">
            <div className="pt-[260px] flex flex-col items-center">
              <h1 className="text-[2rem] leading-[1.15] font-medium text-white uppercase mb-[14px] max-w-[265px] min-[500px]:max-w-[360px] text-center" style={{fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em'}} data-testid="text-hero-title">
                Share your story as a business owner
              </h1>
              <p className="text-white text-[14px] leading-relaxed font-normal mb-[12px] px-[10px]" data-testid="text-hero-description">
                Tell us about running your business—the wins, the challenges, and everything in between. 5-minute survey ($20) or 60-minute interview ($150). Ready to share your insights?
              </p>

              {/* CTA Buttons */}
              <div className="w-full flex gap-3">
                <a
                  href="/survey"
                  className="flex flex-col items-center justify-center rounded-md bg-[#00152a] text-white px-[11px] py-4 flex-1 hover:bg-[#000d1a] transition-all duration-200"
                  data-testid="button-survey-hero"
                >
                  <span className="text-[16px] font-bold leading-tight text-center">Fill out 5-minute Survey</span>
                  <span className="text-xs opacity-[0.72] text-center">Quick $20 Amazon/Zelle Reward</span>
                </a>

                <a
                  href="/join"
                  className="flex flex-col items-center justify-center rounded-md border border-white/80 text-white px-[11px] py-4 flex-1 hover:bg-white/10 transition-all duration-200"
                  data-testid="button-join-hero"
                >
                  <span className="text-[16px] font-bold leading-tight text-center">Schedule 60-minute Zoom</span>
                  <span className="text-xs opacity-[0.72] text-center">$150 compensation</span>
                </a>
              </div>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:block lg:hidden min-h-[500px] px-8 py-12">
            <div className="flex items-center h-full">
              <div className="max-w-[480px] space-y-6">
                <h1 className="text-[2rem] leading-[1.15] font-medium text-white uppercase" style={{fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em'}} data-testid="text-hero-title">
                  Share your story as a business owner
                </h1>
                <p className="text-white text-lg leading-relaxed font-normal" data-testid="text-hero-description">
                  Tell us about running your business—the wins, the challenges, and everything in between. 5-minute survey ($20) or 60-minute interview ($150). Ready to share your insights?
                </p>
                <a
                  href="/survey"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#00152a] text-white px-10 py-4 text-lg font-semibold hover:bg-[#000d1a] transition-all duration-200"
                  data-testid="button-survey-hero"
                >
                  <span>Take Survey</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <p className="text-sm text-white/95 font-normal" data-testid="text-hero-details">
                  $20 or $150 compensation · Confidential & nationwide
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block min-h-[550px] px-16 py-16">
            <div className="flex items-center h-full">
              <div className="max-w-[520px]">
                <h1 className="text-[2.9375rem] leading-[1.15] font-medium text-white uppercase max-w-[380px] pt-[30px] mb-[19px]" style={{fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em'}} data-testid="text-hero-title">
                  Share your story as a business owner
                </h1>
                <p className="text-white text-[0.9375rem] leading-relaxed font-normal pr-[140px] mb-[29px]" data-testid="text-hero-description">
                  Tell us about running your business—the wins, the challenges, and everything in between. 5-minute survey ($20) or 60-minute interview ($150). Ready to share your insights?
                </p>
                <div className="flex gap-3">
                  <a
                    href="/survey"
                    className="flex flex-col items-center justify-center rounded-md bg-[#00152a] text-white px-[11px] py-4 flex-1 hover:bg-[#000d1a] transition-all duration-200"
                    data-testid="button-survey-hero"
                  >
                    <span className="text-[16px] font-bold leading-tight text-center">Fill out 5-minute Survey</span>
                    <span className="text-xs opacity-[0.72] text-center">Quick $20 Amazon/Zelle Reward</span>
                  </a>

                  <a
                    href="/join"
                    className="flex flex-col items-center justify-center rounded-md border border-white/80 text-white px-[11px] py-4 flex-1 hover:bg-white/10 transition-all duration-200"
                    data-testid="button-join-hero"
                  >
                    <span className="text-[16px] font-bold leading-tight text-center">Schedule 60-minute Zoom</span>
                    <span className="text-xs opacity-[0.72] text-center">$150 compensation</span>
                  </a>
                </div>
                <p className="text-sm text-white/95 font-normal mt-[20px]" data-testid="text-hero-details">
                  $20 or $150 compensation · Confidential & nationwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Badge in top right corner - Desktop only */}
        <div className="absolute top-6 right-6 z-30 hidden lg:block">
          <div className="bg-white rounded-lg p-3 shadow-xl">
            <img src={logo} alt="US Small Business Study" className="h-12 w-12 object-contain" />
          </div>
        </div>
      </section>

      {/* Statistics Section - Pride Building */}
      <section className="border-t border-[#00152a] bg-[#00152a]">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-[2.9375rem] md:leading-[1.15] font-medium text-white mb-10 uppercase text-center flex items-center justify-center gap-2" style={{fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em'}}>
            <span>Small businesses power America</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5.0 -10.0 110.0 135.0" className="w-[2.8rem] h-[2.8rem] md:w-[4.2rem] md:h-[4.2rem] inline-block" fill="white">
              <path d="m50 89.398 6.8008-6.8008h-13.699l6.8008 6.8008zm0-54.797v-12h41.801c-1-1.8008-2.3008-3.5-3.8008-5-9.3008-9.3008-24.5-9.3008-33.801 0l-4.3008 4.3008-4.3008-4.3008c-4.3984-4.3984-10.102-6.6992-15.898-6.8984l0.69922 2.1992c0 0.19922-0.19922 0.39844-0.39844 0.30078l-1.8984-1.3984-1.8984 1.3984c-0.19922 0.10156-0.5 0-0.39844-0.30078l0.69922-2.1992c-5.3984 0.5-10.602 2.8008-14.699 6.8984-3.1992 3.1992-5.3008 7.1992-6.3008 11.398 0 0 0.10156 0 0.10156 0.10156l0.69922 2.3008h2.3984c0.19922 0 0.39844 0.30078 0.19922 0.5l-1.8984 1.3984 0.69922 2.3008c0 0.19922-0.19922 0.39844-0.39844 0.30078l-1.8984-1.3984-0.60156 0.39844c0 4.1016 1.1992 8.1992 3.3008 11.801h83.398c2.1992-3.6992 3.3008-7.8008 3.3008-12h-45zm-40.301-10.801h2.3984l0.69922-2.3008c0-0.19922 0.39844-0.19922 0.5 0l0.69922 2.3008h2.3984c0.19922 0 0.39844 0.30078 0.19922 0.5l-1.8984 1.3984 0.69922 2.3008c0 0.19922-0.19922 0.39844-0.39844 0.30078l-1.8984-1.3984-1.8984 1.3984c-0.19922 0.10156-0.5 0-0.39844-0.30078l0.69922-2.3008-1.8984-1.3984c-0.19922-0.10156 0-0.5 0.19922-0.5zm7.1016 15.699-1.8984 1.3984 0.69922 2.3008c0 0.19922-0.19922 0.39844-0.39844 0.30078l-1.8984-1.3984-1.8984 1.3984c-0.19922 0.10156-0.5 0-0.39844-0.30078l0.69922-2.3008-1.8984-1.3984c-0.19922-0.10156-0.10156-0.5 0.19922-0.5h2.3984l0.69922-2.3008c0-0.19922 0.39844-0.19922 0.5 0l0.69922 2.3008h2.3984c0.30078 0 0.39844 0.30078 0.19922 0.5zm0.39844-23.199h2.3984l0.69922-2.3008c0-0.19922 0.39844-0.19922 0.5 0l0.69922 2.3008h2.3984c0.19922 0 0.39844 0.30078 0.10156 0.5l-1.8984 1.3984 0.69922 2.3008c0 0.19922-0.19922 0.39844-0.39844 0.30078l-1.8984-1.3984-1.8984 1.3984c-0.19922 0.10156-0.5 0-0.39844-0.30078l0.69922-2.3008-1.8984-1.3984c-0.19922-0.10156 0-0.5 0.19922-0.5zm7.1016 15.699-1.8984 1.3984 0.69922 2.3008c0 0.19922-0.19922 0.39844-0.39844 0.30078l-1.8984-1.3984-1.8984 1.3984c-0.19922 0.10156-0.5 0-0.39844-0.30078l0.69922-2.3008-1.8984-1.3984c-0.19922-0.10156-0.10156-0.5 0.10156-0.5h2.3984l0.69922-2.3008c0-0.19922 0.39844-0.19922 0.5 0l0.69922 2.3008h2.3984c0.19922 0 0.39844 0.30078 0.19922 0.5zm0.59766-8h2.3984l0.69922-2.3008c0-0.19922 0.39844-0.19922 0.5 0l0.69922 2.3008h2.3984c0.19922 0 0.39844 0.30078 0.19922 0.5l-1.8984 1.3984 0.69922 2.3008c0 0.19922-0.19922 0.39844-0.39844 0.30078l-1.8984-1.3984-1.8984 1.3984c-0.19922 0.10156-0.5 0-0.39844-0.30078l0.69922-2.3008-1.8984-1.3984c-0.19922-0.10156 0-0.5 0.19922-0.5zm7 15.699-1.8984 1.3984 0.69922 2.3008c0 0.19922-0.19922 0.39844-0.39844 0.30078l-1.8984-1.3984-1.8984 1.3984c-0.19922 0.10156-0.5 0-0.39844-0.30078l0.69922-2.3008-1.8984-1.3984c-0.19922-0.10156-0.10156-0.5 0.10156-0.5h2.3984l0.69922-2.3008c0-0.19922 0.39844-0.19922 0.5 0l0.69922 2.3008h2.3984c0.19922 0 0.39844 0.30078 0.19922 0.5zm7.5-7.5977-1.8984 1.3984 0.69922 2.3008c0 0.19922-0.19922 0.39844-0.39844 0.30078l-1.8984-1.3984-1.8984 1.3984c-0.19922 0.10156-0.5 0-0.39844-0.30078l0.69922-2.3008-1.8984-1.3984c-0.19922-0.10156 0-0.5 0.19922-0.5h2.3984l0.69922-2.3008c0-0.19922 0.39844-0.19922 0.5 0l0.69922 2.3008h2.3984c0.19922 0 0.39844 0.30078 0.19922 0.5zm0-15.203-1.8984 1.3984 0.69922 2.3008c0 0.19922-0.19922 0.39844-0.39844 0.30078l-1.8984-1.3984-1.8984 1.3984c-0.19922 0.10156-0.5 0-0.39844-0.30078l0.69922-2.3008-1.8984-1.3984c-0.19922-0.10156 0-0.5 0.19922-0.5h2.3984l0.69922-2.3008c0-0.19922 0.39844-0.19922 0.5 0l0.69922 2.3008h2.3984c0.19922 0 0.39844 0.30078 0.19922 0.5zm7.5 22.703-1.8984 1.3984 0.69922 2.3008c0 0.19922-0.19922 0.39844-0.39844 0.30078l-1.8984-1.3984-1.8984 1.3984c-0.19922 0.10156-0.5 0-0.39844-0.30078l0.69922-2.3008-1.8984-1.3984c-0.19922-0.10156-0.10156-0.5 0.19922-0.5h2.3984l0.69922-2.3008c0-0.19922 0.39844-0.19922 0.5 0l0.69922 2.3008h2.3984c0.30078 0 0.39844 0.30078 0.19922 0.5zm0-15-1.8984 1.3984 0.69922 2.3008c0 0.19922-0.19922 0.39844-0.39844 0.30078l-1.8984-1.3984-1.8984 1.3984c-0.19922 0.10156-0.5 0-0.39844-0.30078l0.69922-2.3008-1.8984-1.3984c-0.19922-0.10156-0.10156-0.5 0.19922-0.5h2.3984l0.69922-2.3008c0-0.19922 0.39844-0.19922 0.5 0l0.69922 2.3008h2.3984c0.30078 0 0.39844 0.30078 0.19922 0.5zm-15.699 46h37.699l12-12h-61.699z"/>
            </svg>
          </h2>
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 items-center">
            {/* Left - Statistics */}
            <div>
              <p className="text-white/90 leading-relaxed mb-8 pr-5">
                You're part of the backbone of the US economy. Your insights help us understand the real challenges and
                opportunities facing small businesses across the country.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="text-[63px] md:text-[76px] font-thin text-white leading-none">34.8M</div>
                  <div className="text-sm text-white/80">Small businesses in the US</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[63px] md:text-[76px] font-thin text-white leading-none">59M</div>
                  <div className="text-sm text-white/80">Americans employed</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[63px] md:text-[76px] font-thin text-white leading-none">46%</div>
                  <div className="text-sm text-white/80">Of US workforce</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[63px] md:text-[76px] font-thin text-white leading-none">43.5%</div>
                  <div className="text-sm text-white/80">Of US GDP</div>
                </div>
              </div>
              <p className="text-sm text-white/70 mt-6 italic">Source: US Small Business Administration, 2024</p>
            </div>

            {/* Right - Image */}
            <div className="flex justify-center px-2.5 md:px-0">
              <img
                src={amexMapImage}
                alt="Map of small businesses across America"
                className="w-full md:w-[120%] max-w-[480px] h-auto rounded-xl shadow-lg dark:shadow-none"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="grid md:grid-cols-2">
          {/* Left Column - Image (Full Height) */}
          <div className="h-full min-h-[400px] md:min-h-[600px]">
            <img
              src={agencyImage}
              alt="Small business team meeting"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column - Content */}
          <div className="px-4 md:px-12 py-14 flex flex-col justify-center">
            <h2 className="text-[21px] md:text-[44px] md:leading-[1.15] font-medium mb-10 text-neutral-900 dark:text-neutral-100 uppercase" style={{fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em'}} data-testid="text-what-title">
              What participation involves
            </h2>

            <div className="space-y-6 mb-8">
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-lg">
                Running a small business means juggling everything—finances, marketing, operations, and more. You know what works and what doesn't because you live it every day.
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                We're documenting how small businesses really operate across America. No product pitch. No agenda. Just learning from the people who make it happen.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { t: "Flexible options", d: "Choose a quick 5-minute survey or in-depth 60-minute interview (remote or in-person)." },
                { t: "Share your story", d: "Tell us about your business day-to-day — tools, challenges, and what works for you." },
                { t: "$20 or $150", d: "Get compensated for your time via Amazon gift card, Venmo, or Zelle." },
              ].map((item, idx) => (
                <div key={item.t} className="space-y-1" data-testid={`card-what-${idx}`}>
                  <div className="text-[45px] md:text-[53px] font-thin text-neutral-900 dark:text-neutral-100 leading-none">{item.t}</div>
                  <div className="text-[11px] text-neutral-600 dark:text-neutral-400">{item.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who Section with Business Type Images */}
      <section id="who" className="border-t border-neutral-200 dark:border-neutral-800 bg-[#eeebe7] dark:bg-neutral-800">
        <div className="pt-14 pb-0">
          <h2 className="text-2xl md:text-[2.9375rem] md:leading-[1.15] font-medium text-center text-neutral-900 dark:text-neutral-100 mb-10 uppercase px-4" style={{fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em'}} data-testid="text-who-title">
            We want to hear from you
          </h2>

          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto px-4">
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-lg" data-testid="text-who-description">
                Owners, managers, or operations leads at businesses with 2–100 employees who handle finances, marketing,
                operations, or day-to-day business decisions. From all 50 states—major cities, small towns, and everything in between.
              </p>
            </div>

            {/* Business Types Grid with Images */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-0 mt-10">
              {[
                { img: salonImage, label: "Health & Wellness" },
                { img: boutiqueImage, label: "Retail & Boutiques" },
                { img: constructionImage, label: "Trades & Construction" },
                { img: legalImage, label: "Professional Services" },
                { img: architectImage, label: "Creative & Design" },
                { img: manufacturingImage, label: "Manufacturing" },
                { img: coffeeShopImage, label: "Food & Beverage" },
                { img: agencyImage, label: "Marketing & Tech" },
              ].map((business, idx) => (
                <div key={idx} className="relative overflow-hidden group cursor-default">
                  <img
                    src={business.img}
                    alt={business.label}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                    <p className="text-white font-semibold p-4 text-base">{business.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section id="join" className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-2xl md:text-[2.9375rem] md:leading-[1.15] font-medium text-center mb-10 text-neutral-900 dark:text-neutral-100 uppercase" style={{fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em'}} data-testid="text-join-title">Join the study</h2>

          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-center max-w-3xl mx-auto mb-10" data-testid="text-join-description">
            Choose your participation level: take a quick 5-minute survey or schedule a 60-minute interview.
            Both options are confidential and help us understand how small businesses operate across America.
          </p>

          {/* Three-column layout */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-start">
            {/* Left Column - Business Owners Collage */}
            <div className="flex justify-center">
              <img
                src={businessCollage}
                alt="Diverse group of small business owners from various industries including retail, restaurants, and services"
                className="w-full max-w-[400px] h-auto rounded-xl shadow-lg dark:shadow-none"
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
                  className="inline-flex items-center gap-1.5 justify-center rounded-md bg-[#00152a] text-white px-4 py-2.5 text-sm font-bold hover:bg-[#000d1a] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#00152a]"
                  data-testid="button-survey-join-section"
                >
                  <span>Take 5-min Survey</span>
                  <ArrowRight className="w-4 h-4" />
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
                    <span>Remote via Zoom</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>$150 thank-you after interview</span>
                  </div>
                </div>

                <a
                  href="/join"
                  className="inline-flex items-center gap-1.5 justify-center rounded-md border-2 border-[#00152a] text-[#00152a] px-4 py-2.5 text-sm font-bold hover:bg-[#00152a] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00152a] focus-visible:ring-offset-2"
                  data-testid="button-join-section"
                >
                  <span>Schedule Interview</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {testimonials && testimonials.length > 0 && (
        <section className="border-t border-neutral-200 dark:border-neutral-800 bg-[#F5F1E8] dark:bg-neutral-800">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl md:text-[2.9375rem] md:leading-[1.15] font-medium text-center text-neutral-900 dark:text-neutral-100 uppercase mb-10" style={{fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em'}} data-testid="text-testimonials-title">
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

      <section id="faq" className="border-t border-neutral-200 dark:border-neutral-800 bg-[#eeebe7] dark:bg-neutral-900">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-[2.9375rem] md:leading-[1.15] font-medium text-center text-neutral-900 dark:text-neutral-100 uppercase mb-10" style={{fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em'}} data-testid="text-faq-title">Frequently asked questions</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              {
                q: "What are my participation options?",
                a: "You can choose between a quick 5-minute survey ($20 reward via Amazon gift card or Zelle) or a 60-minute interview ($150 via Amazon gift card, Venmo, or Zelle). Both help us understand small businesses nationwide.",
              },
              {
                q: "Who's eligible to participate?",
                a: "Small business owners, managers, or ops leads across the United States who handle day-to-day business operations (finances, marketing, website, operations). Ideally businesses with 2–100 employees.",
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
          <h2 className="text-2xl md:text-[2.9375rem] md:leading-[1.15] font-medium text-center mb-4 text-neutral-900 dark:text-neutral-100 uppercase" style={{fontFamily: "'Inter Tight', sans-serif", letterSpacing: '-0.02em'}} data-testid="text-share-title">
            Know a business owner?
          </h2>
          <p className="text-center text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
            Share this study with other small business owners in your network.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:?subject=${encodeURIComponent('US Small Business Study')}&body=${encodeURIComponent('I thought you might be interested in this research study for small business owners nationwide.\n\nYou can earn $20 for a 5-minute survey or $150 for a 60-minute interview by sharing your experience managing a business.\n\nLearn more: ' + window.location.href)}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#00152a] text-[#00152a] px-4 py-2.5 text-sm font-bold hover:bg-[#00152a] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00152a] focus-visible:ring-offset-2"
              data-testid="button-share-email"
            >
              <Mail className="w-5 h-5" />
              Share via Email
            </a>

            <a
              href={`https://wa.me/?text=${encodeURIComponent('Check out this US small business research study - $20 for a 5-min survey or $150 for a 60-min interview: ' + window.location.href)}`}
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
              href={`sms:?&body=${encodeURIComponent('Check out this US business study - $20 for a 5-min survey or $150 for a 60-min interview: ' + window.location.href)}`}
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
      </section>

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
