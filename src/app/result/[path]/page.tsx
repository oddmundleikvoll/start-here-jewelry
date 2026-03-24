'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import pathsData from '@/data/paths.json'
import { getProductsForPath, estimateCost } from '@/lib/engine'

const paths = (pathsData as any).paths as any[]

export default function ResultPage() {
  const searchParams = useSearchParams()
  const pathSlug = searchParams.get('path') || 'beading-starter'
  const path = paths.find(p => p.slug === pathSlug) || paths[0]
  const { mustHave, niceToHave, avoid } = getProductsForPath(path.id)
  const cost = estimateCost(path.id)

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
      // GA4: email capture success
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'email_capture', {
          event_category: 'conversion',
          path_slug: params.path,
        })
      }
    } catch {
      setError('Kunne ikke koble til. Prøv igjen.')
    } finally {
      setLoading(false)
    }
  }

  const pathImages: Record<string, string> = {
    beading: '/images/beading.jpg',
    'wire-wrapping': '/images/wire-wrapping.jpg',
    'silver-curious': '/images/silver-curious.jpg',
  }

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-12">
      {/* Back link */}
      <Link href="/" className="text-charcoal/40 text-sm hover:text-charcoal transition-colors mb-6 inline-block">
        ← Tilbake
      </Link>

      {/* Hero with image */}
      <div className="mb-12">
        <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-8">
          <img
            src={pathImages[path.id] || '/images/beading.jpg'}
            alt={path.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent flex items-end">
            <div className="p-8 w-full">
              <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full mb-3 backdrop-blur-sm">
                Ditt startspor
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                {path.title}
              </h1>
              <p className="text-white/80">{path.tagline}</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose/10 text-rose rounded-full text-sm">
            Estimert startkostnad: <strong>{cost}</strong>
          </div>
        </div>
      </div>

      {/* Why this path */}
      <div className="bg-white rounded-2xl p-8 mb-8 border border-charcoal/5">
        <h2 className="font-serif font-bold text-charcoal mb-3 text-lg">Hvorfor dette sporet?</h2>
        <p className="text-charcoal/70 leading-relaxed">{path.why_this_path}</p>
      </div>

      {/* First project */}
      <div className="bg-rose/5 rounded-2xl p-8 mb-8">
        <h2 className="font-serif font-bold text-charcoal mb-2 text-lg">Første prosjekt</h2>
        <div className="text-xl font-medium text-rose mb-2">{path.first_project}</div>
        <div className="text-charcoal/60 text-sm">Forventet tid: {path.est_time_first_project}</div>
        <div className="mt-3 text-charcoal/70 text-sm">{path.result_type}</div>
      </div>

      {/* Must have */}
      <div className="mb-8">
        <h2 className="font-serif font-bold text-charcoal mb-4 text-lg">Kjøp disse først</h2>
        <div className="space-y-3">
          {mustHave.map(p => (
            <div key={p.id} className="flex items-start justify-between bg-white rounded-xl px-5 py-4 border border-charcoal/5">
              <div>
                <div className="font-medium text-charcoal">{p.name}</div>
                <div className="text-sm text-charcoal/60 mt-0.5">{p.why}</div>
              </div>
              <div className="text-rose font-medium text-sm whitespace-nowrap ml-4">{p.price_nok} kr</div>
            </div>
          ))}
        </div>
      </div>

      {/* Nice to have */}
      {niceToHave.length > 0 && (
        <div className="mb-8">
          <h2 className="font-serif font-bold text-charcoal mb-4 text-lg">Fint å ha (kan vente)</h2>
          <div className="space-y-3">
            {niceToHave.map(p => (
              <div key={p.id} className="flex items-start justify-between bg-white rounded-xl px-5 py-4 border border-charcoal/5">
                <div>
                  <div className="font-medium text-charcoal">{p.name}</div>
                  <div className="text-sm text-charcoal/60 mt-0.5">{p.why}</div>
                </div>
                <div className="text-charcoal/40 text-sm whitespace-nowrap ml-4">{p.price_nok} kr</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Avoid */}
      {avoid.length > 0 && (
        <div className="mb-8">
          <h2 className="font-serif font-bold text-charcoal mb-4 text-lg">Ikke kjøp dette ennå</h2>
          <div className="space-y-3">
            {avoid.map(p => (
              <div key={p.id} className="flex items-start justify-between bg-red-50 rounded-xl px-5 py-4 border border-red-100">
                <div>
                  <div className="font-medium text-charcoal">{p.name}</div>
                  <div className="text-sm text-red-600/80 mt-0.5">{p.why}</div>
                </div>
                <div className="text-red-400 text-sm whitespace-nowrap ml-4">{p.price_nok} kr</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Email capture */}
      {!alreadySubscribed && !submitted && (
        <div className="bg-sage/10 rounded-2xl p-8 mb-8 text-center">
          <h3 className="font-serif font-bold text-charcoal text-xl mb-2">
            Få 5 tips til ditt første smykkeprosjekt
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
        <div className="bg-sage/20 rounded-2xl p-8 mb-8 text-center">
          <p className="text-sage font-medium text-lg">✓ Sjekk innboksen din!</p>
          <p className="text-charcoal/60 text-sm mt-1">5 tips er på vei til deg.</p>
        </div>
      )}

      {/* 7-day plan CTA */}
      <div className="text-center mb-12">
        <Link
          href={`/result/${path.slug}/plan`}
          className="inline-block px-8 py-4 bg-rose text-white font-medium rounded-xl hover:bg-rose/90 transition-colors"
        >
          Se 7-dagers planen →
        </Link>
      </div>

      {/* Restart */}
      <div className="text-center">
        <Link href="/quiz" className="text-charcoal/40 text-sm hover:text-charcoal transition-colors">
          Ta quizen på nytt
        </Link>
      </div>
    </main>
  )
}
