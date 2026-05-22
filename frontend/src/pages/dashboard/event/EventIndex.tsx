import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

interface EventItem {
  id: number;
  name: string;
  location: string;
  dateEvent: string;
  category: { name: string };
  pembicara: { name: string };
  description: string;
}

export default function EventIndex() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const API_URL = "https://on-your-mark-millennium-web.vercel.app/events";

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Gagal mengambil data");
      const responseData = await res.json();
      setEvents(responseData.data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    const confirmDelete = window.confirm(
      `Apakah kamu yakin ingin menghapus event "${name}"?`,
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Event berhasil dihapus!");
        setEvents((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="space-y-6 p-2">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <br />
          <p className="text-gray-500">Manajemen data event.</p>
        </div>
        <Link to="/event/create-event">
          <button className="bg-[#3B82F6] hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all shadow-sm">
            <Plus size={20} />
            Add Event
          </button>
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="animate-spin mb-2" size={40} />
            <p>Memuat data...</p>
          </div>
        ) : (
          <>
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {/* Tambah Header ID */}
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase w-16">
                    ID
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">
                    Event Name
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">
                    Speaker
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">
                    Schedule
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">
                    Description
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-center uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentEvents.length > 0 ? (
                  currentEvents.map((event) => (
                    <tr
                      key={event.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Tampilkan data ID */}
                      <td className="px-6 py-4 text-sm text-gray-400 font-mono">
                        #{event.id}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {event.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                          {event.category?.name || "No Category"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {event.pembicara?.name || "No Speaker"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="text-gray-800 font-medium">
                          {new Date(event.dateEvent).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "long", year: "numeric" },
                          )}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {event.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {event.description.length > 50
                          ? event.description.slice(0, 50) + "..."
                          : event.description}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link
                            to={`/events/edit/${event.id}`}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(event.id, event.name)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-20 text-gray-400">
                      Data tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="bg-white px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Menampilkan{" "}
                <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
                sampai{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, events.length)}
                </span>{" "}
                dari <span className="font-medium">{events.length}</span> data
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === index + 1
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
