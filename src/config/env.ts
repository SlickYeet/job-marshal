export const env = {
  dataaseUrl: process.env.DATABASE_URL!,
  oauth: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    },
    github: {
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    },
  },
  uploadthing: {
    token: process.env.UPLOADTHING_TOKEN!,
  },
  arcjet: {
    key: process.env.ARCJET_KEY!,
  },
}
