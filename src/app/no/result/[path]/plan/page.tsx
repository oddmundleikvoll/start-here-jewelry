'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import noPathsData from '@/data/no/paths.json'

const noPaths = (noPathsData as any).paths as any[]

const plans: Record<string, { title: string; description: string; tip: string }[]> = {
  beading: [
    { title: 'Dag 1', description: 'Kjøp de 6 must-have produktene fra handlelisten. Velg apatitt-perler hvis du er usikker.', tip: 'Sammenlign priser på Beadworks og Panduro — ofte 20–30 kr forskjell.' },
    { title: 'Dag 2', description: 'Sett opp arbeidsplassen: beading mat, tang, og en god lyskilde. Les deg opp på grunnleggende crimping på YouTube (2 videoer, maks 10 min).', tip: 'Følg «Beading for Beginners»-kanalen for engelsk, eller «Smykkedama» for norsk.' },
    { title: 'Dag 3', description: 'Øv på å træ perler uten wire først. Føl hvordan perlene ligger. Kjenn om hullstørrelsen matcher din nål/wire.', tip: 'Ta deg tid — hastverk gir dårlige smykker.' },
    { title: 'Dag 4', description: 'Lag ditt første armbånd. Start med 8–10 perler, fest med crimp beads, klem, og fest krok. Helhetlig tid: 20–30 min.', tip: 'Mål armbåndet mot håndleddet ditt før du klipper wire.' },
    { title: 'Dag 5', description: 'Sjekk om armbåndet holder. Bruk tandem-metoden (to crimps) hvis du er usikker på styrken.', tip: 'Hvis det er for løst, klem crimps en gang til.' },
    { title: 'Dag 6', description: 'Lag ditt første par øredobber. Velg 6–8 apatitt-perler per øredobb. Fest kroker med jump rings.', tip: 'Sjekk at jump rings er lukket skikkelig — dette er det vanligste feilpunktet.' },
    { title: 'Dag 7', description: 'Gi bort ditt første smykke, eller ta bilde og legg ut på Instagram med #nybegynnersmykker. Skriv «Jeg lagde dette» — responsen overrasker deg.', tip: 'Følg 3–5 kontoer som poster lignende innhold. Dette er din gratis læringskanal.' },
  ],
  'wire-wrapping': [
    { title: 'Dag 1', description: 'Kjøp base wire (2 ruller), rundtang, flattang, og en pakke med rå steiner. Unngå sølvtråd nå.', tip: 'Verktøystål-wire (base wire) er best for nybegynnere — den er stiv nok til å holde fasong men myk nok til å vikle.' },
    { title: 'Dag 2', description: 'Sett opp arbeidsplass. Les deg opp på grunnleggende wire wrapping på YouTube — søk «wire wrapping for beginners basics».', tip: 'Skap en Pinterest-board for inspirasjon. Samle 10 bilder av armbånd du liker.' },
    { title: 'Dag 3', description: 'Prøv basis-teknikken: klipp 30 cm wire, lag en loop i enden med rundtang, vikle 3–4 ganger, klipp overskudd, flat til med flattang.', tip: 'Øv 5 ganger før du starter på steinen.' },
    { title: 'Dag 4', description: 'Ta din første stein og prøv å vikle wire rundt den. Start med en rund eller oval stein — de er enklest. Bruk 45–60 cm wire.', tip: 'Hvis wire glir, bruk en dråpe grunnet lim på baksiden av steinen.' },
    { title: 'Dag 5', description: 'Fullfør ditt første wire-wrapped armbånd. Fest en jump ring i hver ende. Bruk kjedetang hvis du har det.', tip: 'Ikke vær for hard med tangen — små merker i wire er ikke feil, det er karakter.' },
    { title: 'Dag 6', description: 'Gjør armbåndet ferdig: klem alle ender, sjekk at det ikke er skarpe kanter, prøv det på.', tip: 'Kjør en fille over alle kanter — hvis det hekter, fil ned.' },
    { title: 'Dag 7', description: 'Ta bilde, last opp, og delta i et wire-wrapping forum. Spør erfarne om tilbakemelding på din teknikk. Dette er gull verdt.', tip: 'To YouTube-kanaler som er verdt å følge: "Vintores Jewelry" og "Yvonne M" for europeisk/skandinavisk stil.' },
  ],
  'silver-curious': [
    { title: 'Dag 1', description: 'Kjøp stempelverktøy-sett (med hammer og slagpute), ring-sylinder, og halvrundtang. Kjøp 15x15cm sterling silver plate fra en seriøs leverandør (sjekk norske Smykkedelen.no eller Hobby & Fritid).', tip: 'Kvalitet på silver plate varierer enormt. Kjøp ikke det billigste — sjekk at det er ekte 925 sterling.' },
    { title: 'Dag 2', description: 'Sett opp et dedikert arbeidsområde — sørg for godt lys og ventilasjon. Les om stempling på YouTube: «stamping sterling silver for beginners».', tip: 'Ha en magnet tilgjengelig for å sjekke at sølvet ikke er magnetisk (det skal det ikke være).' },
    { title: 'Dag 3', description: 'Prøv stempling på et papir først — de fleste bommer første gang. Test trykk og vinkel på sølvet før du slår hardt.', tip: 'Bruk en permanent markør til å merke opp teksten før du stempler —da ser du hvor bokstavene lander.' },
    { title: 'Dag 4', description: 'Klipp ut din første ringstrimmel fra silver plate: 5mm bred, 8cm lang. Bruk sagblader — gå sakte og la bladet gjøre jobben.', tip: 'Fil alle kanter grundig før du bøyer. Skarpe kanter = ubehag.' },
    { title: 'Dag 5', description: 'Bøy ringen rundt sylinderen. Bruk halvrundtang til å forme den rundt. Sett sammen endene — de skal møtes med 1mm mellomrom.', tip: 'Lodding kommer i neste runde. For nå holder du endene mot hverandre med fingrene.' },
    { title: 'Dag 6', description: 'Stempl et enkelt mønster eller en bokstav. Slå med ett solid slag — ikke «bank», det lager ujevne merker. Polér med fint sandpapir (400 grit).', tip: 'Polering: start med 400, deretter 600, deretter 800. Jo finere slip, jo mer glans.' },
    { title: 'Dag 7', description: 'Prøv ringen på. Sett den på sylinderen for å finjustere størrelsen. Hvis for stor, klem forsiktig med flattang. Skriv «Dag 7»-notat i en bok om hva du lærte.', tip: 'Du har akkurat laget din første sølvring. Dette er et skikkelig håndverk. Skryt av deg selv.' },
  ],
}

