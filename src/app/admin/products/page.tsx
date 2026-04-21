"use client";

import { useState } from "react";

type FieldErrors = Record<string, string[] | undefined>;

export default function AdminProductsPage() {
  const [name, setName] = useState("P");
  const [slug, setSlug] = useState("Bad Slug!!");
  const [description, setDescription] = useState("short");
  const [price, setPrice] = useState("-10");
  const [stock, setStock] = useState("-1");
  const [imageUrl, setImageUrl] = useState("not-a-url");
  const [categoryId, setCategoryId] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode] = useState<number | null>(null);

  async function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();

    setErrors({});
    setMessage("");
    setStatusCode(null);

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        slug,
        description,
        price,
        stock,
        images: imageUrl ? [imageUrl] : [],
        categoryId,
      }),
    });

    const data = await res.json();

    setStatusCode(res.status);

    if (!res.ok) {
      setMessage(data.message ?? "Something went wrong");
      setErrors(data.errors ?? {});
      return;
    }

    setMessage("Product created successfully");
    setErrors({});
  }

  return (
    <main style={{ padding: 40, maxWidth: 600 }}>
      <h1>Admin Products Test</h1>

      <p>Use this page to test Zod validation for product creation.</p>

      <form onSubmit={handleCreateProduct}>
        <div>
          <label>Name</label>
          <br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
          {errors.name?.[0] && <p style={{ color: "red" }}>{errors.name[0]}</p>}
        </div>

        <br />

        <div>
          <label>Slug</label>
          <br />
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
          {errors.slug?.[0] && <p style={{ color: "red" }}>{errors.slug[0]}</p>}
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
          {errors.description?.[0] && (
            <p style={{ color: "red" }}>{errors.description[0]}</p>
          )}
        </div>

        <br />

        <div>
          <label>Price</label>
          <br />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
          {errors.price?.[0] && (
            <p style={{ color: "red" }}>{errors.price[0]}</p>
          )}
        </div>

        <br />

        <div>
          <label>Stock</label>
          <br />
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
          {errors.stock?.[0] && (
            <p style={{ color: "red" }}>{errors.stock[0]}</p>
          )}
        </div>

        <br />

        <div>
          <label>Image URL</label>
          <br />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
          {errors.images?.[0] && (
            <p style={{ color: "red" }}>{errors.images[0]}</p>
          )}
        </div>

        <br />

        <div>
          <label>Category ID</label>
          <br />
          <input
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
          {errors.categoryId?.[0] && (
            <p style={{ color: "red" }}>{errors.categoryId[0]}</p>
          )}
        </div>

        <br />

        <button type="submit">Create Product</button>
      </form>

      <hr />

      {statusCode && <p>Status: {statusCode}</p>}
      {message && <p>{message}</p>}
    </main>
  );
}
