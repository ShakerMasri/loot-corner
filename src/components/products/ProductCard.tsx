import Link from "next/link";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    stock: number;
    images: string[];
    category: {
      id: string;
      name: string;
      slug: string;
    };
  };
};

function formatPrice(price: string) {
  return `$${Number(price).toFixed(2)}`;
}

export function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images.at(0);
  const isOutOfStock = product.stock <= 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 transition hover:shadow-md"
    >
      <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
        {mainImage ? (
          <img
            src={mainImage}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No image
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs tracking-wide text-gray-500 uppercase">
          {product.category.name}
        </p>

        <h3 className="font-semibold text-gray-900">{product.name}</h3>

        <p className="text-sm text-gray-700">{formatPrice(product.price)}</p>

        {isOutOfStock ? (
          <span className="inline-block rounded bg-red-100 px-2 py-1 text-xs text-red-700">
            Out of stock
          </span>
        ) : (
          <span className="inline-block rounded bg-green-100 px-2 py-1 text-xs text-green-700">
            In stock: {product.stock}
          </span>
        )}
      </div>
    </Link>
  );
}
