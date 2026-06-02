import { ImagePlus } from 'lucide-react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';

type InputForm = {
    img : File,
}

function ImageUploadSection() {
  const [preview, setPreview] = useState<string | null>(null);
  const { control, formState: {errors}} = useForm<InputForm>();

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
            rules={{ required: "Image required" }}
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
            {errors.img && <p className='text-xs text-red-500'>{errors.img.message}</p>}

            {preview && (
                <img alt='previewimage' src={preview} className='h-40'/>    )}
        </div>

  </div>
  )
}

export default ImageUploadSection