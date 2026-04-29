"use client";

import { useEffect, useState } from "react";
import { CategoryTabs } from "./CategoryTabs";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  price: string;
  stock: number;
  images: string[];
  isFeatured: boolean;
  category: Category;
};

type ProductsResponse = {
  products?: Product[];
  categories?: Category[];
  message?: string;
};

export function ProductListingClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      setErrorMessage("");

      const url = selectedCategory
        ? `/api/products?category=${encodeURIComponent(selectedCategory)}`
        : "/api/products";

      try {
        const response = await fetch(url);
        const data = (await response.json()) as ProductsResponse;

        if (!response.ok) {
          setProducts([]);
          setErrorMessage(data.message ?? "Failed to load products.");
          return;
        }

        setProducts(data.products ?? []);
        setCategories(data.categories ?? []);
      } catch {
        setProducts([]);
        setErrorMessage("Failed to connect to the server.");
      } finally {
        setIsLoading(false);
      }
    }

    void fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="space-y-6">
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : products.length === 0 && !errorMessage ? (
        <div className="rounded-lg border border-gray-200 p-8 text-center text-gray-500">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
