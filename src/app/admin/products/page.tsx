import { requireAdminPage } from "~/lib/admin";
import { AdminProductsClient } from "./AdminProductsClient";

export default async function AdminProductsPage() {
  await requireAdminPage();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin products</h1>
        <p className="mt-2 text-gray-600">
          Test product creation and validation.
        </p>
      </div>

      <AdminProductsClient />
    </main>
  );
}
