import { z } from "zod"

export const EmployerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  location: z.string().min(1, "Location must be provided"),
  about: z
    .string()
    .min(10, "Please provide more information about your company"),
  logo: z.string().min(1, "Please provide a logo"),
  website: z
    .string()
    .url("Please provide a valid URL")
    .min(1, "Please provide a website"),
  // TODO: allow for multiple social accounts
  socialAccount: z.string().optional(),
})

export const EmployeeSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  about: z.string().min(10, "Please provide more information about yourself"),
  resume: z.string().min(1, "Please provide a resume"),
})
