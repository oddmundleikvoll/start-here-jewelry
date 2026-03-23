'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getPaths } from '@/lib/engine'

export default function HomePage() {
  const paths = getPaths()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)

  useEffect(() => {
    const sub = localStorage.getItem('jewelry-subscribed')
    if (sub === 'true') setAlreadySubscribed(true)
  }, [])

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Noe gikk galt.')
        return
      }
      localStorage.setItem('jewelry-subscribed', 'true')
      setSubmitted(true)
    } catch {
      setError('Kunne ikke koble til. Prøv igjen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-4">
          Start med smykkemaking
        </h1>
        <p className="text-lg text-amber-700 max-w-xl mx-auto">
          Velg din vei inn i smykkeverdenen. Vi viser deg hva du trenger, steg for steg.
        </p>
        <div className="mt-8">
          <Link
            href="/quiz"
            className="inline-block px-8 py-4 bg-rose text-white font-medium rounded-xl hover:bg-rose/90 transition-colors"
          >
            Få en anbefaling →
          </Link>
        </div>
      </header>

      {/* Email capture */}
      {!alreadySubscribed && !submitted && (
        <div className="bg-sage/10 rounded-2xl p-8 mb-12 text-center">
          <h3 className="font-serif font-bold text-charcoal text-xl mb-2">
            Få 5 tips til ditt første smykkeprosjekt rett i innboksen
          </h3>
          <p className="text-charcoal/60 text-sm mb-6">
            Skrevet av noen som har laget samme feilene som deg.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="din@epost.no"
              required
              className="flex-1 px-4 py-3 rounded-xl border border-charcoal/15 text-charcoal text-sm focus:outline-none focus:border-rose"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-rose text-white font-medium rounded-xl hover:bg-rose/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Sender…' : 'Ja takk!'}
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>
      )}

      {submitted && (
        <div className="bg-sage/20 rounded-2xl p-8 mb-12 text-center">
          <p className="text-sage font-medium text-lg">✓ Sjekk innboksen din!</p>
          <p className="text-charcoal/60 text-sm mt-1">5 tips er på vei til deg.</p>
        </div>
      )}

      <section className="grid md:grid-cols-3 gap-8">
        {paths.map((path) => (
          <Link
            key={path.id}
            href={`/result/${path.slug}`}
            className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-cream-200"
          >
            <div className="aspect-[4/3] relative bg-cream-100">
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

      <section className="mt-16 text-center">
        <p className="text-amber-700 text-sm">
          Usikker på hva som passer deg?{' '}
          <Link href="/quiz" className="text-rose font-medium hover:underline">
            Ta quizen →
          </Link>
        </p>
      </section>
    </main>
  )
}
