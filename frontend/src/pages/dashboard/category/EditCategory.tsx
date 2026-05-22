import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../../../components/ui/InputText";

const schema = z.object({
  name: z.string().min(2, "Nama kategori wajib diisi"),
});

type FormData = z.infer<typeof schema>;

export default function EditCategory() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [fetchLoading, setFetchLoading] = useState(true);

  const API_URL = "https://on-your-mark-millennium-web.vercel.app/categories";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  /**
   * FETCH DETAIL CATEGORY
   */
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setFetchLoading(true);

        const res = await fetch(`${API_URL}/${id}`);

        if (!res.ok) {
          throw new Error("Gagal mengambil detail kategori");
        }

        const responseData = await res.json();

        const category =
          responseData.data || responseData.category || responseData;

        if (!category) {
          throw new Error("Kategori tidak ditemukan");
        }

        setValue("name", category.name || "");
      } catch (error) {
        console.error(error);

        alert("Terjadi kesalahan saat mengambil data kategori");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchCategory();
  }, [id, setValue]);

  /**
   * UPDATE CATEGORY
   */
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: data.name,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Gagal update kategori");
      }

      alert("Kategori berhasil diupdate!");

      navigate("/category");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * LOADING
   */
  if (fetchLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-400">
        <Loader2 className="animate-spin mb-3" size={45} />

        <p>Memuat data kategori...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {/* HEADER */}
        <div className="border-b border-gray-100 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>

          <p className="text-gray-500 mt-1">Update data kategori event</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {/* INPUT */}
          <div className="flex flex-col gap-2">
            <Input
              label="Nama Category"
              name="name"
              register={register}
              error={errors.name?.message}
            />
          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate("/category")}
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
                <>
                  <Save size={18} />
                  Update Category
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
