"use client";

import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthInput } from "@/components/auth/AuthInput";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const Register = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isMatch = password === confirmPassword || confirmPassword === "";

  const [acceptPolicies, setAcceptPolicies] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!identifier || (!identifier.includes("@") && isNaN(Number(identifier)))) {
      return;
    }
    if (!password || password !== confirmPassword) {
      return;
    }
    if (!acceptPolicies) {
      return;
    }

    // Mock register & login
    login({
      id: "usr-1",
      email: identifier.includes("@") ? identifier : "newuser@example.com",
      name: "New Chrona User",
      avatar: ""
    }, "mock-token-jwt-12345");

    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const redirect = params.get("redirect") || "/";
    router.push(redirect);
  };

  return (
    <AuthShell
      imgSrc="/auth/register-illustration.jpg"
      title="Create an Account"
      desc="Hello there, Let's start your journey with us"
      footer="Already have an account?"
      linkSrc="/login"
      link="Login Now"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <AuthInput
          type="text"
          id="identifier"
          name="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          label="Email or Phone number"
          placeholder="Enter your email or phone number"
        />
        <AuthInput
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Enter your password"
        />
        <AuthInput
          type="password"
          id="confirm_password"
          name="confirm_password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm Password"
          placeholder="Confirm your password"
        />

        {!isMatch && (
          <p className="text-xs text-red-500 font-medium animate-in fade-in">
            Passwords do not match
          </p>
        )}

        <div className="text-sm flex items-center gap-4">
          <Switch checked={acceptPolicies} onCheckedChange={setAcceptPolicies} />
          <span>
            I accept the{" "}
            <a href="#" className="text-primary underline">
              Terms of Services
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary underline">
              Privacy Policy
            </a>
          </span>
        </div>
        <Button className="w-full py-6">Sign Up</Button>
      </form>
    </AuthShell>
  );
};

export default Register;
