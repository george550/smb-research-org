// Multi-step form - Rebuilt from scratch
// Each step has independent error state to prevent premature validation
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Clock, MessageCircle, DollarSign } from "lucide-react";
import logo from "@assets/logo.png";

const roleOptions = [
  "I own the business",
  "I manage operations or finances",
  "I'm an employee, not involved in payments",
  "I'm self-employed or freelance only",
];

const employeeCountOptions = ["1–2", "3–10", "11–50", "51–100", "Over 100"];

const responsibilityOptions = [
  "Sending invoices or collecting customer payments",
  "Paying suppliers or vendors",
  "Running payroll or paying staff",
  "Paying taxes or compliance payments",
  "Reviewing cash flow reports or bank balances",
  "None of the above",
];

const toolOptions = [
  "QuickBooks / Xero",
  "Stripe / Square / Clover / Toast / POS",
  "Chase / Bank of America / Wells Fargo portals",
  "Excel / Google Sheets",
  "Other (please specify)",
  "None, not sure",
];

const frequencyOptions = ["Daily", "Weekly", "Every other week", "Monthly", "A few times per year"];

const comfortableOptions = ["Yes", "No"];

const industryOptions = [
  "Retail (online or offline stores)",
  "Food & Beverages (Restaurant, Coffee Shop, etc)",
  "Professional services (Legal or Other types of services)",
  " Trades and Construction (HVAC, contractors, etc)",
  "Health & Wellness",
  "Automotive (Garage, Dealership, etc)",
  "Other",
];

