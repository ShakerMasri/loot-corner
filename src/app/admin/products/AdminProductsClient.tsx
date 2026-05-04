"use client";

import { useState } from "react";

type FieldErrors = Record<string, string[] | undefined>;

type CreateProductResponse = {
  message?: string;
  errors?: FieldErrors;
};

export function AdminProductsClient() {
  const [name, setName] = useState("P");
  const [slug, setSlug] = useState("bad-slug");
  const [description, setDescription] = useState("short");
  const [price, setPrice] = useState("-10");
  const [stock, setStock] = useState("-1");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode] = useState<number | null>(null);

  async function handleCreateProduct(event: React.FormEvent) {
    event.preventDefault();

    setErrors({});
    setMessage("");
    setStatusCode(null);

    const response = await fetch("/api/admin/products", {
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

    const data = (await response.json()) as CreateProductResponse;

    setStatusCode(response.status);

    if (!response.ok) {
      setMessage(data.message ?? "Something went wrong.");
      setErrors(data.errors ?? {});
      return;
    }

    setMessage(data.message ?? "Product created successfully.");
    setErrors({});
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6">
      <form onSubmit={handleCreateProduct} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
          {errors.name?.[0] && (
            <p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
          {errors.slug?.[0] && (
            <p className="mt-1 text-sm text-red-600">{errors.slug[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
          {errors.description?.[0] && (
            <p className="mt-1 text-sm text-red-600">{errors.description[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
          {errors.price?.[0] && (
            <p className="mt-1 text-sm text-red-600">{errors.price[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
          {errors.stock?.[0] && (
            <p className="mt-1 text-sm text-red-600">{errors.stock[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
          {errors.images?.[0] && (
            <p className="mt-1 text-sm text-red-600">{errors.images[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category ID
          </label>
          <input
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
          {errors.categoryId?.[0] && (
            <p className="mt-1 text-sm text-red-600">{errors.categoryId[0]}</p>
          )}
        </div>

        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          Create product
        </button>
      </form>

      <div className="mt-6 border-t border-gray-200 pt-4">
        {statusCode && <p className="text-sm">Status: {statusCode}</p>}
        {message && <p className="mt-1 text-sm">{message}</p>}
      </div>
    </section>
  );
}
