"use client";
import useForm from "./useForm";
import { IUser } from "./types";
import { useTheme } from "./ThemeContext";
import { useAuth } from "./AuthContext";

interface LoginPageProps {
  users: IUser[];
}

const LoginPage: React.FC<LoginPageProps> = ({ users }) => {
  const { theme } = useTheme();
  const { login } = useAuth();
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const formBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const textClass = theme === "dark" ? "text-white" : "text-black";
  const inputClass =
    theme === "dark"
      ? "border p-2 rounded w-full bg-gray-700 text-white placeholder-gray-300"
      : "border p-2 rounded w-full bg-white text-black placeholder-gray-500";

  const validate = (values: { email: string; password: string }) => {
    const errors: { email?: string; password?: string } = {};
    if (!values.email) errors.email = "Required";
    if (!values.password) errors.password = "Required";
    return errors;
  };

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } = useForm(
    { email: "", password: "" },
    validate
  );

  const submitHandler = async (vals: { email: string; password: string }) => {
    const user = users.find((u) => u.email === vals.email);
    if (!user || !user.isActive || vals.password !== "12345") {
      alert("Invalid credentials");
      return;
    }
    login(user);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgClass}`}>
      <form onSubmit={(e) => handleSubmit(e, submitHandler)} className={`p-8 rounded shadow-md space-y-4 w-full max-w-md ${formBg} ${textClass}`}>
        <h2 className="text-2xl font-bold">Login</h2>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            className={inputClass}
          />
          {touched.email && errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            className={inputClass}
          />
          {touched.password && errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
        </div>
        <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
