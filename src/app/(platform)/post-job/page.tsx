import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { CreateJobForm } from "./_components/create-job-form"

import ArcJetLogo from "../../../../public/arcjet.jpg"
import DiscordLogo from "../../../../public/discord.png"
import EALogo from "../../../../public/ea.png"
import HHNLogo from "../../../../public/hhn.png"
import InngestLogo from "../../../../public/inngest.png"
import SpotifyLogo from "../../../../public/spotify.png"

const COMPANIES = [
  { id: 0, name: "ArcJet", logo: ArcJetLogo },
  { id: 1, name: "Inngest", logo: InngestLogo },
  { id: 2, name: "Discord", logo: DiscordLogo },
  { id: 3, name: "Spotify", logo: SpotifyLogo },
  { id: 4, name: "Electronic Arts", logo: EALogo },
  { id: 5, name: "HHN", logo: HHNLogo },
]

const TESTIMONIALS = [
  {
    quote:
      "I've been using JobMarshal for years and it's the best platform to find the best talent.",
    author: "John Doe",
    company: "ArcJet",
  },
  {
    quote:
      "JobMarshal has been a game-changer for us. We've found the best talent for our company.",
    author: "Jane Doe",
    company: "Inngest",
  },
  {
    quote:
      "The platform is easy to use and we've found the best talent for our company.",
    author: "Mark Parker",
    company: "Discord",
  },
  {
    quote:
      "We've been using JobMarshal for years and it's the best platform to find the best talent.",
    author: "Diana Hart",
    company: "Spotify",
  },
  {
    quote:
      "JobMarshal has been a game-changer for us. We've found the best talent for our company.",
    author: "Mia Johnson",
    company: "Electronic Arts",
  },
  {
    quote:
      "JobMarshal allowed us to find some amazing candidates for some of our most important roles.",
    author: "Lasse Lammers",
    company: "HHN",
  },
]

const STATS = [
  { id: 0, value: "10k+", label: "Monthly Active Users" },
  { id: 1, value: "48h", label: "Average Time to Hire" },
  { id: 2, value: "95%", label: "Satisfaction Rate" },
  { id: 3, value: "500+", label: "Companies hiring" },
]

export default function PostJobPage() {
  return (
    <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <CreateJobForm />

      <div className="cols-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Trusted by Industry Leaders
            </CardTitle>
            <CardDescription>
              Join the thousands of companies that trust JobMarshal to find the
              best talent.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {COMPANIES.map((company) => (
                <div key={company.id}>
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={80}
                    className="rounded-lg opacity-75 transition-opacity hover:opacity-100"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {TESTIMONIALS.map((testimonial, index) => (
                <blockquote
                  key={index}
                  className="border-primary border-l-2 pl-4"
                >
                  <p className="text-muted-foreground text-sm italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <footer className="mt-2 text-sm font-medium">
                    - {testimonial.author}, {testimonial.company}
                  </footer>
                </blockquote>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-primary/10 dark:bg-primary/5 rounded-lg p-4"
                >
                  <h4 className="text-2xl font-bold">{stat.value}</h4>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
