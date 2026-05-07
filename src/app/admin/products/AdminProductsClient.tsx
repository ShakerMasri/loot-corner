"use client";

import Link from "next/link";
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { useEffect, useMemo, useState } from "react";
import { useAppPreferences } from "~/components/providers/AppPreferencesProvider";
import { OptimizedImage } from "~/components/ui/OptimizedImage";

type FieldErrors = Record<string, string[] | undefined>;

type Category = {
  id: string;
  name: string;
  slug: string;
};

type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  stock: number;
  images: string[];
  isArchived: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
};

type ProductForm = {
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: string;
  images: string[];
  isFeatured: boolean;
  categoryId: string;
};

type ProductsResponse = {
  products?: AdminProduct[];
  product?: AdminProduct;
  message?: string;
  errors?: FieldErrors;
};

type CategoriesResponse = {
  categories?: Category[];
  category?: Category;
  message?: string;
  errors?: FieldErrors;
};

type UploadResponse = {
  message?: string;
  image?: {
    url: string;
    publicId: string;
    width: number;
    height: number;
    format: string;
    bytes: number;
  };
  errors?: FieldErrors;
};

type MessageType = "success" | "error";

function getEmptyProductForm(): ProductForm {
  return {
    name: "",
    slug: "",
    description: "",
    price: "",
    stock: "0",
    images: [],
    isFeatured: false,
    categoryId: "",
  };
}

function formatPrice(price: string | number) {
  return `$${Number(price).toFixed(2)}`;
}

function makeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function prepareProductPayload(form: ProductForm) {
  return {
    name: form.name,
    slug: form.slug,
    description: form.description.trim() ? form.description : null,
    price: form.price,
    stock: form.stock,
    images: form.images,
    isFeatured: form.isFeatured,
    categoryId: form.categoryId,
  };
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-sm font-medium text-red-600">{message}</p>;
}

type ProductFormLabels = {
  productName: string;
  productNamePlaceholder: string;
  slug: string;
  slugPlaceholder: string;
  make: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  price: string;
  stock: string;
  category: string;
  selectCategory: string;
  featuredProduct: string;
  images: string;
  imageUrlPlaceholder: string;
  addUrl: string;
  imageHelp: string;
  productPreview: string;
  remove: string;
};

type ProductFormFieldsProps = {
  form: ProductForm;
  setForm: Dispatch<SetStateAction<ProductForm>>;
  categories: Category[];
  errors: FieldErrors;
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
  onAddImageUrl: () => void;
  onRemoveImage: (image: string) => void;
  onUpload: (file: File) => void;
  isUploading: boolean;
  labels: ProductFormLabels;
};

