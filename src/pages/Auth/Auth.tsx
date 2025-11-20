import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";

export default function Auth() {
  const navigate = useNavigate();
  const { signup, login, isLoading, error, clearError } = useAuthStore();

  const [activeTab, setActiveTab] = useState<"signup" | "login">("login");

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Handle signup
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      const user = await signup(
        signupForm.name,
        signupForm.email,
        signupForm.password
      );
      // Role-based redirect
      if (user && user.roleId === 1) {
        navigate("/admin/dashboard");
      } else {
        navigate("/profile");
      }
    } catch {
      // Error is handled by store
    }
  };

  // Handle login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      const user = await login(loginForm.email, loginForm.password);
      // Role-based redirect
      if (user && user.roleId === 1) {
        navigate("/admin/dashboard");
      } else {
        navigate("/jobs");
      }
    } catch {
      // Error is handled by store
    }
  };

  // Tab animation variants
  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-white to-zinc-50 pt-20">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-indigo-100 blur-3xl" />
      </div>

      <div className="mx-auto max-w-md px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl"
        >
          {/* Tab Header */}
          <div className="flex border-b border-zinc-200">
            <button
              onClick={() => {
                setActiveTab("signup");
                clearError();
              }}
              className={`relative flex-1 px-6 py-4 text-sm font-semibold transition ${
                activeTab === "signup"
                  ? "text-zinc-900"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              Sign Up
              {activeTab === "signup" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab("login");
                clearError();
              }}
              className={`relative flex-1 px-6 py-4 text-sm font-semibold transition ${
                activeTab === "login"
                  ? "text-zinc-900"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              Log In
              {activeTab === "login" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          </div>

          {/* Error Message */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden border-b border-red-100 bg-red-50 px-6 py-3 text-sm text-red-600"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === "signup" ? (
                <motion.form
                  key="signup"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSignup}
                  className="space-y-4"
                >
                  <div>
                    <label
                      htmlFor="signup-name"
                      className="block text-sm font-medium text-zinc-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="signup-name"
                      type="text"
                      required
                      value={signupForm.name}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, name: e.target.value })
                      }
                      className="mt-1 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="signup-email"
                      className="block text-sm font-medium text-zinc-700"
                    >
                      Email
                    </label>
                    <input
                      id="signup-email"
                      type="email"
                      required
                      value={signupForm.email}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, email: e.target.value })
                      }
                      className="mt-1 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="signup-password"
                      className="block text-sm font-medium text-zinc-700"
                    >
                      Password
                    </label>
                    <input
                      id="signup-password"
                      type="password"
                      required
                      minLength={6}
                      value={signupForm.password}
                      onChange={(e) =>
                        setSignupForm({
                          ...signupForm,
                          password: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="Min. 6 characters"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? "Creating account..." : "Sign Up"}
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="login"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div>
                    <label
                      htmlFor="login-email"
                      className="block text-sm font-medium text-zinc-700"
                    >
                      Email
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                      }
                      className="mt-1 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="login-password"
                      className="block text-sm font-medium text-zinc-700"
                    >
                      Password
                    </label>
                    <input
                      id="login-password"
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({
                          ...loginForm,
                          password: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="Enter your password"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? "Logging in..." : "Log In"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer Text */}
        <p className="mt-6 text-center text-sm text-zinc-600">
          {activeTab === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setActiveTab("login")}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setActiveTab("signup")}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
