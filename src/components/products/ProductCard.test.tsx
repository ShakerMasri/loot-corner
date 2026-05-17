import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import type { ReactNode } from "react";

// Mock Next.js Link to avoid routing issues in tests
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("ProductCard", () => {
  const mockProduct = {
    id: "1",
    name: "Test Product",
    price: "99.99",
    slug: "test-product",
    stock: 10,
    images: ["test.jpg"],
    category: {
      id: "cat-1",
      name: "Test Category",
      slug: "test-category",
    },
  };

  const mockLabels = {
    noImage: "No Image",
    featured: "Featured",
    soldOut: "Sold Out",
    out: "Out",
    left: "left",
  };

  it("renders product name", () => {
    render(<ProductCard product={mockProduct} labels={mockLabels} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("renders product price", () => {
    render(<ProductCard product={mockProduct} labels={mockLabels} />);
    expect(screen.getByText(/99.99/)).toBeInTheDocument();
  });

  it("renders category name", () => {
    render(<ProductCard product={mockProduct} labels={mockLabels} />);
    expect(screen.getByText("Test Category")).toBeInTheDocument();
  });
});
