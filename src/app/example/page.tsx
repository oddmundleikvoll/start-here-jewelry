import Link from 'next/link'
import pathsData from '@/data/paths.json'

const paths = pathsData.paths as any[]

export const dynamic = 'force-static'

export default function ExamplePage() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <Link href="/" className="text-charcoal/40 text-sm hover:text-charcoal transition-colors">
          ← Tilbake
        </Link>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-3">
          Slik ser resultatet ut
        </h1>
        <p className="text-charcoal/60">Alle tre startsporene</p>
      </div>

      {/* Image grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="rounded-2xl overflow-hidden">
          <img src="/images/beading.jpg" alt="Beading" className="w-full aspect-square object-cover" />
          <div className="p-4 bg-white">
            <div className="font-serif font-bold text-charcoal">Beading Starter</div>
            <div className="text-xs text-charcoal/60 mt-1">Enkelt, raskt, rimelig</div>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden">
          <img src="/images/wire-wrapping.jpg" alt="Wire Wrapping" className="w-full aspect-square object-cover" />
          <div className="p-4 bg-white">
            <div className="font-serif font-bold text-charcoal">Wire Wrapping Starter</div>
            <div className="text-xs text-charcoal/60 mt-1">Craft feel, håndverk</div>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden">
          <img src="/images/silver-curious.jpg" alt="Silver" className="w-full aspect-square object-cover" />
          <div className="p-4 bg-white">
            <div className="font-serif font-bold text-charcoal">Silver-Curious Starter</div>
            <div className="text-xs text-charcoal/60 mt-1">Ekte sølv, langsiktig</div>
          </div>
        </div>
      </div>

      {/* Example result */}
      <div className="space-y-6">
        <div className="bg-sage/10 rounded-2xl p-6 text-center">
          <div className="text-xs text-sage font-medium mb-2">DITT STARTSPOR</div>
          <h2 className="text-2xl font-serif font-bold text-charcoal">Wire Wrapping Starter</h2>
          <p className="text-charcoal/70 mt-1">Mer «craft feel», fortsatt hjemmevennlig</p>
        </div>

        <div className="bg-rose/5 rounded-2xl p-6">
          <h3 className="font-serif font-bold text-charcoal mb-2">Første prosjekt</h3>
          <p className="text-rose font-medium">Wire-wrapped steinarmbånd</p>
          <p className="text-charcoal/60 text-sm mt-1">Est. tid: 1–2 timer · Et armbånd med en unik stein du selv har viklet</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif font-bold text-charcoal">Kjøp disse først</h3>
          {[
            { name: 'Verktøystål-wire 0.8mm', price: '149–249 kr', why: 'Hovedmaterialet.' },
            { name: 'Rundtang', price: '199–299 kr', why: 'Lager øyene.' },
            { name: 'Flattang (smal)', price: '199–299 kr', why: 'For å vikle og justere.' },
            { name: 'Rå stein pakke (mixed)', price: '99–199 kr', why: 'Sentrum av prosjektet.' },
          ].map(item => (
            <div key={item.name} className="flex justify-between bg-white rounded-xl px-5 py-4 border border-charcoal/5">
              <div>
                <div className="font-medium text-charcoal">{item.name}</div>
                <div className="text-sm text-charcoal/60">{item.why}</div>
              </div>
              <div className="text-rose font-medium text-sm">{item.price}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="font-serif font-bold text-charcoal">Ikke kjøp dette ennå</h3>
          {[
            { name: 'Sterling silver wire', price: '499+ kr', why: 'For dyrt i starten. Lær med kopper først.' },
            { name: 'Fleksibel aksel', price: '499+ kr', why: 'Ikke nødvendig for de første 10 prosjektene.' },
          ].map(item => (
            <div key={item.name} className="flex justify-between bg-red-50 rounded-xl px-5 py-4 border border-red-100">
              <div>
                <div className="font-medium text-charcoal">{item.name}</div>
                <div className="text-sm text-red-600/80">{item.why}</div>
              </div>
              <div className="text-red-400 text-sm">{item.price}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/quiz" className="inline-block px-8 py-4 bg-rose text-white font-medium rounded-xl hover:bg-rose/90 transition-colors">
            Ta quizen og få ditt spor →
          </Link>
        </div>
      </div>
    </main>
  )
}
