import { ProductListingClient } from "~/components/products/ProductListingClient";

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <p className="mt-2 text-gray-600">
          Browse available products and collectibles.
        </p>
      </div>

      <ProductListingClient />
    </main>
  );
}
