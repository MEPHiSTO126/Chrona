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
          <p className="text-xs text-red-400 font-medium bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-white/50 hover:text-white/80 transition-colors">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 rounded accent-primary"
            />
            Remember me
          </label>
          <Link href="#" className="text-primary hover:text-orange-400 transition-colors font-semibold">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-orange-500 hover:from-primary-dark hover:to-orange-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthShell>
  );
};

export default Login;
