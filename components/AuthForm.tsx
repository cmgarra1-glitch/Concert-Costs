"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/client";
import { friendlyError } from "@/lib/userMessages";

type AuthMode = "login" | "signup";

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const isSignup = mode === "signup";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const supabase = createClient();

    if (isSignup) {
      const { error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) {
        const text = friendlyError(error.message);
        setMessage({ type: "error", text });
        toast.error(text);
        return;
      }
      const text =
        "Account created! You can log in now. (Check your email if confirmation is required.)";
      setMessage({ type: "success", text });
      toast.success("Account created!");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      const text = friendlyError(error.message);
      setMessage({ type: "error", text });
      toast.error(text);
      return;
    }

    toast.success("Welcome back!");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Card bodyClassName="p-6 lg:p-8">
      <h2 className="card-title justify-center text-2xl">
        {isSignup ? "Create your account" : "Welcome back"}
      </h2>
      <p className="-mt-1 mb-2 text-center text-sm text-base-content/70">
        {isSignup
          ? "Sign up to start tracking your concerts."
          : "Log in to see your concerts and dashboard."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-[5.5rem_1fr] sm:items-center sm:gap-3">
          <label htmlFor="email" className="text-sm font-medium sm:text-right">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input input-bordered input-md w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="grid grid-cols-1 gap-1 sm:grid-cols-[5.5rem_1fr] sm:items-center sm:gap-3">
          <label
            htmlFor="password"
            className="text-sm font-medium sm:text-right"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="input input-bordered input-md w-full pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={isSignup ? "new-password" : "current-password"}
              placeholder="At least 6 characters"
            />
            <button
              type="button"
              className="btn btn-ghost btn-xs absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`alert text-sm ${message.type === "error" ? "alert-error" : "alert-success"}`}
          >
            <span>{message.text}</span>
          </div>
        )}

        {isSignup && message?.type === "success" ? (
          <Link href="/login" className="btn btn-primary btn-lg w-full">
            Go to log in
          </Link>
        ) : (
          <button
            type="submit"
            className={`btn btn-primary btn-lg w-full ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isSignup
                ? "Create account"
                : "Log in"}
          </button>
        )}
      </form>

      <p className="mt-4 text-center text-sm">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-medium">
              Log in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link href="/signup" className="link link-primary font-medium">
              Sign up
            </Link>
          </>
        )}
      </p>

      <p className="mt-2 text-center text-xs text-base-content/60">
        Your concerts stay private to your account.
      </p>
    </Card>
  );
}
