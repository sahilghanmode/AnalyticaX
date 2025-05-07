import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUp = ({ onOpenChange }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://your-api.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful!", data);
        // Optionally close modal or redirect user
        onOpenChange(false);
        // Optionally clear fields
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed cursor-pointer w-full left-0 top-0 h-[100dvh] bg-black/50 flex justify-center items-center">
      <div className="bg-white h-140 w-[420px] flex flex-col border rounded-lg">
        <div className="pr-4 pt-4 pl-4 pb-2 flex justify-between">
          <div className="font-bold text-2xl">Create your account</div>
          <div
            onClick={() => onOpenChange(false)}
            className="cursor-pointer text-xl"
          >
            ×
          </div>
        </div>

        <div className="text-sm text-gray-500 pl-4 pt-2">
          Join AnalyticaX to transform your data into powerful visualizations
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 pt-6">
          <div className="space-y-4 px-4">
            <div className="font-medium">Enter your Name</div>
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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

            <div className="font-medium">Confirm your Password</div>
            <Input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <div className="text-red-500 text-sm pt-2">{error}</div>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-5 cursor-pointer bg-emerald-500 hover:bg-emerald-600"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </div>
        </form>

        <div className="p-4 text-center text-sm">Already have an account?</div>
      </div>
    </div>
  );
};

export default SignUp;
