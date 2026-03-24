'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getPaths } from '@/lib/engine'

export default function EnHomePage() {
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
        setError(data.error ?? 'Something went wrong.')
        return
      }
      localStorage.setItem('jewelry-subscribed', 'true')
      setSubmitted(true)
    } catch {
      setError('Could not connect. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <header className="text-center mb-16">
        <div className="flex justify-end mb-4">
          <Link href="/" className="text-sm text-charcoal/40 hover:text-charcoal transition-colors">
            NO | <span className="font-medium text-charcoal">EN</span>
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-4">
          Start with jewelry making
        </h1>
        <p className="text-lg text-amber-700 max-w-xl mx-auto">
          Choose your path into the jewelry world. We'll show you what you need, step by step.
        </p>
        <div className="mt-8">
          <Link
            href="/en/quiz"
            className="inline-block px-8 py-4 bg-rose text-white font-medium rounded-xl hover:bg-rose/90 transition-colors"
          >
            Get a recommendation →
          </Link>
        </div>
      </header>

      {/* Email capture */}
      {!alreadySubscribed && !submitted && (
        <div className="bg-sage/10 rounded-2xl p-8 mb-12 text-center">
          <h3 className="font-serif font-bold text-charcoal text-xl mb-2">
            Get 5 tips for your first jewelry project in your inbox
          </h3>
          <p className="text-charcoal/60 text-sm mb-6">
            Written by someone who's made the same mistakes as you.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl border border-charcoal/15 text-charcoal text-sm focus:outline-none focus:border-rose"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-rose text-white font-medium rounded-xl hover:bg-rose/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending…' : 'Yes please!'}
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>
      )}

      {submitted && (
        <div className="bg-sage/20 rounded-2xl p-8 mb-12 text-center">
          <p className="text-sage font-medium text-lg">✓ Check your inbox!</p>
          <p className="text-charcoal/60 text-sm mt-1">5 tips are on their way.</p>
        </div>
      )}

      <section className="grid md:grid-cols-3 gap-8">
        {paths.map((path) => (
          <Link
            key={path.id}
            href={`/en/result/${path.slug}`}
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
          Not sure what fits you?{' '}
          <Link href="/en/quiz" className="text-rose font-medium hover:underline">
            Take the quiz →
          </Link>
        </p>
        <p className="text-amber-700 text-sm mt-3">
          <Link href="/blog" className="text-rose font-medium hover:underline">
            Read the blog →
          </Link>
        </p>
      </section>
    </main>
  )
}
