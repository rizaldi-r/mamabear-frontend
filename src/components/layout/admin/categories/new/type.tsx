import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface CategoryFormValues {
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  metaTitle: string;
  metaDescription: string;
  imageUrl?: string;
}

export interface FormSectionProps {
  register: UseFormRegister<CategoryFormValues>;
  isSubmitting: boolean;
  errors?: FieldErrors<CategoryFormValues>;
}