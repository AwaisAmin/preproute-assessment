import { useNavigate } from "react-router";
import { Button } from "../components/ui";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4 p-6 text-center">
      <span className="text-5xl">🔒</span>
      <h1 className="text-2xl font-bold text-gray-900">Unauthorized</h1>
      <p className="text-sm text-gray-500 max-w-sm">
        You are not authorized to view this page. Please login to continue.
      </p>
      <Button
        variant="primary"
        className="w-auto! mt-2"
        onClick={() => navigate("/login")}
      >
        Go to Login
      </Button>
    </div>
  );
}
