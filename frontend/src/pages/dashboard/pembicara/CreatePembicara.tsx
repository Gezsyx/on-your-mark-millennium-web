import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Loader2, ImageIcon } from "lucide-react";
import { useState } from "react";

interface PembicaraForm {
  name: string;
  role: string;
  image: string;
}

export default function CreatePembicara() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PembicaraForm>();

  const imagePreview = watch("image");

  const onSubmit = async (data: PembicaraForm) => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://on-your-mark-millennium-lc0qoyzcb.vercel.app/pembicara",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Gagal membuat pembicara");
      }

      alert("Pembicara berhasil dibuat!");

      navigate("/pembicara");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {/* HEADER */}
        <div className="border-b border-gray-100 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Create Pembicara</h1>

          <p className="text-gray-500 mt-1">Tambahkan data pembicara</p>
        </div>

        {/* CONTENT */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8"
        >
          {/* LEFT SIDE */}
          <div className="space-y-5">
            {/* NAME */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Nama Pembicara
              </label>

              <input
                type="text"
                placeholder="Masukkan nama pembicara"
                {...register("name", {
                  required: "Nama pembicara wajib diisi",
                })}
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* ROLE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Role / Jabatan
              </label>

              <input
                type="text"
                placeholder="Frontend Developer"
                {...register("role", {
                  required: "Role wajib diisi",
                })}
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors.role && (
                <p className="text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>

            {/* IMAGE URL */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Image URL
              </label>

              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                {...register("image", {
                  required: "Image wajib diisi",
                })}
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors.image && (
                <p className="text-sm text-red-500">{errors.image.message}</p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Preview Image
            </label>

            <div className="w-full aspect-square border border-dashed border-gray-300 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <ImageIcon size={50} />
                  <p className="mt-3 text-sm">
                    Preview image akan muncul di sini
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER BUTTON */}
          <div className="lg:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate("/pembicara")}
              className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Pembicara"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
