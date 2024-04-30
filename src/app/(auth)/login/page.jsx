"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    if (!email || !password) {
      setError("All fields are required");
    } else {
      setError("");
      setSuccess("");
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.code === 200) {
        setSuccess(data.message);
        router.push("/dashboard");
      } else {
        setError(data.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4 p-4 bg-gray-500">
      <h3>LoginPage</h3>
      {error && (
        <p className="px-4 text-sm text-red-500 rounded-md bg-red-500/30 ">
          {error}
        </p>
      )}
      {success && (
        <p className="px-4 text-sm rounded-md text-emerald-500 bg-emerald-500/30 ">
          {success}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 text-black rounded-md"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 text-black rounded-md"
        />
        <button
          className="h-10 text-white bg-red-500 rounded-md hover:bg-red-500/80"
          type="submit"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
