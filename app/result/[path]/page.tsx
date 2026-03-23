"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPathById, generateShoppingList, getStepsByPathId } from "@/lib/engine";

interface PageProps {
  params: Promise<{ path: string }>;
}

export default function ResultPage({ params }: PageProps) {
  const [pathId, setPathId] = useState<string>("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  useEffect(() => {
    params.then((p) => setPathId(p.path));
  }, [params]);

  useEffect(() => {
    const subscribed = localStorage.getItem("jewelry-subscribed");
    if (subscribed === "true") setAlreadySubscribed(true);
  }, []);

  const path = pathId ? getPathById(pathId) : null;
  const products = pathId ? generateShoppingList(pathId) : [];
  const steps = pathId ? getStepsByPathId(pathId) : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Noe gikk galt.");
        return;
      }

      localStorage.setItem("jewelry-subscribed", "true");
      setSubmitted(true);
    } catch {
      setError("Kunne ikke koble til serveren. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  }

  if (!path) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-serif text-amber-900">Laster…</h1>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/" className="text-sm text-amber-600 hover:text-amber-800 mb-6 inline-block">
        ← Tilbake til forsiden
      </Link>

      {/* Header */}
      <header className="mb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={path.image}
          alt={path.title}
          className="w-full h-56 object-cover rounded-2xl mb-6"
        />
        <h1 className="text-3xl font-serif font-bold text-amber-900 mb-2">
          {path.title}
        </h1>
        <p className="text-amber-700 text-lg">{path.description}</p>
      </header>

      {/* Steps */}
      <section className="mb-10">
        <h2 className="text-xl font-serif font-semibold text-amber-900 mb-4">
          Slik kommer du i gang
        </h2>
        <ol className="space-y-3">
          {steps.map((step) => (
            <li key={step.order} className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-sm font-bold">
                {step.order}
              </span>
              <div>
                <strong className="text-amber-900">{step.title}</strong>
                <p className="text-amber-700 text-sm">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Shopping list */}
      <section className="mb-10">
        <h2 className="text-xl font-serif font-semibold text-amber-900 mb-4">
          Handleliste
        </h2>
        <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-cream-100 border-b border-cream-200">
                <th className="text-left px-4 py-3 font-semibold text-amber-900">Produkt</th>
                <th className="text-right px-4 py-3 font-semibold text-amber-900">Pris</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr
                  key={product.id}
                  className={`border-b border-cream-100 last:border-0 ${
                    i % 2 === 0 ? "bg-white" : "bg-cream-50"
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-amber-900">{product.name}</span>
                    <br />
                    <span className="text-amber-600 text-xs">{product.description}</span>
                  </td>
                  <td className="px-4 py-3 text-right text-amber-800 font-medium">
                    {product.price} kr
                  </td>
                </tr>
              ))}
              <tr className="bg-cream-100 font-semibold">
                <td className="px-4 py-3 text-amber-900">Totalt</td>
                <td className="px-4 py-3 text-right text-amber-900">
                  {products.reduce((sum, p) => sum + p.price, 0)} kr
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Email capture */}
      {!alreadySubscribed && !submitted && (
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mt-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="flex-1">
              <h3 className="font-serif font-semibold text-amber-900 text-lg mb-1">
                Få 5 tips til ditt første smykkeprosjekt rett i innboksen
              </h3>
              <p className="text-amber-700 text-sm">
                Vi sender deg de beste nybegynnertipsene rett til din e-postadresse.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2 min-w-0 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@epost.no"
                required
                className="flex-1 md:flex-none md:w-56 px-4 py-2.5 rounded-xl border border-amber-300 bg-white text-amber-900 placeholder-amber-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
              >
                {loading ? "Sender…" : "Meld deg på"}
              </button>
            </form>
          </div>
          {error && (
            <p className="mt-3 text-red-600 text-sm">{error}</p>
          )}
        </section>
      )}

      {submitted && (
        <section className="bg-green-50 border border-green-200 rounded-2xl p-6 mt-8">
          <p className="text-green-800 font-medium">
            ✓ Du er påmeldt! Sjekk innboksen din for 5 tips til ditt første smykkeprosjekt.
          </p>
        </section>
      )}
    </main>
  );
}
