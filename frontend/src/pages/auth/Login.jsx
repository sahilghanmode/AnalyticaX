import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = ({ onOpenChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // clear previous errors

    // Basic validation
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);

    try {
      // Replace with your real API endpoint
      const response = await fetch("https://your-api.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful!", data);
        // Optionally reset fields
        setEmail("");
        setPassword("");
        // Optionally close the login modal
        onOpenChange(false);
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed left-0 top-0 bg-black/50 flex justify-center items-center h-[100dvh] w-full">
      <div className="h-100 w-[425px] bg-white flex flex-col border rounded-lg">
        <div className="pr-4 pt-4 pl-4 pb-2 flex justify-between">
          <div className="font-bold text-2xl">Log in to AnalyticaX</div>
          <div
            onClick={() => onOpenChange(false)}
            className="cursor-pointer text-xl"
          >
            ×
          </div>
        </div>

        <div className="text-sm text-gray-500 pl-4 pt-2">
          Enter your credentials to access your account
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 pt-6">
          <div className="space-y-4 px-4">
            <div className="font-medium">Enter your Email</div>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="font-medium">Enter your Password</div>
            <Input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <div className="text-red-500 text-sm pt-2">{error}</div>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-5 cursor-pointer bg-emerald-500 hover:bg-emerald-600"
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
