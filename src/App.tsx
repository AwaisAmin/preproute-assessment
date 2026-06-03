import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CreateTestPage from "./pages/CreateTestPage";
import AddQuestionsPage from "./pages/AddQuestionsPage";
import PreviewPage from "./pages/PreviewPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tests/create"
            element={
              <PrivateRoute>
                <CreateTestPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tests/:id/edit"
            element={
              <PrivateRoute>
                <CreateTestPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tests/:id/questions"
            element={
              <PrivateRoute>
                <AddQuestionsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tests/:id/preview"
            element={
              <PrivateRoute>
                <PreviewPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
