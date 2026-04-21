"use client";

import { useState } from "react";

type FieldErrors = Record<string, string[] | undefined>;

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setErrors({});
    setMessage("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors(data.errors ?? {});
      setMessage(data.message ?? "Something went wrong");
      return;
    }

    setMessage("User created successfully");
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <br />
          <input value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name?.[0] && <p>{errors.name[0]}</p>}
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email?.[0] && <p>{errors.email[0]}</p>}
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password?.[0] && <p>{errors.password[0]}</p>}
        </div>

        <br />

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}
