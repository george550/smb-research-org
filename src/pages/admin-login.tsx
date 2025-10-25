import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const response: any = await apiRequest("POST", "/api/auth/login", data);
      
      if (response.success) {
        toast({
          title: "Login successful",
          description: `Welcome back, ${response.user.username}!`,
        });
        // Use setTimeout to ensure toast is visible before redirect
        setTimeout(() => setLocation("/admin"), 100);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-white/10">
            <Lock className="w-8 h-8 text-neutral-900" data-testid="icon-lock" />
          </div>
          <h1 className="text-3xl font-bold" data-testid="text-title">Admin Login</h1>
          <p className="mt-2 text-neutral-600" data-testid="text-subtitle">
            Access the admin dashboard
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" data-testid="label-username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="bg-white/5 border-white/10 text-neutral-900 placeholder:text-slate-400"
              data-testid="input-username"
              {...form.register("username")}
            />
            {form.formState.errors.username && (
              <p className="text-sm text-red-400" data-testid="error-username">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" data-testid="label-password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="bg-white/5 border-white/10 text-neutral-900 placeholder:text-slate-400"
              data-testid="input-password"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-400" data-testid="error-password">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#AA0000] hover:bg-[#8B0000] text-white"
            disabled={isLoading}
            data-testid="button-login"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setLocation("/")}
            className="text-sm text-slate-500 hover:text-neutral-900 transition-colors"
            data-testid="link-back-home"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
