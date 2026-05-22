import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, Edit, Trash, 
  ChevronLeft, ChevronRight, Loader2 
} from "lucide-react";

interface CategoryItem {
  id: number;
  name: string;
}

export default function CategoryIndex() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const API_URL = "http://localhost:3000/categories";

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Gagal mengambil data");
      const responseData = await res.json();
      
      // Mengamankan penarikan data berdasarkan variasi struktur JSON dari backend
      const result = responseData.categories || responseData.data || responseData;
      if (Array.isArray(result)) {
        setCategories(result);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    const confirmDelete = window.confirm(`Apakah kamu yakin ingin menghapus kategori "${name}"?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Kategori berhasil dihapus!");
        setCategories((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("Gagal menghapus kategori. Kategori ini mungkin sedang digunakan oleh suatu Event.");
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

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
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <br />
          <p className="text-gray-500">Manajemen data category event.</p>
        </div>
        <Link to="/category/create-category">
          <button className="bg-[#3B82F6] hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all shadow-sm">
            <Plus size={20} />
            Add Category
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
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase w-24 text-center">ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Category Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-center uppercase w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentCategories.length > 0 ? (
                  currentCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-500 text-center">#{category.id}</td>
                      <td className="px-6 py-4 font-semibold text-gray-800">{category.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link to={`/category/edit/${category.id}`} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg">
                            <Edit size={18} />
                          </Link>
                          <button onClick={() => handleDelete(category.id, category.name)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-20 text-gray-400">Data tidak ditemukan.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="bg-white px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Menampilkan <span className="font-medium">{categories.length > 0 ? indexOfFirstItem + 1 : 0}</span> sampai <span className="font-medium">{Math.min(indexOfLastItem, categories.length)}</span> dari <span className="font-medium">{categories.length}</span> data
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