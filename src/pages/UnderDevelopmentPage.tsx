import { useNavigate } from "react-router";
import { Button } from "../components/ui";

interface Props {
  pageName?: string;
}

export default function UnderDevelopmentPage({ pageName }: Props) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-3 p-6 text-center">
      <span className="text-5xl">🚧</span>
      <h1 className="text-xl font-bold text-gray-900">
        {pageName ?? "This page"} is under development
      </h1>
      <p className="text-sm text-gray-500 max-w-sm">
        We're working on it. Check back soon.
      </p>
      <Button
        variant="primary"
        className="w-auto! mt-2"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </Button>
    </div>
  );
}
