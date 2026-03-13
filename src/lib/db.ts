import { config } from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  config({ override: true })
}

export async function register() {
  // This runs when the Next.js server starts
}
