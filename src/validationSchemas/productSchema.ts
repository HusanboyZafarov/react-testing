import * as z from "zod";

const englishStringRegEx = /^[A-Za-z0-9\s!@#$%^.,%?&*()_+-]*$/;

export const productFormSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Name is required")
    .max(255)
    .refine((value) => value.trim().length > 0, {
      message: "Name cannot be only whitespace",
    }),
  price: z.coerce
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price is required",
    })
    .min(1)
    .max(1000),
  categoryId: z.number({
    required_error: "Category is required",
  }),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
