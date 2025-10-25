import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Submission, Testimonial, AnalyticsEvent } from "@shared/schema";
import { LogOut, Users, MessageSquare, BarChart3, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Check authentication
  const { data: currentUser, isLoading: authLoading, error: authError } = useQuery({
    queryKey: ["/api/auth/me"],
    retry: false,
  });

  // Fetch admin data
  const { data: submissions, isLoading: submissionsLoading } = useQuery<Submission[]>({
    queryKey: ["/api/admin/submissions"],
    enabled: !!currentUser,
  });

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/admin/testimonials"],
    enabled: !!currentUser,
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery<AnalyticsEvent[]>({
    queryKey: ["/api/admin/analytics"],
    enabled: !!currentUser,
  });

  useEffect(() => {
    if (authError) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to access the admin dashboard.",
      });
      setLocation("/admin/login");
    }
  }, [authError, setLocation, toast]);

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      setLocation("/admin/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "An error occurred during logout.",
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" data-testid="loader-auth" />
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/0 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold" data-testid="text-title">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-600" data-testid="text-username">
              {(currentUser as any).username}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="border-red-600 text-red-600 hover:bg-red-50" data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6" data-testid="card-stat-submissions">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-3">
                <Users className="w-6 h-6 text-neutral-900" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Total Submissions</p>
                <p className="text-3xl font-bold" data-testid="text-submissions-count">
                  {submissions?.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6" data-testid="card-stat-testimonials">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-3">
                <MessageSquare className="w-6 h-6 text-neutral-900" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Testimonials</p>
                <p className="text-3xl font-bold" data-testid="text-testimonials-count">
                  {testimonials?.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6" data-testid="card-stat-analytics">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-3">
                <BarChart3 className="w-6 h-6 text-neutral-900" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Analytics Events</p>
                <p className="text-3xl font-bold" data-testid="text-analytics-count">
                  {analytics?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList className="bg-white/5" data-testid="tabs-list">
            <TabsTrigger value="submissions" data-testid="tab-submissions">Submissions</TabsTrigger>
            <TabsTrigger value="testimonials" data-testid="tab-testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="analytics" data-testid="tab-analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions" className="space-y-4" data-testid="content-submissions">
            {submissionsLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : submissions && submissions.length > 0 ? (
              <div className="space-y-3">
                {submissions.map((submission, idx) => (
                  <div
                    key={submission.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                    data-testid={`card-submission-${idx}`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg" data-testid={`text-business-name-${idx}`}>
                          {submission.businessName || "N/A"}
                        </h3>
                        <p className="text-sm text-neutral-600 mt-1" data-testid={`text-business-type-${idx}`}>
                          {submission.businessType || "Type not specified"}
                        </p>
                        {submission.email && (
                          <p className="text-sm text-neutral-700 mt-2" data-testid={`text-email-${idx}`}>
                            {submission.email}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-neutral-500" data-testid={`text-date-${idx}`}>
                          {format(new Date(submission.submittedAt), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 rounded-2xl border border-white/10 bg-white/5">
                <Users className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                <p className="text-neutral-600" data-testid="text-no-submissions">No submissions yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-4" data-testid="content-testimonials">
            {testimonialsLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : testimonials && testimonials.length > 0 ? (
              <div className="space-y-3">
                {testimonials.map((testimonial, idx) => (
                  <div
                    key={testimonial.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                    data-testid={`card-testimonial-admin-${idx}`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold" data-testid={`text-testimonial-name-${idx}`}>
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-neutral-600 mt-1" data-testid={`text-testimonial-type-${idx}`}>
                          {testimonial.businessType}
                        </p>
                        <p className="text-neutral-700 mt-3 leading-relaxed" data-testid={`text-testimonial-quote-${idx}`}>
                          "{testimonial.quote}"
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs ${
                            testimonial.isActive ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                          }`}
                          data-testid={`badge-status-${idx}`}
                        >
                          {testimonial.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 rounded-2xl border border-white/10 bg-white/5">
                <MessageSquare className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                <p className="text-neutral-600" data-testid="text-no-testimonials">No testimonials yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4" data-testid="content-analytics">
            {analyticsLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : analytics && analytics.length > 0 ? (
              <div className="space-y-3">
                {analytics.slice(0, 50).map((event, idx) => (
                  <div
                    key={event.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    data-testid={`card-analytics-${idx}`}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex-1">
                        <p className="font-mono text-sm text-neutral-900" data-testid={`text-event-type-${idx}`}>
                          {event.eventType}
                        </p>
                        {event.sessionId && (
                          <p className="text-xs text-neutral-400 mt-1" data-testid={`text-session-id-${idx}`}>
                            Session: {event.sessionId.slice(0, 20)}...
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-neutral-500" data-testid={`text-event-time-${idx}`}>
                          {format(new Date(event.timestamp), "MMM d, h:mm a")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {analytics.length > 50 && (
                  <p className="text-center text-sm text-neutral-500 mt-4">
                    Showing 50 of {analytics.length} events
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center p-12 rounded-2xl border border-white/10 bg-white/5">
                <BarChart3 className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                <p className="text-neutral-600" data-testid="text-no-analytics">No analytics events yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
