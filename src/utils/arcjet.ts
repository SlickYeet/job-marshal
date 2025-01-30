import arcjet, {
  detectBot,
  fixedWindow,
  shield,
  tokenBucket,
} from "@arcjet/next"

import { env } from "@/config/env"

export { detectBot, fixedWindow, shield, tokenBucket }

export default arcjet({
  key: env.arcjet.key,
  rules: [],
})
