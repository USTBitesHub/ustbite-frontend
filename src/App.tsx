import { Suspense, lazy } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const RestaurantListPage = lazy(() => import("./pages/RestaurantListPage"));
const RestaurantDetailPage = lazy(() => import("./pages/RestaurantDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const OrderTrackingPage = lazy(() => import("./pages/OrderTrackingPage"));
const OrderHistoryPage = lazy(() => import("./pages/OrderHistoryPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorksPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AiAssistantPage = lazy(() => import("./pages/AiAssistantPage"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="size-10 rounded-md bg-brand-amber animate-pulse" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner position="top-right" richColors />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/restaurants" element={<RestaurantListPage />} />
            <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/orders/:id" element={<OrderTrackingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/assistant" element={<AiAssistantPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
