import Link from "next/link";
import { getPaths } from "@/lib/engine";

export default function HomePage() {
  const paths = getPaths();

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-4">
          Start med smykkemaking
        </h1>
        <p className="text-lg text-amber-700 max-w-xl mx-auto">
          Velg din vei inn i smykkeverdenen. Vi viser deg hva du trenger, steg
          for steg.
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-8">
        {paths.map((path) => (
          <Link
            key={path.id}
            href={`/result/${path.id}`}
            className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-cream-200"
          >
            <div className="aspect-[4/3] relative bg-cream-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={path.image}
                alt={path.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-serif font-semibold text-amber-900 mb-2">
                {path.title}
              </h2>
              <p className="text-amber-700 text-sm">{path.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