export default function Join() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const formTitleRef = useRef<HTMLDivElement>(null);

  // SEPARATE error states for each step - this is the key to preventing premature errors
  const [showStep1Errors, setShowStep1Errors] = useState(false);
  const [showStep2Errors, setShowStep2Errors] = useState(false);
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
    financeFrequency: "",
    cashFlowStory: "",
    comfortableDiscussing: "",
    referralSource: "",
  });

  // Error messages
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
    financeFrequency: "",
    comfortableDiscussing: "",
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/participants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit form");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application submitted!",
        description: "Thank you for your interest. We'll be in touch soon.",
      });
      setTimeout(() => {
        window.location.href = "/thank-you";
      }, 2000);
    },
    onError: (error: Error) => {
      toast({
        title: "Submission failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  // Validation functions return true if valid
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
      financeFrequency: "",
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

    if (!formData.financeFrequency) {
      newErrors.financeFrequency = "Please select frequency";
      isValid = false;
    }

    if (!formData.comfortableDiscussing) {
      newErrors.comfortableDiscussing = "Please select an option";
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleResponsibilityChange = (value: string, checked: boolean, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const updated = checked
      ? [...formData.responsibilities, value]
      : formData.responsibilities.filter((r) => r !== value);
    setFormData((prev) => ({ ...prev, responsibilities: updated }));
  };

  const handleToolChange = (value: string, checked: boolean, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const updated = checked
      ? [...formData.tools, value]
      : formData.tools.filter((t) => t !== value);
    setFormData((prev) => ({ ...prev, tools: updated }));
  };

  const scrollToForm = () => {
    if (formTitleRef.current) {
      const element = formTitleRef.current;
      const offset = 150;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const nextStep = () => {
    // Validate current step
    if (currentStep === 1) {
      const isValid = validateStep1();
      if (!isValid) {
        setShowStep1Errors(true);
        return;
      }
      // Valid - advance to step 2
      setShowStep1Errors(false);
      setShowStep2Errors(false);  // Reset step 2 errors
      setCurrentStep(2);
      setTimeout(() => scrollToForm(), 0);
    } else if (currentStep === 2) {
      const isValid = validateStep2();
      if (!isValid) {
        setShowStep2Errors(true);
        return;
      }
      // Valid - advance to step 3
      setShowStep2Errors(false);
      setShowStep3Errors(false);  // CRITICAL: Reset step 3 errors when navigating TO step 3
      setCurrentStep(3);
      setTimeout(() => scrollToForm(), 0);
    }
  };

  const prevStep = () => {
    // Reset error states when going back
    if (currentStep === 2) {
      setShowStep2Errors(false);
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setShowStep3Errors(false);  // CRITICAL: Reset step 3 errors when leaving
      setCurrentStep(2);
    }
    setTimeout(() => scrollToForm(), 0);
  };

  const goToStep = (targetStep: number) => {
    if (targetStep < currentStep) {
      // Going backwards - no validation needed
      setShowStep1Errors(false);
      setShowStep2Errors(false);
      setShowStep3Errors(false);
      setCurrentStep(targetStep);
      setTimeout(() => scrollToForm(), 0);
    } else if (targetStep > currentStep) {
      // Going forward - validate and advance
      nextStep();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep < 3) {
      nextStep();
      return;
    }

    // Final submit on Step 3
    const isValid = validateStep3();
    if (!isValid) {
      setShowStep3Errors(true);  // ONLY set to true here
      setTimeout(() => {
        const firstError = document.querySelector('.border-red-500');
        if (firstError) {
          const element = firstError as HTMLElement;
          const offset = 150;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // Valid - submit to API
    submitMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4 border-b border-neutral-200">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Logo" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-semibold tracking-tight text-neutral-900 hidden md:block">
              Join the Study
            </span>
          </a>
        </div>

        {/* Tabs */}
        <div className="mx-auto max-w-4xl px-4 pb-3">
          <div className="flex items-center justify-between pt-3">
            <button
              type="button"
              onClick={() => goToStep(1)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentStep === 1
                  ? "bg-neutral-900 text-white"
                  : currentStep > 1
                  ? "bg-green-100 text-green-700 cursor-pointer hover:bg-green-200"
                  : "bg-neutral-100 text-neutral-400"
              }`}
            >
              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold ${
                currentStep === 1
                  ? "bg-white text-neutral-900"
                  : currentStep > 1
                  ? "bg-green-600 text-white"
                  : "bg-neutral-300 text-neutral-500"
              }`}>
                {currentStep > 1 ? "✓" : "1"}
              </span>
              <span className="hidden sm:inline">Personal Details</span>
            </button>

            <div className="flex-1 h-1 mx-2 bg-neutral-200 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-500 ${currentStep > 1 ? "bg-green-500 w-full" : "bg-neutral-200 w-0"}`} />
            </div>

            <button
              type="button"
              onClick={() => goToStep(2)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentStep === 2
                  ? "bg-neutral-900 text-white"
                  : currentStep > 2
                  ? "bg-green-100 text-green-700 cursor-pointer hover:bg-green-200"
                  : "bg-neutral-100 text-neutral-400"
              }`}
            >
              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold ${
                currentStep === 2
                  ? "bg-white text-neutral-900"
                  : currentStep > 2
                  ? "bg-green-600 text-white"
                  : "bg-neutral-300 text-neutral-500"
              }`}>
                {currentStep > 2 ? "✓" : "2"}
              </span>
              <span className="hidden sm:inline">Business Details</span>
            </button>

            <div className="flex-1 h-1 mx-2 bg-neutral-200 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-500 ${currentStep > 2 ? "bg-green-500 w-full" : "bg-neutral-200 w-0"}`} />
            </div>

            <button
              type="button"
              onClick={() => goToStep(3)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentStep === 3 ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-400"
              }`}
            >
              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold ${
                currentStep === 3 ? "bg-white text-neutral-900" : "bg-neutral-300 text-neutral-500"
              }`}>
                3
              </span>
              <span className="hidden sm:inline">Experience and Tools</span>
            </button>
          </div>
        </div>
      </header>

      {/* Form Section */}
      <div className="mx-auto max-w-4xl px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div ref={formTitleRef} className="h-0" />

            <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g. John Doe"
                    className={`${showStep1Errors && errors.name ? "border-red-500" : ""}`}
                  />
                  {formData.name && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </div>
                {showStep1Errors && errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <p className="text-sm text-neutral-500">We'll send interview details and updates to this email</p>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="e.g. john@example.com"
                    className={`${showStep1Errors && errors.email ? "border-red-500" : ""}`}
                  />
                  {formData.email && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </div>
                {showStep1Errors && errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <p className="text-sm text-neutral-500">For scheduling your 60-minute interview</p>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="e.g. (555) 123-4567"
                    className={`${showStep1Errors && errors.phone ? "border-red-500" : ""}`}
                  />
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

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="space-y-2">
                <Label htmlFor="businessName">Small Business Name *</Label>
                <p className="text-sm text-neutral-500">The name of the small business that you own or manage</p>
                <div className="relative">
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    placeholder="e.g. Bay Area Coffee Co"
                    className={`${showStep2Errors && errors.businessName ? "border-red-500" : ""}`}
                  />
                  {formData.businessName && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </div>
                {showStep2Errors && errors.businessName && <p className="text-sm text-red-500">{errors.businessName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Which city is your business located in? *</Label>
                <p className="text-sm text-neutral-500">We currently only accept businesses in the San Francisco Bay Area.</p>
                <div className="relative">
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="e.g. San Francisco"
                    className={`${showStep2Errors && errors.city ? "border-red-500" : ""}`}
                  />
                  {formData.city && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </div>
                {showStep2Errors && errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">What's your role in the business? *</Label>
                <div className="relative">
                  <Select onValueChange={(value) => handleInputChange("role", value)}>
                    <SelectTrigger className={`${showStep2Errors && errors.role ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
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
                <Label htmlFor="employeeCount">How many people work at your business (including you)? *</Label>
                <div className="relative">
                  <Select onValueChange={(value) => handleInputChange("employeeCount", value)}>
                    <SelectTrigger className={`${showStep2Errors && errors.employeeCount ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select employee count" />
                    </SelectTrigger>
                    <SelectContent>
                      {employeeCountOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
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
                <Label htmlFor="industry">What industry does your business operate in? *</Label>
                <div className="relative">
                  <Select onValueChange={(value) => handleInputChange("industry", value)}>
                    <SelectTrigger className={`${showStep2Errors && errors.industry ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
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

          {/* Step 3 - CRITICAL: Uses showStep3Errors which is ONLY set to true on submit */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Responsibilities */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label>Which of these do you personally handle or oversee? *</Label>
                  {formData.responsibilities.length > 0 && (
                    <span className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {responsibilityOptions.map((option) => {
                    const isSelected = formData.responsibilities.includes(option);
                    return (
                      <div
                        key={option}
                        onClick={(e) => handleResponsibilityChange(option, !isSelected, e)}
                        className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer ${
                          isSelected ? "border-neutral-900 bg-neutral-100" : "border-neutral-200 hover:bg-neutral-50"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          isSelected ? "bg-neutral-900 border-neutral-900" : "border-neutral-300 bg-white"
                        }`}>
                          {isSelected && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          )}
                        </div>
                        <span className="text-sm font-medium flex-1">{option}</span>
                      </div>
                    );
                  })}
                </div>
                {showStep3Errors && errors.responsibilities && <p className="text-sm text-red-500">{errors.responsibilities}</p>}
              </div>

              {/* Tools */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label>What tools or systems do you use to manage payments and cash flow? *</Label>
                  {formData.tools.length > 0 && (
                    <span className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {toolOptions.map((option) => {
                    const isSelected = formData.tools.includes(option);
                    return (
                      <div
                        key={option}
                        onClick={(e) => handleToolChange(option, !isSelected, e)}
                        className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer ${
                          isSelected ? "border-neutral-900 bg-neutral-100" : "border-neutral-200 hover:bg-neutral-50"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          isSelected ? "bg-neutral-900 border-neutral-900" : "border-neutral-300 bg-white"
                        }`}>
                          {isSelected && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          )}
                        </div>
                        <span className="text-sm font-medium flex-1">{option}</span>
                      </div>
                    );
                  })}
                </div>
                {showStep3Errors && errors.tools && <p className="text-sm text-red-500">{errors.tools}</p>}
              </div>

              {/* Finance Frequency */}
              <div className="space-y-2">
                <Label htmlFor="financeFrequency">How often do you personally look at your business's finances? *</Label>
                <div className="relative">
                  <Select onValueChange={(value) => handleInputChange("financeFrequency", value)}>
                    <SelectTrigger className={`${showStep3Errors && errors.financeFrequency ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {frequencyOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.financeFrequency && (
                    <span className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center pointer-events-none">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </div>
                {showStep3Errors && errors.financeFrequency && <p className="text-sm text-red-500">{errors.financeFrequency}</p>}
              </div>

              {/* Cash Flow Story */}
              <div className="space-y-2">
                <Label htmlFor="cashFlowStory">Tell us about the last time cash felt tight or payments got delayed. What happened? *</Label>
                <div className="relative">
                  <Textarea
                    id="cashFlowStory"
                    value={formData.cashFlowStory}
                    onChange={(e) => handleInputChange("cashFlowStory", e.target.value)}
                    placeholder="e.g. Last month, a major client paid 30 days late, which made it difficult to cover payroll..."
                    rows={5}
                    className="pb-8"
                  />
                  {formData.cashFlowStory && formData.cashFlowStory.length >= 20 && (
                    <span className="absolute right-3 top-3 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                  {(!formData.cashFlowStory || formData.cashFlowStory.length < 20) && (
                    <div className="absolute bottom-2 right-3 text-xs">
                      <span className={formData.cashFlowStory && formData.cashFlowStory.length > 0 ? "text-red-500" : "text-neutral-400"}>
                        {formData.cashFlowStory?.length || 0}/20 characters minimum
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Comfortable Discussing */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Label className="flex-1">Would you be comfortable talking through your typical week managing payments (without sharing any private numbers)? *</Label>
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
                      <div
                        key={option}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleInputChange("comfortableDiscussing", option);
                        }}
                        className={`flex items-center space-x-3 px-6 py-3 rounded-lg border-2 cursor-pointer flex-1 ${
                          isSelected ? "border-neutral-900 bg-neutral-100" : "border-neutral-200 hover:bg-neutral-50"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? "bg-neutral-900 border-neutral-900" : "border-neutral-300 bg-white"
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                        <span className="text-base font-medium">{option}</span>
                      </div>
                    );
                  })}
                </div>
                {showStep3Errors && errors.comfortableDiscussing && <p className="text-sm text-red-500">{errors.comfortableDiscussing}</p>}
              </div>

              {/* Referral Source */}
              <div className="space-y-2">
                <Label htmlFor="referralSource">Who referred you/how did you find out about the research? <span className="text-neutral-400 font-normal">(optional)</span></Label>
                <div className="relative">
                  <Input
                    id="referralSource"
                    value={formData.referralSource}
                    onChange={(e) => handleInputChange("referralSource", e.target.value)}
                    placeholder="e.g. Friend, LinkedIn, flyer, etc."
                  />
                  {formData.referralSource && formData.referralSource.length > 0 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-6">
            {currentStep > 1 && (
              <Button type="button" onClick={prevStep} variant="outline" className="px-6 py-5 text-sm font-semibold border-2">
                ← Previous
              </Button>
            )}

            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep} className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold py-5 text-sm">
                Continue to {currentStep === 1 ? "Business Details" : "Experience and Tools"} →
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className={`flex-1 font-semibold py-5 text-sm ${
                  formData.responsibilities.length > 0 &&
                  formData.tools.length > 0 &&
                  formData.financeFrequency &&
                  formData.cashFlowStory &&
                  formData.cashFlowStory.length >= 20 &&
                  formData.comfortableDiscussing
                    ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                    : "bg-neutral-900 hover:bg-neutral-800 text-white"
                }`}
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting your application...
                  </>
                ) : (
                  "Submit My Application"
                )}
              </Button>
            )}
          </div>
        </form>
          </div>

          {/* Right side - Reminder Cards */}
          <div className="hidden lg:block">
            <div className="sticky top-32 space-y-5 scale-90">
              {[
                { Icon: Clock, title: "60 minutes", desc: "Remote on Zoom/Meet or in-person (SF, Oakland, Peninsula)." },
                { Icon: MessageCircle, title: "One-on-one", desc: "We'll explore how you manage money in and out — no slides, no pitch." },
                { Icon: DollarSign, title: "$150 thank-you", desc: "Paid after your interview for your time and expertise." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-[#B3995D]/10 p-5 text-center">
                  <item.Icon className="w-7 h-7 text-[#B3995D] mx-auto" />
                  <h3 className="mt-2.5 font-semibold text-neutral-900 text-sm">{item.title}</h3>
                  <p className="mt-2 text-neutral-600 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-[#B3995D]/10">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-center text-sm text-neutral-400">
            Bay Area Small Business Money Flow Study · Independent Research Initiative
          </p>
        </div>
      </footer>
    </div>
  );
}
