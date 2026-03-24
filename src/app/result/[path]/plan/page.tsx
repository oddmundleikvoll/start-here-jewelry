'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import enPathsData from '@/data/english/paths.json'

const enPaths = (enPathsData as any).paths as any[]

const enPlans: Record<string, { title: string; description: string; tip: string }[]> = {
  beading: [
    { title: "Day 1", description: "Buy the 6 must-have products from the shopping list. Choose apatite beads if unsure.", tip: "Compare prices on Beadworks and Panduro \u2014 often 20\u201330 kr difference." },
    { title: "Day 2", description: "Set up your workspace: beading mat, pliers, and good lighting. Learn the basics of crimping on YouTube (2 videos, max 10 min).", tip: "Follow \u201cBeading for Beginners\u201d channel for English content." },
    { title: "Day 3", description: "Practice threading beads without wire first. Feel how the beads lie. Check if hole size matches your needle/wire.", tip: "Take your time \u2014 rushing makes bad jewelry." },
    { title: "Day 4", description: "Make your first bracelet. Start with 8\u201310 beads, attach with crimp beads, crimp, and attach clasp. Total time: 20\u201330 min.", tip: "Measure the bracelet against your wrist before cutting wire." },
    { title: "Day 5", description: "Check if the bracelet holds. Use the tandem method (two crimps) if unsure about strength.", tip: "If too loose, crimp the crimps again." },
    { title: "Day 6", description: "Make your first pair of earrings. Choose 6\u20138 apatite beads per earring. Attach hooks with jump rings.", tip: "Check that jump rings are properly closed \u2014 this is the most common failure point." },
    { title: "Day 7", description: "Give away your first piece of jewelry, or take a photo and post on Instagram with #beginnerjewelry. Write \u201cI made this\u201d \u2014 the response will surprise you.", tip: "Follow 3\u20135 accounts posting similar content. This is your free learning channel." },
  ],
  "wire-wrapping": [
    { title: "Day 1", description: "Buy base wire (2 rolls), round-nose pliers, flat-nose pliers, and a pack of raw stones. Avoid silver wire for now.", tip: "Base wire (craft wire) is best for beginners \u2014 stiff enough to hold shape but soft enough to wrap." },
    { title: "Day 2", description: "Set up your workspace. Learn the basics of wire wrapping on YouTube \u2014 search \u201cwire wrapping for beginners basics\u201d.", tip: "Create a Pinterest board for inspiration. Collect 10 images of bracelets you like." },
    { title: "Day 3", description: "Practice the basic technique: cut 30 cm wire, make a loop at the end with round-nose pliers, wrap 3\u20134 times, cut excess, flatten with flat-nose pliers.", tip: "Practice 5 times before starting on the stone." },
    { title: "Day 4", description: "Take your first stone and try wrapping wire around it. Start with a round or oval stone \u2014 they\u2019re easiest. Use 45\u201360 cm wire.", tip: "If wire slips, use a drop of craft glue on the back of the stone." },
    { title: "Day 5", description: "Complete your first wire-wrapped bracelet. Attach a jump ring at each end. Use chain-nose pliers if you have them.", tip: "Don\u2019t be too hard with the pliers \u2014 small marks in wire aren\u2019t mistakes, they\u2019re character." },
    { title: "Day 6", description: "Finish the bracelet: crimp all ends, check for sharp edges, try it on.", tip: "Run a cloth over all edges \u2014 if it catches, file it down." },
    { title: "Day 7", description: "Take a photo, upload it, and participate in a wire-wrapping forum. Ask experienced makers for feedback on your technique. This is worth its weight in gold.", tip: "Two YouTube channels worth following: \u201cVintores Jewelry\u201d and \u201cYvonne M\u201d for European/Scandinavian style." },
  ],
  "silver-curious": [
    { title: "Day 1", description: "Buy a stamping tool set (with hammer and striking pad), ring mandrel, and half-round pliers. Buy 15\u00d715cm sterling silver sheet from a reputable supplier.", tip: "Sterling silver sheet quality varies enormously. Don\u2019t buy the cheapest \u2014 check that it\u2019s genuine 925 sterling." },
    { title: "Day 2", description: "Set up a dedicated workspace \u2014 ensure good lighting and ventilation. Learn about stamping on YouTube: \u201cstamping sterling silver for beginners\u201d.", tip: "Have a magnet available to check that the silver isn\u2019t magnetic (it shouldn\u2019t be)." },
    { title: "Day 3", description: "Practice stamping on paper first \u2014 most people miss the first time. Test pressure and angle on the silver before striking hard.", tip: "Use a permanent marker to mark the text before stamping \u2014 then you can see where the letters will land." },
    { title: "Day 4", description: "Cut out your first ring strip from silver sheet: 5mm wide, 8cm long. Use saw blades \u2014 go slowly and let the blade do the job.", tip: "File all edges thoroughly before bending. Sharp edges = discomfort." },
    { title: "Day 5", description: "Bend the ring around the mandrel. Use half-round pliers to shape it round. Bring the ends together \u2014 they should meet with 1mm gap.", tip: "Soldering comes next round. For now, hold the ends together with your fingers." },
    { title: "Day 6", description: "Stamp a simple pattern or letter. Strike with one solid blow \u2014 don\u2019t \u201chammer\u201d, it creates uneven marks. Polish with fine sandpaper (400 grit).", tip: "Polishing: start with 400, then 600, then 800. The finer the sandpaper, the more shine." },
    { title: "Day 7", description: "Try the ring on. Place it on the mandrel to fine-tune the size. If too big, gently squeeze with flat-nose pliers. Write \u201cDay 7\u201d note in a journal about what you learned.", tip: "You just made your first silver ring. This is real craftsmanship. Be proud of yourself." },
  ],
}

export default function EnPlanPage() {
  const searchParams = useSearchParams()
  const pathSlug = searchParams.get("path") || "beading-starter"
  const path = enPaths.find(p => p.slug === pathSlug) || enPaths[0]
  const plan = enPlans[path.id] || enPlans.beading

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <Link href={`/result/${path.slug}`} className="text-charcoal/40 text-sm hover:text-charcoal transition-colors">
          ← Back to result
        </Link>
        <Link href={`/no/result/${path.slug}/plan`} className="text-sm text-charcoal/40 hover:text-charcoal transition-colors">
          <span className="font-medium text-charcoal">EN</span> | NO
        </Link>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-2">
          7-day plan
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
                \ud83d\udca1 {day.tip}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/quiz"
          className="text-charcoal/40 text-sm hover:text-charcoal transition-colors"
        >
          Take the quiz again
        </Link>
      </div>
    </main>
  )
}
