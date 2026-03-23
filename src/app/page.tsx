import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="w-full px-6 py-5 flex items-center justify-between max-w-5xl mx-auto">
        <div className="text-xl font-serif font-bold text-rose">Start Here Jewelry</div>
        <nav className="flex gap-4 text-sm">
          <Link href="/quiz" className="text-charcoal hover:text-rose transition-colors">Ta quizen</Link>
        </nav>
      </header>

      <section className="flex-1 px-6 py-12 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col justify-center">
            <div className="inline-block px-3 py-1 bg-rose/10 text-rose text-xs font-medium rounded-full mb-4">
              For nybegynnere i smykkelaging
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal leading-tight mb-4">
              Finn den riktige måten<br />å starte smykkelaging på
            </h1>
            <p className="text-lg text-charcoal/70 mb-8 leading-relaxed">
              På 1 minutt får du første prosjekt, handleliste og 7-dagers plan — skreddersydd for ditt budsjett og mål.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/quiz"
                className="px-8 py-4 bg-rose text-white font-medium rounded-xl hover:bg-rose/90 transition-colors text-center"
              >
                Start gratis quiz →
              </Link>
              <Link
                href="/example"
                className="px-8 py-4 border border-charcoal/20 text-charcoal font-medium rounded-xl hover:bg-charcoal/5 transition-colors text-center"
              >
                Se et eksempel
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <img src="/images/beading.jpg" alt="Beading" className="aspect-square object-cover rounded-xl" />
            <img src="/images/wire-wrapping.jpg" alt="Wire Wrapping" className="aspect-square object-cover rounded-xl translate-y-4" />
            <img src="/images/silver-curious.jpg" alt="Silver" className="aspect-square object-cover rounded-xl" />
          </div>
        </div>
      </section>

      <section className="px-6 py-10 border-t border-charcoal/10">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-charcoal/50">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sage"></span>3 startspor</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sage"></span>Konkrete handlelister</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sage"></span>7-dagers plan</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sage"></span>Helt gratis</div>
        </div>
      </section>
    </main>
  )
}
