import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { PreprouteLogo, LoginIllustration } from "../assets/svgs";
import { Button, InputField } from "../components/ui";
import api from "../lib/axios";
import { setCredentials } from "../store/authSlice";
import type { LoginFormData } from "../types";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await api.post("/auth/login", data);
      console.log("Login res: ", res)
      const { token, user } = res.data.data;
      dispatch(setCredentials({ token, user }));
      navigate("/dashboard");
    } catch {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#EEF4FF" }}>
      {/* Left */}
      <div className="hidden lg:flex flex-1 items-center justify-center px-12">
        <LoginIllustration className="w-full max-w-105" />
      </div>
      {/* Right */}
      <div
        className="w-full lg:w-[52%] flex flex-col"
        style={{ padding: "20px 20px 20px 0" }}
      >
        <div
          className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl"
          style={{ border: "0.5px solid #60A5FA", padding: "48px 40px" }}
        >
          <div className="w-full" style={{ maxWidth: "440px" }}>
            <div className="mb-8">
              <PreprouteLogo />
            </div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "6px",
              }}
            >
              Login
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#9CA3AF",
                marginBottom: "32px",
              }}
            >
              Use your company provided Login credentials
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <InputField
                label="User ID"
                type="text"
                placeholder="Enter User ID"
                error={errors.userId?.message}
                {...register("userId", { required: "User ID is required" })}
              />
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <InputField
                  label="Password"
                  type="password"
                  placeholder="Enter Password"
                  error={errors.password?.message}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <Button
                  type="button"
                  variant="link"
                  style={{ marginTop: "4px" }}
                >
                  Forgot password?
                </Button>
              </div>
              <Button type="submit" loading={isSubmitting}>
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
