import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Start Here Jewelry | Finn riktig måte å starte smykkelaging på',
  description: 'På 1 minutt får du første prosjekt, handleliste og 7-dagers plan for smykkelaging hjemme. Gratis quiz for nybegynnere.',
  keywords: 'smykkelaging, jewelry making, nybegynner, startpakke, beading, wire wrapping',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body className="bg-cream text-charcoal antialiased">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZRB5874HT5"
          strategy="afterInteractive"
        />
        <Script id="ga4-setup" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZRB5874HT5');
          `}
        </Script>
      </body>
    </html>
  )
}
