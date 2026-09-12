import Link from "next/link";
import { getActiveCategories } from "../../lib/media";

export default function CategoryNavigation() {
  const categories = getActiveCategories();

  if (!categories || categories.length === 0) return null;

  return (
    <section className="mt-12 px-margin-mobile md:px-margin-desktop mb-24">
      <div className="flex items-center gap-3 mb-10">
        <span className="w-1 h-8 bg-[#c1121f] rounded-full"></span>
        <h2 className="type-heading-xl text-white">
          Browse Categories
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/media/category/${cat.slug}`}
            className="group relative flex flex-col items-center justify-center p-6 bg-[#1a1a1a]/50 rounded-xl border border-white/5 hover:border-[#c1121f]/50 hover:bg-[#1a1a1a] transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_15px_rgba(193,18,31,0.2)]"
          >
            <h3 className="type-heading-md text-center text-white group-hover:text-[#c1121f] transition-colors mb-2">
              {cat.label}
            </h3>
            {cat.description && (
              <p className="type-body-sm text-[#e2e2e2]/60 text-center line-clamp-2">
                {cat.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
