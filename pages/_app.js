import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen">
      <header className="p-4">
        <div className="flex items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="#E31837"/>
            <path d="M20 8C20 8 12 16 12 22C12 26.4183 15.5817 30 20 30C24.4183 30 28 26.4183 28 22C28 16 20 8 20 8Z" fill="white"/>
          </svg>
          <span className="text-2xl font-bold text-gray-900">
            <span className="text-red-600">Life</span>blood
          </span>
        </div>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <Analytics />
    </div>
  )
}
