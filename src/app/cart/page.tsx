import { CartClient } from "~/components/cart/CartClient";

export default function CartPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your cart</h1>
        <p className="mt-2 text-gray-600">Review your items before checkout.</p>
      </div>

      <CartClient />
    </main>
  );
}
