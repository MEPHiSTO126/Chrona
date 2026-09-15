"use client";

import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthInput } from "@/components/auth/AuthInput";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { ArrowRight, Loader2 } from "lucide-react";

const Register = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptPolicies, setAcceptPolicies] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isMatch = password === confirmPassword || confirmPassword === "";

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!identifier || (!identifier.includes("@") && isNaN(Number(identifier)))) {
      setError("Please enter a valid email or phone number"); return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters"); return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match"); return;
    }
    if (!acceptPolicies) {
      setError("Please accept the Terms of Service to continue"); return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    login(
      { id: "usr-1", email: identifier.includes("@") ? identifier : "newuser@example.com", name: "New Chrona User", avatar: "" },
      "mock-token-jwt-12345"
    );
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    router.push(params.get("redirect") || "/");
  };

  return (
    <AuthShell
      imgSrc="/auth/register-illustration.jpg"
      title="Create Account"
      desc="Join thousands of happy shoppers"
      footer="Already have an account?"
      linkSrc="/login"
      link="Sign In →"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <AuthInput
          type="text" id="identifier" name="identifier" value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          label="Email or Phone number"
          placeholder="you@example.com"
        />
        <AuthInput
          type="password" id="password" name="password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="At least 6 characters"
        />
        <AuthInput
          type="password" id="confirm_password" name="confirm_password" value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm Password"
          placeholder="Repeat your password"
        />

        {!isMatch && (
          <p className="text-xs text-red-700 font-medium bg-red-50 border border-red-200 rounded-md px-3 py-2">
            Passwords do not match
          </p>
        )}
        {error && (
          <p className="text-xs text-red-700 font-medium bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={acceptPolicies}
            onChange={(e) => setAcceptPolicies(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded accent-primary text-primary shrink-0"
          />
          <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors leading-relaxed">
            I accept the{" "}
            <a href="/policies/terms" className="text-primary underline hover:text-primary-dark transition-colors font-medium">Terms of Services</a>
            {" "}and{" "}
            <a href="/policies/privacy" className="text-primary underline hover:text-primary-dark transition-colors font-medium">Privacy Policy</a>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading || !isMatch}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-60 mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </AuthShell>
  );
};

export default Register;
