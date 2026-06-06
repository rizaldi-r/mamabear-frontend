"use client";


import React, { useEffect, useState } from "react";
import { useForm, UseFormRegister, FieldErrors, Controller, Control } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2, ImagePlus } from "lucide-react";
import {Category,CategoryImage} from "@/features/categories/types/category.types";
import {adminCategoryService, uploadCategoryImage} from "@/features/admin/categories/services/adminCategoryService";


// --- Types ---
interface CategoryEditFormValues {
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  metaTitle?: string;
  metaDescription?: string;
  imageUrl?: string;
  img : File
}


interface CategoryEditFormProps {
  initialData: Category;
}


// --- Custom Hook ---
const useCategoryEditForm = (initialData: Category) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);


  const {
    register,
    handleSubmit,
    watch, control, setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryEditFormValues>({
    defaultValues: {
      name: initialData.name,
      slug: initialData.slug,
      description: initialData.description,
      isActive: initialData.isActive,
      // @ts-ignore - Assuming meta fields exist on the backend despite missing swagger schema
      metaTitle: initialData.metaTitle || "",
      // @ts-ignore
      metaDescription: initialData.metaDescription || "",
      imageUrl : initialData.images?.[0]?.imageUrl || ''
    },
  });


  const isActiveWatch = watch("isActive");


  const onSubmit = async (data: CategoryEditFormValues) => {
    setError(null);
    let image
    if(data.img){
      image = await uploadCategoryImage(data.img);
    }else {
      image = initialData.images
    }

    try {
      const categoryPayload: any = {
        name: data.name,
        slug: data.slug,
        description: data.description,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        isActive: data.isActive,
        sortOrder: initialData.sortOrder,
        images: image ?? null
      };

      console.log('EDITPAY', categoryPayload)

      // Call the update service instead of create
      await adminCategoryService.updateCategory(initialData.id, categoryPayload as Partial<Category>,);


      router.push("/admin/categories");
      router.refresh();
    } catch (err: any) {
      console.error("Submit Error:", err);
      setError(err.message || "Terjadi kesalahan saat memperbarui kategori.");
    }
  };


  const handleCancel = () => {
    router.push("/admin/categories");
  };

  const nameValue = watch("name");
  const isActiveValue = watch("isActive");

  // Auto-generate slug from name
  useEffect(() => {
    if (nameValue) {
      const generatedSlug = nameValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generatedSlug, { shouldValidate: true });
    } else {
      setValue("slug", "");
    }
  }, [nameValue, setValue]);


  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    isActiveWatch,
    error, control,
    handleCancel,
  };
};

// --- Sub-components ---
const BasicInfoSection = ({
  register,
  errors,
  isSubmitting,
  isActiveWatch,
}: {
  register: UseFormRegister<CategoryEditFormValues>;
  errors: FieldErrors<CategoryEditFormValues>;
  isSubmitting: boolean;
  isActiveWatch: boolean;
}) => (
  <div className="flex flex-col gap-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-font-2 font-bold text-[var(--mama-brown)]"
        >
          Nama Kategori
        </label>
        <input
          id="name"
          type="text"
          disabled={isSubmitting}
          className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--mama-pink)] focus:border-[var(--mama-hot-pink)] transition-all text-font-2 text-gray-800 disabled:bg-gray-50"
          {...register("name", { required: "Nama kategori wajib diisi" })}
        />
        {errors.name && (
          <span className="text-red-500 text-font-1">
            {errors.name.message}
          </span>
        )}
      </div>


      <div className="flex flex-col gap-2">
        <label
          htmlFor="slug"
          className="text-font-2 font-bold text-[var(--mama-brown)]"
        >
          Slug
        </label>
        <input
          id="slug"
          type="text"
          disabled={true}
          className="w-full px-4 py-2.5 rounded-md border border-gray-200  cursor-none transition-all text-font-2 text-gray-800 disabled:bg-gray-50"
          {...register("slug", { required: "Slug wajib diisi" })}
        />
        {errors.slug && (
          <span className="text-red-500 text-font-1">
            {errors.slug.message}
          </span>
        )}
      </div>
    </div>


    <div className="flex flex-col gap-2">
      <label
        htmlFor="description"
        className="text-font-2 font-bold text-[var(--mama-brown)]"
      >
        Deskripsi
      </label>
      <textarea
        id="description"
        rows={4}
        disabled={isSubmitting}
        className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--mama-pink)] focus:border-[var(--mama-hot-pink)] transition-all text-font-2 text-gray-800 resize-y disabled:bg-gray-50"
        {...register("description")}
      />
    </div>


    {/* Status Toggle moved here for better mobile responsiveness */}
    <div className="flex flex-col gap-2 pt-2">
      <label className="text-font-2 font-bold text-[var(--mama-brown)]">
        Status Kategori
      </label>
      <label className="relative inline-flex items-center cursor-pointer w-max group">
        <input
          type="checkbox"
          className="sr-only peer"
          disabled={isSubmitting}
          {...register("isActive")}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--mama-pink)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--mama-hot-pink)] disabled:opacity-50 disabled:cursor-not-allowed group-hover:after:scale-95"></div>
        <span
          className={`ml-3 text-font-2 font-medium transition-colors ${isActiveWatch ? "text-[var(--mama-hot-pink)]" : "text-gray-500"}`}
        >
          {isActiveWatch
            ? "Aktif (Ditampilkan)"
            : "Tidak Aktif (Disembunyikan)"}
        </span>
      </label>
    </div>
  </div>
);


