import { CategoryCreateForm } from "@/features/admin/categories/components/new/CategoryCreateForm";
import React from "react";

/**
 * Admin Category Create Page (Server Component)
 * Wraps the client-side form component within the global layout constraints.
 */
export default function AdminCategoryCreatePage() {
  return <CategoryCreateForm />;
}
