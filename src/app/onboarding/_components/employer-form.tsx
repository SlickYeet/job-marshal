import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, XIcon } from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { createEmployer } from "@/actions"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { COUNTRY_LIST } from "@/utils/countries"
import { UploadDropzone } from "@/utils/uploadthing"
import { EmployerSchema } from "@/validators"

export function EmployerForm() {
  const form = useForm<z.infer<typeof EmployerSchema>>({
    resolver: zodResolver(EmployerSchema),
    defaultValues: {
      name: "",
      location: "",
      about: "",
      logo: "",
      website: "",
      socialAccount: "",
    },
  })

  const isPending = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof EmployerSchema>) => {
    try {
      await createEmployer(values)
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        toast.error("An unexpected error occurred. Please try again.", {
          description: error.message,
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* General */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Location</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Global</SelectLabel>
                      <SelectItem value="global">
                        <span>🌎</span>
                        <span className="pl-2">Global / Remote</span>
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Locations</SelectLabel>
                      {/*
                        // TODO: Add search functionality via combobox
                      */}
                      {COUNTRY_LIST.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          <span>{country.flagEmoji}</span>
                          <span className="pl-2">{country.name}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Social */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourcompany.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="socialAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social Account</FormLabel>
                <FormControl>
                  <Input placeholder="@yourcompany" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* About */}
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your company"
                  {...field}
                  className="min-h-28 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Logo */}
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Logo</FormLabel>
              <FormControl>
                {field.value ? (
                  <div className="relative w-fit">
                    <Image
                      src={field.value}
                      alt="company logo"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-auto w-full rounded-lg"
                    />
                    <Button
                      type="button"
                      onClick={() => field.onChange("")}
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2"
                    >
                      <XIcon />
                    </Button>
                  </div>
                ) : (
                  // Implement custom upload button
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => field.onChange(res[0].url)}
                    onUploadError={(err) => console.error(err)}
                    className="[&_button]:bg-primary [&_button]:text-background ut-button:hover:bg-primary/90 [&_label]:text-muted-foreground [&_allowedContent]:text-muted-foreground ut-upload-icon:text-muted-foreground border-primary"
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  )
}
