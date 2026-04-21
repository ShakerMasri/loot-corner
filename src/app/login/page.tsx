"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("123456");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setMessage("Logging in...");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("LOGIN_RESULT:", res);

    if (res?.error) {
      setMessage("Login failed: wrong email or password");
      return;
    }

    setMessage("Login successful");
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Login Test</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 8, width: 300 }}
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 8, width: 300 }}
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>

      <p>{message}</p>
    </main>
  );
}
