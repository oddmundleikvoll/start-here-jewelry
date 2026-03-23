'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import pathsData from '@/data/paths.json'
import stepsData from '@/data/steps.json'
import { Answers, recommendPath } from '@/lib/engine'

const paths = (pathsData as any).paths as any[]
const steps = (stepsData as any).steps as any[]

export default function QuizPage() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Partial<Answers>>({})
  const router = useRouter()

  const step = steps[current]
  const isLast = current === steps.length - 1

  function select(value: string) {
    const newAnswers = { ...answers, [step.id]: value }
    setAnswers(newAnswers)

    if (isLast) {
      const pathId = recommendPath(newAnswers as Answers)
      const matchingPath = paths.find(p => p.id === pathId)
      if (matchingPath) {
        router.push(`/result/${matchingPath.slug}?path=${matchingPath.slug}`)
      }
    } else {
      setCurrent(c => c + 1)
    }
  }

  const progress = (current / steps.length) * 100

  return (
    <main className="min-h-screen flex flex-col px-6 py-10 max-w-xl mx-auto">
      <div className="mb-10">
        <div className="text-sm text-rose font-medium mb-2">Spørsmål {current + 1} av {steps.length}</div>
        <div className="w-full h-1 bg-charcoal/10 rounded-full">
          <div className="h-1 bg-rose rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-3 leading-snug">
          {step.question}
        </h1>
        <p className="text-charcoal/60 text-lg mb-10">{step.subtitle}</p>

        <div className="space-y-3">
          {step.options.map((opt: any) => (
            <button
              key={opt.value}
              onClick={() => select(opt.value)}
              className="w-full text-left px-6 py-5 rounded-xl border-2 border-charcoal/15 hover:border-rose hover:bg-rose/5 transition-all group"
            >
              <div className="font-medium text-charcoal group-hover:text-rose transition-colors">{opt.label}</div>
              <div className="text-sm text-charcoal/50 mt-0.5">{opt.description}</div>
            </button>
          ))}
        </div>
      </div>

      {current > 0 && (
        <button
          onClick={() => setCurrent(c => c - 1)}
          className="mt-10 text-charcoal/40 text-sm hover:text-charcoal transition-colors"
        >
          ← Tilbake
        </button>
      )}
    </main>
  )
}