const ImageUploadSection = ({ images, control, errors }: { images: CategoryImage[]; control : Control<CategoryEditFormValues>; errors : FieldErrors<CategoryEditFormValues>;}) => {
  const existingImage = images && images.length > 0 ? images[0] : null;
  const [preview, setPreview] = useState<string | null>(existingImage?.imageUrl || null);
  
    function handlePreview(e : any){
      const file = e.target.files[0]
      if (!file) return
  
      setPreview(URL.createObjectURL(file))
    }

  return (
    <div className="flex flex-col gap-2">
        <p className="text-font-2 font-bold text-[var(--mama-brown)]">
            Gambar Kategori
        </p>
        <div className='relative flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-4 hover:bg-[var(--mama-pink)] hover:bg-opacity-10 hover:border-[var(--mama-hot-pink)] transition-all cursor-pointer'>
        <Controller
            name="img"
            control={control}
            render={({ field: { onChange, ref, name } }) => (
                <label className={`w-full h-40 flex flex-col items-center justify-center gap-3 group ${
                    preview ? "absolute top-0 left-0 opacity-0" : "block"}`}>
                    <div className="p-3 bg-gray-50 rounded-full group-hover:bg-[var(--mama-pink)] transition-colors">
                        <ImagePlus className="w-6 h-6 text-gray-400 group-hover:text-[var(--mama-hot-pink)]" />
                    </div>
                    <span className="text-font-2 text-[var(--color-gray)] font-medium">
                        Klik untuk mengunggah gambar
                    </span>
                    <span className="text-font-1 text-gray-400">
                        Format yang didukung: JPG, PNG, WEBP (Max 2MB)
                    </span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            name={name}
                            ref={ref}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                onChange(file);       // simpan ke RHF
                                handlePreview(e); // preview
                            }}
                        />
                    </label>
                )}
            />

            {preview && (
                <img alt='previewimage' src={preview} className='h-40'/>    )}
        </div>
        {errors?.img && <p className='text-red-500'>{errors.img.message}*</p>}

    </div>
  );
};


const SeoSection = ({
  register,
  isSubmitting,
}: {
  register: UseFormRegister<CategoryEditFormValues>;
  isSubmitting: boolean;
}) => (
  <div className="flex flex-col gap-6">
    <h3 className="text-font-3 font-bold text-[var(--mama-brown)]">
      SEO (Opsional)
    </h3>
    <div className="flex flex-col gap-2">
      <label
        htmlFor="metaTitle"
        className="text-font-2 font-bold text-[var(--mama-brown)]"
      >
        Meta Title (SEO)
      </label>
      <input
        id="metaTitle"
        type="text"
        placeholder="Judul untuk mesin pencari"
        disabled={isSubmitting}
        className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--mama-pink)] focus:border-[var(--mama-hot-pink)] transition-all text-font-2 text-gray-800 disabled:bg-gray-50"
        {...register("metaTitle")}
      />
    </div>
    <div className="flex flex-col gap-2">
      <label
        htmlFor="metaDescription"
        className="text-font-2 font-bold text-[var(--mama-brown)]"
      >
        Meta Description (SEO)
      </label>
      <textarea
        id="metaDescription"
        rows={3}
        placeholder="Deskripsi singkat untuk hasil pencarian Google"
        disabled={isSubmitting}
        className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--mama-pink)] focus:border-[var(--mama-hot-pink)] transition-all text-font-2 text-gray-800 resize-y disabled:bg-gray-50"
        {...register("metaDescription")}
      />
    </div>
  </div>
);


// --- Main Form Component ---
export const CategoryEditForm = ({ initialData }: CategoryEditFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    isActiveWatch,
    error,
    handleCancel,
  } = useCategoryEditForm(initialData);

  console.log(initialData)
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-font-5 font-bold text-[var(--mama-brown)]">
            Ubah Kategori
          </h1>
          <p className="text-font-2 text-[var(--color-gray)] mt-1">
            Perbarui informasi untuk kategori{" "}
            <strong>{initialData.name}</strong>
          </p>
        </div>
      </div>


      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
      >
        {/* Form Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-font-3 font-bold text-[var(--mama-brown)]">
            Informasi Dasar
          </h2>
        </div>


        {/* Error State */}
        {error && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-100 rounded-md text-red-600 text-font-2">
            {error}
          </div>
        )}


        {/* Form Body */}
        <div className="p-6 flex flex-col gap-8">
          <BasicInfoSection
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            isActiveWatch={isActiveWatch}
          />
          <hr className="border-gray-100" />
          <ImageUploadSection images={initialData.images || []} errors={errors} control={control}/>
          <hr className="border-gray-100" />
          <SeoSection register={register} isSubmitting={isSubmitting} />
        </div>


        {/* Form Footer */}
        <div className="p-6 border-t border-gray-100 flex items-center gap-4 bg-gray-50 bg-opacity-50">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[var(--mama-hot-pink)] text-white px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity text-font-2 font-semibold flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Menyimpan...
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </button>


          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="bg-white text-[var(--color-gray)] border border-gray-200 px-6 py-2.5 rounded-md hover:bg-gray-50 transition-colors text-font-2 font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};