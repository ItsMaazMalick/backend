"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (data.code === 200) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      <h3>LoginPage</h3>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
