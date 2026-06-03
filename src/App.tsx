import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import AppLayout from "./components/AppLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CreateTestPage from "./pages/CreateTestPage";
import AddQuestionsPage from "./pages/AddQuestionsPage";
import PreviewPage from "./pages/PreviewPage";
import NotFoundPage from "./pages/NotFoundPage";
import UnderDevelopmentPage from "./pages/UnderDevelopmentPage";

function Protected({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute>
      <AppLayout>{children}</AppLayout>
    </PrivateRoute>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
          <Route path="/tests/create" element={<Protected><CreateTestPage /></Protected>} />
          <Route path="/tests/:id/edit" element={<Protected><CreateTestPage /></Protected>} />
          <Route path="/tests/:id/questions" element={<Protected><AddQuestionsPage /></Protected>} />
          <Route path="/tests/:id/preview" element={<Protected><PreviewPage /></Protected>} />
          <Route path="/test-tracking" element={<Protected><UnderDevelopmentPage pageName="Test Tracking" /></Protected>} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
