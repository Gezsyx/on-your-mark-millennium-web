import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Loader2, ImageIcon } from "lucide-react";

interface PembicaraForm {
  name: string;
  role: string;
  image: string;
}

export default function EditPembicara() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [fetchLoading, setFetchLoading] = useState(true);

  const [errors, setErrors] = useState({
    name: "",
    role: "",
    image: "",
  });

  const [formData, setFormData] = useState<PembicaraForm>({
    name: "",
    role: "",
    image: "",
  });

  /**
   * FETCH DETAIL PEMBICARA
   */
  useEffect(() => {
    const fetchPembicara = async () => {
      try {
        setFetchLoading(true);

        const res = await fetch(
          `https://on-your-mark-millennium-web.vercel.app/pembicara/${id}`,
        );

        if (!res.ok) {
          throw new Error("Gagal mengambil data pembicara");
        }

        const result = await res.json();

        const data = result.data || result.pembicara || result;

        setFormData({
          name: data.name || "",
          role: data.role || "",
          image: data.image || "",
        });
      } catch (error) {
        console.error(error);

        alert("Terjadi kesalahan saat mengambil data pembicara");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchPembicara();
  }, [id]);

  /**
   * HANDLE CHANGE
   */
  const handleChange = (field: keyof PembicaraForm, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    setErrors({
      ...errors,
      [field]: "",
    });
  };

  /**
   * VALIDATION
   */
  const validateForm = () => {
    const newErrors = {
      name: "",
      role: "",
      image: "",
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Nama pembicara wajib diisi";

      isValid = false;
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role wajib diisi";

      isValid = false;
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image wajib diisi";

      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  /**
   * UPDATE PEMBICARA
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await fetch(
        `https://on-your-mark-millennium-web.vercel.app/pembicara/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Gagal update pembicara");
      }

      alert("Pembicara berhasil diupdate!");

      navigate("/pembicara");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * LOADING FETCH
   */
  if (fetchLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-400">
        <Loader2 className="animate-spin mb-3" size={45} />

        <p>Memuat data pembicara...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {/* HEADER */}
        <div className="border-b border-gray-100 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Pembicara</h1>

          <p className="text-gray-500 mt-1">Update data pembicara</p>
        </div>

        {/* CONTENT */}
        <form
          onSubmit={handleSubmit}
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
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              />

              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
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
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.role
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              />

              {errors.role && (
                <p className="text-sm text-red-500">{errors.role}</p>
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
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.image
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              />

              {errors.image && (
                <p className="text-sm text-red-500">{errors.image}</p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Preview Image
            </label>

            <div className="w-full aspect-square border border-dashed border-gray-300 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
              {formData.image ? (
                <img
                  src={formData.image}
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
                "Update Pembicara"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
