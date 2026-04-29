type Category = {
  id: string;
  name: string;
  slug: string;
};

type CategoryTabsProps = {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
};

export function CategoryTabs({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onCategoryChange(null)}
        className={`rounded-full border px-4 py-2 text-sm ${
          selectedCategory === null
            ? "bg-black text-white"
            : "bg-white text-black hover:bg-gray-100"
        }`}
      >
        All
      </button>

      {categories.map((category) => {
        const isActive = selectedCategory === category.slug;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.slug)}
            className={`rounded-full border px-4 py-2 text-sm ${
              isActive
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
