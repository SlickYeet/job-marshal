import { JOB_POST_STATUS } from "@prisma/client"
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

export const JobSchema = z.object({
  title: z.string().min(2, "Title is too short"),
  description: z.string().min(10, "Description is too short"),
  employmentType: z.string().min(1, "Please provide an employment type"),
  location: z.string().min(1, "Location must be provided"),
  salaryFrom: z.number().int().min(1, "Please provide a salary range"),
  salaryTo: z.number().int().min(1, "Please provide a salary range"),
  listingDuration: z.string().min(1, "Please provide a listing duration"),
  benefits: z.array(z.string()).min(1, "Please provide at least one benefit"),
  status: z.nativeEnum(JOB_POST_STATUS),

  companyName: z.string().min(1, "Please provide a company name"),
  companyLocation: z.string().min(1, "Please provide a company location"),
  companyAbout: z
    .string()
    .min(10, "Please provide more information about your company"),
  companyLogo: z.string().min(1, "Please provide a company logo"),
  companyWebsite: z
    .string()
    .url("Please provide a valid URL")
    .min(1, "Please provide a company website"),
  companySocialAccount: z.string().optional(),
})
