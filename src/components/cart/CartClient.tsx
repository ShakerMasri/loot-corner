"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CartProduct = {
  id: string;
  name: string;
  slug: string;
  price: string;
  stock: number;
  images: string[];
  isArchived: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  };
};

type CartItem = {
  id: string;
  quantity: number;
  product: CartProduct;
};

type CartResponse = {
  cartItems?: CartItem[];
  message?: string;
};

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function CartClient() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0);
  }, [cartItems]);

  async function loadCart() {
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/cart");
      const data = (await response.json()) as CartResponse;

      if (!response.ok) {
        setCartItems([]);
        setMessage(data.message ?? "Failed to load cart.");
        return;
      }

      setCartItems(data.cartItems ?? []);
    } catch {
      setCartItems([]);
      setMessage("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateQuantity(cartItemId: string, quantity: number) {
    const response = await fetch(`/api/cart/items/${cartItemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });

    const data = (await response.json()) as CartResponse;

    if (!response.ok) {
      setMessage(data.message ?? "Failed to update item.");
      return;
    }

    await loadCart();
  }

  async function removeItem(cartItemId: string) {
    const response = await fetch(`/api/cart/items/${cartItemId}`, {
      method: "DELETE",
    });

    const data = (await response.json()) as CartResponse;

    if (!response.ok) {
      setMessage(data.message ?? "Failed to remove item.");
      return;
    }

    await loadCart();
  }

  useEffect(() => {
    void loadCart();
  }, []);

  if (isLoading) {
    return <p className="text-gray-600">Loading cart...</p>;
  }

  if (message && cartItems.length === 0) {
    return (
      <div className="rounded border border-gray-200 p-6">
        <p className="text-gray-700">{message}</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="rounded border border-gray-200 p-6">
        <p className="text-gray-700">Your cart is empty.</p>
        <Link href="/products" className="mt-3 inline-block underline">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        {message && (
          <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {message}
          </div>
        )}

        {cartItems.map((item) => {
          const image = item.product.images.at(0);
          const isUnavailable =
            item.product.isArchived || item.product.stock <= 0;
          const itemSubtotal = Number(item.product.price) * item.quantity;

          return (
            <div
              key={item.id}
              className="flex gap-4 rounded border border-gray-200 p-4"
            >
              <div className="h-24 w-24 overflow-hidden rounded bg-gray-100">
                {image ? (
                  <img
                    src={image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-500">
                    No image
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Link
                  href={`/products/${item.product.slug}`}
                  className="font-semibold underline"
                >
                  {item.product.name}
                </Link>

                <p className="text-sm text-gray-600">
                  {formatPrice(Number(item.product.price))}
                </p>

                {isUnavailable && (
                  <p className="text-sm text-red-600">
                    This product is not currently available.
                  </p>
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={item.quantity <= 1 || isUnavailable}
                    onClick={() =>
                      void updateQuantity(item.id, item.quantity - 1)
                    }
                    className="rounded border px-3 py-1 disabled:opacity-50"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    disabled={
                      item.quantity >= item.product.stock || isUnavailable
                    }
                    onClick={() =>
                      void updateQuantity(item.id, item.quantity + 1)
                    }
                    className="rounded border px-3 py-1 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => void removeItem(item.id)}
                  className="text-sm text-red-600 underline"
                >
                  Remove
                </button>
              </div>

              <div className="text-sm font-semibold">
                {formatPrice(itemSubtotal)}
              </div>
            </div>
          );
        })}
      </div>

      <aside className="h-fit rounded border border-gray-200 p-4">
        <h2 className="text-lg font-semibold">Cart summary</h2>

        <div className="mt-4 flex justify-between">
          <span>Total</span>
          <span className="font-semibold">{formatPrice(total)}</span>
        </div>

        <button
          type="button"
          disabled
          className="mt-4 w-full rounded bg-black px-4 py-3 text-white opacity-50"
        >
          Checkout coming next
        </button>

        <p className="mt-3 text-xs text-gray-500">
          Checkout will create the real order and decrease stock.
        </p>
      </aside>
    </div>
  );
}
