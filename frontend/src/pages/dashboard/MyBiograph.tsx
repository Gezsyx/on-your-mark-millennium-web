import { Link } from "react-router-dom";
import UserProfile from "../../components/ui/UserProfile";

export default function MyBiograph() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white px-4 md:px-8">
      <div className="flex justify-center ">
        <Link to="/mybiograph">
          <UserProfile
            name="Gezsyx"
            Url="https://res.cloudinary.com/dnyw0exi5/image/upload/v1779475130/Tak_berjudul424_20260523013706_jzwyqb.png"
          />
        </Link>
      </div>

      {/* NAME & ROLE */}
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold text-gray-900">Gezsyx</h1>
        <p className="text-sm text-gray-600 mt-1.5 font-medium">
          Fullstack Developer
        </p>
      </div>

      {/* DETAIL CARD */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] p-6 md:p-8">
        {/* Card Header */}
        <h2 className="text-[17px] font-bold text-[#1e293b] mb-4">
          My Information
        </h2>

        {/* Divider */}
        <hr className="border-gray-50 mb-6" />

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
          {/* Nama Lengkap */}
          <div>
            <p className="text-[13px] text-gray-400 font-medium mb-1.5">Nama</p>
            <p className="text-[14px] font-semibold text-[#334155]">
              Fajar Abdul Aziz (Gezsyx)
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="text-[13px] text-gray-400 font-medium mb-1.5">
              Email
            </p>
            <p className="text-[14px] font-semibold text-[#334155]">
              fajarabdulaziz259@gmail.com
            </p>
          </div>

          {/* No. Telepon */}
          <div>
            <p className="text-[13px] text-gray-400 font-medium mb-1.5">
              No. Telepon / WhatsApp
            </p>
            <p className="text-[14px] font-semibold text-[#334155]">
              +62 838-9921-6097
            </p>
          </div>

          {/* Instansi / Organisasi */}
          <div>
            <p className="text-[13px] text-gray-400 font-medium mb-1.5">
              Pekerjaan
            </p>
            <p className="text-[14px] font-semibold text-[#334155]">
              Freelance
            </p>
          </div>
        </div>

        {/* Tentang Saya */}
        <div className="mt-8">
          <p className="text-[13px] text-gray-400 font-medium mb-2.5">
            Tentang Saya
          </p>
          <p className="text-[13px] text-slate-600 leading-relaxed text-justify">
            "Seorang Fullstack Developer yang berfokus pada pengembangan sistem
            aplikasi yang efisien dan inovatif. Memadukan logika backend yang
            solid menggunakan Java dan SQL dengan antarmuka yang ramah pengguna.
            Saya terbiasa menganalisis masalah teknis yang kompleks dan
            menerjemahkannya ke dalam kode yang bersih dan terstruktur untuk
            menciptakan produk digital yang berdampak nyata."
          </p>
        </div>
      </div>
    </div>
  );
}
