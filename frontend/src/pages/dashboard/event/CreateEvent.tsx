import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Save,
  Loader2,
} from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(
      2,
      "Nama event wajib diisi"
    ),

  categoryId: z
    .string()
    .min(
      1,
      "Kategori wajib dipilih"
    ),

  pembicaraId: z
    .string()
    .min(
      1,
      "Pembicara wajib dipilih"
    ),

  location: z
    .string()
    .min(
      2,
      "Lokasi wajib diisi"
    ),

  dateEvent: z
    .string()
    .min(
      1,
      "Tanggal event wajib diisi"
    ),

  description: z
    .string()
    .min(
      5,
      "Deskripsi minimal 5 karakter"
    ),
});

type FormData = z.infer<
  typeof schema
>;

type Category = {
  id: number;
  name: string;
};

type Speaker = {
  id: number;
  name: string;
};

export default function CreateEvent() {
  const navigate =
    useNavigate();

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [speakers, setSpeakers] =
    useState<Speaker[]>([]);

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver:
      zodResolver(schema),
  });

  /**
   * FETCH DROPDOWN
   */
  useEffect(() => {
    const fetchDropdownData =
      async () => {
        try {
          const [
            resCat,
            resSpeak,
          ] =
            await Promise.all([
              fetch(
                "http://localhost:3000/categories"
              ),

              fetch(
                "http://localhost:3000/pembicara"
              ),
            ]);

          const catData =
            await resCat.json();

          const speakData =
            await resSpeak.json();

          setCategories(
            catData.categories ||
              catData.data ||
              []
          );

          setSpeakers(
            speakData.data || []
          );
        } catch (err) {
          console.error(
            "Gagal load dropdown:",
            err
          );
        }
      };

    fetchDropdownData();
  }, []);

  /**
   * SUBMIT
   */
  const onSubmit = async (
    data: FormData
  ) => {
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:3000/events",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...data,

            categoryId: Number(
              data.categoryId
            ),

            pembicaraId: Number(
              data.pembicaraId
            ),

            dateEvent:
              new Date(
                data.dateEvent
              ).toISOString(),
          }),
        }
      );

      const result =
        await res.json();

      if (!res.ok) {
        throw new Error(
          result.message
        );
      }

      alert(
        "Event berhasil dibuat"
      );

      navigate("/event");
    } catch (error) {
      console.error(error);

      alert(
        "Gagal membuat event"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        
        {/* HEADER */}
        <div className="border-b border-gray-100 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Event
          </h1>

          <p className="text-gray-500 mt-1">
            Tambahkan event baru
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="p-8 space-y-6"
        >
          
          {/* EVENT NAME */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Nama Event
            </label>

            <input
              type="text"
              placeholder="Masukkan nama event"
              {...register(
                "name"
              )}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.name && (
              <p className="text-sm text-red-500">
                {
                  errors.name
                    .message
                }
              </p>
            )}
          </div>

          {/* CATEGORY & PEMBICARA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* CATEGORY */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Kategori
              </label>

              <select
                {...register(
                  "categoryId"
                )}
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Pilih kategori
                </option>

                {categories.map(
                  (
                    category
                  ) => (
                    <option
                      key={
                        category.id
                      }
                      value={
                        category.id
                      }
                    >
                      {
                        category.name
                      }
                    </option>
                  )
                )}
              </select>

              {errors.categoryId && (
                <p className="text-sm text-red-500">
                  {
                    errors
                      .categoryId
                      .message
                  }
                </p>
              )}
            </div>

            {/* PEMBICARA */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Pembicara
              </label>

              <select
                {...register(
                  "pembicaraId"
                )}
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Pilih pembicara
                </option>

                {speakers.map(
                  (
                    speaker
                  ) => (
                    <option
                      key={
                        speaker.id
                      }
                      value={
                        speaker.id
                      }
                    >
                      {
                        speaker.name
                      }
                    </option>
                  )
                )}
              </select>

              {errors.pembicaraId && (
                <p className="text-sm text-red-500">
                  {
                    errors
                      .pembicaraId
                      .message
                  }
                </p>
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
                {...register(
                  "location"
                )}
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors.location && (
                <p className="text-sm text-red-500">
                  {
                    errors
                      .location
                      .message
                  }
                </p>
              )}
            </div>

            {/* DATE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Tanggal Event
              </label>

              <input
                type="datetime-local"
                {...register(
                  "dateEvent"
                )}
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors.dateEvent && (
                <p className="text-sm text-red-500">
                  {
                    errors
                      .dateEvent
                      .message
                  }
                </p>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Deskripsi Event
            </label>

            <textarea
              rows={5}
              placeholder="Masukkan deskripsi event"
              {...register(
                "description"
              )}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            {errors.description && (
              <p className="text-sm text-red-500">
                {
                  errors
                    .description
                    .message
                }
              </p>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/event"
                )
              }
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
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Loading...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Create Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}