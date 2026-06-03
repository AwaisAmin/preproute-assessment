import { useNavigate } from "react-router";
import { Button } from "../components/ui";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4 p-6 text-center">
      <p className="text-[80px] font-bold text-red-500 leading-none">404</p>
      <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
      <p className="text-sm text-gray-500 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button
        variant="primary"
        className="w-auto! mt-2"
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
    </div>
  );
}
