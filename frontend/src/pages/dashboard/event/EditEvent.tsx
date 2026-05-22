import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Loader2, Save } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

interface Speaker {
  id: number;
  name: string;
}

interface FormErrors {
  name: string;
  categoryId: string;
  pembicaraId: string;
  location: string;
  dateEvent: string;
  description: string;
}

export default function EditEvent() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [categories, setCategories] = useState<Category[]>([]);

  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  const [loading, setLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    categoryId: "",
    pembicaraId: "",
    location: "",
    dateEvent: "",
    description: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    pembicaraId: "",
    location: "",
    dateEvent: "",
    description: "",
  });

  /**
   * FETCH DATA
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [resCat, resSpeaker, resEvent] = await Promise.all([
          fetch("https://on-your-mark-millennium-web.vercel.app/categories"),
          fetch("https://on-your-mark-millennium-web.vercel.app/pembicara"),
          fetch(`https://on-your-mark-millennium-web.vercel.app/events/${id}`),
        ]);

        const catData = await resCat.json();

        const speakerData = await resSpeaker.json();

        const eventData = await resEvent.json();

        setCategories(catData.categories || catData.data || []);

        setSpeakers(speakerData.data || []);

        const event = eventData.data;

        if (!event) {
          throw new Error("Event tidak ditemukan");
        }

        setFormData({
          name: event.name || "",
          categoryId: event.categoryId?.toString() || "",
          pembicaraId: event.pembicaraId?.toString() || "",
          location: event.location || "",
          dateEvent: new Date(event.dateEvent).toISOString().slice(0, 16),
          description: event.description || "",
        });
      } catch (error) {
        console.error(error);

        alert("Gagal mengambil data event");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /**
   * VALIDATION
   */
  const validateForm = () => {
    const newErrors: FormErrors = {
      name: "",
      categoryId: "",
      pembicaraId: "",
      location: "",
      dateEvent: "",
      description: "",
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Nama event wajib diisi";

      isValid = false;
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Kategori wajib dipilih";

      isValid = false;
    }

    if (!formData.pembicaraId) {
      newErrors.pembicaraId = "Pembicara wajib dipilih";

      isValid = false;
    }

    if (!formData.location.trim()) {
      newErrors.location = "Lokasi wajib diisi";

      isValid = false;
    }

    if (!formData.dateEvent) {
      newErrors.dateEvent = "Tanggal event wajib diisi";

      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Deskripsi wajib diisi";

      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  /**
   * HANDLE INPUT
   */
  const handleChange = (field: string, value: string) => {
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
   * UPDATE EVENT
   */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const res = await fetch(
        `https://on-your-mark-millennium-web.vercel.app/events/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            categoryId: Number(formData.categoryId),
            pembicaraId: Number(formData.pembicaraId),
            dateEvent: new Date(formData.dateEvent).toISOString(),
          }),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Gagal update event");
      }

      alert("Event berhasil diupdate!");

      navigate("/event");
    } catch (error) {
      console.error(error);

      alert("Gagal update event");
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * LOADING
   */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-400">
        <Loader2 className="animate-spin mb-3" size={45} />

        <p>Memuat data event...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {/* HEADER */}
        <div className="border-b border-gray-100 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>

          <p className="text-gray-500 mt-1">Update data event</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleUpdate} className="p-8 space-y-6">
          {/* NAMA EVENT */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Nama Event
            </label>

            <input
              type="text"
              placeholder="Masukkan nama event"
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

          {/* CATEGORY & SPEAKER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* CATEGORY */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Kategori
              </label>

              <select
                value={formData.categoryId}
                onChange={(e) => handleChange("categoryId", e.target.value)}
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.categoryId
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              >
                <option value="">Pilih kategori</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {errors.categoryId && (
                <p className="text-sm text-red-500">{errors.categoryId}</p>
              )}
            </div>

            {/* SPEAKER */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Pembicara
              </label>

              <select
                value={formData.pembicaraId}
                onChange={(e) => handleChange("pembicaraId", e.target.value)}
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.pembicaraId
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              >
                <option value="">Pilih pembicara</option>

                {speakers.map((speaker) => (
                  <option key={speaker.id} value={speaker.id}>
                    {speaker.name}
                  </option>
                ))}
              </select>

              {errors.pembicaraId && (
                <p className="text-sm text-red-500">{errors.pembicaraId}</p>
              )}
            </div>
          </div>

          {/* LOCATION & DATE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* LOCATION */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Lokasi
              </label>

              <input
                type="text"
                placeholder="Masukkan lokasi event"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.location
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              />

              {errors.location && (
                <p className="text-sm text-red-500">{errors.location}</p>
              )}
            </div>

            {/* DATE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Tanggal Event
              </label>

              <input
                type="datetime-local"
                value={formData.dateEvent}
                onChange={(e) => handleChange("dateEvent", e.target.value)}
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.dateEvent
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              />

              {errors.dateEvent && (
                <p className="text-sm text-red-500">{errors.dateEvent}</p>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Deskripsi
            </label>

            <textarea
              rows={5}
              placeholder="Masukkan deskripsi event"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={`border rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />

            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate("/event")}
              className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
