"use client";

import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthInput } from "@/components/auth/AuthInput";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
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

    console.log(username, password);
  };

  return (
    <AuthShell
      imgSrc="/auth/login-illustration.jpg"
      title="Welcome Back!"
      desc="Get access to you Orders, Wishlist Easily"
      footer="Don't have an account?"
      linkSrc="/register"
      link="Get Started"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <AuthInput
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Email or Phone number"
          placeholder="Enter your email or phone number"
          autoComplete="username"
        />
        {error && <p className="text-red-500 text-sm -mt-4">{error}</p>}
        <AuthInput
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Enter your password"
        />
        {error && <p className="text-red-500 text-sm -mt-4">{error}</p>}

        <div className="text-sm flex justify-between">
          <label className="flex items-center gap-4">
            <Switch checked={rememberMe} onCheckedChange={setRememberMe} />
            <span>Remember me</span>
          </label>
          <Link href="#" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full py-6">
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
};

export default Login;
