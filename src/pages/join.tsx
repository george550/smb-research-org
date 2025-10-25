// LAYER 2: Validation logic added (blocks invalid actions but doesn't show errors)
// Validation functions run and block navigation/submission, but no error messages display yet
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Clock, MessageCircle, DollarSign, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@assets/logo.png";

const roleOptions = ["I own the business", "I manage operations or finances"];
const employeeCountOptions = ["1–2", "3–10", "11–50", "51–100", "Over 100"];
const responsibilityOptions = ["Sending invoices or collecting customer payments", "Paying suppliers or vendors", "Running payroll or paying staff", "Paying taxes or compliance payments", "Reviewing cash flow reports or bank balances", "None of the above"];
const toolOptions = ["QuickBooks / Xero", "Stripe / Square / Clover / Toast / POS", "Chase / Bank of America / Wells Fargo portals", "Excel / Google Sheets", "Other (please specify)", "None, not sure"];
const marketingChannelsOptions = ["Social media (Facebook, Instagram, LinkedIn, etc.)", "Google Ads or paid search", "Email marketing", "Website / SEO", "Print ads, flyers, or local marketing", "Word of mouth only", "None / not doing marketing", "Other"];
const websiteToolOptions = ["Squarespace / Wix / WordPress", "Shopify / WooCommerce", "Custom website (developer-built)", "GoDaddy / hosting provider", "Don't have a website", "Other"];
const frequencyOptions = ["Daily", "Weekly", "Every other week", "Monthly", "A few times per year"];
const comfortableOptions = ["Yes", "No"];
const industryOptions = ["Retail (online or offline stores)", "Food & Beverages (Restaurant, Coffee Shop, etc)", "Professional services (Legal or Other types of services)", " Trades and Construction (HVAC, contractors, etc)", "Health & Wellness", "Automotive (Garage, Dealership, etc)", "Other"];

