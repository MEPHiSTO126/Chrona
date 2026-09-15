"use client";

import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthInput } from "@/components/auth/AuthInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { ArrowRight, Loader2 } from "lucide-react";

const Login = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!username || (!username.includes("@") && isNaN(Number(username)))) {
      setError("Please enter a valid email or phone number");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 700)); // mock async
    login(
      { id: "usr-1", email: username.includes("@") ? username : "karan@example.com", name: "Karan Singh Lalwai", avatar: "" },
      "mock-token-jwt-12345"
    );
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    router.push(params.get("redirect") || "/");
  };

  return (
    <AuthShell
      imgSrc="/auth/login-illustration.jpg"
      title="Welcome Back!"
      desc="Sign in to access your orders & wishlist"
      footer="Don't have an account?"
      linkSrc="/register"
      link="Get Started →"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <AuthInput
          type="text" id="username" name="username" value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Email or Phone number"
          placeholder="you@example.com"
          autoComplete="username"
        />
        <AuthInput
          type="password" id="password" name="password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Your password"
        />

        {error && (
          <p className="text-xs text-red-700 font-medium bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded accent-primary text-primary"
            />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-primary hover:text-primary-dark transition-colors font-semibold">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthShell>
  );
};

export default Login;
