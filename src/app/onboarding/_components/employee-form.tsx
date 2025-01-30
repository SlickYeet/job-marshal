import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, XIcon } from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { createEmployee } from "@/actions"
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
import { Textarea } from "@/components/ui/textarea"
import { UploadDropzone } from "@/utils/uploadthing"
import { EmployeeSchema } from "@/validators"

import PdfImage from "../../../../public/pdf.png"

export function EmployeeForm() {
  const form = useForm<z.infer<typeof EmployeeSchema>>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      name: "",
      about: "",
      resume: "",
    },
  })

  const isPending = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof EmployeeSchema>) => {
    try {
      await createEmployee(values)
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself"
                  {...field}
                  className="min-h-28 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume (PDF)</FormLabel>
              <FormControl>
                {field.value ? (
                  <div className="relative w-fit">
                    <Image
                      src={PdfImage}
                      alt="resume"
                      width={100}
                      height={100}
                      className="rounded-lg"
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
                    endpoint="pdfUploader"
                    onClientUploadComplete={(res) => field.onChange(res[0].url)}
                    onUploadError={(err) => console.error(err)}
                    className="ut-button:bg-primary ut-button:text-background ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground ut-upload-icon:text-muted-foreground border-primary"
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
