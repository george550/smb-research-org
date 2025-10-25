import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import IntercomMessenger from "@/components/IntercomMessenger";
import Home from "@/pages/home";
import Join from "@/pages/join";
import Survey from "@/pages/survey";
import Privacy from "@/pages/privacy";
import ThankYou from "@/pages/thank-you";
import AdminLogin from "@/pages/admin-login";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/join" component={Join}/>
      <Route path="/survey" component={Survey}/>
      <Route path="/privacy" component={Privacy}/>
      <Route path="/thank-you" component={ThankYou}/>
      <Route path="/admin/login" component={AdminLogin}/>
      <Route path="/admin" component={Admin}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <IntercomMessenger />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
