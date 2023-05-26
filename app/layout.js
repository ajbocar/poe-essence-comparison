import './pico.min.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Path of Exile High Essence Conversion Helper',
  description: 'Helps a player determine if converting from Shrieking to Deafening will give more value when selling your essences.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
