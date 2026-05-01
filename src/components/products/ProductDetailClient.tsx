"use client";

import { useEffect, useState } from "react";
import { AddToCartControls } from "~/components/cart/AddToCartControls";
type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  stock: number;
  images: string[];
  isFeatured: boolean;
  createdAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
};

type ProductResponse = {
  product?: Product;
  message?: string;
};

type ProductDetailClientProps = {
  slug: string;
};

function formatPrice(price: string) {
  return `$${Number(price).toFixed(2)}`;
}

export function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      setMessage("");

      try {
        const response = await fetch(
          `/api/products/${encodeURIComponent(slug)}`,
        );
        const data = (await response.json()) as ProductResponse;

        if (!response.ok || !data.product) {
          setProduct(null);
          setMessage(data.message ?? "Product not found.");
          return;
        }

        setProduct(data.product);
        setSelectedImage(data.product.images.at(0) ?? null);
      } catch {
        setProduct(null);
        setMessage("Failed to connect to the server.");
      } finally {
        setIsLoading(false);
      }
    }

    void fetchProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-lg bg-gray-200" />

        <div className="space-y-4">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200" />
          <div className="h-24 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="rounded-lg border border-gray-200 p-8 text-center">
        {message || "Product not found."}
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500">
              No image
            </div>
          )}
        </div>

        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`overflow-hidden rounded border ${
                  selectedImage === image ? "border-black" : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={product.name}
                  className="aspect-square w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <p className="text-sm tracking-wide text-gray-500 uppercase">
          {product.category.name}
        </p>

        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

        <p className="text-xl font-semibold text-gray-900">
          {formatPrice(product.price)}
        </p>

        <p className="text-gray-600">
          {product.description ?? "No description available."}
        </p>

        {isOutOfStock ? (
          <span className="inline-block rounded bg-red-100 px-2 py-1 text-sm text-red-700">
            Out of stock
          </span>
        ) : (
          <span className="inline-block rounded bg-green-100 px-2 py-1 text-sm text-green-700">
            In stock: {product.stock}
          </span>
        )}
        <AddToCartControls productId={product.id} stock={product.stock} />

        <p className="text-xs text-gray-500">
          Adding to cart does not reserve stock. Stock is checked again during
          checkout.
        </p>
      </div>
    </div>
  );
}
