"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type OrderItem = {
  id: string;
  quantity: number;
  priceAtPurchase: string;
  subtotalAmount: string;
  productNameAtPurchase: string;
  productSlugAtPurchase: string;
  productImagesAtPurchase: string[];
};

type Order = {
  id: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: string;
  createdAt: string;
  items: OrderItem[];
};

type OrdersResponse = {
  orders?: Order[];
  message?: string;
};

function formatPrice(price: string) {
  return `$${Number(price).toFixed(2)}`;
}

export function OrdersClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadOrders() {
      setIsLoading(true);
      setMessage("");

      try {
        const response = await fetch("/api/orders");
        const data = (await response.json()) as OrdersResponse;

        if (!response.ok) {
          setOrders([]);
          setMessage(data.message ?? "Failed to load orders.");
          return;
        }

        setOrders(data.orders ?? []);
      } catch {
        setOrders([]);
        setMessage("Failed to connect to the server.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadOrders();
  }, []);

  if (isLoading) {
    return <p className="text-gray-600">Loading orders...</p>;
  }

  if (message) {
    return (
      <div className="rounded border border-gray-200 p-6">
        <p className="text-gray-700">{message}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded border border-gray-200 p-6">
        <p className="text-gray-700">You do not have any orders yet.</p>
        <Link href="/products" className="mt-3 inline-block underline">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <article
          key={order.id}
          className="rounded-lg border border-gray-200 bg-white p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
            <div>
              <h2 className="font-semibold">Order {order.id}</h2>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="text-sm">
              <p>Status: {order.status}</p>
              <p>Payment: {order.paymentStatus}</p>
              <p>Method: Cash on delivery</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {order.items.map((item) => {
              const image = item.productImagesAtPurchase[0];

              return (
                <div key={item.id} className="flex gap-4">
                  <div className="h-20 w-20 overflow-hidden rounded bg-gray-100">
                    {image ? (
                      <img
                        src={image}
                        alt={item.productNameAtPurchase}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-gray-500">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">{item.productNameAtPurchase}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × {formatPrice(item.priceAtPurchase)}
                    </p>
                    <p className="text-sm font-semibold">
                      Subtotal: {formatPrice(item.subtotalAmount)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 border-t border-gray-200 pt-3 text-right font-semibold">
            Total: {formatPrice(order.totalAmount)}
          </div>
        </article>
      ))}
    </div>
  );
}