export default function NoPlanPage() {
  const searchParams = useSearchParams()
  const pathSlug = searchParams.get('path') || 'beading-starter'
  const path = noPaths.find(p => p.slug === pathSlug) || noPaths[0]
  const plan = plans[path.id] || plans.beading

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <Link href={`/no/result/${path.slug}`} className="text-charcoal/40 text-sm hover:text-charcoal transition-colors">
          ← Tilbake til resultat
        </Link>
        <Link href={`/result/${path.slug}/plan`} className="text-sm text-charcoal/40 hover:text-charcoal transition-colors">
          NO | <span className="font-medium text-charcoal">EN</span>
        </Link>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-2">
          7-dagers plan
        </h1>
        <p className="text-charcoal/60">{path.title}</p>
      </div>

      <div className="space-y-5">
        {plan.map((day, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose text-white flex items-center justify-center font-bold text-lg">
              {i + 1}
            </div>
            <div className="flex-1 bg-white rounded-2xl p-5 border border-charcoal/5">
              <h3 className="font-serif font-bold text-charcoal mb-1">{day.title}</h3>
              <p className="text-charcoal/70 text-sm leading-relaxed mb-3">{day.description}</p>
              <div className="text-xs text-sage font-medium bg-sage/10 rounded-lg px-3 py-2">
                💡 {day.tip}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/no/quiz"
          className="text-charcoal/40 text-sm hover:text-charcoal transition-colors"
        >
          Ta quizen igjen
        </Link>
      </div>
    </main>
  )
}
