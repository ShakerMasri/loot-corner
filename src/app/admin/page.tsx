import Link from "next/link";
import { requireAdminPage } from "~/lib/admin";

export default async function AdminPage() {
  await requireAdminPage();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage products, orders, and customer requests.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/products"
          className="rounded-lg border border-gray-200 bg-white p-5 hover:shadow"
        >
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="mt-2 text-sm text-gray-600">
            Add, edit, archive, and review products.
          </p>
        </Link>

        <div className="rounded-lg border border-gray-200 bg-white p-5 opacity-60">
          <h2 className="text-lg font-semibold">Orders</h2>
          <p className="mt-2 text-sm text-gray-600">
            Coming next: view orders and update statuses.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 opacity-60">
          <h2 className="text-lg font-semibold">Messages</h2>
          <p className="mt-2 text-sm text-gray-600">
            Coming later: customer-admin messages.
          </p>
        </div>
      </div>
    </main>
  );
}
