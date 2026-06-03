import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CreateTestPage from "./pages/CreateTestPage";
import AddQuestionsPage from "./pages/AddQuestionsPage";
import PreviewPage from "./pages/PreviewPage";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tests/create" element={<CreateTestPage />} />
          <Route path="/tests/:id/edit" element={<CreateTestPage />} />
          <Route path="/tests/:id/questions" element={<AddQuestionsPage />} />
          <Route path="/tests/:id/preview" element={<PreviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