function ProductFormFields({
  form,
  setForm,
  categories,
  errors,
  imageUrl,
  setImageUrl,
  onAddImageUrl,
  onRemoveImage,
  onUpload,
  isUploading,
  labels,
}: ProductFormFieldsProps) {
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    onUpload(file);
    event.target.value = "";
  }

  return (
    <div className="grid gap-5">
      {errors._form?.[0] && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {errors._form[0]}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            {labels.productName}
          </label>

          <input
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 transition outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-950"
            placeholder={labels.productNamePlaceholder}
          />

          <FieldError message={errors.name?.[0]} />
        </div>

        <div>
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            {labels.slug}
          </label>

          <div className="mt-2 flex gap-2">
            <input
              value={form.slug}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  slug: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 transition outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-950"
              placeholder={labels.slugPlaceholder}
            />

            <button
              type="button"
              onClick={() =>
                setForm((current) => ({
                  ...current,
                  slug: makeSlug(current.name),
                }))
              }
              className="shrink-0 rounded-2xl border border-zinc-300 px-4 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              {labels.make}
            </button>
          </div>

          <FieldError message={errors.slug?.[0]} />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {labels.descriptionLabel}
        </label>

        <textarea
          value={form.description}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              description: event.target.value,
            }))
          }
          rows={4}
          className="mt-2 w-full resize-none rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 transition outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-950"
          placeholder={labels.descriptionPlaceholder}
        />

        <FieldError message={errors.description?.[0]} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            {labels.price}
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                price: event.target.value,
              }))
            }
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 transition outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-950"
            placeholder="19.99"
          />

          <FieldError message={errors.price?.[0]} />
        </div>

        <div>
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            {labels.stock}
          </label>

          <input
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                stock: event.target.value,
              }))
            }
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 transition outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-950"
            placeholder="10"
          />

          <FieldError message={errors.stock?.[0]} />
        </div>

        <div>
          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            {labels.category}
          </label>

          <select
            value={form.categoryId}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                categoryId: event.target.value,
              }))
            }
            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 transition outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-950"
          >
            <option value="">{labels.selectCategory}</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <FieldError message={errors.categoryId?.[0]} />
        </div>
      </div>

      <label className="flex w-fit items-center gap-3 rounded-2xl border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-800 dark:border-zinc-700 dark:text-zinc-100">
        <input
          type="checkbox"
          checked={form.isFeatured}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              isFeatured: event.target.checked,
            }))
          }
          className="h-4 w-4"
        />
        {labels.featuredProduct}
      </label>

      <div>
        <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {labels.images}
        </label>

        <div className="mt-2 grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 transition outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-950"
            placeholder={labels.imageUrlPlaceholder}
          />

          <button
            type="button"
            onClick={onAddImageUrl}
            className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            {labels.addUrl}
          </button>
        </div>

        <div className="mt-3">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={isUploading}
            className="block w-full text-sm text-zinc-600 file:mr-4 file:rounded-full file:border-0 file:bg-zinc-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-zinc-800 disabled:opacity-60 dark:text-zinc-400 dark:file:bg-white dark:file:text-zinc-950"
          />

          <p className="mt-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            {labels.imageHelp}
          </p>
        </div>

        <FieldError message={errors.images?.[0]} />

        {form.images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {form.images.map((image) => (
              <div
                key={image}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="relative aspect-square bg-zinc-100 dark:bg-zinc-800">
                  {" "}
                  <OptimizedImage
                    src={image}
                    alt={labels.productPreview}
                    sizes="160px"
                    className="object-cover"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveImage(image)}
                  className="w-full px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                >
                  {labels.remove}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function AdminProductsClient() {
  const { t } = useAppPreferences();
  const labels = t.admin.products;

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [createForm, setCreateForm] = useState<ProductForm>(() =>
    getEmptyProductForm(),
  );
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ProductForm | null>(null);

  const [createImageUrl, setCreateImageUrl] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");

  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");

  const [stockDrafts, setStockDrafts] = useState<Record<string, string>>({});

  const [productErrors, setProductErrors] = useState<FieldErrors>({});
  const [categoryErrors, setCategoryErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("success");

  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [updatingProductId, setUpdatingProductId] = useState<string | null>(
    null,
  );
  const [uploadingMode, setUploadingMode] = useState<"create" | "edit" | null>(
    null,
  );

  const activeProducts = useMemo(() => {
    return products.filter((product) => !product.isArchived);
  }, [products]);

  const archivedProducts = useMemo(() => {
    return products.filter((product) => product.isArchived);
  }, [products]);

  function showMessage(type: MessageType, value: string) {
    setMessageType(type);
    setMessage(value);
  }

  function setEditProductForm(nextForm: SetStateAction<ProductForm>) {
    setEditForm((current) => {
      if (!current) {
        return current;
      }

      return typeof nextForm === "function" ? nextForm(current) : nextForm;
    });
  }

  async function loadAdminData() {
    setIsLoading(true);
    setProductErrors({});
    setCategoryErrors({});

    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/categories"),
      ]);

      const [productsData, categoriesData] = (await Promise.all([
        productsResponse.json(),
        categoriesResponse.json(),
      ])) as [ProductsResponse, CategoriesResponse];

      if (!productsResponse.ok) {
        showMessage(
          "error",
          productsData.message ?? labels.failedToLoadProducts,
        );
        setProducts([]);
        return;
      }

      if (!categoriesResponse.ok) {
        showMessage(
          "error",
          categoriesData.message ?? labels.failedToLoadCategories,
        );
        setCategories([]);
        return;
      }

      const nextProducts = productsData.products ?? [];

      setProducts(nextProducts);
      setCategories(categoriesData.categories ?? []);
      setStockDrafts(
        Object.fromEntries(
          nextProducts.map((product) => [product.id, String(product.stock)]),
        ),
      );
    } catch {
      showMessage("error", labels.failedToConnect);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadAdminData();
    // Load once on mount. Language changes only affect labels.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addCreateImageUrl() {
    const nextUrl = createImageUrl.trim();

    if (!nextUrl) {
      return;
    }

    setCreateForm((current) => ({
      ...current,
      images: [...current.images, nextUrl],
    }));
    setCreateImageUrl("");
  }

  function addEditImageUrl() {
    const nextUrl = editImageUrl.trim();

    if (!nextUrl || !editForm) {
      return;
    }

    setEditForm((current) =>
      current
        ? {
            ...current,
            images: [...current.images, nextUrl],
          }
        : current,
    );
    setEditImageUrl("");
  }

  function removeCreateImage(image: string) {
    setCreateForm((current) => ({
      ...current,
      images: current.images.filter((currentImage) => currentImage !== image),
    }));
  }

  function removeEditImage(image: string) {
    setEditForm((current) =>
      current
        ? {
            ...current,
            images: current.images.filter(
              (currentImage) => currentImage !== image,
            ),
          }
        : current,
    );
  }

  async function uploadImage(file: File, target: "create" | "edit") {
    setUploadingMode(target);
    setProductErrors({});
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/uploads/product-images", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as UploadResponse;

      if (!response.ok || !data.image) {
        setProductErrors(data.errors ?? {});
        showMessage("error", data.message ?? labels.failedToUploadImage);
        return;
      }

      const uploadedUrl = data.image.url;

      if (target === "create") {
        setCreateForm((current) => ({
          ...current,
          images: [...current.images, uploadedUrl],
        }));
      } else {
        setEditForm((current) =>
          current
            ? {
                ...current,
                images: [...current.images, uploadedUrl],
              }
            : current,
        );
      }

      showMessage("success", data.message ?? labels.imageUploaded);
    } catch {
      showMessage("error", labels.failedToConnect);
    } finally {
      setUploadingMode(null);
    }
  }

  async function handleCreateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSavingProduct(true);
    setProductErrors({});
    setMessage("");

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prepareProductPayload(createForm)),
      });

      const data = (await response.json()) as ProductsResponse;

      if (!response.ok) {
        setProductErrors(data.errors ?? {});
        showMessage("error", data.message ?? labels.failedToCreateProduct);
        return;
      }

      setCreateForm(getEmptyProductForm());
      setCreateImageUrl("");
      showMessage("success", data.message ?? labels.productCreated);
      await loadAdminData();
    } catch {
      showMessage("error", labels.failedToConnect);
    } finally {
      setIsSavingProduct(false);
    }
  }

  function startEditingProduct(product: AdminProduct) {
    setProductErrors({});
    setMessage("");
    setEditProductId(product.id);
    setEditImageUrl("");

    setEditForm({
      name: product.name,
      slug: product.slug,
      description: product.description ?? "",
      price: product.price,
      stock: String(product.stock),
      images: product.images,
      isFeatured: product.isFeatured,
      categoryId: product.category.id,
    });
  }

  function cancelEditingProduct() {
    setEditProductId(null);
    setEditForm(null);
    setEditImageUrl("");
    setProductErrors({});
  }

  async function handleUpdateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editProductId || !editForm) {
      return;
    }

    setIsSavingProduct(true);
    setProductErrors({});
    setMessage("");

    try {
      const response = await fetch(`/api/admin/products/${editProductId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prepareProductPayload(editForm)),
      });

      const data = (await response.json()) as ProductsResponse;

      if (!response.ok) {
        setProductErrors(data.errors ?? {});
        showMessage("error", data.message ?? labels.failedToUpdateProduct);
        return;
      }

      showMessage("success", data.message ?? labels.productUpdated);
      cancelEditingProduct();
      await loadAdminData();
    } catch {
      showMessage("error", labels.failedToConnect);
    } finally {
      setIsSavingProduct(false);
    }
  }

  async function archiveProduct(productId: string) {
    setUpdatingProductId(productId);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      const data = (await response.json()) as ProductsResponse;

      if (!response.ok) {
        showMessage("error", data.message ?? labels.failedToArchiveProduct);
        return;
      }

      showMessage("success", data.message ?? labels.productArchived);
      await loadAdminData();
    } catch {
      showMessage("error", labels.failedToConnect);
    } finally {
      setUpdatingProductId(null);
    }
  }

  async function restoreProduct(productId: string) {
    setUpdatingProductId(productId);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/products/${productId}/restore`, {
        method: "POST",
      });

      const data = (await response.json()) as ProductsResponse;

      if (!response.ok) {
        showMessage("error", data.message ?? labels.failedToRestoreProduct);
        return;
      }

      showMessage("success", data.message ?? labels.productRestored);
      await loadAdminData();
    } catch {
      showMessage("error", labels.failedToConnect);
    } finally {
      setUpdatingProductId(null);
    }
  }

  async function updateStock(productId: string) {
    setUpdatingProductId(productId);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/products/${productId}/stock`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stock: stockDrafts[productId] ?? "0",
        }),
      });

      const data = (await response.json()) as ProductsResponse;

      if (!response.ok) {
        showMessage("error", data.message ?? labels.failedToUpdateStock);
        return;
      }

      showMessage("success", data.message ?? labels.stockUpdated);
      await loadAdminData();
    } catch {
      showMessage("error", labels.failedToConnect);
    } finally {
      setUpdatingProductId(null);
    }
  }

  async function handleCreateCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSavingCategory(true);
    setCategoryErrors({});
    setMessage("");

    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryName,
          slug: categorySlug,
        }),
      });

      const data = (await response.json()) as CategoriesResponse;

      if (!response.ok) {
        setCategoryErrors(data.errors ?? {});
        showMessage("error", data.message ?? labels.failedToCreateCategory);
        return;
      }

      setCategoryName("");
      setCategorySlug("");
      showMessage("success", data.message ?? labels.categoryCreated);
      await loadAdminData();
    } catch {
      showMessage("error", labels.failedToConnect);
    } finally {
      setIsSavingCategory(false);
    }
  }

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-800"
            />
          ))}
        </div>

        <div className="h-96 animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-wide text-orange-600 uppercase dark:text-orange-400">
            {labels.badge}
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
            {labels.title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {labels.description}
          </p>
        </div>

        <Link
          href="/admin"
          className="w-fit rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-950"
        >
          {labels.backToDashboard}
        </Link>
      </div>

      {message && (
        <div
          className={`rounded-2xl border p-4 text-sm font-medium ${
            messageType === "success"
              ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {labels.activeProducts}
          </p>
          <p className="mt-2 text-2xl font-black text-zinc-950 dark:text-white">
            {activeProducts.length}
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {labels.archivedProducts}
          </p>
          <p className="mt-2 text-2xl font-black text-zinc-950 dark:text-white">
            {archivedProducts.length}
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {labels.categories}
          </p>
          <p className="mt-2 text-2xl font-black text-zinc-950 dark:text-white">
            {categories.length}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        <div className="space-y-6">
          <form
            onSubmit={handleCreateProduct}
            className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="text-xl font-black text-zinc-950 dark:text-white">
              {labels.createProduct}
            </h2>

            <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {labels.createProductDescription}
            </p>

            <div className="mt-6">
              <ProductFormFields
                form={createForm}
                setForm={setCreateForm}
                categories={categories}
                errors={productErrors}
                imageUrl={createImageUrl}
                setImageUrl={setCreateImageUrl}
                onAddImageUrl={addCreateImageUrl}
                onRemoveImage={removeCreateImage}
                onUpload={(file) => void uploadImage(file, "create")}
                isUploading={uploadingMode === "create"}
                labels={labels}
              />
            </div>

            <button
              type="submit"
              disabled={isSavingProduct}
              className="mt-6 w-full rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              {isSavingProduct ? labels.creating : labels.createProductButton}
            </button>
          </form>

          {editForm && editProductId && (
            <form
              onSubmit={handleUpdateProduct}
              className="rounded-3xl border border-orange-200 bg-orange-50 p-5 shadow-sm sm:p-6 dark:border-orange-900 dark:bg-orange-950"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-black text-zinc-950 dark:text-white">
                    {labels.editProduct}
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                    {labels.editProductDescription}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={cancelEditingProduct}
                  className="w-fit rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-white dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
                >
                  {labels.cancel}
                </button>
              </div>

              <div className="mt-6">
                <ProductFormFields
                  form={editForm}
                  setForm={setEditProductForm}
                  categories={categories}
                  errors={productErrors}
                  imageUrl={editImageUrl}
                  setImageUrl={setEditImageUrl}
                  onAddImageUrl={addEditImageUrl}
                  onRemoveImage={removeEditImage}
                  onUpload={(file) => void uploadImage(file, "edit")}
                  isUploading={uploadingMode === "edit"}
                  labels={labels}
                />
              </div>

              <button
                type="submit"
                disabled={isSavingProduct}
                className="mt-6 w-full rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                {isSavingProduct ? labels.saving : labels.saveProduct}
              </button>
            </form>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24">
          <form
            onSubmit={handleCreateCategory}
            className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="text-xl font-black text-zinc-950 dark:text-white">
              {labels.newCategory}
            </h2>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  {labels.categoryName}
                </label>

                <input
                  value={categoryName}
                  onChange={(event) => setCategoryName(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 transition outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-950"
                  placeholder={labels.categoryNamePlaceholder}
                />

                <FieldError message={categoryErrors.name?.[0]} />
              </div>

              <div>
                <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  {labels.categorySlug}
                </label>

                <div className="mt-2 flex gap-2">
                  <input
                    value={categorySlug}
                    onChange={(event) => setCategorySlug(event.target.value)}
                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 transition outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-950"
                    placeholder={labels.categorySlugPlaceholder}
                  />

                  <button
                    type="button"
                    onClick={() => setCategorySlug(makeSlug(categoryName))}
                    className="shrink-0 rounded-2xl border border-zinc-300 px-4 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
                  >
                    {labels.make}
                  </button>
                </div>

                <FieldError message={categoryErrors.slug?.[0]} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSavingCategory}
              className="mt-5 w-full rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              {isSavingCategory
                ? labels.creatingCategory
                : labels.createCategory}
            </button>
          </form>

          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-black text-zinc-950 dark:text-white">
              {labels.categoryList}
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {categories.length === 0 ? (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {labels.noCategoriesYet}
                </p>
              ) : (
                categories.map((category) => (
                  <span
                    key={category.id}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                  >
                    {category.name}
                  </span>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>

      <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-black text-zinc-950 dark:text-white">
              {labels.productList}
            </h2>

            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {labels.productListDescription}
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadAdminData()}
            className="w-fit rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-950"
          >
            {labels.refresh}
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              {labels.noProductsYet}
            </div>
          ) : (
            products.map((product) => {
              const image = product.images.at(0);
              const isUpdating = updatingProductId === product.id;

              return (
                <article
                  key={product.id}
                  className="rounded-3xl border border-zinc-200 p-4 dark:border-zinc-800"
                >
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-2xl bg-zinc-100 md:w-36 dark:bg-zinc-800">
                      {" "}
                      {image ? (
                        <OptimizedImage
                          src={image}
                          alt={product.name}
                          sizes="144px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
                          {labels.noImage}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                              {product.category.name}
                            </span>

                            {product.isFeatured && (
                              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                                {labels.featured}
                              </span>
                            )}

                            {product.isArchived && (
                              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-950 dark:text-red-300">
                                {labels.archived}
                              </span>
                            )}
                          </div>

                          <h3 className="mt-3 truncate text-lg font-black text-zinc-950 dark:text-white">
                            {product.name}
                          </h3>

                          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                            /products/{product.slug}
                          </p>

                          <p className="mt-2 text-lg font-black text-zinc-950 dark:text-white">
                            {formatPrice(product.price)}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                          <button
                            type="button"
                            onClick={() => startEditingProduct(product)}
                            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-950"
                          >
                            {labels.edit}
                          </button>

                          {product.isArchived ? (
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() => void restoreProduct(product.id)}
                              className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isUpdating ? labels.restoring : labels.restore}
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() => void archiveProduct(product.id)}
                              className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isUpdating ? labels.archiving : labels.archive}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-[180px_auto] sm:items-end">
                        <div>
                          <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                            {labels.stock}
                          </label>

                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={
                              stockDrafts[product.id] ?? String(product.stock)
                            }
                            onChange={(event) =>
                              setStockDrafts((current) => ({
                                ...current,
                                [product.id]: event.target.value,
                              }))
                            }
                            className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 transition outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-950"
                          />
                        </div>

                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => void updateStock(product.id)}
                          className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                        >
                          {isUpdating ? labels.stockSaving : labels.updateStock}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </section>
  );
}