export default function Join() {
  const { toast } = useToast();
  const formTitleRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);

  // PHASE 2A: Step 1 error display flag
  const [showStep1Errors, setShowStep1Errors] = useState(false);

  // PHASE 2B: Step 2 error display flag
  const [showStep2Errors, setShowStep2Errors] = useState(false);

  // PHASE 2C-1: Step 3 error display flag
  const [showStep3Errors, setShowStep3Errors] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    city: "",
    role: "",
    employeeCount: "",
    industry: "",
    responsibilities: [] as string[],
    tools: [] as string[],
    marketingChannels: [] as string[],
    websiteTool: "",
    financeFrequency: "",
    cashFlowStory: "",
    comfortableDiscussing: "",
    referralSource: "",
  });

  // LAYER 2: Error messages (stored but not displayed yet)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    city: "",
    role: "",
    employeeCount: "",
    industry: "",
    responsibilities: "",
    tools: "",
    marketingChannels: "",
    websiteTool: "",
    financeFrequency: "",
    cashFlowStory: "",
    comfortableDiscussing: "",
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/participants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit");
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Application submitted!", description: "Thank you for your interest. We'll be in touch soon." });
      setTimeout(() => { window.location.href = "/thank-you"; }, 2000);
    },
    onError: () => {
      toast({ title: "Submission failed", description: "Please try again later.", variant: "destructive" });
    },
  });

  // LAYER 2: Validation functions (run but don't display errors yet)
  const validateStep1 = (): boolean => {
    const newErrors = { name: "", email: "", phone: "" };
    let isValid = true;

    if (!formData.name || formData.name.trim().length === 0) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email || formData.email.trim().length === 0) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please provide a valid email";
      isValid = false;
    }

    if (!formData.phone || formData.phone.trim().length < 10) {
      newErrors.phone = "Please provide a valid phone number";
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const validateStep2 = (): boolean => {
    const newErrors = {
      businessName: "",
      city: "",
      role: "",
      employeeCount: "",
      industry: "",
    };
    let isValid = true;

    if (!formData.businessName || formData.businessName.trim().length === 0) {
      newErrors.businessName = "Business name is required";
      isValid = false;
    }

    if (!formData.city || formData.city.trim().length === 0) {
      newErrors.city = "City is required";
      isValid = false;
    }

    if (!formData.role) {
      newErrors.role = "Please select your role";
      isValid = false;
    }

    if (!formData.employeeCount) {
      newErrors.employeeCount = "Please select employee count";
      isValid = false;
    }

    if (!formData.industry) {
      newErrors.industry = "Please select your industry";
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const validateStep3 = (): boolean => {
    const newErrors = {
      responsibilities: "",
      tools: "",
      marketingChannels: "",
      websiteTool: "",
      financeFrequency: "",
      cashFlowStory: "",
      comfortableDiscussing: "",
    };
    let isValid = true;

    if (formData.responsibilities.length === 0) {
      newErrors.responsibilities = "Please select at least one responsibility";
      isValid = false;
    }

    if (formData.tools.length === 0) {
      newErrors.tools = "Please select at least one tool";
      isValid = false;
    }

    if (formData.marketingChannels.length === 0) {
      newErrors.marketingChannels = "Please select at least one marketing channel";
      isValid = false;
    }

    if (!formData.websiteTool) {
      newErrors.websiteTool = "Please select a website tool";
      isValid = false;
    }

    if (!formData.financeFrequency) {
      newErrors.financeFrequency = "Please select frequency";
      isValid = false;
    }

    if (!formData.cashFlowStory || formData.cashFlowStory.length < 20) {
      newErrors.cashFlowStory = "Please share your experience (at least 20 characters)";
      isValid = false;
    }

    if (!formData.comfortableDiscussing) {
      newErrors.comfortableDiscussing = "Please select an option";
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  // Clear individual field error if field becomes valid (for all steps)
  const clearFieldErrorIfValid = (field: string, value: any, step: number) => {
    // Only clear if errors are currently showing for this step
    if (step === 1 && !showStep1Errors) return;
    if (step === 2 && !showStep2Errors) return;
    if (step === 3 && !showStep3Errors) return;

    let isValid = false;

    // Step 1 validation
    if (field === 'name') {
      isValid = value && value.trim().length > 0;
    } else if (field === 'email') {
      isValid = value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (field === 'phone') {
      isValid = value && value.trim().length >= 10;
    }
    // Step 2 validation
    else if (field === 'businessName' || field === 'city') {
      isValid = value && value.trim().length > 0;
    } else if (field === 'role' || field === 'employeeCount' || field === 'industry') {
      isValid = !!value;
    }
    // Step 3 validation
    else if (field === 'responsibilities' || field === 'tools' || field === 'marketingChannels') {
      isValid = Array.isArray(value) && value.length > 0;
    } else if (field === 'financeFrequency' || field === 'comfortableDiscussing' || field === 'websiteTool') {
      isValid = !!value;
    } else if (field === 'cashFlowStory') {
      isValid = value && value.length >= 20;
    }

    if (isValid) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleInputChange = (field: string, value: string, step?: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Determine which step we're on if not explicitly provided
    const currentStepForValidation = step || currentStep;
    clearFieldErrorIfValid(field, value, currentStepForValidation);
  };

  const handleResponsibilityChange = (value: string, checked: boolean, e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    const updated = checked ? [...formData.responsibilities, value] : formData.responsibilities.filter(r => r !== value);
    setFormData((prev) => ({ ...prev, responsibilities: updated }));
    clearFieldErrorIfValid('responsibilities', updated, 3);
  };

  const handleToolChange = (value: string, checked: boolean, e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    const updated = checked ? [...formData.tools, value] : formData.tools.filter(t => t !== value);
    setFormData((prev) => ({ ...prev, tools: updated }));
    clearFieldErrorIfValid('tools', updated, 3);
  };

  const handleMarketingChannelChange = (value: string, checked: boolean, e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    const updated = checked ? [...formData.marketingChannels, value] : formData.marketingChannels.filter(m => m !== value);
    setFormData((prev) => ({ ...prev, marketingChannels: updated }));
    clearFieldErrorIfValid('marketingChannels', updated, 3);
  };

  const scrollToForm = () => {
    if (formTitleRef.current) {
      const offset = 150;
      const elementPosition = formTitleRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // PHASE 2A: Navigation with Step 1 error display
  const nextStep = (e?: React.MouseEvent) => {
    e?.preventDefault();  // Prevent form submission
    if (currentStep === 1) {
      const isValid = validateStep1();
      if (!isValid) {
        setShowStep1Errors(true);  // PHASE 2A: Show Step 1 errors
        return;
      }
      setShowStep1Errors(false);  // PHASE 2A: Clear Step 1 errors
      setCurrentStep(2);
      setTimeout(() => scrollToForm(), 0);
    } else if (currentStep === 2) {
      const isValid = validateStep2();
      if (!isValid) {
        setShowStep2Errors(true);  // PHASE 2B: Show Step 2 errors
        return;
      }
      setShowStep2Errors(false);  // PHASE 2B: Clear Step 2 errors
      setShowStep3Errors(false);  // PHASE 2C-1: CRITICAL - Reset Step 3 errors before navigation
      setCurrentStep(3);
      setTimeout(() => scrollToForm(), 0);
    }
  };

  const prevStep = (e?: React.MouseEvent) => {
    e?.preventDefault();  // Prevent form submission
    // PHASE 2B & 2C-1: Clear error flags when going back
    if (currentStep === 2) {
      setShowStep2Errors(false);
    } else if (currentStep === 3) {
      setShowStep3Errors(false);  // PHASE 2C-1: CRITICAL - Clear Step 3 errors when leaving
    }
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setTimeout(() => scrollToForm(), 0);
  };

  const goToStep = (targetStep: number, e?: React.MouseEvent) => {
    e?.preventDefault();  // Prevent form submission

    // Prevent navigation forward if current step or previous steps are invalid
    if (targetStep > currentStep) {
      // Check all steps up to and including current step
      if (currentStep >= 1) {
        const step1Valid = validateStep1();
        if (!step1Valid) {
          setShowStep1Errors(true);
          return;
        }
      }
      if (currentStep >= 2 && targetStep > 2) {
        const step2Valid = validateStep2();
        if (!step2Valid) {
          setShowStep2Errors(true);
          return;
        }
      }
    }

    // Clear all error flags when jumping between steps
    setShowStep1Errors(false);
    setShowStep2Errors(false);
    setShowStep3Errors(false);
    setCurrentStep(targetStep);
    setTimeout(() => scrollToForm(), 0);
  };

  // PHASE 2C-1: Submit with error flag setting (but no error display in JSX yet)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      nextStep();
      return;
    }

    // Final submit on Step 3 - validate ALL steps
    const step1Valid = validateStep1();
    const step2Valid = validateStep2();
    const step3Valid = validateStep3();

    // If any step is invalid, show errors and navigate to first invalid step
    if (!step1Valid) {
      setShowStep1Errors(true);
      setCurrentStep(1);
      setTimeout(() => scrollToForm(), 0);
      return;
    }
    if (!step2Valid) {
      setShowStep2Errors(true);
      setCurrentStep(2);
      setTimeout(() => scrollToForm(), 0);
      return;
    }
    if (!step3Valid) {
      setShowStep3Errors(true);
      return;
    }

    submitMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-neutral-900/80 bg-white dark:bg-neutral-900 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800">
          <a href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity flex-1 min-w-0">
            <img src={logo} alt="Logo" className="h-10 w-10 flex-shrink-0 rounded-full object-cover" />
            <span className="text-base md:text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 truncate">
              <span className="hidden sm:inline">Schedule 60-minute Zoom</span>
              <span className="sm:hidden">60-min Interview</span>
              <span className="hidden md:inline text-neutral-500 dark:text-neutral-400"> ($150 compensation)</span>
            </span>
          </a>
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-3">
          <div className="flex items-center justify-between pt-3">
            <button type="button" onClick={(e) => goToStep(1, e)} className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-xs md:text-sm ${currentStep === 1 ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900" : currentStep > 1 ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 cursor-pointer hover:bg-green-200 dark:hover:bg-green-800" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500"}`}>
              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold ${currentStep === 1 ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white" : currentStep > 1 ? "bg-green-600 text-white" : "bg-neutral-300 dark:bg-neutral-600 text-neutral-500 dark:text-neutral-400"}`}>{currentStep > 1 ? "✓" : "1"}</span>
              <span>Personal Details</span>
            </button>
            <div className="flex-1 h-1 mx-1 md:mx-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-500 ${currentStep > 1 ? "bg-green-500 w-full" : "bg-neutral-200 dark:bg-neutral-700 w-0"}`} />
            </div>
            <button type="button" onClick={(e) => goToStep(2, e)} className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-xs md:text-sm ${currentStep === 2 ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900" : currentStep > 2 ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 cursor-pointer hover:bg-green-200 dark:hover:bg-green-800" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500"}`}>
              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold ${currentStep === 2 ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white" : currentStep > 2 ? "bg-green-600 text-white" : "bg-neutral-300 dark:bg-neutral-600 text-neutral-500 dark:text-neutral-400"}`}>{currentStep > 2 ? "✓" : "2"}</span>
              <span>Business Details</span>
            </button>
            <div className="flex-1 h-1 mx-1 md:mx-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-500 ${currentStep > 2 ? "bg-green-500 w-full" : "bg-neutral-200 dark:bg-neutral-700 w-0"}`} />
            </div>
            <button type="button" onClick={(e) => goToStep(3, e)} className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-xs md:text-sm ${currentStep === 3 ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500"}`}>
              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold ${currentStep === 3 ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white" : "bg-neutral-300 dark:bg-neutral-600 text-neutral-500 dark:text-neutral-400"}`}>3</span>
              <span>Experience and Tools</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div ref={formTitleRef} className="h-0" />

            <form onSubmit={handleSubmit} className="space-y-8">
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-semibold text-left dark:text-white">Full Name *</Label>
                    <div className="relative">
                      <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder="e.g. John Doe" className={showStep1Errors && errors.name ? "border-red-500" : ""} />
                      {formData.name && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </div>
                    {showStep1Errors && errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-semibold text-left dark:text-white">Email Address *</Label>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">We'll send interview details and updates to this email</p>
                    <div className="relative">
                      <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="e.g. john@example.com" className={showStep1Errors && errors.email ? "border-red-500" : ""} />
                      {formData.email && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </div>
                    {showStep1Errors && errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-semibold text-left dark:text-white">Phone Number *</Label>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">For scheduling your 60-minute interview</p>
                    <div className="relative">
                      <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} placeholder="e.g. (555) 123-4567" className={showStep1Errors && errors.phone ? "border-red-500" : ""} />
                      {formData.phone && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </div>
                    {showStep1Errors && errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-base font-semibold text-left dark:text-white">Small Business Name *</Label>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">The name of the small business that you own or manage</p>
                    <div className="relative">
                      <Input id="businessName" value={formData.businessName} onChange={(e) => handleInputChange("businessName", e.target.value)} placeholder="e.g. Bay Area Coffee Co" className={showStep2Errors && errors.businessName ? "border-red-500" : ""} />
                      {formData.businessName && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </div>
                    {showStep2Errors && errors.businessName && <p className="text-sm text-red-500">{errors.businessName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-base font-semibold text-left dark:text-white">Which city is your business located in? *</Label>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">We currently only accept businesses in the San Francisco Bay Area.</p>
                    <div className="relative">
                      <Input id="city" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} placeholder="e.g. San Francisco" className={showStep2Errors && errors.city ? "border-red-500" : ""} />
                      {formData.city && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </div>
                    {showStep2Errors && errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-base font-semibold text-left dark:text-white">What's your role in the business? *</Label>
                    <div className="relative">
                      <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                        <SelectTrigger className={showStep2Errors && errors.role ? "border-red-500" : ""}><SelectValue placeholder="Select your role" /></SelectTrigger>
                        <SelectContent>{roleOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
                      </Select>
                      {formData.role && (
                        <span className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center pointer-events-none">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </div>
                    {showStep2Errors && errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeCount" className="text-base font-semibold text-left dark:text-white">How many people work at your business (including you)? *</Label>
                    <div className="relative">
                      <Select value={formData.employeeCount} onValueChange={(value) => handleInputChange("employeeCount", value)}>
                        <SelectTrigger className={showStep2Errors && errors.employeeCount ? "border-red-500" : ""}><SelectValue placeholder="Select employee count" /></SelectTrigger>
                        <SelectContent>{employeeCountOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
                      </Select>
                      {formData.employeeCount && (
                        <span className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center pointer-events-none">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </div>
                    {showStep2Errors && errors.employeeCount && <p className="text-sm text-red-500">{errors.employeeCount}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-base font-semibold text-left dark:text-white">What industry does your business operate in? *</Label>
                    <div className="relative">
                      <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                        <SelectTrigger className={showStep2Errors && errors.industry ? "border-red-500" : ""}><SelectValue placeholder="Select industry" /></SelectTrigger>
                        <SelectContent>{industryOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
                      </Select>
                      {formData.industry && (
                        <span className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center pointer-events-none">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </div>
                    {showStep2Errors && errors.industry && <p className="text-sm text-red-500">{errors.industry}</p>}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label className="text-base font-bold text-left dark:text-white leading-tight">Which of these do you personally handle or oversee? *</Label>
                      {formData.responsibilities.length > 0 && (
                        <span className="w-5 h-5 flex-shrink-0 bg-green-600 rounded-full flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      {responsibilityOptions.map((option) => {
                        const isSelected = formData.responsibilities.includes(option);
                        return (
                          <div key={option} onClick={(e) => handleResponsibilityChange(option, !isSelected, e)} className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer ${isSelected ? "border-neutral-900 dark:border-neutral-100 bg-neutral-100 dark:bg-neutral-800" : "border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"}`}>
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${isSelected ? "bg-neutral-900 dark:bg-neutral-100 border-neutral-900 dark:border-neutral-100" : "border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900"}`}>
                              {isSelected && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" className="dark:stroke-neutral-900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            </div>
                            <span className="text-sm font-medium flex-1 text-neutral-900 dark:text-neutral-100">{option}</span>
                          </div>
                        );
                      })}
                    </div>
                    {showStep3Errors && errors.responsibilities && <p className="text-sm text-red-500">{errors.responsibilities}</p>}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5">
                      <Label className="text-[15px] font-bold text-left dark:text-white leading-tight tracking-tight">What tools or systems do you use to manage payments and cash flow? *</Label>
                      {formData.tools.length > 0 && (
                        <span className="w-5 h-5 flex-shrink-0 bg-green-600 rounded-full flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      {toolOptions.map((option) => {
                        const isSelected = formData.tools.includes(option);
                        return (
                          <div key={option} onClick={(e) => handleToolChange(option, !isSelected, e)} className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer ${isSelected ? "border-neutral-900 dark:border-neutral-100 bg-neutral-100 dark:bg-neutral-800" : "border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"}`}>
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${isSelected ? "bg-neutral-900 dark:bg-neutral-100 border-neutral-900 dark:border-neutral-100" : "border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900"}`}>
                              {isSelected && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" className="dark:stroke-neutral-900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            </div>
                            <span className="text-sm font-medium flex-1 text-neutral-900 dark:text-neutral-100">{option}</span>
                          </div>
                        );
                      })}
                    </div>
                    {showStep3Errors && errors.tools && <p className="text-sm text-red-500">{errors.tools}</p>}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label className="text-base font-bold text-left dark:text-white leading-tight">What marketing channels do you use for your business? *</Label>
                      {formData.marketingChannels.length > 0 && (
                        <span className="w-5 h-5 flex-shrink-0 bg-green-600 rounded-full flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      {marketingChannelsOptions.map((option) => {
                        const isSelected = formData.marketingChannels.includes(option);
                        return (
                          <div key={option} onClick={(e) => handleMarketingChannelChange(option, !isSelected, e)} className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer ${isSelected ? "border-neutral-900 dark:border-neutral-100 bg-neutral-100 dark:bg-neutral-800" : "border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"}`}>
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${isSelected ? "bg-neutral-900 dark:bg-neutral-100 border-neutral-900 dark:border-neutral-100" : "border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900"}`}>
                              {isSelected && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" className="dark:stroke-neutral-900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            </div>
                            <span className="text-sm font-medium flex-1 text-neutral-900 dark:text-neutral-100">{option}</span>
                          </div>
                        );
                      })}
                    </div>
                    {showStep3Errors && errors.marketingChannels && <p className="text-sm text-red-500">{errors.marketingChannels}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="websiteTool" className="text-base font-semibold text-left dark:text-white">What tool do you use to manage your website? *</Label>
                    <div className="relative">
                      <Select value={formData.websiteTool} onValueChange={(value) => handleInputChange("websiteTool", value)}>
                        <SelectTrigger className={showStep3Errors && errors.websiteTool ? "border-red-500" : ""}><SelectValue placeholder="Select a tool" /></SelectTrigger>
                        <SelectContent>{websiteToolOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
                      </Select>
                      {formData.websiteTool && (
                        <span className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center pointer-events-none">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </div>
                    {showStep3Errors && errors.websiteTool && <p className="text-sm text-red-500">{errors.websiteTool}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="financeFrequency" className="text-base font-semibold text-left dark:text-white">How often do you personally look at your business's finances? *</Label>
                    <div className="relative">
                      <Select value={formData.financeFrequency} onValueChange={(value) => handleInputChange("financeFrequency", value)}>
                        <SelectTrigger className={showStep3Errors && errors.financeFrequency ? "border-red-500" : ""}><SelectValue placeholder="Select frequency" /></SelectTrigger>
                        <SelectContent>{frequencyOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
                      </Select>
                      {formData.financeFrequency && (
                        <span className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center pointer-events-none">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </div>
                    {showStep3Errors && errors.financeFrequency && <p className="text-sm text-red-500">{errors.financeFrequency}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cashFlowStory" className="text-base font-semibold text-left dark:text-white">Tell us about the last time cash felt tight or payments got delayed. What happened? *</Label>
                    <div className="relative">
                      <Textarea id="cashFlowStory" value={formData.cashFlowStory} onChange={(e) => handleInputChange("cashFlowStory", e.target.value)} placeholder="e.g. Last month, a major client paid 30 days late, which made it difficult to cover payroll..." rows={5} className={`pb-8 ${showStep3Errors && errors.cashFlowStory ? "border-red-500" : ""}`} />
                      {formData.cashFlowStory && formData.cashFlowStory.length >= 20 && (
                        <span className="absolute right-3 top-3 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                      {(!formData.cashFlowStory || formData.cashFlowStory.length < 20) && (
                        <div className="absolute bottom-2 right-3 text-xs">
                          <span className={formData.cashFlowStory && formData.cashFlowStory.length > 0 ? "text-red-500" : "text-neutral-400 dark:text-neutral-500"}>
                            {formData.cashFlowStory?.length || 0}/20 characters minimum
                          </span>
                        </div>
                      )}
                    </div>
                    {showStep3Errors && errors.cashFlowStory && <p className="text-sm text-red-500">{errors.cashFlowStory}</p>}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Label className="flex-1 text-base font-semibold text-left dark:text-white">Would you be comfortable talking through your typical week managing payments (without sharing any private numbers)? *</Label>
                      {formData.comfortableDiscussing && (
                        <span className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </div>
                    <div className="flex gap-4">
                      {comfortableOptions.map((option) => {
                        const isSelected = formData.comfortableDiscussing === option;
                        return (
                          <div key={option} onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleInputChange("comfortableDiscussing", option); }} className={`flex items-center space-x-3 px-6 py-3 rounded-lg border-2 cursor-pointer flex-1 ${isSelected ? "border-neutral-900 dark:border-neutral-100 bg-neutral-100 dark:bg-neutral-800" : "border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? "bg-neutral-900 dark:bg-neutral-100 border-neutral-900 dark:border-neutral-100" : "border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900"}`}>
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white dark:bg-neutral-900"></div>}
                            </div>
                            <span className="text-base font-medium text-neutral-900 dark:text-neutral-100">{option}</span>
                          </div>
                        );
                      })}
                    </div>
                    {showStep3Errors && errors.comfortableDiscussing && <p className="text-sm text-red-500">{errors.comfortableDiscussing}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referralSource" className="text-base font-semibold text-left dark:text-white">Who referred you/how did you find out about the research? <span className="text-neutral-400 font-normal">(optional)</span></Label>
                    <div className="relative">
                      <Input id="referralSource" value={formData.referralSource} onChange={(e) => handleInputChange("referralSource", e.target.value)} placeholder="e.g. Friend, LinkedIn, flyer, etc." />
                      {formData.referralSource && formData.referralSource.length > 0 && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-6">
                {currentStep > 1 && (
                  <Button type="button" onClick={(e) => prevStep(e)} variant="outline" className="px-6 py-5 text-sm font-semibold border-2">← Previous</Button>
                )}
                {currentStep < 3 ? (
                  <Button type="button" onClick={(e) => nextStep(e)} className="flex-1 bg-[#FF4800] hover:bg-[#E04000] text-white font-semibold py-5 text-sm border-0">
                    Continue to {currentStep === 1 ? "Business Details" : "Experience and Tools"} →
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={submitMutation.isPending || submitMutation.isSuccess}
                    className={`flex-1 font-semibold py-5 text-sm border-0 ${
                      submitMutation.isSuccess
                        ? "bg-neutral-900 text-white cursor-not-allowed"
                        : formData.responsibilities.length > 0 &&
                          formData.tools.length > 0 &&
                          formData.marketingChannels.length > 0 &&
                          formData.websiteTool &&
                          formData.financeFrequency &&
                          formData.cashFlowStory &&
                          formData.cashFlowStory.length >= 20 &&
                          formData.comfortableDiscussing
                        ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                        : "bg-[#FF4800] hover:bg-[#E04000] text-white"
                    }`}
                  >
                    {submitMutation.isPending ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Submitting...</>
                    ) : submitMutation.isSuccess ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        Application Submitted
                      </div>
                    ) : (
                      "Submit My Application"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-32 space-y-5 scale-90">
              {[
                { Icon: Clock, title: "60 minutes", desc: "Remote or in-person." },
                { Icon: MessageCircle, title: "One-on-one", desc: "Explore your business operations." },
                { Icon: DollarSign, title: "$150 thank-you", desc: "Paid after interview." },
                { Icon: Mail, title: "Reach out", desc: "george@smb-research.org" },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-[#B3995D]/10 dark:bg-neutral-800 px-4 py-5">
                  <div className="flex items-center justify-center gap-3">
                    <item.Icon className="w-8 h-8 text-[#B3995D] dark:text-[#D4B86A]" />
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-2xl">{item.title}</h3>
                  </div>
                  <p className={`mt-2 text-neutral-600 dark:text-neutral-300 text-center ${item.title === "Reach out" ? "text-sm whitespace-nowrap" : "text-base"}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-[#B3995D]/10 dark:bg-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-center text-sm text-neutral-400 dark:text-neutral-500">Bay Area Small Business Study · Independent Research Initiative</p>
          <p className="text-center text-sm text-neutral-400 dark:text-neutral-500 mt-2">
            <a href="/privacy" className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
