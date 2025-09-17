import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import App from "./App.tsx";
import LoginPage from "@/auth/pages/Login.page.tsx";
import RegisterPage from "@/auth/pages/Register.page.tsx";
import VerificationPage from "@/auth/pages/Verification.page.tsx";
import { ROUTES } from "@/utils/constants.ts";
import WaitingVerificationPage from "@/auth/pages/WaitingVerification.page.tsx";
import { Toaster } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoutes.tsx";
import HomePage from "@/features/home/pages/Home.page.tsx";
import ViewEventPage from "@/features/events/view-event/pages/ViewEvent.page.tsx";
import CreateEventPage from "@/features/events/create-event/pages/CreateEventPage.tsx";
import EventPreviewPage from "@/features/events/create-event/pages/EventPreviewPage.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public routes */}

          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.VERIFY} element={<VerificationPage />} />
          <Route
            path={ROUTES.WAITING_VERIFICATION}
            element={<WaitingVerificationPage />}
          />
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.EVENT_SHARED} element={<ViewEventPage />} />
          <Route path={ROUTES.AUTH_CALLBACK} element={<div>call back</div>} />
          <Route path={ROUTES.NOT_FOUND} element={<div>Not found</div>} />
          <Route path="*" element={<div>Not found</div>} />

          {/* Protected routes */}
          <Route
            path={ROUTES.EVENTS}
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CREATE_EVENT}
            element={
              <ProtectedRoute>
                <CreateEventPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.EVENT_PREVIEW_PAGE}
            element={
              <ProtectedRoute>
                <EventPreviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.VIEW_EVENT}
            element={
              <ProtectedRoute>
                <ViewEventPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  </StrictMode>
);
