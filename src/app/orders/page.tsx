import { OrdersClient } from "~/components/orders/OrdersClient";

export default function OrdersPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My orders</h1>
        <p className="mt-2 text-gray-600">
          View your order history and payment status.
        </p>
      </div>

      <OrdersClient />
    </main>
  );
}
